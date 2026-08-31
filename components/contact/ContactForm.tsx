"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, fieldClasses } from "./FormField";
import { cn } from "@/lib/utils";
import { contactContent } from "@/data/contact";
import { validateContactForm, CONTACT_LIMITS, type ContactFormData } from "@/lib/contact-validation";

type FormValues = ContactFormData & {
  // Honeypot — a real visitor never sees or fills this in. See the input's
  // markup below and the matching check in app/api/contact/route.ts.
  website: string;
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";
type ErrorKind = "rate_limited" | "not_configured" | "generic";

const initialValues: FormValues = { name: "", email: "", subject: "", message: "", website: "" };

/**
 * The contact form's client-side behavior is complete: validation, focus
 * states, submitting/success/error states. It posts to /api/contact, which
 * sends the message via Resend and reports back `{ ok, error? }`. No part
 * of the UI pretends a message was sent when it wasn't.
 */
const emailMethod = contactContent.methods.find((method) => method.key === "email");

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>("generic");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.ok) {
        setStatus("success");
        setValues(initialValues);
        return;
      }

      if (response.status === 429) {
        setErrorKind("rate_limited");
      } else if (result?.error === "not_configured") {
        setErrorKind("not_configured");
      } else {
        setErrorKind("generic");
      }
      setStatus("error");
    } catch {
      setErrorKind("generic");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-accent/40 bg-accent-soft p-8"
      >
        <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Message sent</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. Your message has been sent successfully — I&apos;ll get back to
          you soon.
        </p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-danger/40 bg-danger-soft px-4 py-3 text-sm text-foreground"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          <span>
            {errorKind === "rate_limited" && (
              <>Too many messages sent recently. Please wait a moment and try again.</>
            )}
            {errorKind === "not_configured" && (
              <>
                The contact form is temporarily unavailable.
                {emailMethod && (
                  <>
                    {" "}
                    Please email me directly at{" "}
                    <a
                      href={emailMethod.href}
                      className="font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      {emailMethod.value}
                    </a>
                    .
                  </>
                )}
              </>
            )}
            {errorKind === "generic" && (
              <>
                Something went wrong while sending your message. Please try again later.
                {emailMethod && (
                  <>
                    {" "}
                    You can also email me directly at{" "}
                    <a
                      href={emailMethod.href}
                      className="font-medium text-accent transition-colors hover:text-accent-hover"
                    >
                      {emailMethod.value}
                    </a>
                    .
                  </>
                )}
              </>
            )}
          </span>
        </div>
      )}

      <FieldWrapper label="Name" htmlFor="contact-name" error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
          required
          disabled={submitting}
          value={values.name}
          onChange={handleChange}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClasses(Boolean(errors.name))}
        />
      </FieldWrapper>

      <FieldWrapper label="Email" htmlFor="contact-email" error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email}
          required
          disabled={submitting}
          value={values.email}
          onChange={handleChange}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClasses(Boolean(errors.email))}
        />
      </FieldWrapper>

      <FieldWrapper label="Subject" htmlFor="contact-subject" error={errors.subject}>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          maxLength={CONTACT_LIMITS.subject}
          required
          disabled={submitting}
          value={values.subject}
          onChange={handleChange}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={fieldClasses(Boolean(errors.subject))}
        />
      </FieldWrapper>

      <FieldWrapper label="Message" htmlFor="contact-message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={CONTACT_LIMITS.message}
          required
          disabled={submitting}
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClasses(Boolean(errors.message)), "min-h-32 resize-y")}
        />
      </FieldWrapper>

      {/*
        Honeypot — invisible to sighted and screen-reader users alike
        (aria-hidden removes it from the accessibility tree, tabIndex={-1}
        keeps it out of tab order). Real visitors never populate it; bots
        that auto-fill every field do, and the server rejects the request.
      */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" variant="primary" disabled={submitting} className="w-full sm:w-fit">
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
