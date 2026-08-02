"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  /**
   * Replace the current locale segment with another locale.
   * e.g. /en/features → /fr/features
   */
  function buildHref(targetLocale: Locale): string {
    if (!pathname) return `/${targetLocale}`;
    // pathname starts with /en or /fr
    return pathname.replace(/^\/(en|fr)/, `/${targetLocale}`);
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="Language selector"
    >
      {(["en", "fr"] as Locale[]).map((locale) => (
        <Link
          key={locale}
          href={buildHref(locale)}
          aria-current={locale === currentLocale ? "true" : undefined}
          className={cn(
            "px-2 py-1 rounded-md uppercase tracking-wide transition-colors",
            locale === currentLocale
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
