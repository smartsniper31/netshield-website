import Link from "next/link";
import { CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";
import { DocBreadcrumb } from "./DocBreadcrumb";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

interface RunOption {
  label: string;
  body: string;
  code: string;
}

interface AgentPageData {
  headline: string;
  prereqs: string[];
  run_title: string;
  run_options: RunOption[];
}

interface Props {
  locale: Locale;
  dict: Dictionary;
  agentData: AgentPageData;
  os: "windows" | "linux" | "macos";
}

export function DocAgentPage({ locale, dict, agentData, os }: Props) {
  const common = dict.docs.agent_common;
  const docsBase = `/${locale}/docs`;

  const breadcrumbs = [
    { label: dict.docs.meta_title, href: docsBase },
    { label: agentData.headline },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <DocBreadcrumb crumbs={breadcrumbs} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {agentData.headline}
      </h1>

      {/* Prerequisites */}
      <section aria-labelledby="prereqs-heading" className="mb-10">
        <h2 id="prereqs-heading" className="mb-3 text-lg font-semibold text-foreground">
          {common.prereqs_title}
        </h2>
        <ul className="space-y-2">
          {agentData.prereqs.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Config */}
      <section aria-labelledby="config-heading" className="mb-10">
        <h2 id="config-heading" className="mb-3 text-lg font-semibold text-foreground">
          {common.config_title}
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">{common.config_intro}</p>
        <pre className="mb-6 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-accent">
          {common.config_copy_cmd}
        </pre>

        {/* SECRET KEY WARNING — visually prominent */}
        <div
          role="alert"
          className="mb-6 rounded-xl border border-accent/40 bg-accent/10 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            <p className="font-semibold text-foreground">{common.secret_key_warning_title}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {common.secret_key_warning_body}
          </p>
        </div>

        {/* Required fields table */}
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {common.fields_title}
        </h3>
        <div className="mb-6 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {common.fields.map((field) => (
                <tr key={field.key} className="border-b border-border last:border-0">
                  <td className="w-36 px-4 py-3 align-top">
                    <code className="font-mono text-xs text-accent">{field.key}</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{field.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional fields */}
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {common.optional_fields_title}
        </h3>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {common.optional_fields.map((field) => (
                <tr key={field.key} className="border-b border-border last:border-0">
                  <td className="w-36 px-4 py-3 align-top">
                    <code className="font-mono text-xs text-accent">{field.key}</code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{field.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Run options */}
      <section aria-labelledby="run-heading" className="mb-10">
        <h2 id="run-heading" className="mb-4 text-lg font-semibold text-foreground">
          {agentData.run_title}
        </h2>
        <div className="space-y-4">
          {agentData.run_options.map((opt, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 font-medium text-foreground">{opt.label}</p>
              <p className="mb-3 text-sm text-muted-foreground">{opt.body}</p>
              <pre className="overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 font-mono text-sm text-accent">
                {opt.code}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* SmartScreen note (Windows only) */}
      {os === "windows" && (
        <div className="mb-10 flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            {common.smartscreen_note}{" "}
            <Link
              href={`/${locale}/trust`}
              className="text-accent underline underline-offset-2 hover:text-accent/80"
            >
              {common.smartscreen_link}
            </Link>
          </p>
        </div>
      )}

      {/* Verify */}
      <section aria-labelledby="verify-heading" className="mb-10">
        <h2 id="verify-heading" className="mb-2 text-lg font-semibold text-foreground">
          {common.verify_title}
        </h2>
        <p className="text-sm text-muted-foreground">{common.verify_body}</p>
      </section>

      {/* Back link */}
      <Link
        href={docsBase}
        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80"
      >
        ← {dict.docs.meta_title}
      </Link>
    </div>
  );
}
