import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { ContactForm } from "./ContactForm";

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
    dict.contact.meta_title,
    dict.contact.meta_description
  );
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {dict.contact.headline}
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">
        {dict.contact.subheadline}
      </p>
      <ContactForm locale={locale as Locale} dict={dict} />
    </div>
  );
}
