"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
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
  },
] as const;

type EarlierSystem = (typeof earlierSystems)[number];

function MicroVisual({
  ambientTick,
  id,
  reduced,
}: Readonly<{ ambientTick: number; id: string; reduced: boolean }>) {
  if (id === "stateful-agentic-ai-assistant") {
    return (
      <svg aria-hidden="true" className="h-32 w-full" viewBox="0 0 560 150">
        <path
          d="M90 75 H126 M226 75 H260 M360 75 H395 M455 75 H485"
          fill="none"
          stroke="var(--ritwik-color-accent)"
          strokeDasharray="4 7"
          strokeWidth="1.5"
        />
        {!reduced && ambientTick > 0 ? (
          <circle
            className="earlier-system-packet"
            fill="var(--ritwik-color-signal-cyan)"
            key={`agentic-micro-${ambientTick}`}
            r="3"
          >
            <animateMotion
              dur="2.65s"
              fill="freeze"
              path="M55 75 H176 H310 H425 H522"
              repeatCount="1"
            />
          </circle>
        ) : null}
        {[
          [20, 55, 70, "USER"],
          [126, 53, 100, "LANGGRAPH"],
          [260, 53, 100, "RAG / TOOLS"],
          [395, 55, 60, "HITL"],
          [485, 53, 75, "RESPONSE"],
        ].map(([x, y, width, label]) => (
          <g key={String(label)}>
            <rect
              fill="rgb(7 20 34 / .94)"
              height="40"
              rx="6"
              stroke="var(--ritwik-color-signal-cyan)"
              width={Number(width)}
              x={Number(x)}
              y={Number(y)}
            />
            <text
              fill="var(--ritwik-color-foreground-secondary)"
              fontFamily="monospace"
              fontSize="9"
              textAnchor="middle"
              x={Number(x) + Number(width) / 2}
              y={Number(y) + 24}
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
      <svg aria-hidden="true" className="h-32 w-full" viewBox="0 0 560 150">
        <path
          d="M52 75 H508"
          stroke="var(--ritwik-color-signal-amber)"
          strokeDasharray="4 8"
          strokeWidth="1.5"
        />
        {!reduced && ambientTick > 0 ? (
          <g key={`mock-micro-${ambientTick}`}>
            <circle
              className="earlier-system-packet"
              fill="var(--ritwik-color-signal-amber)"
              r="4"
            >
              <animateMotion
                dur="2.75s"
                fill="freeze"
                path="M52 75 H508"
                repeatCount="1"
              />
            </circle>
            <rect
              fill="none"
              height="42"
              rx="6"
              stroke="var(--ritwik-color-signal-amber)"
              width="88"
              x="464"
              y="54"
            >
              <animate
                attributeName="opacity"
                dur="2.75s"
                keyTimes="0;0.72;0.88;1"
                repeatCount="1"
                values="0;0;0.9;0"
              />
              <animate
                attributeName="stroke-width"
                dur="2.75s"
                keyTimes="0;0.72;0.88;1"
                repeatCount="1"
                values="1;1;3;1"
              />
            </rect>
          </g>
        ) : null}
        {["RESUME / ROLE", "QUESTIONS", "ANSWER", "EVALUATION", "REPORT"].map(
          (label, index) => (
            <g key={label} transform={`translate(${8 + index * 114} 54)`}>
              <rect
                fill="rgb(7 20 34 / .96)"
                height="42"
                rx="6"
                stroke={
                  index === 4
                    ? "var(--ritwik-color-signal-amber)"
                    : "var(--ritwik-color-border-strong)"
                }
                width="88"
              />
              <text
                fill="var(--ritwik-color-foreground-secondary)"
                fontFamily="monospace"
                fontSize="7.5"
                textAnchor="middle"
                x="44"
                y="25"
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
    <svg aria-hidden="true" className="h-32 w-full" viewBox="0 0 560 150">
      <path
        d="M108 75 H218 M342 75 H452"
        stroke="var(--ritwik-color-signal-cyan)"
        strokeDasharray="5 7"
        strokeWidth="1.5"
      />
      {!reduced && ambientTick > 0 ? (
        <g key={`whiteboard-micro-${ambientTick}`}>
          <circle
            className="earlier-system-packet"
            cx="108"
            cy="70"
            fill="var(--ritwik-color-signal-cyan)"
            r="4"
          >
            <animate attributeName="cx" dur="2.2s" from="108" to="452" />
          </circle>
          <circle
            className="earlier-system-packet"
            cx="452"
            cy="80"
            fill="var(--ritwik-color-signal-amber)"
            r="4"
          >
            <animate attributeName="cx" dur="2.2s" from="452" to="108" />
          </circle>
        </g>
      ) : null}
      {["CLIENT A", "SHARED CANVAS", "CLIENT B"].map((label, index) => {
        const widths = [108, 124, 108];
        const x = [0, 218, 452][index];
        return (
          <g key={label} transform={`translate(${x} 51)`}>
            <rect
              fill="rgb(7 20 34 / .96)"
              height="48"
              rx="6"
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
              fontSize="9"
              textAnchor="middle"
              x={widths[index] / 2}
              y="28"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EarlierSystemRow({
  ambientTick,
  index,
  item,
  reduced,
}: Readonly<{
  ambientTick: number;
  index: number;
  item: EarlierSystem;
  reduced: boolean;
}>) {
  const rowRef = useRef<HTMLElement>(null);
  const [interactionTick, setInteractionTick] = useState(0);
  const rowInView = useInView(rowRef, { margin: "100px" });
  const visualFirst = index !== 1;
  const visualTick = rowInView
    ? ambientTick + interactionTick * 1000 + index * 100 + 1
    : 0;
  const activateVisual = () => setInteractionTick((current) => current + 1);

  const visualPlacement = visualFirst
    ? "min-[901px]:col-start-1"
    : "min-[901px]:col-start-2";
  const contentPlacement = visualFirst
    ? "min-[901px]:col-start-2"
    : "min-[901px]:col-start-1";

  return (
    <li>
      <Reveal delay={index * 0.06} y={28}>
        <article
          className="group relative grid min-w-0 gap-x-10 gap-y-7 overflow-hidden py-12 outline-none min-[901px]:grid-cols-2 min-[901px]:grid-rows-[auto_1fr] min-[901px]:items-center min-[901px]:py-16 lg:gap-x-16"
          onFocusCapture={activateVisual}
          onMouseEnter={activateVisual}
          ref={rowRef}
          tabIndex={0}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(47_127_255_/.1),transparent_48%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
          />

          <div
            className={`relative row-start-1 min-w-0 ${contentPlacement} min-[901px]:row-start-1`}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.62rem] font-semibold tracking-[0.11em] uppercase">
              <span className="text-signal-cyan">
                Earlier build / {item.sequence}
              </span>
              <span className="text-foreground-muted">{item.year}</span>
            </div>
            <h3 className="mt-5 max-w-2xl text-[clamp(2rem,4vw,3.6rem)] leading-[0.94] font-semibold tracking-[-0.035em] text-foreground">
              {item.project.title}
            </h3>
            <p className="mt-3 font-mono text-[0.62rem] tracking-[0.1em] text-signal-amber uppercase">
              {item.signal}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-foreground-secondary sm:text-base">
              {item.project.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.technologies.map((technology) => (
                <li
                  className="border border-border-strong px-2.5 py-1.5 font-mono text-[0.62rem] text-foreground-secondary"
                  key={technology}
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`relative row-start-2 flex min-h-44 min-w-0 items-center overflow-hidden border-y border-border px-1 py-4 transition-[border-color,filter] duration-300 group-hover:border-signal-cyan/45 group-hover:drop-shadow-[0_0_26px_rgb(47_127_255_/.08)] group-focus-within:border-signal-cyan/45 group-focus-within:drop-shadow-[0_0_26px_rgb(47_127_255_/.08)] sm:px-5 ${visualPlacement} min-[901px]:row-span-2 min-[901px]:row-start-1`}
          >
            <span
              aria-hidden="true"
              className="signal-grid pointer-events-none absolute inset-0 opacity-20"
            />
            <MicroVisual
              ambientTick={visualTick}
              id={item.project.id}
              reduced={reduced || !rowInView}
            />
          </div>

          <div
            className={`relative row-start-3 self-end border-t border-border pt-6 ${contentPlacement} min-[901px]:row-start-2`}
          >
            <p className="max-w-2xl text-xs leading-5 text-foreground-muted">
              {item.progression}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[0.6rem] tracking-[0.09em] uppercase">
              <span className="text-foreground-muted">
                Engineering progression →
              </span>
              {item.related.map((label) => (
                <span
                  className="border-b border-signal-amber/40 px-1 py-1 text-signal-amber transition-[border-color,color] group-hover:border-signal-amber group-hover:text-foreground group-focus-within:border-signal-amber group-focus-within:text-foreground"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
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
                  Repository ↗
                </ActionLink>
              ) : null}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
}

export function SelectedEarlierSystems() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "120px" });
  const ambientTick = useAmbientPulse(inView && !reduced, 8800, 6100);

  return (
    <div className="relative mt-10" ref={hostRef}>
      <motion.div
        className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-3 font-mono text-[0.62rem] tracking-[0.13em] uppercase"
        initial={reduced ? false : { opacity: 0, y: 22 }}
        transition={{ duration: reduced ? 0 : 0.56, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.35 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="font-semibold text-signal-cyan">
          Engineering progression
        </span>
        <span className="text-foreground-muted">Not code lineage</span>
      </motion.div>

      <ol className="mt-5 divide-y divide-border border-y border-border">
        {earlierSystems.map((item, index) => (
          <EarlierSystemRow
            ambientTick={ambientTick}
            index={index}
            item={item}
            key={item.project.id}
            reduced={reduced}
          />
        ))}
      </ol>
    </div>
  );
}
