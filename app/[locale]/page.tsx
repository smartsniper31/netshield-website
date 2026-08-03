import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Zap, Eye, ArrowRight, ChevronRight } from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Map icon string keys from JSON to actual Lucide components
const ICONS = {
  ShieldCheck,
  Zap,
  Eye,
} as const;
type IconKey = keyof typeof ICONS;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);
  const h = dict.home;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-28"
      >
        {/* subtle radial glow behind headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="h-[600px] w-[900px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-accent">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {h.hero_badge}
          </span>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {h.headline}
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {h.subheadline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/pricing`}>
                {h.cta_primary}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/docs`}>{h.cta_secondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="benefits-heading"
        className="px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="benefits-heading"
            className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {h.benefits_title}
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {h.benefits.map((benefit) => {
              const Icon = ICONS[benefit.icon as IconKey] ?? ShieldCheck;
              return (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="how-heading"
        className="border-y border-border bg-card/50 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="how-heading"
            className="mb-14 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {h.how_title}
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {h.how_steps.map((step, idx) => (
              <div key={step.number} className="relative flex flex-col gap-4">
                {/* connector line between steps (hidden on last) */}
                {idx < h.how_steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[calc(100%+0.5rem)] top-4 hidden h-px w-[calc(100%-1rem)] bg-border sm:block"
                  />
                )}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-accent/30">
                    {step.number}
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent/40" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="px-4 py-24 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {h.cta_section_title}
          </h2>
          <p className="mb-8 text-muted-foreground">{h.cta_section_body}</p>
          <Button asChild size="lg" className="gap-2">
            <Link href={`/${locale}/pricing`}>
              {h.cta_primary}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
