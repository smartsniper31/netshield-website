"use server";

import { sql } from "@/lib/db";

export interface NewsletterState {
  status: "idle" | "success" | "error";
  errorKey?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  // --- Honeypot ---
  const honeypot = formData.get("_gotcha") as string;
  if (honeypot && honeypot.trim().length > 0) {
    return { status: "success" }; // silent reject
  }

  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const consent = formData.get("consent") === "on";
  const locale  = (formData.get("locale")  as string | null)?.trim() ?? "en";

  // --- Validation ---
  if (!email || !isValidEmail(email)) {
    return { status: "error", errorKey: "error_email_invalid" };
  }
  if (!consent) {
    return { status: "error", errorKey: "error_consent_required" };
  }

  try {
    // Check uniqueness before inserting
    const existing = await sql`
      SELECT id FROM newsletter_subscribers WHERE email = ${email} LIMIT 1
    `;
    if (existing.length > 0) {
      return { status: "error", errorKey: "error_already_subscribed" };
    }

    await sql`
      INSERT INTO newsletter_subscribers (email, locale, consent_given)
      VALUES (${email}, ${locale}, true)
    `;

    return { status: "success" };
  } catch (err) {
    console.error("subscribeNewsletter error:", err);
    return { status: "error", errorKey: "error_server" };
  }
}
