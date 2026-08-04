"use client";

import { useActionState, useRef } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContact, type ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";
import type { Locale, Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const initialState: ContactFormState = { status: "idle" };

export function ContactForm({ locale, dict }: Props) {
  const c = dict.contact;
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Success state
  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-xl border border-accent/30 bg-accent/10 p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-foreground">{c.success_title}</h2>
        <p className="text-sm text-muted-foreground">{c.success_body}</p>
      </div>
    );
  }

  const errorMessage = state.status === "error" && state.errorKey
    ? (c as Record<string, string>)[state.errorKey] ?? c.error_server
    : null;

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-6">
      {/* Locale hidden field */}
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — hidden from humans, filled only by bots */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Global error banner */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-sm text-foreground">{errorMessage}</p>
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
          {c.name_label}
          <span className="ml-1 text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={c.name_placeholder}
          disabled={isPending}
          className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          {c.email_label}
          <span className="ml-1 text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={c.email_placeholder}
          disabled={isPending}
          className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
          {c.message_label}
          <span className="ml-1 text-accent" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder={c.message_placeholder}
          disabled={isPending}
          className="w-full resize-y rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
        <p className="text-xs text-muted-foreground" aria-hidden="true">
          10–2000 {locale === "fr" ? "caractères" : "characters"}
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={isPending}
        aria-disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {c.sending_label}
          </>
        ) : (
          c.submit_label
        )}
      </Button>
    </form>
  );
}
