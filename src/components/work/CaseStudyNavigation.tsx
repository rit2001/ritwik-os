import Link from "next/link";

export function CaseStudyNavigation() {
  return (
    <nav
      className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8"
      aria-label="Case study navigation"
    >
      <Link
        className="inline-flex min-h-11 items-center rounded-lg border border-border-strong bg-surface/70 px-4 py-2 font-mono text-[length:var(--text-technical-size)] font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:bg-accent-muted/35"
        href="/work"
      >
        Back to Work
      </Link>
      <Link
        className="inline-flex min-h-11 items-center rounded-lg border border-border bg-transparent px-4 py-2 font-mono text-[length:var(--text-technical-size)] font-semibold tracking-[0.08em] text-foreground-secondary uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:text-foreground"
        href="/"
      >
        Home
      </Link>
    </nav>
  );
}
