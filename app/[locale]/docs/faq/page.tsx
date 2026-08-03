import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { DocBreadcrumb } from "@/components/docs/DocBreadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    dict.docs.faq.meta_title,
    dict.docs.faq.meta_description
  );
}

// Index of the SmartScreen question (0-based) — links to /trust
const SMARTSCREEN_INDEX = 4;

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const f = dict.docs.faq;
  const docsBase = `/${locale}/docs`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <DocBreadcrumb
        crumbs={[
          { label: dict.docs.meta_title, href: docsBase },
          { label: f.meta_title },
        ]}
      />

      <h1 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {f.headline}
      </h1>

      <Accordion type="single" collapsible className="w-full">
        {f.items.map((item, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-left text-sm font-medium text-foreground">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
              {/* SmartScreen question: add link to /trust */}
              {idx === SMARTSCREEN_INDEX && (
                <>
                  {" "}
                  <Link
                    href={`/${locale}/trust`}
                    className="text-accent underline underline-offset-2 hover:text-accent/80"
                  >
                    {f.trust_link_label}
                  </Link>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10">
        <Link href={docsBase} className="text-sm text-accent hover:text-accent/80">
          ← {dict.docs.meta_title}
        </Link>
      </div>
    </div>
  );
}
