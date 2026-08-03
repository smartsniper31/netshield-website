import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { DocAgentPage } from "@/components/docs/DocAgentPage";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return buildPageMetadata(locale as Locale, dict, dict.docs.linux.meta_title, dict.docs.linux.meta_description);
}

export default async function LinuxInstallPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return (
    <DocAgentPage
      locale={locale as Locale}
      dict={dict}
      agentData={{
        headline: dict.docs.linux.headline,
        prereqs: dict.docs.linux.prereqs,
        run_title: dict.docs.linux.run_title,
        run_options: dict.docs.linux.run_options,
      }}
      os="linux"
    />
  );
}
