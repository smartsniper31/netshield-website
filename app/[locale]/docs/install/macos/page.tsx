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
  return buildPageMetadata(locale as Locale, dict, dict.docs.macos.meta_title, dict.docs.macos.meta_description);
}

export default async function MacosInstallPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return (
    <DocAgentPage
      locale={locale as Locale}
      dict={dict}
      agentData={{
        headline: dict.docs.macos.headline,
        prereqs: dict.docs.macos.prereqs,
        run_title: dict.docs.macos.run_title,
        run_options: dict.docs.macos.run_options,
      }}
      os="macos"
    />
  );
}
