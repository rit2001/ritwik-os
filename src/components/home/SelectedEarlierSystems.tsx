"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";

import { useAmbientPulse } from "@/components/motion/useAmbientPulse";
import { ActionLink } from "@/components/ui/ActionLink";
import { getProject } from "@/data/projects";

const earlierSystems = [
  {
    project: getProject("stateful-agentic-ai-assistant"),
    sequence: "01",
    year: "2026",
    signal: "AI systems foundation",
    technologies: ["LangGraph", "RAG", "HITL", "AWS"],
    progression:
      "Portfolio progression toward evidence-grounded AI and replayable workflows in ThesisLens and TraceForge; no direct code lineage is claimed.",
    related: ["ThesisLens", "TraceForge"],
    position: "lg:top-5 lg:left-[7%]",
  },
  {
    project: getProject("ai-mock-interview-platform"),
    sequence: "02",
    year: "2025",
    signal: "Product / backend foundation",
    technologies: ["Node / Express", "PDF parsing", "LLM interview workflow"],
    progression:
      "A complete product loop spanning inputs, generated interviews, evaluation, structured feedback, and reports.",
    related: ["Product engineering"],
    position: "lg:top-[12.5rem] lg:left-[32%]",
  },
  {
    project: getProject("real-time-collaborative-whiteboard"),
    sequence: "03",
    year: "2025",
    signal: "Collaboration foundation",
    technologies: ["Socket.IO", "Shared canvas", "Persistent state"],
    progression:
      "Earlier collaboration work superseded in portfolio depth by Converge; this is engineering progression, not a direct code-lineage claim.",
    related: ["Converge"],
    position: "lg:top-[24rem] lg:left-[8%]",
  },
] as const;

