import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ScanLine,
  Lock,
  Globe,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

interface TrustPageProps {
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
    dict.trust.meta_title,
    dict.trust.meta_description
  );
}

const SECTION_ICONS = {
  AlertTriangle,
  ScanLine,
  Lock,
  Globe,
} as const;
type SectionIconKey = keyof typeof SECTION_ICONS;

export default async function TrustPage({ params }: TrustPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const t = dict.trust;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="trust-heading"
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
            id="trust-heading"
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            {t.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.subheadline}
          </p>
        </div>
      </section>

      {/* ── SECTIONS ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl space-y-10 px-4 pb-20 sm:px-6">
        {t.sections.map((section) => {
          const Icon = SECTION_ICONS[section.icon as SectionIconKey] ?? AlertTriangle;
          const isVT = "vt_result" in section;
          const isWindows = "steps" in section;
          const hasNote = "note" in section;

          return (
            <section
              key={section.title}
              aria-labelledby={`trust-section-${section.icon}`}
              className="rounded-xl border border-border bg-card p-6 sm:p-8"
            >
              {/* Section header */}
              <div className="mb-5 flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h2
                  id={`trust-section-${section.icon}`}
                  className="text-lg font-semibold leading-snug text-foreground"
                >
                  {section.title}
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>

              {/* Windows SmartScreen steps */}
              {isWindows && "steps_label" in section && (
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-foreground">
                    {section.steps_label}
                  </p>
                  <ol className="space-y-2">
                    {(section.steps as string[]).map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-bold text-accent">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* VirusTotal results */}
              {isVT && "vt_result" in section && (
                <div className="mt-5 space-y-4">
                  {/* Summary badge */}
                  <div className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-sm font-semibold text-accent">
                    <ScanLine className="h-4 w-4" aria-hidden="true" />
                    {section.vt_result as string}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {section.vt_detail as string}
                  </p>

                  {/* Engine table */}
                  <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-4 py-2 text-left font-medium text-foreground">
                            Engine
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-foreground">
                            Flag
                          </th>
                          <th className="hidden px-4 py-2 text-left font-medium text-foreground sm:table-cell">
                            Nature
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(section.vt_engines as Array<{ engine: string; flag: string; note: string }>).map(
                          (row) => (
                            <tr key={row.engine} className="border-b border-border last:border-0">
                              <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                                {row.engine}
                              </td>
                              <td className="px-4 py-3 font-mono text-xs text-accent">
                                {row.flag}
                              </td>
                              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                                {row.note}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Negative engines */}
                  <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-muted-foreground">
                      {section.vt_negative as string}
                    </p>
                  </div>

                  <p className="text-xs italic text-muted-foreground">
                    {section.vt_context as string}
                  </p>
                </div>
              )}

              {/* Roadmap / deployment note */}
              {hasNote && "note" in section && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <ChevronRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent/60"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-muted-foreground">
                    {section.note as string}
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="trust-cta-heading"
        className="border-t border-border bg-card/50 px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="trust-cta-heading"
            className="mb-3 text-2xl font-bold tracking-tight text-foreground"
          >
            {t.cta_title}
          </h2>
          <p className="mb-8 text-muted-foreground">{t.cta_body}</p>
          <Button asChild size="lg" className="gap-2">
            <Link href={`/${locale}/support`}>
              {t.cta_support}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
