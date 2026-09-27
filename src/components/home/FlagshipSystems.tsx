import { ActionLink } from "@/components/ui/ActionLink";
import { getProject, type Project } from "@/data/projects";

type FlagshipPresentation = {
  project: Project;
  sequence: string;
  thesis: string;
  proof: { label: string; value: string; context: string };
  evidence: readonly string[];
  flow: readonly string[];
  stack: readonly string[];
  scopeNote?: string;
};

const thesisLens = getProject("thesislens");
const traceForge = getProject("traceforge");
const converge = getProject("converge");

const flagships: readonly FlagshipPresentation[] = [
  {
    project: thesisLens,
    sequence: "01",
    thesis:
      "An evidence-grounded investment-research system combining structured financial data, retrieval evaluation, and claim-level grounding.",
    proof: {
      label: "Holdout nDCG@5",
      value: "0.704 → 0.811",
      context:
        "After local MiniLM cross-encoder fine-tuning on the holdout retrieval evaluation.",
    },
    evidence: [
      "44-query benchmark across 1,012 judged query-document pairs",
      "Holdout Recall@3 improved from 0.448 to 0.604",
      "Deterministic SQL, RAG, and combined routing with claim-level citation validation",
      "Reranking added about 3.19s/query of CPU latency; lexical retrieval remains for top-rank quality",
    ],
    flow: [
      "Financial filings",
      "Semantic processing",
      "Hybrid retrieval",
      "Cross-encoder",
      "Evidence / citations",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Azure OpenAI",
      "Azure AI Search",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    project: traceForge,
    sequence: "02",
    thesis:
      "Capture nondeterministic AI-agent execution so workflows can be inspected, replayed, evaluated, and regression-tested.",
    proof: {
      label: "Implemented foundation",
      value: "Capture → Replay",
      context:
        "Versioned capture contracts and frozen LLM/tool boundaries establish deterministic replay fixtures.",
    },
    evidence: [
      "Schema validation and idempotent event processing",
      "Kafka-backed asynchronous delivery with non-blocking telemetry ingestion",
      "Original-versus-replay diffing and regression testing",
      "Failure-path testing with API-key isolation and operational telemetry",
    ],
    flow: [
      "AI agent",
      "Capture / gateway",
      "Kafka",
      "Trace processing",
      "Replay / evaluation",
    ],
    stack: [
      "Go",
      "Kafka",
      "OpenTelemetry",
      "Python",
      "LangGraph",
      "PostgreSQL",
    ],
    scopeNote:
      "Expanding: PostgreSQL trace/span persistence, asynchronous evaluation, containerized workers, Kubernetes, and Terraform direction.",
  },
  {
    project: converge,
    sequence: "03",
    thesis:
      "A server-authoritative, offline-capable collaboration system designed around ordering, recovery, deterministic state, and multi-replica behavior.",
    proof: {
      label: "PostgreSQL integration tests",
      value: "190+",
      context:
        "Integration coverage for ordering, recovery, and collaborative state behavior.",
    },
    evidence: [
      "Advisory-lock sequencing, deterministic reducers, and idempotent commands",
      "Transactional operation, projection, outbox, and receipt semantics",
      "Persistence-before-optimism with fixed-watermark catch-up and snapshot replay",
      "Redis fan-out, canonical state hashing, Playwright, k6, and failure-injection suites",
    ],
    flow: [
      "Clients",
      "WebSocket gateway",
      "Authoritative sequencing",
      "Redis fan-out",
      "PostgreSQL / recovery",
    ],
    stack: [
      "TypeScript",
      "Fastify",
      "Socket.IO",
      "PostgreSQL",
      "Redis",
      "IndexedDB",
    ],
  },
];

function SystemFlow({ steps }: Readonly<{ steps: readonly string[] }>) {
  return (
    <ol aria-label="System architecture" className="grid gap-0 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li
          className="relative flex min-h-14 items-center border border-border bg-background-elevated/35 px-3 py-3 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.05em] text-foreground-secondary uppercase lg:min-h-20 lg:justify-center lg:text-center [&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r-0 lg:[&:not(:last-child)]:border-b"
          key={step}
        >
          <span
            className="mr-3 text-accent lg:absolute lg:top-2 lg:left-2"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {step}
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
  );
}

function FlagshipSystem({ item }: Readonly<{ item: FlagshipPresentation }>) {
  return (
    <article
      className="grid scroll-mt-32 gap-10 border-t border-border py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] lg:gap-16 lg:py-24"
      id={item.project.id}
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] uppercase">
          <span className="text-accent">System / {item.sequence}</span>
          <span className="text-foreground-muted">{item.project.category}</span>
          <span className="text-foreground-muted">{item.project.status}</span>
        </div>
        <h3 className="mt-6 text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-foreground">
          {item.project.title}
        </h3>
        <p className="mt-7 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
          {item.thesis}
        </p>

        <div className="mt-9 border-l-2 border-accent pl-5 sm:pl-7">
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
            Primary proof / {item.proof.label}
          </p>
          <p className="mt-3 font-mono text-[clamp(1.75rem,5vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-foreground">
            {item.proof.value}
          </p>
          <p className="mt-4 max-w-2xl text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
            {item.proof.context}
          </p>
        </div>

        {item.project.caseStudyPath || item.project.repositoryUrl ? (
          <div className="mt-9 flex flex-wrap gap-3">
            {item.project.caseStudyPath ? (
              <ActionLink href={item.project.caseStudyPath} variant="primary">
                View Case Study
              </ActionLink>
            ) : null}
            {item.project.repositoryUrl ? (
              <ActionLink
                href={item.project.repositoryUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </ActionLink>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="lg:pt-10">
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
          Evidence
        </p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {item.evidence.map((evidence) => (
            <li
              className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 py-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
              key={evidence}
            >
              <span className="font-mono text-accent" aria-hidden="true">
                +
              </span>
              {evidence}
            </li>
          ))}
        </ul>
        {item.scopeNote ? (
          <p className="mt-5 border-l border-border-strong pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
            {item.scopeNote}
          </p>
        ) : null}
      </div>

      <div className="lg:col-span-2">
        <p className="mb-4 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
          Static system flow
        </p>
        <SystemFlow steps={item.flow} />
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] text-foreground-muted">
          {item.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function FlagshipSystems() {
  return (
    <div>
      {flagships.map((item) => (
        <FlagshipSystem item={item} key={item.project.id} />
      ))}
    </div>
  );
}
