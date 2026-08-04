"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, ChevronRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on outside click
  const handleBackdropClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const navLinks = [
    { href: `/${locale}/features`,     label: dict.nav.features },
    { href: `/${locale}/how-it-works`, label: dict.nav.how_it_works },
    { href: `/${locale}/trust`,        label: dict.nav.trust },
    { href: `/${locale}/pricing`,      label: dict.nav.pricing },
    { href: `/${locale}/docs`,         label: dict.nav.docs },
    { href: `/${locale}/support`,      label: dict.nav.support },
  ];

  return (
    <>
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

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm text-muted-foreground"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: language switcher + hamburger */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />

            {/* Hamburger — mobile only */}
            <button
              ref={toggleRef}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen
                ? <X className="h-5 w-5" aria-hidden="true" />
                : <Menu className="h-5 w-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />
      )}

      {/* Drawer panel */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={[
          "fixed inset-x-0 top-16 z-50 md:hidden",
          "border-b border-border bg-background shadow-xl",
          "transition-all duration-200 ease-in-out",
          mobileOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "flex items-center justify-between px-5 py-3.5",
                  "text-sm font-medium border-b border-border last:border-0",
                  "transition-colors",
                  isActive
                    ? "text-accent bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 shrink-0 opacity-40" aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
