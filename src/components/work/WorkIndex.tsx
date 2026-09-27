import Link from "next/link";

import { ActionLink } from "@/components/ui/ActionLink";
import {
  type EvidenceHighlight,
  projects,
  type Project,
} from "@/data/projects";
import type { WorkMeta } from "@/types/content";

import { MetricDelta } from "./EvidencePrimitives";

function ProjectActions({
  project,
  publishedMeta,
}: Readonly<{ project: Project; publishedMeta?: WorkMeta }>) {
  if (!publishedMeta && !project.repositoryUrl) return null;

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {publishedMeta ? (
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-accent/70 bg-accent-muted/45 px-4 py-2 font-mono text-[length:var(--text-technical-size)] leading-none font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:bg-accent hover:text-background"
          href={publishedMeta.caseStudyPath}
        >
          View Case Study
        </Link>
      ) : null}
      {project.repositoryUrl ? (
        <ActionLink
          href={project.repositoryUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Repository ↗
        </ActionLink>
      ) : null}
    </div>
  );
}

function EvidenceLine({ evidence }: Readonly<{ evidence: EvidenceHighlight }>) {
  if (evidence.kind === "delta") {
    return (
      <span>
        {evidence.label}: {evidence.before} → {evidence.after}
      </span>
    );
  }

  if (evidence.kind === "count") {
    return (
      <span>
        {evidence.value} {evidence.label.toLowerCase()}
      </span>
    );
  }

  return <span>{evidence.detail}</span>;
}

function FlagshipProject({
  project,
  publishedMeta,
}: Readonly<{ project: Project; publishedMeta?: WorkMeta }>) {
  const primaryDelta = project.evidence.find(
    (evidence): evidence is Extract<EvidenceHighlight, { kind: "delta" }> =>
      evidence.kind === "delta",
  );
  const primaryCount = project.evidence.find(
    (evidence): evidence is Extract<EvidenceHighlight, { kind: "count" }> =>
      evidence.kind === "count",
  );
  const primaryEvidence = primaryDelta ?? primaryCount;
  const support = project.evidence
    .filter((evidence) => evidence !== primaryEvidence)
    .slice(0, 2);

  return (
    <article className="grid gap-8 border-t border-border py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-14 lg:py-20">
      <div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] uppercase">
          <span className="text-accent">
            System / {String(project.displayOrder).padStart(2, "0")}
          </span>
          <span className="text-foreground-muted">{project.category}</span>
          <span className="text-foreground-muted">{project.status}</span>
        </div>
        <h2 className="mt-5 text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-foreground">
          {project.title}
        </h2>
        <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
          {project.summary}
        </p>
        <ProjectActions project={project} publishedMeta={publishedMeta} />
      </div>

      <div className="lg:pt-4">
        {primaryDelta ? (
          <MetricDelta
            after={primaryDelta.after}
            before={primaryDelta.before}
            context={primaryDelta.context}
            label={primaryDelta.label}
          />
        ) : primaryCount ? (
          <dl className="border-l-2 border-accent pl-4 sm:pl-5">
            <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              {primaryCount.label}
            </dt>
            <dd className="mt-2 font-mono text-[clamp(1.8rem,5vw,3rem)] leading-none font-semibold tracking-[-0.04em] text-foreground">
              {primaryCount.value}
            </dd>
            <dd className="mt-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
              {primaryCount.context}
            </dd>
          </dl>
        ) : (
          <p className="border-l-2 border-accent pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {project.evidence[0] ? (
              <EvidenceLine evidence={project.evidence[0]} />
            ) : null}
          </p>
        )}

        <ul className="mt-7 divide-y divide-border border-y border-border">
          {support.map((evidence) => (
            <li
              className="py-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
              key={evidence.label}
            >
              <EvidenceLine evidence={evidence} />
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] text-foreground-muted">
          {project.stack.slice(0, 6).join(" · ")}
        </p>
      </div>
    </article>
  );
}

