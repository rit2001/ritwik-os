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
        Proposed Architecture
      </h3>
      <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {traceforgeFlow.map((step, index) => (
          <li
            className="relative rounded-sm border border-border bg-background/70 p-4"
            key={step}
          >
            {index < traceforgeFlow.length - 1 ? (
              <span
                className="absolute top-full left-5 h-4 w-px bg-border-strong md:top-1/2 md:left-full md:h-px md:w-4"
                aria-hidden="true"
              />
            ) : null}
            <div className="flex items-start gap-3">
              <span className="font-mono text-[length:var(--text-label-size)] font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {step}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
        Directional flow for the planned implementation. Connectors are visual
        only; the ordered labels preserve the reading sequence.
      </p>
    </section>
  );
}
