import { Shield } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      {/* Newsletter section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
            <div>
              <h2 className="mb-1 text-base font-semibold text-foreground">
                {dict.newsletter.title}
              </h2>
              <p className="text-sm text-muted-foreground">{dict.newsletter.body}</p>
            </div>
            <div>
              <NewsletterForm locale={locale} dict={dict} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>{dict.footer.tagline}</span>
        </div>
        <p>{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
