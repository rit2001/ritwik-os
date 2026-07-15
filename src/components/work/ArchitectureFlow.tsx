const traceforgeFlow = [
  {
    name: "Instrumented Services",
    layer: "Instrumentation",
    responsibility: "Emit trace context and spans from application services.",
  },
  {
    name: "OpenTelemetry Collector or compatible exporter",
    layer: "Collection",
    responsibility: "Forward telemetry payloads through a standard boundary.",
  },
  {
    name: "Go Trace-Ingestion Service",
    layer: "Ingestion",
    responsibility: "Validate required trace data and preserve context.",
  },
  {
    name: "Kafka Trace Topics",
    layer: "Transport",
    responsibility: "Decouple ingestion from downstream processing.",
  },
  {
    name: "Processing Consumers",
    layer: "Processing",
    responsibility: "Transform events and prepare trace data for persistence.",
  },
  {
    name: "Trace Storage and Query Layer",
    layer: "Storage / query",
    responsibility: "Persist trace representations for future diagnostics.",
  },
  {
    name: "Operational Metrics and Diagnostics",
    layer: "Operations",
    responsibility: "Expose health, lag, latency, and failure signals.",
  },
] as const;

export function ArchitectureFlow() {
  return (
    <section className="my-8" aria-labelledby="proposed-architecture-flow">
      <h3
        className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase"
        id="proposed-architecture-flow"
      >
        Proposed Architecture
      </h3>
      <ol className="mt-6 overflow-hidden rounded-md border border-border bg-surface/45">
        {traceforgeFlow.map((step, index) => (
          <li
            className="relative grid gap-4 border-t border-border p-4 first:border-t-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-5"
            key={step.name}
          >
            {index < traceforgeFlow.length - 1 ? (
              <span
                className="absolute top-11 bottom-[-1px] left-8 w-px bg-border-strong sm:left-11"
                aria-hidden="true"
              />
            ) : null}
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent/60 bg-background font-mono text-[length:var(--text-label-size)] font-semibold text-accent">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                {step.layer}
              </p>
              <h4 className="mt-1 text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground">
                {step.name}
              </h4>
              <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {step.responsibility}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 border-l border-accent/55 pl-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
        Proposed directional flow. Connectors are visual only; the ordered
        stages preserve the semantic reading sequence.
      </p>
    </section>
  );
}
