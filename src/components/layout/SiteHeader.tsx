import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-border bg-background-elevated/95 backdrop-blur-sm">
      <Container className="flex h-header-height items-center" width="wide">
        <p className="font-mono text-[length:var(--text-technical-size)] leading-[var(--text-technical-line-height)] font-semibold tracking-[0.16em] text-foreground uppercase">
          {siteConfig.name}
        </p>
      </Container>
    </header>
  );
}
