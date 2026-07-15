const traceforgeFlow = [
  "Instrumented Services",
  "OpenTelemetry Collector or compatible exporter",
  "Go Trace-Ingestion Service",
  "Kafka Trace Topics",
  "Processing Consumers",
  "Trace Storage and Query Layer",
  "Operational Metrics and Diagnostics",
] as const;

export function ArchitectureFlow() {
  return (
    <section
      className="my-8 rounded-md border border-border bg-surface/45 p-4 sm:p-5"
      aria-labelledby="proposed-architecture-flow"
    >
      <h3
        className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase"
        id="proposed-architecture-flow"
      >
        Proposed Architecture Flow
      </h3>
      <ol className="mt-5 grid gap-3">
        {traceforgeFlow.map((step, index) => (
          <li
            className="grid gap-3 rounded-sm border border-border bg-background/70 p-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:items-center"
            key={step}
          >
            <span className="font-mono text-[length:var(--text-label-size)] font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {step}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
        This diagram is a proposed implementation direction, not a claim that
        every service currently exists.
      </p>
    </section>
  );
}
