import { Shield } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>{dict.footer.tagline}</span>
        </div>
        <p>{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