function MicroVisual({
  ambientTick,
  id,
  reduced,
}: Readonly<{ ambientTick: number; id: string; reduced: boolean }>) {
  if (id === "stateful-agentic-ai-assistant") {
    return (
      <svg aria-hidden="true" className="h-20 w-full" viewBox="0 0 310 78">
        <path
          d="M38 39 H93 M149 39 H190 M149 39 C166 39 170 64 190 64 M242 39 H278"
          fill="none"
          stroke="var(--ritwik-color-accent)"
        />
        {!reduced && ambientTick > 0 ? (
          <circle
            className="earlier-system-packet"
            fill="var(--ritwik-color-signal-cyan)"
            key={`agentic-micro-${ambientTick}`}
            r="3"
          >
            <animateMotion
              dur="2.2s"
              fill="freeze"
              path="M38 39 H93 H190 H278"
              repeatCount="1"
            />
          </circle>
        ) : null}
        {[
          [6, 26, 32, "USER"],
          [93, 24, 56, "LANGGRAPH"],
          [190, 14, 52, "RAG / TOOLS"],
          [190, 52, 52, "HITL"],
          [278, 26, 28, "OUT"],
        ].map(([x, y, width, label]) => (
          <g key={String(label)}>
            <rect
              fill="rgb(7 20 34 / .94)"
              height="26"
              rx="4"
              stroke="var(--ritwik-color-signal-cyan)"
              width={Number(width)}
              x={Number(x)}
              y={Number(y)}
            />
            <text
              fill="var(--ritwik-color-foreground-secondary)"
              fontFamily="monospace"
              fontSize="6.5"
              textAnchor="middle"
              x={Number(x) + Number(width) / 2}
              y={Number(y) + 16}
            >
              {String(label)}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  if (id === "ai-mock-interview-platform") {
    return (
      <svg aria-hidden="true" className="h-20 w-full" viewBox="0 0 310 78">
        <path
          d="M36 39 H274"
          stroke="var(--ritwik-color-signal-amber)"
          strokeDasharray="3 7"
        />
        {!reduced && ambientTick > 0 ? (
          <circle
            className="earlier-system-packet"
            fill="var(--ritwik-color-signal-amber)"
            key={`mock-micro-${ambientTick}`}
            r="3"
          >
            <animateMotion
              dur="2.55s"
              fill="freeze"
              path="M36 39 H274"
              repeatCount="1"
            />
          </circle>
        ) : null}
        {["RESUME", "QUESTIONS", "ANSWER", "EVALUATE", "REPORT"].map(
          (label, index) => (
            <g key={label} transform={`translate(${5 + index * 61} 23)`}>
              <rect
                fill="rgb(7 20 34 / .96)"
                height="32"
                rx="4"
                stroke={
                  index === 4
                    ? "var(--ritwik-color-signal-amber)"
                    : "var(--ritwik-color-border-strong)"
                }
                width="51"
              />
              <text
                fill="var(--ritwik-color-foreground-secondary)"
                fontFamily="monospace"
                fontSize="6"
                textAnchor="middle"
                x="25.5"
                y="19"
              >
                {label}
              </text>
            </g>
          ),
        )}
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-20 w-full" viewBox="0 0 310 78">
      <path
        d="M62 39 H116 M194 39 H248"
        stroke="var(--ritwik-color-signal-cyan)"
        strokeDasharray="4 5"
      />
      {!reduced && ambientTick > 0 ? (
        <g key={`whiteboard-micro-${ambientTick}`}>
          <circle
            className="earlier-system-packet"
            cx="62"
            cy="39"
            fill="var(--ritwik-color-signal-cyan)"
            r="3"
          >
            <animate attributeName="cx" dur="1.8s" from="62" to="248" />
          </circle>
          <circle
            className="earlier-system-packet"
            cx="248"
            cy="44"
            fill="var(--ritwik-color-signal-amber)"
            r="3"
          >
            <animate attributeName="cx" dur="1.8s" from="248" to="62" />
          </circle>
        </g>
      ) : null}
      {["CLIENT A", "SHARED CANVAS", "CLIENT B"].map((label, index) => {
        const widths = [62, 86, 62];
        const x = [0, 112, 248][index];
        return (
          <g key={label} transform={`translate(${x} 21)`}>
            <rect
              fill="rgb(7 20 34 / .96)"
              height="36"
              rx="4"
              stroke={
                index === 1
                  ? "var(--ritwik-color-signal-cyan)"
                  : "var(--ritwik-color-border-strong)"
              }
              width={widths[index]}
            />
            <text
              fill="var(--ritwik-color-foreground-secondary)"
              fontFamily="monospace"
              fontSize="6.5"
              textAnchor="middle"
              x={widths[index] / 2}
              y="21"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function SelectedEarlierSystems() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(earlierSystems[0].project.id);
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "120px" });
  const ambientTick = useAmbientPulse(inView && !reduced, 8800, 6100);
  const active =
    earlierSystems.find((item) => item.project.id === activeId) ??
    earlierSystems[0];

  return (
    <div className="relative mt-10" ref={hostRef}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 font-mono text-[0.62rem] font-semibold tracking-[0.13em] uppercase">
        <span className="text-signal-cyan">Engineering progression</span>
        <span className="text-signal-amber">Not code lineage</span>
      </div>

      <div className="relative mt-6 lg:min-h-[34rem]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full lg:block"
          preserveAspectRatio="none"
          viewBox="0 0 1200 540"
        >
          <path
            d="M190 82 C390 82 465 74 740 74 M190 82 C380 82 480 160 740 178 M450 240 C580 240 600 286 740 286 M190 405 C410 405 515 408 740 408"
            fill="none"
            stroke="var(--ritwik-color-border-strong)"
            strokeWidth="1.5"
          />
          <path
            d="M190 82 C390 82 465 74 740 74 M190 82 C380 82 480 160 740 178 M450 240 C580 240 600 286 740 286 M190 405 C410 405 515 408 740 408"
            fill="none"
            opacity="0.48"
            stroke="var(--ritwik-color-signal-cyan)"
            strokeDasharray="3 11"
            strokeWidth="1.5"
          />
        </svg>

        <ol className="relative grid gap-4 lg:block">
          {earlierSystems.map((item) => {
            const selected = active.project.id === item.project.id;
            return (
              <li
                className={`lg:absolute lg:w-[21rem] ${item.position}`}
                key={item.project.id}
              >
                <button
                  aria-pressed={selected}
                  className={`group relative w-full border-l-2 px-4 py-4 text-left transition-[border-color,background-color,transform,box-shadow] hover:translate-x-1 focus-visible:translate-x-1 ${selected ? "border-signal-cyan bg-accent-muted/30 shadow-[0_18px_45px_rgb(0_0_0_/.2)]" : "border-border-strong bg-background/62"}`}
                  onClick={() => setActiveId(item.project.id)}
                  onFocus={() => setActiveId(item.project.id)}
                  onMouseEnter={() => setActiveId(item.project.id)}
                  type="button"
                >
                  <span className="flex items-center justify-between gap-3 font-mono text-[0.6rem] tracking-[0.1em] uppercase">
                    <span className="text-signal-cyan">
                      Build / {item.sequence}
                    </span>
                    <span className="text-foreground-muted">{item.year}</span>
                  </span>
                  <span className="mt-2 block text-lg font-semibold text-foreground">
                    {item.project.title}
                  </span>
                  <span className="mt-1 block font-mono text-[0.58rem] tracking-[0.08em] text-signal-amber uppercase">
                    {item.signal}
                  </span>
                  <span className="mt-3 block overflow-hidden border-t border-border pt-2">
                    <MicroVisual
                      ambientTick={ambientTick}
                      id={item.project.id}
                      reduced={reduced}
                    />
                  </span>
                  {selected ? (
                    <span
                      className="signal-ripple absolute top-1/2 -right-2 h-4 w-4 -translate-y-1/2 rounded-full border border-signal-cyan"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>

        <div
          className="mt-7 grid gap-3 lg:absolute lg:top-3 lg:right-[4%] lg:mt-0 lg:w-[28%]"
          aria-label="Current system endpoints"
        >
          <p className="font-mono text-[0.62rem] tracking-[0.11em] text-foreground-muted uppercase">
            Current endpoints
          </p>
          {["ThesisLens", "TraceForge", "Product engineering", "Converge"].map(
            (label) => {
              const lit = active.related.some((related) => related === label);
              return (
                <div
                  className={`relative border px-4 py-3 font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${lit ? "border-signal-amber bg-[rgb(242_185_95_/.08)] text-foreground" : "border-border text-foreground-muted"}`}
                  key={label}
                >
                  {label}
                  {lit ? (
                    <span
                      className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rotate-45 bg-signal-amber"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              );
            },
          )}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 border-y border-border bg-[linear-gradient(105deg,rgb(13_42_80_/.3),transparent)] px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,.72fr)_minmax(18rem,.28fr)]"
          exit={reduced ? undefined : { opacity: 0, y: 5 }}
          initial={reduced ? false : { opacity: 0, y: 7 }}
          key={active.project.id}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <div>
            <p className="font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-signal-cyan uppercase">
              Active earlier system
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground">
              {active.project.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground-secondary">
              {active.project.summary}
            </p>
            <p className="mt-4 border-l border-signal-amber pl-4 text-xs leading-5 text-foreground-muted">
              {active.progression}
            </p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-2">
              {active.technologies.map((technology) => (
                <li
                  className="border border-border-strong px-2 py-1 font-mono text-[0.62rem] text-foreground-secondary"
                  key={technology}
                >
                  {technology}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              {active.project.caseStudyPath ? (
                <ActionLink
                  href={active.project.caseStudyPath}
                  variant="primary"
                >
                  View Case Study
                </ActionLink>
              ) : null}
              {active.project.repositoryUrl ? (
                <ActionLink
                  href={active.project.repositoryUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Repository ↗
                </ActionLink>
              ) : null}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
