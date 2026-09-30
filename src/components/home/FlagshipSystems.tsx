"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { SystemVisualStage } from "@/components/signal/SystemVisualStage";
import {
  type SignalProjectId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import { ActionLink } from "@/components/ui/ActionLink";
import { getProject, type Project } from "@/data/projects";

type InteractiveEvidenceItem = {
  label: string;
  summary: string;
  detail: string;
  stage: number;
};

type FlagshipPresentation = {
  project: Project;
  id: SignalProjectId;
  sequence: string;
  thesis: string;
  proof: { label: string; value: string; context: string };
  evidence: readonly InteractiveEvidenceItem[];
  stack: readonly string[];
  scopeNote?: string;
};

const thesisLens = getProject("thesislens");
const traceForge = getProject("traceforge");
const converge = getProject("converge");

const flagships: readonly FlagshipPresentation[] = [
  {
    id: "thesislens",
    project: thesisLens,
    sequence: "01",
    thesis:
      "An evidence-grounded investment-research system combining structured financial data, retrieval evaluation, and claim-level grounding.",
    proof: {
      label: "Holdout nDCG@5",
      value: "0.704 → 0.811",
      context:
        "Eight-query frozen holdout: local BM25 versus the fine-tuned MiniLM reranker.",
    },
    evidence: [
      {
        label: "Evaluation set",
        summary: "44 queries · 1,012 judged pairs",
        stage: 1,
        detail:
          "The exhaustive Apple and Tesla FY2024 benchmark is content-adjudicated. The published before/after metric uses only its eight-query frozen holdout.",
      },
      {
        label: "Recall movement",
        summary: "Recall@3 0.448 → 0.604",
        stage: 1,
        detail:
          "The same frozen holdout compares local BM25 with the fine-tuned MiniLM reranker; it is benchmark evidence, not production impact.",
      },
      {
        label: "Grounding path",
        summary: "SQL · RAG · combined routing",
        stage: 2,
        detail:
          "Deterministic routing separates structured KPI answers from retrieval and combined research, then validates current-request evidence provenance.",
      },
      {
        label: "Ranking trade-off",
        summary: "~3.19s reranking-only CPU mean",
        stage: 3,
        detail:
          "Top-rank MRR declined on the holdout, so the experimental reranker remains offline and lexical retrieval remains the serving default.",
      },
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
    id: "traceforge",
    project: traceForge,
    sequence: "02",
    thesis:
      "Seal controlled agent execution into immutable evidence, replay recorded external boundaries offline, and turn reviewed failures into regression tests.",
    proof: {
      label: "Exact replay contract",
      value: "Seal → Replay",
      context:
        "Recorded model and HTTP requests are matched by sequence and fingerprint with no live fallback.",
    },
    evidence: [
      {
        label: "Evidence integrity",
        summary: "Versioned capsule · RFC 8785 · SHA-256",
        stage: 1,
        detail:
          "Sanitized dependency requests receive canonical fingerprints, while the whole capsule is content-addressed and fails validation when altered.",
      },
      {
        label: "Frozen boundaries",
        summary: "Recorded model and HTTP outcomes",
        stage: 0,
        detail:
          "Exact replay consumes dependency fixtures in order and terminates on missing, extra, reordered, mismatched, or unused outcomes.",
      },
      {
        label: "Replay contract",
        summary: "Original / replay · structural compare",
        stage: 2,
        detail:
          "Normalized structural comparison is separate from developer-authored regression specifications and optional offline pytest export.",
      },
      {
        label: "Capture transport",
        summary: "Go queue · Kafka at least once · SQLite dedupe",
        stage: 0,
        detail:
          "The optional distributed path accepts into a bounded queue, transports capture events at least once, and applies durable single-writer event idempotency.",
      },
    ],
    stack: traceForge.stack.slice(0, 7),
    scopeNote:
      "Bounded today: controlled Python/LangGraph capture and optional local Go/Kafka delivery. Generic tools, fork replay, richer diffs, and benchmarks remain planned.",
  },
  {
    id: "converge",
    project: converge,
    sequence: "03",
    thesis:
      "A PostgreSQL-authoritative collaboration system designed around board-local order, durable pending intent, recovery, and multi-replica delivery.",
    proof: {
      label: "PostgreSQL integration tests",
      value: "245",
      context:
        "Recorded v1 release gate across 29 files against real PostgreSQL.",
    },
    evidence: [
      {
        label: "Authority",
        summary: "Strict monotonic order per board",
        stage: 1,
        detail:
          "A transaction-scoped advisory lock allocates the next sequence. Operation, projection, heads, receipt, undo evidence, and outbox commit together.",
      },
      {
        label: "Offline intent",
        summary: "IndexedDB persistence before optimism",
        stage: 0,
        detail:
          "Stable operation IDs survive reload and reconnect in the same browser profile; PostgreSQL acknowledgement remains the commit boundary.",
      },
      {
        label: "Recovery",
        summary: "Fixed watermark · verified snapshot + tail",
        stage: 2,
        detail:
          "Generation fences reject stale async work; canonical hashing verifies reconstructed state before the client rebases and reapplies pending intent.",
      },
      {
        label: "Delivery",
        summary: "Redis Stream · at least once",
        stage: 3,
        detail:
          "Every API replica reads retained evidence independently. Duplicates are suppressed and gaps recover from PostgreSQL; exactly-once delivery is not claimed.",
      },
    ],
    stack: [
      "TypeScript",
      "Fastify",
      "Socket.IO",
      "PostgreSQL",
      "Redis",
      "IndexedDB",
    ],
    scopeNote:
      "Production records one API and one worker. Two-replica behavior is locally failure-tested; no horizontal production-scale claim is made.",
  },
];

function EvidenceInteraction({
  items,
  projectId,
  onActiveStep,
}: Readonly<{
  items: readonly InteractiveEvidenceItem[];
  projectId: string;
  onActiveStep: (step: number) => void;
}>) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="mt-7 border-y border-border">
      {items.map((item, index) => {
        const open = expanded === index;
        const detailsId = `${projectId}-evidence-${index}`;

        return (
          <div
            className="border-b border-border last:border-b-0"
            key={item.label}
          >
            <button
              className={`group grid w-full grid-cols-[1.5rem_minmax(0,1fr)_auto] gap-3 py-4 text-left transition-colors duration-[var(--duration-base)] hover:bg-accent-muted/20 focus-visible:bg-accent-muted/20 ${
                open ? "bg-accent-muted/20" : ""
              }`}
              aria-controls={detailsId}
              aria-expanded={open}
              onClick={() => {
                onActiveStep(item.stage);
                setExpanded(open ? null : index);
              }}
              onFocus={() => onActiveStep(item.stage)}
              onMouseEnter={() => onActiveStep(item.stage)}
              type="button"
            >
              <span
                className={`mt-0.5 font-mono text-signal-cyan transition-transform duration-[var(--duration-base)] ${open ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
              <span>
                <span className="block font-mono text-[0.68rem] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm leading-6 font-medium text-foreground-secondary group-hover:text-foreground group-focus-visible:text-foreground">
                  {item.summary}
                </span>
              </span>
              <span className="font-mono text-[0.65rem] text-foreground-muted uppercase">
                {open ? "Close" : "Inspect"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-[var(--duration-slow)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              id={detailsId}
            >
              <div className="overflow-hidden">
                <p className="px-10 pb-5 text-sm leading-6 text-foreground-muted">
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FlagshipSystem({ item }: Readonly<{ item: FlagshipPresentation }>) {
  const hostRef = useRef<HTMLElement>(null);
  const playedRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const [activeStep, setActiveStep] = useState(-1);
  const { activeProject, setActiveProject } = useSignalState();
  const active = activeProject === item.id;
  const centered = item.id === "traceforge";
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (!inView || reduced || playedRef.current) return;
    playedRef.current = true;
    const sequence =
      item.id === "thesislens"
        ? [0, 1, 2]
        : item.id === "traceforge"
          ? [0, 1, 2, 3]
          : [0, 1, 3, 2];
    timersRef.current = sequence.map((step, index) =>
      window.setTimeout(() => setActiveStep(step), 960 + index * 720),
    );
    return () => timersRef.current.forEach(window.clearTimeout);
  }, [inView, item.id, reduced]);

  const selectStep = (step: number) => {
    timersRef.current.forEach(window.clearTimeout);
    setActiveStep(step);
  };
  const visualStep = activeStep < 0 ? (reduced ? 0 : -1) : activeStep;

  const intro = (
    <div className={centered ? "text-center" : undefined}>
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] uppercase ${centered ? "justify-center" : ""}`}
      >
        <span className="text-signal-cyan">System / {item.sequence}</span>
        <span className="text-foreground-muted">{item.project.category}</span>
      </div>
      <h3
        className={`mt-6 text-[clamp(3rem,6.5vw,6.4rem)] leading-[0.87] font-semibold tracking-[-0.055em] transition-colors duration-[var(--duration-base)] ${active ? "text-white" : "text-foreground"}`}
      >
        {item.project.title}
      </h3>
      <p
        className={`mt-7 text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary ${centered ? "mx-auto max-w-3xl" : ""}`}
      >
        {item.thesis}
      </p>
    </div>
  );

  const proof = (
    <div
      className={`relative mt-8 border-signal-cyan ${centered ? "mx-auto max-w-2xl border-y py-5 text-center" : "border-l-2 pl-5"}`}
    >
      {!centered ? (
        <span
          className="signal-ripple absolute top-0 -left-[0.43rem] h-3 w-3 rounded-full border border-signal-cyan"
          aria-hidden="true"
        />
      ) : null}
      <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
        Primary proof / {item.proof.label}
      </p>
      <p className="mt-3 font-mono text-[clamp(1.8rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.04em] text-foreground">
        {item.proof.value}
      </p>
      <p className="mt-4 text-sm leading-6 text-foreground-muted">
        {item.proof.context}
      </p>
    </div>
  );

  const evidence = (
    <EvidenceInteraction
      items={item.evidence}
      onActiveStep={selectStep}
      projectId={item.id}
    />
  );

  const details = (
    <div className={centered ? "text-center" : undefined}>
      {item.scopeNote ? (
        <p
          className={`mt-5 text-sm leading-6 text-foreground-muted ${centered ? "border-y border-signal-amber/45 py-4" : "border-l border-signal-amber/60 pl-4"}`}
        >
          {item.scopeNote}
        </p>
      ) : null}

      <ul
        className={`mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.68rem] tracking-[0.06em] text-foreground-muted uppercase ${centered ? "justify-center" : ""}`}
      >
        {item.stack.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <div
        className={`mt-8 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}
      >
        {item.project.caseStudyPath ? (
          <ActionLink href={item.project.caseStudyPath} variant="primary">
            Enter Case Study
          </ActionLink>
        ) : null}
        {item.project.repositoryUrl ? (
          <ActionLink
            href={item.project.repositoryUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub ↗
          </ActionLink>
        ) : null}
      </div>
    </div>
  );

  const stage = (
    <div>
      <SystemVisualStage activeStep={visualStep} project={item.id} />
      <div className="mt-3 flex items-center justify-between font-mono text-[0.64rem] tracking-[0.1em] text-foreground-muted uppercase">
        <span>Evidence-linked view</span>
        <span>
          Signal {String(Math.max(visualStep + 1, 0)).padStart(2, "0")}
        </span>
      </div>
    </div>
  );

  return (
    <article
      className={`relative scroll-mt-28 border-t border-border py-20 lg:py-28 ${item.id === "traceforge" ? "lg:min-h-[125vh]" : "lg:min-h-[110vh]"}`}
      id={item.project.id}
      onFocusCapture={() => setActiveProject(item.id)}
      onMouseEnter={() => setActiveProject(item.id)}
      ref={hostRef}
    >
      {item.id === "thesislens" ? (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(36rem,0.62fr)] lg:items-start lg:gap-14">
          <div className="relative z-10">
            <Reveal>{intro}</Reveal>
            <Reveal delay={0.07}>{proof}</Reveal>
            <Reveal delay={0.21}>{evidence}</Reveal>
            <Reveal delay={0.28}>{details}</Reveal>
          </div>
          <Reveal
            className="lg:sticky lg:top-[calc(var(--layout-header-height)+2.5rem)]"
            delay={0.14}
          >
            {stage}
          </Reveal>
        </div>
      ) : item.id === "traceforge" ? (
        <div>
          <Reveal className="mx-auto max-w-5xl">{intro}</Reveal>
          <Reveal delay={0.07}>{proof}</Reveal>
          <Reveal className="mx-auto mt-12 max-w-6xl lg:mt-16" delay={0.14}>
            {stage}
          </Reveal>
          <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-start">
            <Reveal delay={0.21}>{evidence}</Reveal>
            <Reveal delay={0.28}>{details}</Reveal>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid gap-12 lg:grid-cols-[minmax(36rem,0.62fr)_minmax(0,0.38fr)] lg:items-start lg:gap-14">
            <Reveal
              className="lg:sticky lg:top-[calc(var(--layout-header-height)+2.5rem)]"
              delay={0.14}
            >
              {stage}
            </Reveal>
            <div className="relative z-10">
              <Reveal>{intro}</Reveal>
              <Reveal delay={0.07}>{proof}</Reveal>
              <Reveal delay={0.28}>{details}</Reveal>
            </div>
          </div>
          <div className="mt-10 grid gap-8 border-t border-border pt-3 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)]">
            <Reveal delay={0.21}>{evidence}</Reveal>
            <Reveal delay={0.28}>
              <p className="mt-7 self-start border-l border-signal-cyan/50 pl-5 text-sm leading-6 text-foreground-muted">
                Select Authority, Offline intent, Recovery, or Delivery to move
                the topology between commit ordering, queued local work,
                verified catch-up, and replica broadcast.
              </p>
            </Reveal>
          </div>
        </div>
      )}
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
