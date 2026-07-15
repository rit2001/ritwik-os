import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container
        className="flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between"
        width="wide"
      >
        <p className="font-mono text-[length:var(--text-technical-size)] leading-[var(--text-technical-line-height)] font-semibold tracking-[0.14em] text-foreground uppercase">
          {siteConfig.name}
        </p>
        <p className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
          {siteConfig.tagline}
        </p>
      </Container>
    </footer>
  );
}
