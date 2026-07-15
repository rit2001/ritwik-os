export type CaseStudyTocItem = {
  href: string;
  label: string;
};

export const traceforgeTocItems = [
  { href: "#overview", label: "Overview" },
  { href: "#problem", label: "Problem" },
  { href: "#goals-and-scope", label: "Goals and Scope" },
  { href: "#current-milestone", label: "Current Milestone" },
  { href: "#proposed-architecture", label: "Proposed Architecture" },
  { href: "#service-boundaries", label: "Service Boundaries" },
  { href: "#engineering-decisions", label: "Engineering Decisions" },
  { href: "#open-questions", label: "Trade-offs and Open Questions" },
  { href: "#observability", label: "Observability" },
  { href: "#load-testing", label: "Load Testing" },
  { href: "#current-status", label: "Current Status" },
  { href: "#roadmap", label: "Roadmap" },
] as const satisfies readonly CaseStudyTocItem[];

export function CaseStudyToc({
  items = traceforgeTocItems,
}: Readonly<{ items?: readonly CaseStudyTocItem[] }>) {
  const tocLinks = (
    <ol className="grid gap-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <a
            className="block rounded-sm border-l border-transparent px-3 py-1.5 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted transition-[border-color,background-color,color] duration-[var(--duration-base)] hover:border-accent hover:bg-surface-muted/55 hover:text-foreground focus-visible:border-accent focus-visible:bg-accent-muted/25 focus-visible:text-foreground"
            href={item.href}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav
      className="lg:sticky lg:top-[calc(var(--layout-header-height)+1.5rem)]"
      aria-label="On this page"
    >
      <details className="rounded-md border border-border bg-surface/45 p-4 lg:hidden">
        <summary className="cursor-pointer font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
          On This Page
        </summary>
        <div className="mt-4">{tocLinks}</div>
      </details>

      <div className="hidden max-h-[calc(100dvh-var(--layout-header-height)-3rem)] overflow-y-auto border-l border-border pl-3 lg:block">
        <p className="px-3 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
          On This Page
        </p>
        <div className="mt-4">{tocLinks}</div>
      </div>
    </nav>
  );
}
