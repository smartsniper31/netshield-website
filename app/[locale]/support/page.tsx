import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, FileText, ChevronRight } from "lucide-react";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

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
  const isEn = locale === "en";
  return buildPageMetadata(
    locale as Locale,
    dict,
    isEn ? "Support" : "Assistance",
    isEn
      ? "Get help with NetShield — contact the team or browse the documentation."
      : "Obtenez de l'aide avec NetShield — contactez l'équipe ou consultez la documentation."
  );
}

export default async function SupportPage({ params }: PageProps) {
  const { locale } = await params;
  const isEn = locale === "en";

  const headline   = isEn ? "How can we help?" : "Comment pouvons-nous vous aider ?";
  const subheadline = isEn
    ? "Browse the documentation for self-service answers, or send us a message directly."
    : "Consultez la documentation pour des réponses rapides, ou envoyez-nous un message directement.";

  const contactLabel = isEn ? "Contact us" : "Nous contacter";
  const contactDesc  = isEn
    ? "Send a message to the NetShield team. We reply as fast as we can."
    : "Envoyez un message à l'équipe NetShield. Nous répondons aussi vite que possible.";

  const docsLabel = isEn ? "Browse documentation" : "Consulter la documentation";
  const docsDesc  = isEn
    ? "Installation guides, configuration reference, FAQ, and troubleshooting."
    : "Guides d'installation, référence de configuration, FAQ et dépannage.";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {headline}
      </h1>
      <p className="mb-12 text-lg text-muted-foreground">{subheadline}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Contact card */}
        <Link
          href={`/${locale}/support/contact`}
          className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
            <MessageSquare className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
              {contactLabel}
            </span>
            <span className="text-sm text-muted-foreground">{contactDesc}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors self-end" aria-hidden="true" />
        </Link>

        {/* Docs card */}
        <Link
          href={`/${locale}/docs`}
          className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
            <FileText className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
              {docsLabel}
            </span>
            <span className="text-sm text-muted-foreground">{docsDesc}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors self-end" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
