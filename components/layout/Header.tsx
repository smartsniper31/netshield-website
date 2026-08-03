import Link from "next/link";
import { Shield } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors"
          aria-label="NetShield home"
        >
          <Shield className="h-5 w-5 text-accent" aria-hidden="true" />
          <span className="text-lg tracking-tight">NetShield</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground" aria-label="Main navigation">
          <Link href={`/${locale}/features`} className="hover:text-foreground transition-colors">
            {dict.nav.features}
          </Link>
          <Link href={`/${locale}/how-it-works`} className="hover:text-foreground transition-colors">
            {dict.nav.how_it_works}
          </Link>
          <Link href={`/${locale}/trust`} className="hover:text-foreground transition-colors">
            {dict.nav.trust}
          </Link>
          <Link href={`/${locale}/pricing`} className="hover:text-foreground transition-colors">
            {dict.nav.pricing}
          </Link>
          <Link href={`/${locale}/docs`} className="hover:text-foreground transition-colors">
            {dict.nav.docs}
          </Link>
          <Link href={`/${locale}/support`} className="hover:text-foreground transition-colors">
            {dict.nav.support}
          </Link>
        </nav>

        {/* Language switcher */}
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
