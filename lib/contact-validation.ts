/**
 * Contact form validation — shared between the client (ContactForm.tsx, for
 * immediate feedback) and the server (app/api/contact/route.ts, which never
 * trusts the client and re-validates every submission). Keeping one copy of
 * the rules avoids the two drifting out of sync.
 */

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
  messageMin: 10,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormData): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > CONTACT_LIMITS.name) {
    errors.name = "Name is too long.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email.";
  } else if (email.length > CONTACT_LIMITS.email) {
    errors.email = "Email is too long.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const subject = values.subject.trim();
  if (!subject) {
    errors.subject = "Please enter a subject.";
  } else if (subject.length > CONTACT_LIMITS.subject) {
    errors.subject = "Subject is too long.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = "Please add a little more detail.";
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = "Message is too long.";
  }

  return errors;
}
