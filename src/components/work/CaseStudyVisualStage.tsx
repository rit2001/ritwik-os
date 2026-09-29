"use client";

import { useState } from "react";

import { SystemVisualStage } from "@/components/signal/SystemVisualStage";
import type { SignalProjectId } from "@/components/signal/SignalProvider";

const stageLabels: Record<SignalProjectId, readonly string[]> = {
  thesislens: ["Split", "Rerank", "Ground", "Evaluate"],
  traceforge: ["Capture", "Seal", "Replay", "Compare"],
  converge: ["Offline", "Order", "Commit", "Deliver"],
};

const coverNarratives: Record<SignalProjectId, string> = {
  thesislens:
    "Filing → candidates → reordered evidence → cited research answer",
  traceforge:
    "Live boundaries → sealed Replay Capsule → original / replay → diff",
  converge: "Clients → board authority → PostgreSQL commit → replica catch-up",
};

const proofs: Record<
  SignalProjectId,
  readonly { label: string; value: string }[]
> = {
  thesislens: [
    { label: "Holdout nDCG@5", value: "0.704 → 0.811" },
    { label: "Evaluation", value: "8-query frozen holdout" },
    { label: "Full benchmark", value: "44 queries · 1,012 pairs" },
  ],
  traceforge: [
    { label: "Replay", value: "Recorded boundaries only" },
    { label: "Matching", value: "Sequence + fingerprint" },
    { label: "Fallback", value: "No live dependency call" },
  ],
  converge: [
    { label: "PostgreSQL", value: "245 integration tests" },
    { label: "Failure suite", value: "59 scenarios" },
    { label: "Browser", value: "93 Chromium scenarios" },
    { label: "k6", value: "Bounded local evidence" },
  ],
};

export function CaseStudyVisualStage({
  project,
}: Readonly<{ project: SignalProjectId }>) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="mt-10"
      aria-label={`${project} interactive system cover`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 font-mono text-[0.62rem] tracking-[0.1em] uppercase">
        <span className="text-signal-cyan">Interactive system cover</span>
        <span className="text-foreground-muted">
          {coverNarratives[project]}
        </span>
      </div>
      <SystemVisualStage
        activeStep={activeStep}
        className="min-h-[25rem] sm:min-h-[34rem]"
        project={project}
      />
      <div className="grid border-x border-b border-border bg-background-elevated/45 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="grid grid-cols-2 border-b border-border sm:border-r sm:border-b-0">
          {stageLabels[project].map((label, index) => (
            <button
              className={`min-h-14 border-r border-b border-border px-3 font-mono text-[0.65rem] font-semibold tracking-[0.09em] uppercase transition-colors last:border-r-0 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 ${
                activeStep === index
                  ? "bg-accent-muted/45 text-signal-cyan"
                  : "text-foreground-muted hover:bg-surface/55 hover:text-foreground focus-visible:bg-surface/55 focus-visible:text-foreground"
              }`}
              key={label}
              onClick={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
              type="button"
              aria-pressed={activeStep === index}
            >
              0{index + 1} / {label}
            </button>
          ))}
        </div>
        <dl className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
          {proofs[project].map((proof) => (
            <div className="bg-background px-4 py-4" key={proof.label}>
              <dt className="font-mono text-[0.62rem] tracking-[0.09em] text-foreground-muted uppercase">
                {proof.label}
              </dt>
              <dd className="mt-2 text-xs leading-5 font-semibold text-foreground-secondary">
                {proof.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
