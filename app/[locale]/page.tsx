import { notFound } from "next/navigation";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-24 text-center">
      {/* Locale badge — proof of routing */}
      <span className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono text-accent uppercase tracking-widest">
        {locale === "en" ? "English" : "Français"}
      </span>

      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {dict.home.headline}
      </h1>

      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        {dict.home.subheadline}
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href={`/${locale}/docs`}>{dict.home.cta_primary}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={`/${locale}/docs`}>{dict.home.cta_secondary}</Link>
        </Button>
      </div>

      {/* Debug block — visible proof of i18n mechanism */}
      <div className="mt-16 rounded-lg border border-border bg-card p-6 text-left font-mono text-sm max-w-sm w-full">
        <p className="text-muted-foreground text-xs mb-3 uppercase tracking-widest">i18n debug</p>
        <p><span className="text-accent">locale</span>: <span className="text-foreground">{locale}</span></p>
        <p><span className="text-accent">title</span>: <span className="text-foreground">{dict.home.title}</span></p>
        <p><span className="text-accent">cta</span>: <span className="text-foreground">{dict.home.cta_primary}</span></p>
      </div>
    </section>
  );
}
