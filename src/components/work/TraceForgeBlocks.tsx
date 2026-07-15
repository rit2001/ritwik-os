import type { ReactNode } from "react";

type Pair = {
  label: string;
  text: string;
};

type Decision = {
  technology: string;
  role: string;
  rationale: string;
  condition: string;
};

type Boundary = {
  name: string;
  responsibility: string;
  concern: string;
};

type MetricSignal = {
  signal: string;
  diagnostic: string;
};

type RoadmapGroup = {
  label: string;
  items: readonly string[];
};

export function CaseStudyCopy({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="mt-5 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary first:mt-0">
      {children}
    </p>
  );
}

const goals = [
  "OpenTelemetry-compatible trace ingestion",
  "Trace-context preservation across service boundaries",
  "Kafka-backed separation of ingestion and processing",
  "Clear ingestion, transport, processing, and storage boundaries",
  "Operational metrics for throughput, lag, latency, and failures",
  "Reproducible containerized deployment",
  "Foundation for load testing and capacity planning",
] as const;

const scope = [
  "Architecture and service-boundary definition",
  "Repository bootstrap is the next implementation step",
  "No production-readiness claim",
  "No hosted dashboard or public demo",
  "Performance figures published only after repeatable testing",
  "Storage, retention, and sampling remain under evaluation",
] as const;

const boundaries = [
  {
    name: "Trace Ingestion",
    responsibility:
      "Receive telemetry payloads, validate required trace data, preserve context, and publish normalized events.",
    concern:
      "Input validation, context propagation, payload shape, and rejected-span handling.",
  },
  {
    name: "Kafka Transport",
    responsibility:
      "Provide asynchronous decoupling, buffering, consumer-group processing, and observable lag.",
    concern:
      "Partition-key strategy, event schema evolution, retries, and dead-letter handling.",
  },
  {
    name: "Processing Consumers",
    responsibility:
      "Validate, transform, enrich where justified, and prepare trace data for persistence.",
    concern:
      "Consumer lag, idempotency, processing latency, and storage write behavior.",
  },
  {
    name: "Storage and Query",
    responsibility:
      "Define the persistent trace representation and future retrieval model for diagnostics.",
    concern:
      "Backend selection, retention policy, query shape, and storage cost are still open.",
  },
  {
    name: "Operational Diagnostics",
    responsibility:
      "Expose service health, ingestion behavior, Kafka errors, lag, latency, and write failures.",
    concern:
      "Minimum useful signal set and benchmark methodology need implementation evidence.",
  },
] as const satisfies readonly Boundary[];

const decisions = [
  {
    technology: "OpenTelemetry",
    role: "Instrumentation and trace-context interoperability.",
    rationale:
      "A standard trace model keeps ingestion compatible with common exporters and collectors.",
    condition:
      "The collector/exporter boundary must stay clear enough to avoid custom instrumentation lock-in.",
  },
  {
    technology: "Go",
    role: "Trace-ingestion and processing services.",
    rationale:
      "A lightweight service runtime with explicit concurrency and strong backend tooling.",
    condition:
      "The choice will be validated through implementation complexity and repeatable benchmark results.",
  },
  {
    technology: "Kafka",
    role: "Asynchronous event transport between ingestion and processing.",
    rationale:
      "Kafka provides buffering, replayability, consumer separation, and lag visibility.",
    condition:
      "Partitioning, retention, and backpressure behavior need careful design before performance claims.",
  },
  {
    technology: "Docker",
    role: "Repeatable local service environments.",
    rationale:
      "Containerized services make the ingestion, transport, and processing stack easier to run consistently.",
    condition:
      "Images and compose setup should stay small enough for practical local development.",
  },
  {
    technology: "Kubernetes",
    role: "Future orchestration and operational experimentation.",
    rationale:
      "Kubernetes can expose deployment, scaling, service health, and rollout concerns for the system.",
    condition:
      "It remains a deployment experiment until the local services and metrics are implemented.",
  },
  {
    technology: "Terraform",
    role: "Future reproducible infrastructure.",
    rationale:
      "Infrastructure definitions make environment changes explicit and reviewable.",
    condition:
      "Cloud resources should be introduced only when the implementation can justify their cost.",
  },
] as const satisfies readonly Decision[];

const openQuestions = [
  { label: "OPEN", text: "Storage backend selection" },
  { label: "PROVISIONAL", text: "Event-schema evolution strategy" },
  { label: "OPEN", text: "Kafka partition-key strategy" },
  { label: "OPEN", text: "Retention policy" },
  { label: "OPEN", text: "Sampling strategy" },
  { label: "OPEN", text: "Backpressure behavior" },
  { label: "OPEN", text: "Retries and dead-letter handling" },
  { label: "OPEN", text: "Trace-query model" },
  { label: "OPEN", text: "Infrastructure cost envelope" },
  { label: "PROVISIONAL", text: "Minimum meaningful benchmark definition" },
] as const satisfies readonly Pair[];

const metrics = [
  {
    signal: "Ingestion throughput",
    diagnostic: "How many trace payloads the ingestion boundary can accept.",
  },
  {
    signal: "Rejected spans",
    diagnostic:
      "Whether validation rules or malformed payloads are causing loss.",
  },
  {
    signal: "Kafka producer errors",
    diagnostic: "Whether ingestion is failing to publish normalized events.",
  },
  {
    signal: "Kafka consumer lag",
    diagnostic: "Whether downstream processing is falling behind ingestion.",
  },
  {
    signal: "Processing latency",
    diagnostic:
      "How long consumers spend validating and preparing trace events.",
  },
  {
    signal: "End-to-end trace latency",
    diagnostic:
      "How long a trace takes to move from ingestion to queryable storage.",
  },
  {
    signal: "Storage write failures",
    diagnostic:
      "Whether persistence is losing or rejecting prepared trace records.",
  },
  {
    signal: "Service health",
    diagnostic:
      "Whether ingestion, transport, consumers, and storage are operational.",
  },
] as const satisfies readonly MetricSignal[];

