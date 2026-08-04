import { neon } from "@neondatabase/serverless";

/**
 * Neon serverless Postgres client.
 * POSTGRES_URL is injected by Vercel Postgres integration.
 * In local dev, it comes from .env.local.
 */
const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL environment variable is not set.");
}

export const sql = neon(connectionString);
