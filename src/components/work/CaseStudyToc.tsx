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
  return (
    <nav
      className="rounded-md border border-border bg-surface/45 p-4 lg:sticky lg:top-[calc(var(--layout-header-height)+1.5rem)]"
      aria-label="On this page"
    >
      <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
        On This Page
      </p>
      <ol className="mt-4 grid gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <a
              className="block rounded-sm px-2 py-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted transition-colors duration-[var(--duration-base)] hover:bg-surface-muted hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
