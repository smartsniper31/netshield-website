import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://netshield.io";

/**
 * Build fully-populated Metadata for the homepage.
 * Reuse for inner pages by overriding title/description.
 */
export function buildHomeMetadata(locale: Locale, dict: Dictionary): Metadata {
  const title = dict.meta.home_title;
  const description = dict.meta.home_description;
  const ogLocale = dict.meta.og_locale;
  const siteName = dict.meta.site_name;
  const ogImageUrl = `${BASE_URL}/og-image.png`;
  const canonicalUrl = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/en`,
        fr: `${BASE_URL}/fr`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "en" ? "fr_FR" : "en_US",
      url: canonicalUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Generic page metadata builder for non-home pages.
 * Pass a custom title suffix (e.g. "Pricing") and description.
 */
export function buildPageMetadata(
  locale: Locale,
  dict: Dictionary,
  pageTitleSuffix: string,
  description: string
): Metadata {
  const siteName = dict.meta.site_name;
  const title = `${pageTitleSuffix} — ${siteName}`;
  const ogLocale = dict.meta.og_locale;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://netshield.io"}/${locale}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: ogLocale,
      title,
      description,
      siteName,
      url: canonicalUrl,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteName }],
    },
  };
}
