import { Resend } from "resend";

/**
 * Send a notification email to the site owner when a contact form
 * message is submitted.
 *
 * SECURITY: OWNER_NOTIFICATION_EMAIL must NEVER be imported or used
 * in any client component — this module must remain server-only.
 */

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactNotificationParams {
  name: string;
  email: string;
  message: string;
  locale: string;
}

export async function sendContactNotification({
  name,
  email,
  message,
  locale,
}: ContactNotificationParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

  if (!ownerEmail) {
    console.error("OWNER_NOTIFICATION_EMAIL is not set");
    return { success: false, error: "Notification email not configured" };
  }

  const subject =
    locale === "fr"
      ? `[NetShield] Nouveau message de ${name}`
      : `[NetShield] New message from ${name}`;

  const htmlBody = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #22d3ee;">New contact message — NetShield</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555; width: 100px;">Name</td>
          <td style="padding: 8px 0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #555;">Locale</td>
          <td style="padding: 8px 0;">${escapeHtml(locale)}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <h3 style="color: #333;">Message</h3>
      <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: "NetShield Contact <onboarding@resend.dev>",
      to: ownerEmail,
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true, id: result.data?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Resend send failed:", msg);
    return { success: false, error: msg };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
