import Link from "next/link";

import type { WorkMeta } from "@/types/content";

export function CaseStudyNavigation({
  previous,
  next,
}: Readonly<{
  previous?: WorkMeta;
  next?: WorkMeta;
}>) {
  return (
    <nav
      className="mt-12 grid gap-px border-y border-border bg-border sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
      aria-label="Case study navigation"
    >
      {previous ? (
        <Link
          className="min-h-24 bg-background px-5 py-5 transition-colors hover:bg-surface/55 focus-visible:bg-surface/55"
          href={previous.caseStudyPath}
        >
          <span className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            ← Previous
          </span>
          <span className="mt-2 block text-[length:var(--text-body-size)] font-semibold text-foreground">
            {previous.shortTitle ?? previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden bg-background sm:block" aria-hidden="true" />
      )}

      <Link
        className="inline-flex min-h-16 items-center justify-center bg-background px-5 py-4 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-accent uppercase transition-colors hover:bg-surface/55 focus-visible:bg-surface/55"
        href="/work"
      >
        All Work
      </Link>

      {next ? (
        <Link
          className="min-h-24 bg-background px-5 py-5 text-left transition-colors hover:bg-surface/55 focus-visible:bg-surface/55 sm:text-right"
          href={next.caseStudyPath}
        >
          <span className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            Next →
          </span>
          <span className="mt-2 block text-[length:var(--text-body-size)] font-semibold text-foreground">
            {next.shortTitle ?? next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden bg-background sm:block" aria-hidden="true" />
      )}
    </nav>
  );
}
