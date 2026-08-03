import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, HelpCircle, Wrench } from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { DocBreadcrumb } from "@/components/docs/DocBreadcrumb";

interface PageProps {
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
    dict.docs.troubleshooting.meta_title,
    dict.docs.troubleshooting.meta_description
  );
}

export default async function TroubleshootingPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const t = dict.docs.troubleshooting;
  const docsBase = `/${locale}/docs`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <DocBreadcrumb
        crumbs={[
          { label: dict.docs.meta_title, href: docsBase },
          { label: t.meta_title },
        ]}
      />

      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t.headline}
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">{t.subheadline}</p>

      <div className="space-y-6">
        {t.issues.map((issue, idx) => (
          <section
            key={idx}
            aria-labelledby={`issue-${idx}`}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Symptom */}
            <div className="flex items-start gap-3 border-b border-border bg-muted/30 px-5 py-4">
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.symptom_label}
                </p>
                <p id={`issue-${idx}`} className="font-medium text-foreground">
                  {issue.symptom}
                </p>
              </div>
            </div>

            {/* Cause */}
            <div className="flex items-start gap-3 border-b border-border px-5 py-4">
              <HelpCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.cause_label}
                </p>
                <p className="text-sm text-muted-foreground">{issue.cause}</p>
              </div>
            </div>

            {/* Solution */}
            <div className="flex items-start gap-3 px-5 py-4">
              <Wrench
                className="mt-0.5 h-4 w-4 shrink-0 text-accent/70"
                aria-hidden="true"
              />
              <div>
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t.solution_label}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {issue.solution}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10">
        <Link href={docsBase} className="text-sm text-accent hover:text-accent/80">
          ← {dict.docs.meta_title}
        </Link>
      </div>
    </div>
  );
}
