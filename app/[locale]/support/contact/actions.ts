"use server";

import { sql } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  errorKey?: string;   // i18n key for the error message
}

/** Validate email format */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // --- Honeypot check (bot trap) ---
  const honeypot = formData.get("_gotcha") as string;
  if (honeypot && honeypot.trim().length > 0) {
    // Silent reject — no error, no insert, no email
    return { status: "success" };
  }

  // --- Extract fields ---
  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const locale  = (formData.get("locale")  as string | null)?.trim() ?? "en";

  // --- Server-side validation ---
  if (!name) {
    return { status: "error", errorKey: "error_name_required" };
  }
  if (!email || !isValidEmail(email)) {
    return { status: "error", errorKey: "error_email_invalid" };
  }
  if (!message) {
    return { status: "error", errorKey: "error_message_required" };
  }
  if (message.length < 10) {
    return { status: "error", errorKey: "error_message_short" };
  }
  if (message.length > 2000) {
    return { status: "error", errorKey: "error_message_long" };
  }

  try {
    // --- Rate-limit check (same email within 5 minutes) ---
    const recent = await sql`
      SELECT id FROM contact_messages
      WHERE email = ${email}
        AND created_at > now() - interval '5 minutes'
      LIMIT 1
    `;
    if (recent.length > 0) {
      return { status: "error", errorKey: "error_rate_limit" };
    }

    // --- Insert into database ---
    await sql`
      INSERT INTO contact_messages (name, email, message, locale)
      VALUES (${name}, ${email}, ${message}, ${locale})
    `;

    // --- Send notification email (non-blocking — failure doesn't fail the form) ---
    const emailResult = await sendContactNotification({ name, email, message, locale });
    if (!emailResult.success) {
      // Log but don't expose to client — message is already saved in DB
      console.error("Email notification failed:", emailResult.error);
    }

    return { status: "success" };
  } catch (err) {
    console.error("submitContact error:", err);
    return { status: "error", errorKey: "error_server" };
  }
}
