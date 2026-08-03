import type { Metadata } from "next";
import Link from "next/link";
import { Server, Monitor, Terminal, ChevronRight, Clock } from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

interface DocsPageProps {
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
  return buildPageMetadata(locale as Locale, dict, dict.docs.meta_title, dict.docs.meta_description);
}

// Icon per install link index
const INSTALL_ICONS = [Server, Monitor, Terminal, Terminal];

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const d = dict.docs;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Hero */}
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {d.headline}
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-muted-foreground">{d.subheadline}</p>

      {/* Sections */}
      {d.sections.map((section, si) => {
        const isComingSoon = si === 1;
        return (
          <section key={section.title} className="mb-12" aria-labelledby={`docs-section-${si}`}>
            <h2
              id={`docs-section-${si}`}
              className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
            >
              {isComingSoon && (
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {section.title}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {section.links.map((link, li) => {
                const Icon = !isComingSoon ? INSTALL_ICONS[li] ?? ChevronRight : ChevronRight;
                const href = `/${locale}/${link.href}`;

                return (
                  <div
                    key={link.label}
                    className={`group rounded-xl border p-5 transition-colors ${
                      isComingSoon
                        ? "border-border bg-card/50 opacity-60 cursor-default"
                        : "border-border bg-card hover:border-accent/40"
                    }`}
                  >
                    {isComingSoon ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                            {d.coming_soon_badge}
                          </span>
                          <span className="font-medium text-foreground">{link.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                    ) : (
                      <Link href={href} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                              <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                            </div>
                            <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                              {link.label}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" aria-hidden="true" />
                        </div>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
