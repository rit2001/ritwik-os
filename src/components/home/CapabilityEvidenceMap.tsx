"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAmbientPulse } from "@/components/motion/useAmbientPulse";
import {
  type SignalProjectId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import { capabilityGroups } from "@/data/capabilities";

type EvidenceRecord = {
  project: string;
  techniques: readonly string[];
  evidence: string;
};

const capabilityEvidence: Record<string, readonly EvidenceRecord[]> = {
  "Backend & Distributed Systems": [
    {
      project: "TraceForge",
      techniques: ["Kafka", "Replay boundaries", "OpenTelemetry"],
      evidence:
        "Bounded capture queues, at-least-once transport, SQLite event-ID dedupe, and recorded dependency replay.",
    },
    {
      project: "Converge",
      techniques: [
        "PostgreSQL sequencing",
        "Redis Stream",
        "Idempotent commands",
      ],
      evidence:
        "Board-local ordering, stable operation receipts, transactional outbox commit, and gap recovery.",
    },
  ],
  "AI & Retrieval Systems": [
    {
      project: "ThesisLens",
      techniques: ["Hybrid retrieval", "Cross-encoder reranking", "Citations"],
      evidence:
        "A content-adjudicated benchmark measures ranking changes before current-request evidence IDs ground the answer.",
    },
    {
      project: "Stateful Agentic AI Assistant",
      techniques: ["LangGraph", "FAISS RAG", "HITL"],
      evidence:
        "Tool routing, HuggingFace embeddings, thread-scoped checkpoints, and simulated purchase approval.",
    },
    {
      project: "TraceForge",
      techniques: ["Model capture", "Request fingerprints", "Offline replay"],
      evidence:
        "Recorded model and HTTP boundaries fail closed when sequence or canonical request fingerprints differ.",
    },
  ],
  "Data & State": [
    {
      project: "Converge",
      techniques: ["PostgreSQL", "IndexedDB", "Transactional outbox"],
      evidence:
        "Pending intent persists before optimism; authoritative state and delivery evidence commit together.",
    },
    {
      project: "ThesisLens",
      techniques: ["PostgreSQL", "Structured KPIs", "Evidence provenance"],
      evidence:
        "Deterministic routing separates structured SQL answers from retrieval and combined research paths.",
    },
    {
      project: "Stateful Agentic AI Assistant",
      techniques: ["SQLite checkpoints", "FAISS", "Thread state"],
      evidence:
        "Thread-scoped memory and local retrieval state are bounded to the audited container deployment.",
    },
  ],
  "Cloud & Platform": [
    {
      project: "TraceForge",
      techniques: ["Docker", "Kubernetes", "Terraform"],
      evidence:
        "Non-root images, one locally verified kind deployment, and a narrow Terraform-managed kind foundation.",
    },
    {
      project: "Stateful Agentic AI Assistant",
      techniques: ["GitHub Actions", "Docker Hub", "AWS EC2"],
      evidence:
        "Image publishing, EC2 container replacement, and health verification support on-demand deployment.",
    },
    {
      project: "ThesisLens",
      techniques: ["Docker", "Azure OpenAI", "Azure AI Search"],
      evidence:
        "Containerized services integrate hosted generation and search while the audited benchmark remains reproducible locally.",
    },
  ],
  "Product Engineering": [
    {
      project: "Converge",
      techniques: ["TypeScript", "Konva", "Playwright"],
      evidence:
        "The canvas product combines offline intent, collaborative recovery, and 93 recorded production-build Chromium scenarios.",
    },
    {
      project: "AI Mock Interview Platform",
      techniques: ["Node / Express", "PDF reports", "LLM workflow"],
      evidence:
        "Role-aware questions, submitted-answer evaluation, structured feedback, and downloadable reports form the product loop.",
    },
  ],
  "Algorithmic Foundations": [
    {
      project: "LeetCode",
      techniques: ["1,550+ solved", "Knight", "600+ POTD"],
      evidence:
        "Peak 1923 and Top 5.6% provide a bounded problem-solving signal supported by long-horizon practice.",
    },
    {
      project: "Codeforces",
      techniques: ["Specialist", "Peak 1415", "Global Rank 818"],
      evidence:
        "The recorded Round 952 result anchors competitive speed and implementation under contest constraints.",
    },
  ],
};

const signalProjectByLabel: Partial<Record<string, SignalProjectId>> = {
  ThesisLens: "thesislens",
  TraceForge: "traceforge",
  Converge: "converge",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CapabilityEvidenceMap() {
  const hostRef = useRef<HTMLDivElement>(null);
  const capabilityRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { setActiveCapability, setActiveProject } = useSignalState();
  const [activeCapabilityTitle, setActiveCapabilityTitle] = useState<string>(
    capabilityGroups[0].title,
  );
  const records = useMemo(
    () => capabilityEvidence[activeCapabilityTitle] ?? [],
    [activeCapabilityTitle],
  );
  const [selectedProject, setSelectedProject] = useState(records[0]?.project);
  const [manualSelection, setManualSelection] = useState(false);
  const selectedRecord =
    records.find((record) => record.project === selectedProject) ?? records[0];
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "120px" });
  const ambientTick = useAmbientPulse(
    inView && !reduced && !manualSelection,
    9600,
    7600,
  );

  useEffect(() => {
    if (!ambientTick || manualSelection) return;
    const timer = window.setTimeout(() => {
      const currentIndex = capabilityGroups.findIndex(
        (group) => group.title === activeCapabilityTitle,
      );
      const nextGroup =
        capabilityGroups[(currentIndex + 1) % capabilityGroups.length];
      const nextRecords = capabilityEvidence[nextGroup.title] ?? [];
      setActiveCapabilityTitle(nextGroup.title);
      setSelectedProject(nextRecords[0]?.project);
      setActiveCapability(slugify(nextGroup.title));
      setActiveProject(
        signalProjectByLabel[nextRecords[0]?.project ?? ""] ?? null,
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, [
    activeCapabilityTitle,
    ambientTick,
    manualSelection,
    setActiveCapability,
    setActiveProject,
  ]);

  const activateCapability = (title: string) => {
    setManualSelection(true);
    const nextRecords = capabilityEvidence[title] ?? [];
    setActiveCapabilityTitle(title);
    setSelectedProject(nextRecords[0]?.project);
    setActiveCapability(slugify(title));
    const signalProject = signalProjectByLabel[nextRecords[0]?.project ?? ""];
    setActiveProject(signalProject ?? null);
  };

  const activateProject = (project: string) => {
    setManualSelection(true);
    setSelectedProject(project);
    setActiveProject(signalProjectByLabel[project] ?? null);
  };

  const moveCapabilityFocus = (index: number, direction: -1 | 1) => {
    const next =
      (index + direction + capabilityGroups.length) % capabilityGroups.length;
    capabilityRefs.current[next]?.focus();
  };

  return (
    <div
      className="relative mt-12 overflow-hidden border-y border-border bg-background-elevated/20 px-4 py-7 sm:px-7 lg:px-9 lg:py-9"
      ref={hostRef}
    >
      <div className="signal-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mb-6 grid gap-3 border-b border-border pb-4 font-mono text-[0.62rem] font-semibold tracking-[0.12em] text-foreground-muted uppercase lg:grid-cols-[minmax(14rem,0.8fr)_2rem_minmax(13rem,0.72fr)_2rem_minmax(18rem,1.48fr)]">
        <span>01 · Capability</span>
        <span className="hidden text-center text-signal-cyan lg:block">→</span>
        <span>02 · Demonstrated systems</span>
        <span className="hidden text-center text-signal-cyan lg:block">→</span>
        <span>03 · Concrete evidence</span>
      </div>

      <div className="relative grid gap-7 lg:grid-cols-[minmax(14rem,0.8fr)_2rem_minmax(13rem,0.72fr)_2rem_minmax(18rem,1.48fr)] lg:items-center">
        <div className="grid gap-2">
          {capabilityGroups.map((group, index) => {
            const active = group.title === activeCapabilityTitle;
            return (
              <button
                className={`relative min-h-14 border-l px-4 py-3 text-left transition-[border-color,background-color,transform] hover:translate-x-1 focus-visible:translate-x-1 ${
                  active
                    ? "border-signal-cyan bg-accent-muted/35"
                    : "border-border-strong bg-background/40"
                }`}
                key={group.title}
                onClick={() => activateCapability(group.title)}
                onFocus={() => activateCapability(group.title)}
                onMouseEnter={() => activateCapability(group.title)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    event.preventDefault();
                    moveCapabilityFocus(index, 1);
                  }
                  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    moveCapabilityFocus(index, -1);
                  }
                }}
                ref={(node) => {
                  capabilityRefs.current[index] = node;
                }}
                type="button"
                aria-pressed={active}
              >
                <span className="font-mono text-[0.58rem] tracking-[0.1em] text-signal-cyan uppercase">
                  Capability {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-sm font-semibold text-foreground">
                  {group.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="relative hidden h-px overflow-visible bg-border-strong lg:block"
          aria-hidden="true"
          key={activeCapabilityTitle}
        >
          <span className="capability-path absolute inset-y-0 left-0 w-full bg-gradient-to-r from-signal-cyan to-signal-amber" />
          <span className="capability-packet absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal-cyan shadow-[0_0_12px_var(--ritwik-color-signal-cyan)]" />
        </div>

        <div className="relative grid gap-3 border-y border-border py-5 lg:border-y-0 lg:py-0">
          {records.map((record, index) => {
            const active = selectedRecord?.project === record.project;
            return (
              <button
                className={`relative min-h-16 border px-4 py-3 text-left transition-[border-color,background-color,box-shadow] ${
                  active
                    ? "border-signal-amber bg-[rgb(242_185_95_/_0.08)] shadow-[0_0_26px_rgb(242_185_95_/_0.08)]"
                    : "border-border bg-background/70"
                }`}
                key={record.project}
                onClick={() => activateProject(record.project)}
                onFocus={() => activateProject(record.project)}
                onMouseEnter={() => activateProject(record.project)}
                type="button"
                aria-pressed={active}
              >
                <span className="font-mono text-[0.58rem] tracking-[0.1em] text-foreground-muted uppercase">
                  System {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-sm font-semibold text-foreground">
                  {record.project}
                </span>
                {active ? (
                  <span
                    className="signal-ripple absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full border border-signal-amber"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          className="relative hidden h-px overflow-visible bg-border-strong lg:block"
          aria-hidden="true"
          key={`${activeCapabilityTitle}-${selectedRecord?.project}`}
        >
          <span className="capability-path capability-path-delay absolute inset-y-0 left-0 w-full bg-gradient-to-r from-signal-amber to-signal-cyan" />
          <span className="capability-packet capability-packet-delay absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal-amber shadow-[0_0_12px_var(--ritwik-color-signal-amber)]" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="min-h-64 border-l-2 border-signal-cyan bg-[linear-gradient(110deg,rgb(13_42_80_/_0.28),transparent)] px-5 py-5 sm:px-6"
            exit={reduced ? undefined : { opacity: 0, x: 6 }}
            initial={reduced ? false : { opacity: 0, x: 10 }}
            key={`${activeCapabilityTitle}-${selectedRecord?.project}`}
            transition={{
              delay: reduced ? 0 : 0.32,
              duration: reduced ? 0 : 0.22,
            }}
          >
            <p className="font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-signal-cyan uppercase">
              {activeCapabilityTitle} → {selectedRecord?.project}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {selectedRecord?.techniques.map((technique) => (
                <span
                  className="border border-border-strong bg-background/75 px-2.5 py-1.5 font-mono text-[0.65rem] text-foreground-secondary"
                  key={technique}
                >
                  {technique}
                </span>
              ))}
            </div>
            <p className="mt-6 text-base leading-7 text-foreground-secondary">
              {selectedRecord?.evidence}
            </p>
            <p className="mt-6 border-t border-border pt-4 font-mono text-[0.6rem] tracking-[0.1em] text-foreground-muted uppercase">
              Relationship illuminated · capability to implementation proof
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
