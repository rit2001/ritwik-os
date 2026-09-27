import type { CSSProperties, ReactNode } from "react";

import type { CaseStudyHeaderFact } from "@/types/content";

export function MetricDelta({
  label,
  before,
  after,
  context,
}: Readonly<{
  label: string;
  before: string;
  after: string;
  context: string;
}>) {
  return (
    <dl className="border-l-2 border-accent pl-4 sm:pl-5">
      <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
        {label}
      </dt>
      <dd className="mt-2 font-mono text-[clamp(1.4rem,4vw,2.4rem)] leading-none font-semibold tracking-[-0.04em] text-foreground">
        {before} <span className="text-accent">→</span> {after}
      </dd>
      <dd className="mt-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
        {context}
      </dd>
    </dl>
  );
}

export function EvidenceTable({
  caption,
  rows,
}: Readonly<{
  caption: string;
  rows: readonly { label: string; value: ReactNode }[];
}>) {
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="w-full min-w-[30rem] border-collapse text-left">
        <caption className="border-b border-border px-0 py-3 text-left font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
          {caption}
        </caption>
        <tbody>
          {rows.map((row) => (
            <tr
              className="border-b border-border last:border-b-0"
              key={row.label}
            >
              <th className="w-[38%] px-0 py-3 pr-5 align-top text-[length:var(--text-body-small-size)] font-medium text-foreground-muted">
                {row.label}
              </th>
              <td className="py-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SystemFlow({
  label = "System flow",
  steps,
  note,
}: Readonly<{
  label?: string;
  steps: readonly { name: string; label?: string; description?: string }[];
  note?: string;
}>) {
  return (
    <section aria-label={label} className="my-8">
      <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
        {label}
      </p>
      <ol
        className="mt-5 grid gap-0 lg:grid-cols-[repeat(var(--flow-steps),minmax(0,1fr))]"
        style={{ "--flow-steps": steps.length } as CSSProperties}
      >
        {steps.map((step, index) => (
          <li
            className="relative flex min-h-14 items-center border border-border bg-surface/35 px-4 py-3 text-[length:var(--text-body-small-size)] text-foreground-secondary [&:not(:last-child)]:border-b-0 lg:min-h-24 lg:justify-center lg:text-center lg:[&:not(:last-child)]:border-r-0 lg:[&:not(:last-child)]:border-b"
            key={step.name}
          >
            <span
              className="mr-3 font-mono text-[length:var(--text-label-size)] text-accent lg:absolute lg:top-2 lg:left-2"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              {step.label ? (
                <span className="block font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                  {step.label}
                </span>
              ) : null}
              <span className="font-medium text-foreground">{step.name}</span>
              {step.description ? (
                <span className="mt-1 block text-foreground-muted lg:text-[length:var(--text-label-size)]">
                  {step.description}
                </span>
              ) : null}
            </span>
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 bg-background px-1 text-accent lg:hidden"
              >
                ↓
              </span>
            ) : null}
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 bg-background px-1 text-accent lg:block"
              >
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {note ? (
        <p className="mt-4 border-l border-accent/55 pl-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
          {note}
        </p>
      ) : null}
    </section>
  );
}

export function InvariantCallout({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <aside className="my-8 border-l-2 border-accent bg-surface/35 px-5 py-4">
      <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
        Invariant / {title}
      </p>
      <div className="mt-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
        {children}
      </div>
    </aside>
  );
}

export function TradeoffDecision({
  decision,
  why,
  downside,
  constraint,
}: Readonly<{
  decision: string;
  why: string;
  downside: string;
  constraint: string;
}>) {
  return (
    <EvidenceTable
      caption="Decision record"
      rows={[
        { label: "Decision", value: decision },
        { label: "Why", value: why },
        { label: "Downside", value: downside },
        { label: "Resulting constraint", value: constraint },
      ]}
    />
  );
}

export function FailureModeMatrix({
  caption,
  rows,
}: Readonly<{
  caption: string;
  rows: readonly {
    trigger: string;
    expected: string;
    evidence: string;
  }[];
}>) {
  return (
    <div className="overflow-x-auto border-y border-border">
      <table className="w-full min-w-[42rem] border-collapse text-left">
        <caption className="border-b border-border px-0 py-3 text-left font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-border">
            {["Trigger", "Expected behavior", "Verified evidence"].map(
              (heading) => (
                <th
                  className="px-0 py-3 pr-5 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] text-foreground-muted uppercase last:pr-0"
                  key={heading}
                  scope="col"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className="border-b border-border last:border-b-0"
              key={row.trigger}
            >
              <th
                className="w-[24%] px-0 py-3 pr-5 align-top text-[length:var(--text-body-small-size)] font-medium text-foreground"
                scope="row"
              >
                {row.trigger}
              </th>
              <td className="w-[38%] py-3 pr-5 align-top text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {row.expected}
              </td>
              <td className="w-[38%] py-3 align-top text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
                {row.evidence}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CaseStudyFactList({
  facts,
}: Readonly<{ facts: readonly CaseStudyHeaderFact[] }>) {
  return (
    <dl className="mt-8 grid gap-px border-y border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
      {facts.map((fact) => (
        <div
          className="bg-background px-4 py-4 first:pl-0 sm:first:pl-4"
          key={`${fact.label}-${fact.value}`}
        >
          <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            {fact.label}
          </dt>
          <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
