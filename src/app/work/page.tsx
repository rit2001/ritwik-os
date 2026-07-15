import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { getAllWorkEntries } from "@/lib/content/work";

export const metadata: Metadata = {
  title: "Work Registry — RITWIK OS",
  description:
    "Engineering systems, ongoing builds, and production-focused case studies by Ritwik Biswas.",
};

export default function WorkPage() {
  const entries = getAllWorkEntries();

  return (
    <section className="py-16 sm:py-20">
      <Container width="wide">
        <header className="max-w-4xl">
          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
            Work Registry
          </p>
          <h1 className="mt-5 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground">
            Engineering systems, ongoing builds, and production-focused case
            studies.
          </h1>
          <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
            A technical record of the problems, architecture decisions,
            implementation trade-offs, and lessons behind selected software
            systems.
          </p>
        </header>

        <div className="mt-12 grid gap-5">
          {entries.map(({ meta }) => (
            <article
              className="rounded-md border border-border bg-surface/55 p-5 sm:p-6"
              key={meta.slug}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                  {meta.category}
                </p>
                <span className="rounded-xs border border-warning/60 bg-surface-muted px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-warning uppercase">
                  {meta.statusLabel}
                </span>
              </div>
              <h2 className="mt-5 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
                {meta.title}
              </h2>
              <p className="mt-4 max-w-3xl text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                {meta.summary}
              </p>
              {meta.currentMilestone ? (
                <p className="mt-5 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
                  <span className="font-semibold text-foreground">
                    Current milestone:
                  </span>{" "}
                  {meta.currentMilestone}
                </p>
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
              <Link
                className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-accent/70 bg-accent-muted/45 px-4 py-2 font-mono text-[length:var(--text-technical-size)] font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:bg-accent hover:text-background"
                href={meta.caseStudyPath}
              >
                View Build Case Study
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
