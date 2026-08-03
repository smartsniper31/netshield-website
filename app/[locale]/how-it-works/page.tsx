import type { Metadata } from "next";
import Link from "next/link";
import {
  KeyRound,
  Download,
  Wifi,
  ShieldAlert,
  Monitor,
  Server,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

interface HowItWorksPageProps {
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
    dict.how_it_works.meta_title,
    dict.how_it_works.meta_description
  );
}

const STEP_ICONS = {
  KeyRound,
  Download,
  Wifi,
  ShieldAlert,
} as const;

const ARCH_ICONS = {
  Monitor,
  Server,
  LayoutDashboard,
} as const;

type StepIconKey = keyof typeof STEP_ICONS;
type ArchIconKey = keyof typeof ARCH_ICONS;

export default async function HowItWorksPage({ params }: HowItWorksPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const h = dict.how_it_works;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hiw-heading"
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
            id="hiw-heading"
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            {h.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {h.subheadline}
          </p>
        </div>
      </section>

      {/* ── STEPS ────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="steps-heading"
        className="px-4 pb-20 sm:px-6"
      >
        <div className="mx-auto max-w-3xl">
          <ol className="relative border-l border-border" aria-label="Steps">
            {h.steps.map((step, idx) => {
              const Icon = STEP_ICONS[step.icon as StepIconKey] ?? KeyRound;
              return (
                <li key={step.number} className="mb-10 ml-8 last:mb-0">
                  {/* circle marker */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card"
                  >
                    <Icon className="h-4 w-4 text-accent" />
                  </span>

                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent/60">
                      {step.number}
                    </span>
                    <h2 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h2>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {/* connector hint between steps */}
                  {idx < h.steps.length - 1 && (
                    <div aria-hidden="true" className="mt-6 h-px w-px" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="arch-heading"
        className="border-y border-border bg-card/50 px-4 py-16 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="arch-heading"
            className="mb-10 text-center text-2xl font-bold tracking-tight text-foreground"
          >
            {h.arch_title}
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {h.arch_items.map((item, idx) => {
              const Icon = ARCH_ICONS[item.icon as ArchIconKey] ?? Monitor;
              const isMiddle = idx === 1;
              return (
                <div
                  key={item.label}
                  className="relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center"
                >
                  {/* arrow connector (hidden on last) */}
                  {idx < h.arch_items.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent/40 sm:block"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hiw-cta-heading"
        className="px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="hiw-cta-heading"
            className="mb-8 text-2xl font-bold tracking-tight text-foreground"
          >
            {h.cta_title}
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href={`/${locale}/pricing`}>
                {h.cta_pricing}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/features`}>{h.cta_features}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
