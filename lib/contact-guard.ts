import { createHash } from "node:crypto";

/**
 * Lightweight, in-memory abuse guards for the contact API: a sliding-window
 * rate limit per client, and short-lived de-duplication of identical
 * submissions (double-clicks, retried requests).
 *
 * Honest limitation: this state lives only in the current Node.js process's
 * memory. It resets on every deploy/restart and is NOT shared across
 * serverless instances or regions — on a platform that runs multiple
 * instances (e.g. Vercel under load), a client could effectively see a
 * higher limit than the numbers below imply, since each instance keeps its
 * own count. That's an acceptable tradeoff for a low-traffic personal
 * portfolio contact form. A real distributed limiter (e.g. Upstash Redis)
 * would be needed for a guarantee that holds under horizontal scaling.
 */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 4;
const DUPLICATE_WINDOW_MS = 30 * 1000; // 30 seconds
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

type RateLimitEntry = { count: number; windowStart: number };

const rateLimitStore = new Map<string, RateLimitEntry>();
const duplicateStore = new Map<string, number>();

let lastCleanup = Date.now();

/** Prunes expired entries occasionally so the maps don't grow unbounded. */
function cleanupIfDue(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
  }
  for (const [key, timestamp] of duplicateStore) {
    if (now - timestamp > DUPLICATE_WINDOW_MS) duplicateStore.delete(key);
  }
}

export type RateLimitResult = { limited: false } | { limited: true; retryAfterSeconds: number };

/** `clientKey` should identify the caller — typically their IP address. */
export function checkRateLimit(clientKey: string): RateLimitResult {
  const now = Date.now();
  cleanupIfDue(now);

  const entry = rateLimitStore.get(clientKey);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientKey, { count: 1, windowStart: now });
    return { limited: false };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((entry.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  entry.count += 1;
  return { limited: false };
}

type ContactFingerprintPayload = { name: string; email: string; subject: string; message: string };

function fingerprintFor(clientKey: string, payload: ContactFingerprintPayload): string {
  return createHash("sha256")
    .update(`${clientKey}:${payload.name}:${payload.email}:${payload.subject}:${payload.message}`)
    .digest("hex");
}

/**
 * Returns true if an identical submission from the same client was already
 * *successfully sent* within the de-duplication window — most likely a
 * double-click or a retried request rather than two genuine messages. The
 * caller should skip sending a second email in that case.
 *
 * This only checks; it does not record. Recording happens in
 * `markSubmissionSent`, and only after a send actually succeeds — so a
 * retry following a *failed* send (missing config, Resend error) is never
 * mistaken for a duplicate and correctly gets a real second attempt.
 */
export function wasRecentlySent(clientKey: string, payload: ContactFingerprintPayload): boolean {
  const now = Date.now();
  cleanupIfDue(now);

  const previous = duplicateStore.get(fingerprintFor(clientKey, payload));
  return typeof previous === "number" && now - previous < DUPLICATE_WINDOW_MS;
}

/** Records that this exact submission was successfully sent, for `wasRecentlySent` to find. */
export function markSubmissionSent(clientKey: string, payload: ContactFingerprintPayload): void {
  duplicateStore.set(fingerprintFor(clientKey, payload), Date.now());
}
