"use client";

import Link from "next/link";
import { useCallback } from "react";
import { logInterestEvent } from "@/lib/interest";
import type { Locale } from "@/lib/i18n";

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  eventType: string;
  page: string;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
}

/**
 * A Next.js Link that fires an anonymous interest event on click.
 * Logging errors are swallowed — they never block navigation.
 */
export function TrackedLink({
  eventType,
  page,
  locale,
  children,
  className,
  ...linkProps
}: TrackedLinkProps) {
  const handleClick = useCallback(() => {
    // Fire-and-forget — do not await
    logInterestEvent(eventType, page, locale).catch(() => {});
  }, [eventType, page, locale]);

  return (
    <Link {...linkProps} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