function SelectedProject({
  project,
  publishedMeta,
}: Readonly<{ project: Project; publishedMeta?: WorkMeta }>) {
  return (
    <article className="grid gap-5 border-t border-border py-8 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-8">
      <div>
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
          {project.category}
        </p>
        <h2 className="mt-3 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
          {project.title}
        </h2>
        <p className="mt-2 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] text-accent uppercase">
          {project.status}
        </p>
      </div>
      <div>
        <p className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
          {project.summary}
        </p>
        <p className="mt-4 font-mono text-[length:var(--text-label-size)] text-foreground-muted">
          {project.stack.slice(0, 5).join(" · ")}
        </p>
      </div>
      <ProjectActions project={project} publishedMeta={publishedMeta} />
    </article>
  );
}

export function WorkIndex({
  publishedEntries,
}: Readonly<{ publishedEntries: readonly { meta: WorkMeta }[] }>) {
  const publishedByProjectId = new Map(
    publishedEntries.map((entry) => [entry.meta.projectId, entry.meta]),
  );
  const flagship = projects.filter((project) => project.tier === "flagship");
  const selected = projects.filter((project) => project.tier === "selected");
  const archive = projects.filter((project) => project.tier === "archive");

  return (
    <>
      <section className="border-b border-border py-16 sm:py-20">
        <header className="max-w-4xl">
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
            Work
          </p>
          <h1 className="mt-5 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.03em] text-balance text-foreground">
            A portfolio organized by current engineering depth—not chronology.
          </h1>
          <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
            Flagship systems show the most current work across applied AI, AI
            infrastructure, and distributed collaboration. Published case
            studies appear only where the underlying content exists.
          </p>
        </header>
      </section>

      <section
        className="py-16 lg:py-24"
        aria-labelledby="flagship-systems-title"
      >
        <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
              Flagship systems
            </p>
            <h2
              id="flagship-systems-title"
              className="mt-4 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.03em] text-foreground"
            >
              Current engineering systems.
            </h2>
          </div>
          <p className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
            Evidence, trade-offs, and system boundaries take precedence over
            chronological history.
          </p>
        </header>
        <div className="mt-8">
          {flagship.map((project) => (
            <FlagshipProject
              key={project.id}
              project={project}
              publishedMeta={publishedByProjectId.get(project.id)}
            />
          ))}
        </div>
      </section>

      <section
        className="border-t border-border py-16 lg:py-20"
        aria-labelledby="selected-work-title"
      >
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
          Selected earlier work
        </p>
        <h2
          id="selected-work-title"
          className="mt-4 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground"
        >
          Implementations that remain relevant supporting evidence.
        </h2>
        <div className="mt-8">
          {selected.map((project) => (
            <SelectedProject
              key={project.id}
              project={project}
              publishedMeta={publishedByProjectId.get(project.id)}
            />
          ))}
        </div>
      </section>

      <section
        className="border-t border-border py-16 lg:py-20"
        aria-labelledby="archive-title"
      >
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-foreground-muted uppercase">
          Archive / superseded
        </p>
        <h2
          id="archive-title"
          className="mt-4 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground"
        >
          Earlier collaboration work, retained with its historical context.
        </h2>
        {archive.map((project) => (
          <article
            className="mt-8 grid gap-5 border-l border-border-strong pl-5 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1fr)_auto] lg:gap-8"
            key={project.id}
          >
            <div>
              <h3 className="text-[length:var(--text-body-large-size)] font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-[length:var(--text-label-size)] text-foreground-muted uppercase">
                Earlier / superseded work
              </p>
            </div>
            <div>
              <p className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {project.summary}{" "}
                {project.supersededBy
                  ? `${projects.find((candidate) => candidate.id === project.supersededBy)?.title} now supersedes this project in current portfolio importance.`
                  : null}
              </p>
              <p className="mt-4 font-mono text-[length:var(--text-label-size)] text-foreground-muted">
                {project.stack.join(" · ")}
              </p>
            </div>
            <ProjectActions project={project} />
          </article>
        ))}
      </section>
    </>
  );
}
