"use server";

import { sql } from "@/lib/db";

/**
 * Log an anonymous interest event.
 * Stores only event_type, page, and locale — no IP, no user identifier.
 */
export async function logInterestEvent(
  eventType: string,
  page: string,
  locale: string
): Promise<void> {
  try {
    await sql`
      INSERT INTO interest_events (event_type, page, locale)
      VALUES (${eventType}, ${page}, ${locale})
    `;
  } catch (err) {
    // Never throw — interest logging must never break the user flow
    console.error("logInterestEvent failed:", err);
  }
}
