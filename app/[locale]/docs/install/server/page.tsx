import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { DocBreadcrumb } from "@/components/docs/DocBreadcrumb";

interface ServerPageProps {
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
  return buildPageMetadata(locale as Locale, dict, dict.docs.server.meta_title, dict.docs.server.meta_description);
}

export default async function ServerInstallPage({ params }: ServerPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const s = dict.docs.server;
  const docsBase = `/${locale}/docs`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <DocBreadcrumb
        crumbs={[
          { label: dict.docs.meta_title, href: docsBase },
          { label: s.meta_title },
        ]}
      />

      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {s.headline}
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">{s.subheadline}</p>

      {/* Prerequisites */}
      <section aria-labelledby="server-prereqs" className="mb-10">
        <h2 id="server-prereqs" className="mb-3 text-lg font-semibold text-foreground">
          {s.prereqs_title}
        </h2>
        <ul className="space-y-2">
          {s.prereqs.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section aria-labelledby="server-steps" className="mb-12">
        <h2 id="server-steps" className="sr-only">Installation steps</h2>
        <ol className="relative border-l border-border">
          {s.steps.map((step) => (
            <li key={step.number} className="mb-8 ml-8 last:mb-0">
              {/* Step number marker */}
              <span
                aria-hidden="true"
                className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card font-mono text-xs font-bold text-accent"
              >
                {step.number}
              </span>

              <h3 className="mb-1 font-semibold text-foreground">{step.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>

              {/* Admin password warning (step 05) */}
              {step.number === "05" && (
                <div
                  role="alert"
                  className="mb-3 flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <p className="text-sm text-foreground">{step.body}</p>
                </div>
              )}

              {step.code && (
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-accent">
                  {step.code}
                </pre>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Next step */}
      <section aria-labelledby="server-next" className="rounded-xl border border-border bg-card p-6">
        <h2 id="server-next" className="mb-2 font-semibold text-foreground">
          {s.next_title}
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">{s.next_body}</p>
        <div className="flex flex-wrap gap-3">
          {s.next_links.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}/${link.href}`}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground hover:border-accent/40 hover:text-accent transition-colors"
            >
              {link.label}
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* Back */}
      <div className="mt-8">
        <Link href={docsBase} className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80">
          ← {dict.docs.meta_title}
        </Link>
      </div>
    </div>
  );
}
