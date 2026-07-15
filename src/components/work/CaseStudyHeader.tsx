import Link from "next/link";

import { ActionLink } from "@/components/ui/ActionLink";
import type { WorkMeta } from "@/types/content";

import { StatusBadge } from "./StatusBadge";

export function CaseStudyHeader({ meta }: Readonly<{ meta: WorkMeta }>) {
  const isTraceForge = meta.slug === "traceforge";
  const isAgenticAssistant = meta.slug === "stateful-agentic-ai-assistant";
  const summary = isTraceForge
    ? "TraceForge is an ongoing distributed tracing and telemetry-pipeline project focused on context propagation, OpenTelemetry ingestion, Kafka-backed event transport, scalable processing boundaries, infrastructure automation, and measurable operational visibility."
    : meta.summary;
  const projectPeriodLabel = isTraceForge
    ? "Current milestone"
    : "Project period";
  const projectPeriodValue = isTraceForge ? meta.currentMilestone : meta.year;
  const repositoryValue = meta.repositoryUrl
    ? "Public GitHub repository"
    : "Not published yet";
  const demoValue = isAgenticAssistant
    ? "Not continuously hosted"
    : meta.demoUrl
      ? "Available"
      : "Not available";

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
        {summary}
      </p>

      <dl className="mt-8 grid gap-5 border-y border-border py-6 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            Status
          </dt>
          <dd className="mt-2">
            <StatusBadge>{meta.statusLabel}</StatusBadge>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            {projectPeriodLabel}
          </dt>
          <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {projectPeriodValue}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            Repository
          </dt>
          <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {repositoryValue}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            {isAgenticAssistant ? "Deployment" : "Demo"}
          </dt>
          <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {isAgenticAssistant ? "On-demand AWS EC2" : demoValue}
          </dd>
        </div>
        {isAgenticAssistant ? (
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
              Demo
            </dt>
            <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {demoValue}
            </dd>
          </div>
        ) : null}
      </dl>

      {meta.repositoryUrl ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <ActionLink
            href={meta.repositoryUrl}
            rel="noopener noreferrer"
            target="_blank"
            variant="secondary"
          >
            GitHub Repository
          </ActionLink>
          {isAgenticAssistant ? (
            <span className="inline-flex min-h-11 items-center rounded-lg border border-border bg-transparent px-4 py-2 font-mono text-[length:var(--text-technical-size)] leading-none font-semibold tracking-[0.08em] text-foreground-muted uppercase">
              Demo: Not continuously hosted
            </span>
          ) : null}
        </div>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-2">
        {meta.stack.map((item) => (
          <li
            className="rounded-xs border border-border bg-surface-muted px-2.5 py-1 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.04em] text-foreground-secondary"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </header>
  );
}
