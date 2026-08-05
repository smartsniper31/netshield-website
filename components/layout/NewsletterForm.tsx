"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/lib/newsletter";
import { Button } from "@/components/ui/button";
import type { Locale, Dictionary } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const initialState: NewsletterState = { status: "idle" };

export function NewsletterForm({ locale, dict }: Props) {
  const n = dict.newsletter;
  const [state, formAction, isPending] = useActionState(subscribeNewsletter, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground">{n.success_title}</p>
          <p className="text-xs text-muted-foreground">{n.success_body}</p>
        </div>
      </div>
    );
  }

  const errorMessage =
    state.status === "error" && state.errorKey
      ? (n as unknown as Record<string, string>)[state.errorKey] ?? n.error_server
      : null;

  return (
    <form action={formAction} noValidate className="space-y-3">
      {/* Locale */}
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Error */}
      {errorMessage && (
        <div role="alert" aria-live="assertive" className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-xs text-foreground">{errorMessage}</p>
        </div>
      )}

      {/* Email + Submit */}
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={n.placeholder}
          disabled={isPending}
          aria-label={locale === "fr" ? "Adresse email" : "Email address"}
          className="min-w-0 flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
        <Button type="submit" size="sm" disabled={isPending} className="shrink-0 gap-1.5">
          {isPending
            ? <><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />{n.submitting_label}</>
            : n.submit_label
          }
        </Button>
      </div>

      {/* Consent checkbox — NOT pre-checked */}
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          name="consent"
          disabled={isPending}
          defaultChecked={false}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent"
          aria-required="true"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">
          {n.consent_label}
        </span>
      </label>
    </form>
  );
}
