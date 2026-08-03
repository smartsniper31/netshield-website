import type { Metadata } from "next";
import Link from "next/link";
import {
  Network,
  ScanSearch,
  LayoutDashboard,
  Layers,
  ChevronRight,
} from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return buildPageMetadata(
    locale as Locale,
    dict,
    dict.features.meta_title,
    dict.features.meta_description
  );
}

const ICONS = {
  Network,
  ScanSearch,
  LayoutDashboard,
  Layers,
} as const;
type FeatureIconKey = keyof typeof ICONS;

export default async function FeaturesPage({ params }: FeaturesPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const f = dict.features;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="features-heading"
        className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="h-[500px] w-[800px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <h1
            id="features-heading"
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            {f.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {f.subheadline}
          </p>
        </div>
      </section>

      {/* ── FEATURE CARDS ────────────────────────────────────────────────── */}
      <section
        aria-label="Feature details"
        className="px-4 pb-20 sm:px-6"
      >
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {f.cards.map((card) => {
            const Icon = ICONS[card.icon as FeatureIconKey] ?? Network;
            return (
              <Card
                key={card.title}
                className="flex flex-col transition-colors hover:border-accent/40"
              >
                <CardHeader className="pb-3">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  {"platform" in card && card.platform && (
                    <span className="mt-auto inline-block rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      {card.platform}
                    </span>
                  )}
                  {"detail" in card && card.detail && (
                    <p className="mt-auto border-t border-border pt-3 text-xs text-muted-foreground">
                      {card.detail}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="features-cta-heading"
        className="border-t border-border bg-card/50 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="features-cta-heading"
            className="mb-3 text-2xl font-bold tracking-tight text-foreground"
          >
            {f.cta_title}
          </h2>
          <p className="mb-8 text-muted-foreground">{f.cta_body}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/how-it-works`}>
                {f.cta_how}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/pricing`}>{f.cta_pricing}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
