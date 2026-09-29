import Link from "next/link";

import { ActionLink } from "@/components/ui/ActionLink";
import type { WorkMeta } from "@/types/content";

import { CaseStudyVisualStage } from "./CaseStudyVisualStage";

export function CaseStudyHeader({ meta }: Readonly<{ meta: WorkMeta }>) {
  const facts = [
    { label: "Status", value: meta.statusLabel },
    { label: "Project period", value: meta.year },
    ...(meta.repositoryUrl
      ? [{ label: "Repository", value: "Public GitHub repository" }]
      : []),
    ...(meta.headerFacts ?? []),
  ];
  const isVisualFlagship = ["thesislens", "traceforge", "converge"].includes(
    meta.projectId,
  );

  return (
    <header className="relative border-b border-border pb-12">
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

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div>
          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-signal-cyan uppercase">
            {meta.category}
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(3.2rem,8vw,7.2rem)] leading-[0.86] font-semibold tracking-[-0.055em] text-balance text-foreground">
            {meta.title}
          </h1>
          <p className="mt-7 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
            {meta.summary}
          </p>
        </div>

        <div className="border-l border-border pl-5">
          <dl className="space-y-4">
            {facts.map((fact) => (
              <div key={`${fact.label}-${fact.value}`}>
                <dt className="font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-xs leading-5 text-foreground-secondary">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {meta.repositoryUrl || meta.demoUrl ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {meta.repositoryUrl ? (
                <ActionLink
                  href={meta.repositoryUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  GitHub ↗
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
        </div>
      </div>

      {isVisualFlagship ? (
        <CaseStudyVisualStage
          project={meta.projectId as "thesislens" | "traceforge" | "converge"}
        />
      ) : null}

      <p className="mt-6 border-t border-border pt-5 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] text-foreground-muted">
        {meta.stack.join(" · ")}
      </p>
    </header>
  );
}
