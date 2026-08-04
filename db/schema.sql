-- NetShield website — database schema
-- Apply with: node db/apply-schema.js

CREATE TABLE IF NOT EXISTS contact_messages (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    message     TEXT NOT NULL,
    locale      TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id             SERIAL PRIMARY KEY,
    email          TEXT NOT NULL UNIQUE,
    locale         TEXT NOT NULL,
    consent_given  BOOLEAN NOT NULL DEFAULT true,
    subscribed_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS interest_events (
    id          SERIAL PRIMARY KEY,
    event_type  TEXT NOT NULL,
    page        TEXT NOT NULL,
    locale      TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);
