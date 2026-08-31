/**
 * Builds the transactional email sent to Hussain when someone submits the
 * portfolio contact form. Plain string templates rather than React Email —
 * one simple, single-purpose email doesn't justify an extra dependency.
 * Every field is user-submitted input, so it's HTML-escaped before being
 * interpolated; nothing here is ever passed through
 * `dangerouslySetInnerHTML` or otherwise trusted as markup.
 */

export type ContactMessageEmailData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes for HTML, then turns newlines from the message textarea into <br>. */
function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

export function renderContactMessageEmail(data: ContactMessageEmailData): {
  html: string;
  text: string;
} {
  const { name, email, subject, message } = data;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Portfolio Message</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 0;">
      <tr>
        <td align="center" style="padding:0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;border:1px solid #e4e4e7;">
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 24px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">
                  New Portfolio Message
                </p>

                <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                  From
                </p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.5;color:#18181b;">
                  ${escapeHtml(name)}<br />
                  <span style="color:#52525b;">${escapeHtml(email)}</span>
                </p>

                <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                  Subject
                </p>
                <p style="margin:0 0 16px;font-size:16px;color:#18181b;">
                  ${escapeHtml(subject)}
                </p>

                <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">
                  Message
                </p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#27272a;">
                  ${escapeHtmlMultiline(message)}
                </p>

                <hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 16px;" />
                <p style="margin:0;font-size:12px;line-height:1.5;color:#a1a1aa;">
                  Sent from the Hussain Alsous portfolio contact form. Reply to this email to
                  respond directly to ${escapeHtml(name)}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New Portfolio Message",
    "",
    "From",
    `${name}`,
    email,
    "",
    "Subject",
    subject,
    "",
    "Message",
    message,
    "",
    "---",
    "Sent from Hussain Alsous Portfolio",
  ].join("\n");

  return { html, text };
}
