import Link from "next/link";

import { ActionLink } from "@/components/ui/ActionLink";
import type { WorkMeta } from "@/types/content";

import { CaseStudyFactList } from "./EvidencePrimitives";

export function CaseStudyHeader({ meta }: Readonly<{ meta: WorkMeta }>) {
  const facts = [
    { label: "Status", value: meta.statusLabel },
    { label: "Project period", value: meta.year },
    ...(meta.repositoryUrl
      ? [{ label: "Repository", value: "Public GitHub repository" }]
      : []),
    ...(meta.headerFacts ?? []),
  ];

  return (
    <header className="border-b border-border pb-10">
      <nav
        className="mb-8 flex flex-wrap gap-3 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] uppercase"
        aria-label="Case study breadcrumb"
      >
        <Link
          className="text-foreground-muted underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground"
          href="/"
        >
          Home
        </Link>
        <span className="text-foreground-muted" aria-hidden="true">
          /
        </span>
        <Link
          className="text-foreground-muted underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground"
          href="/work"
        >
          Work
        </Link>
      </nav>

      <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
        {meta.category}
      </p>
      <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] font-semibold text-balance text-foreground">
        {meta.title}
      </h1>
      <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
        {meta.summary}
      </p>

      <CaseStudyFactList facts={facts} />

      {meta.repositoryUrl || meta.demoUrl ? (
        <div className="mt-6 flex flex-wrap gap-3">
          {meta.repositoryUrl ? (
            <ActionLink
              href={meta.repositoryUrl}
              rel="noopener noreferrer"
              target="_blank"
              variant="secondary"
            >
              GitHub Repository ↗
            </ActionLink>
          ) : null}
          {meta.demoUrl ? (
            <ActionLink
              href={meta.demoUrl}
              rel="noopener noreferrer"
              target="_blank"
              variant="secondary"
            >
              Live Demo ↗
            </ActionLink>
          ) : null}
        </div>
      ) : null}

      <p className="mt-6 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] text-foreground-muted">
        {meta.stack.join(" · ")}
      </p>
    </header>
  );
}