const loadTestStages = [
  "Define representative payloads",
  "Establish baseline behavior",
  "Increase concurrency",
  "Measure latency, CPU, memory, errors, and lag",
  "Identify bottlenecks",
  "Record capacity assumptions",
  "Publish only repeatable measurements",
] as const;

const roadmap = [
  {
    label: "Current",
    items: ["Repository and Go service bootstrap"],
  },
  {
    label: "Next",
    items: [
      "OpenTelemetry ingestion endpoint",
      "Trace-context validation and propagation",
      "Kafka producer integration",
    ],
  },
  {
    label: "Planned",
    items: [
      "Consumer processing service",
      "Initial storage adapter",
      "Operational metrics",
      "Containerized local environment",
      "Load-testing harness",
      "Kubernetes and Terraform deployment experiment",
    ],
  },
] as const satisfies readonly RoadmapGroup[];

export function StatusScopeNote() {
  return (
    <aside className="rounded-md border border-border-strong bg-surface/60 p-5">
      <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
        Current Scope
      </p>
      <p className="mt-3 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
        This case study documents the current architecture direction and planned
        implementation. Performance results and production claims will be added
        only after repeatable implementation and testing.
      </p>
    </aside>
  );
}

export function GoalScopeMatrix() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface/45 md:grid md:grid-cols-2">
      <div className="p-5 md:border-r md:border-border">
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
          Goals
        </p>
        <ul className="mt-5 space-y-3">
          {goals.map((goal) => (
            <li
              className="border-l border-accent/55 pl-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
              key={goal}
            >
              {goal}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border p-5 md:border-t-0">
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-warning uppercase">
          Current Scope
        </p>
        <ul className="mt-5 space-y-3">
          {scope.map((item) => (
            <li
              className="border-l border-border-strong pl-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MilestoneCallout() {
  return (
    <aside className="overflow-hidden rounded-md border border-border-strong bg-surface/65">
      <div className="h-0.5 bg-accent" aria-hidden="true" />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
            Current Milestone
          </p>
          <span className="rounded-xs border border-warning/60 bg-surface-muted px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-warning uppercase">
            In Development
          </span>
        </div>
        <h3 className="mt-5 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground uppercase">
          Architecture and repository bootstrap
        </h3>
        <dl className="mt-6 grid gap-5 border-t border-border pt-5">
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              Current work
            </dt>
            <dd className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              Defining service boundaries, OpenTelemetry ingestion flow, Kafka
              event contracts, storage interfaces, and the initial observability
              and load-testing strategy.
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              Next step
            </dt>
            <dd className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              Initialize the Go repository and implement the first
              trace-ingestion service with OpenTelemetry context propagation.
            </dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

export function ServiceBoundaryMatrix() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface/45">
      {boundaries.map((boundary, index) => (
        <article
          className="grid gap-4 border-t border-border p-5 first:border-t-0 md:grid-cols-[13rem_minmax(0,1fr)]"
          key={boundary.name}
        >
          <div>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-accent uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground">
              {boundary.name}
            </h3>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Planned responsibility
              </dt>
              <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {boundary.responsibility}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Key concern
              </dt>
              <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {boundary.concern}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export function DecisionGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {decisions.map((decision) => (
        <article
          className="rounded-md border border-border bg-surface/45 p-5"
          key={decision.technology}
        >
          <h3 className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
            {decision.technology}
          </h3>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Intended role
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {decision.role}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Rationale
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {decision.rationale}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Condition
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {decision.condition}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export function OpenQuestionGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
      {openQuestions.map((question) => (
        <article className="bg-surface/55 p-4" key={question.text}>
          <p
            className={[
              "font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] uppercase",
              question.label === "OPEN" ? "text-warning" : "text-accent",
            ].join(" ")}
          >
            {question.label}
          </p>
          <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {question.text}
          </p>
        </article>
      ))}
    </div>
  );
}

export function MetricsMatrix() {
  return (
    <div className="rounded-md border border-border bg-surface/45 p-5">
      <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
        Planned Signals
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <article className="border-t border-border pt-4" key={metric.signal}>
            <h3 className="text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] font-semibold text-foreground">
              {metric.signal}
            </h3>
            <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {metric.diagnostic}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function LoadTestPlan() {
  return (
    <ol className="grid gap-3">
      {loadTestStages.map((stage, index) => (
        <li
          className="grid gap-3 rounded-md border border-border bg-surface/45 p-4 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:items-center"
          key={stage}
        >
          <span className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {stage}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function RoadmapTimeline() {
  return (
    <div className="grid gap-4">
      {roadmap.map((group) => (
        <section
          className="rounded-md border border-border bg-surface/45 p-5"
          key={group.label}
          aria-labelledby={`roadmap-${group.label.toLowerCase()}`}
        >
          <h3
            className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase"
            id={`roadmap-${group.label.toLowerCase()}`}
          >
            {group.label}
          </h3>
          <ol className="mt-4 grid gap-3">
            {group.items.map((item) => (
              <li
                className="border-l border-border-strong pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                key={item}
              >
                {item}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

export function StatusSummary() {
  return (
    <aside className="rounded-md border border-border-strong bg-surface/55 p-5">
      <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
        Build Status
      </p>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          ["Current phase", "Architecture and repository bootstrap"],
          ["Repository", "Not published yet"],
          ["Public demo", "Not available"],
          ["Performance results", "Not measured yet"],
        ].map(([label, value]) => (
          <div className="border-t border-border pt-3" key={label}>
            <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
              {label}
            </dt>
            <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
