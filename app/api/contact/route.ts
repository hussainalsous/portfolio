import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContactForm, type ContactFormData } from "@/lib/contact-validation";
import { checkRateLimit, wasRecentlySent, markSubmissionSent } from "@/lib/contact-guard";
import { renderContactMessageEmail } from "@/emails/ContactMessageEmail";

// Hidden form field real visitors never fill in; see the matching input in
// components/contact/ContactForm.tsx. Bots that auto-fill every field trip
// it and get rejected below.
const HONEYPOT_FIELD = "website";

// Generous ceiling for a JSON body that's realistically a few hundred bytes
// (name/email/subject) plus up to CONTACT_LIMITS.message characters.
// Rejects grossly oversized payloads before they're even parsed.
const MAX_BODY_BYTES = 20_000;

type RawPayload = Record<string, unknown>;

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Strips CR/LF so user input can't smuggle extra header lines into the outgoing email. */
function sanitizeSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // No IP header available (e.g. local dev without a proxy in front). Every
  // request shares one bucket in that case — acceptable for a low-traffic
  // personal contact form; see lib/contact-guard.ts for the full caveat.
  return "unknown";
}

/**
 * Contact form endpoint. Flow: validate → spam check (honeypot) → rate
 * limit → send via Resend. See lib/contact-guard.ts for the rate-limit and
 * duplicate-submission logic, and emails/ContactMessageEmail.ts for the
 * message template. The client (components/contact/ContactForm.tsx) expects
 * exactly the `{ ok, error? }` contract used below.
 */
export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as RawPayload | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const values: ContactFormData = {
    name: readString(body.name),
    email: readString(body.email),
    subject: readString(body.subject),
    message: readString(body.message),
  };

  const fieldErrors = validateContactForm(values);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload", fields: fieldErrors },
      { status: 400 }
    );
  }

  // Spam check. Rejected the same way a generic validation failure would
  // be — no distinct error code — so the honeypot's existence isn't exposed.
  if (readString(body[HONEYPOT_FIELD]).trim().length > 0) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const clientKey = getClientKey(request);

  const rateLimit = checkRateLimit(clientKey);
  if (rateLimit.limited) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const name = sanitizeSingleLine(values.name);
  const email = sanitizeSingleLine(values.email);
  const subject = sanitizeSingleLine(values.subject);
  const message = values.message.trim();

  // Duplicate submission (double-click, or a retried request after a flaky
  // connection) — but only when the earlier identical request actually
  // succeeded. A retry after a failed send (below) is a real second
  // attempt, not a duplicate, and must not be swallowed.
  if (wasRecentlySent(clientKey, { name, email, subject, message })) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;
  const toAddress = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromAddress || !toAddress) {
    console.error(
      "[contact] Missing Resend configuration — email not sent. Check that RESEND_API_KEY, " +
        "CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL are all set (values not logged)."
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { html, text } = renderContactMessageEmail({ name, email, subject, message });

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend rejected the email:", error.name, error.message);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
    }
  } catch (err) {
    console.error(
      "[contact] Unexpected error while sending email:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  markSubmissionSent(clientKey, { name, email, subject, message });
  return NextResponse.json({ ok: true });
}
