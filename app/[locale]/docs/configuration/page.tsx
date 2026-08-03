import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
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
    dict.docs.configuration.meta_title,
    dict.docs.configuration.meta_description
  );
}

interface ConfigField {
  key: string;
  required: boolean;
  default: string | null;
  desc: string;
}

function FieldTable({
  fields,
  requiredLabel,
  optionalLabel,
  defaultLabel,
}: {
  fields: ConfigField[];
  requiredLabel: string;
  optionalLabel: string;
  defaultLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-2.5 text-left font-medium text-foreground">Key</th>
            <th className="px-4 py-2.5 text-left font-medium text-foreground">Type</th>
            <th className="hidden px-4 py-2.5 text-left font-medium text-foreground sm:table-cell">{defaultLabel}</th>
            <th className="hidden px-4 py-2.5 text-left font-medium text-foreground md:table-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.key} className="border-b border-border last:border-0">
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-xs text-accent">{field.key}</code>
              </td>
              <td className="whitespace-nowrap px-4 py-3 align-top">
                <span
                  className={`inline-block rounded px-2 py-0.5 font-mono text-xs ${
                    field.required
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {field.required ? requiredLabel : optionalLabel}
                </span>
              </td>
              <td className="hidden px-4 py-3 align-top font-mono text-xs text-muted-foreground sm:table-cell">
                {field.default ?? "—"}
              </td>
              <td className="hidden px-4 py-3 align-top text-sm text-muted-foreground md:table-cell">
                {field.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ConfigurationPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const c = dict.docs.configuration;
  const docsBase = `/${locale}/docs`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <DocBreadcrumb
        crumbs={[
          { label: dict.docs.meta_title, href: docsBase },
          { label: c.meta_title },
        ]}
      />

      <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {c.headline}
      </h1>
      <p className="mb-10 text-lg text-muted-foreground">{c.subheadline}</p>

      {/* secret_key warning — repeated from install pages for completeness */}
      <div
        role="alert"
        className="mb-10 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4"
      >
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-foreground">{c.secret_key_warning}</p>
      </div>

      {/* Agent config */}
      <section aria-labelledby="agent-config" className="mb-12">
        <h2 id="agent-config" className="mb-4 text-xl font-semibold text-foreground">
          {c.agent_title}
        </h2>
        <FieldTable
          fields={c.agent_fields as ConfigField[]}
          requiredLabel={c.required_label}
          optionalLabel={c.optional_label}
          defaultLabel={c.default_label}
        />
      </section>

      {/* Server config */}
      <section aria-labelledby="server-config" className="mb-12">
        <h2 id="server-config" className="mb-4 text-xl font-semibold text-foreground">
          {c.server_title}
        </h2>
        <FieldTable
          fields={c.server_fields as ConfigField[]}
          requiredLabel={c.required_label}
          optionalLabel={c.optional_label}
          defaultLabel={c.default_label}
        />
      </section>

      <Link href={docsBase} className="text-sm text-accent hover:text-accent/80">
        ← {dict.docs.meta_title}
      </Link>
    </div>
  );
}
