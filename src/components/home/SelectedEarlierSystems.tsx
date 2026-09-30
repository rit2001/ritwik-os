"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { useAmbientPulse } from "@/components/motion/useAmbientPulse";
import { ActionLink } from "@/components/ui/ActionLink";
import { getProject } from "@/data/projects";

const earlierSystems = [
  {
    project: getProject("stateful-agentic-ai-assistant"),
    sequence: "01",
    signal: "AI systems foundation",
    purpose:
      "Stateful orchestration, retrieval, tools, and approval boundaries in one implemented assistant workflow.",
    techniques: [
      "LangGraph orchestration",
      "Thread-scoped SQLite checkpointing",
      "FAISS retrieval",
      "Human-in-the-Loop",
      "On-demand AWS EC2",
    ],
    evidence:
      "The audited implementation combines thread-scoped memory, HuggingFace/FAISS retrieval, tool routing, streamed responses, and simulated purchase approval.",
    progression:
      "Portfolio progression toward evidence-grounded AI and replayable workflows in ThesisLens and TraceForge; no direct code lineage is claimed.",
    related: ["ThesisLens", "TraceForge"],
    visualLabel:
      "A user request enters LangGraph and thread state, routes through retrieval, tools, or Human-in-the-Loop approval, then reconverges into a response.",
  },
  {
    project: getProject("ai-mock-interview-platform"),
    sequence: "02",
    signal: "Product / backend foundation",
    purpose:
      "A role-aware interview product that transforms source context into evaluated, structured feedback.",
    techniques: [
      "Node / Express",
      "PDF parsing",
      "Role-aware questions",
      "LLM evaluation",
      "Structured report generation",
    ],
    evidence:
      "The product loop covers role-aware technical and behavioral questions, submitted-answer evaluation, structured feedback, and downloadable reports.",
    progression:
      "A full product and backend workflow spanning document input, generated interviews, evaluation, feedback, and report delivery.",
    related: ["Product engineering"],
    visualLabel:
      "Resume and role context move through question generation, answer capture, evaluation, and a structured report.",
  },
  {
    project: getProject("real-time-collaborative-whiteboard"),
    sequence: "03",
    signal: "Collaboration foundation",
    purpose:
      "Earlier room-based collaboration work built around shared canvas state and bidirectional Socket.IO events.",
    techniques: [
      "Socket.IO events",
      "Shared canvas",
      "Persistent state",
      "Drawing tools",
      "Room-based collaboration",
    ],
    evidence:
      "The historical implementation includes bidirectional collaboration events, persistent state, drawing tools, and shared canvases.",
    progression:
      "Earlier collaboration architecture superseded in portfolio depth by Converge; this is engineering progression, not direct code lineage.",
    related: ["Converge"],
    visualLabel:
      "Client A and Client B exchange drawing operations through shared canvas and room state.",
  },
] as const;

type EarlierSystem = (typeof earlierSystems)[number];

function DiagramNode({
  accent = "cyan",
  height,
  label,
  width,
  x,
  y,
}: Readonly<{
  accent?: "amber" | "cyan" | "muted";
  height: number;
  label: string;
  width: number;
  x: number;
  y: number;
}>) {
  const stroke =
    accent === "amber"
      ? "var(--ritwik-color-signal-amber)"
      : accent === "cyan"
        ? "var(--ritwik-color-signal-cyan)"
        : "var(--ritwik-color-border-strong)";

  return (
    <g>
      <rect
        fill="rgb(6 18 31 / .96)"
        height={height}
        rx="7"
        stroke={stroke}
        width={width}
        x={x}
        y={y}
      />
      <text
        dominantBaseline="middle"
        fill="var(--ritwik-color-foreground-secondary)"
        fontFamily="monospace"
        fontSize="9"
        textAnchor="middle"
        x={x + width / 2}
        y={y + height / 2 + 1}
      >
        {label}
      </text>
    </g>
  );
}

function AgenticVisual({
  reduced,
  tick,
}: Readonly<{ reduced: boolean; tick: number }>) {
  const paths = [
    "M320 72 V104 C320 118 190 112 190 146 V166",
    "M320 72 V166",
    "M320 72 V104 C320 118 450 112 450 146 V166",
  ];

  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 640 300">
      <defs>
        <radialGradient id="earlier-agent-core">
          <stop stopColor="rgb(94 231 247 / .24)" />
          <stop offset="1" stopColor="rgb(47 127 255 / .03)" />
        </radialGradient>
      </defs>
      <path
        d="M320 46 V104 M190 206 C190 240 280 238 300 254 M320 206 V252 M450 206 C450 240 360 238 340 254"
        fill="none"
        stroke="var(--ritwik-color-border-strong)"
        strokeDasharray="4 7"
        strokeWidth="1.5"
      />
      {paths.map((path, index) => (
        <path
          d={path}
          fill="none"
          key={path}
          stroke={
            index === 2
              ? "var(--ritwik-color-signal-amber)"
              : "var(--ritwik-color-signal-cyan)"
          }
          strokeOpacity={index === 2 ? 0.68 : 0.58}
          strokeWidth="1.7"
        />
      ))}
      <DiagramNode height={34} label="USER" width={82} x={279} y={12} />
      <g>
        <rect
          fill="url(#earlier-agent-core)"
          height="70"
          rx="12"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth="2"
          width="190"
          x="225"
          y="72"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          x="320"
          y="102"
        >
          LANGGRAPH
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="320"
          y="122"
        >
          THREAD STATE · SQLITE
        </text>
      </g>
      <DiagramNode
        height={40}
        label="RAG / FAISS"
        width={110}
        x={135}
        y={166}
      />
      <DiagramNode height={40} label="TOOLS" width={90} x={275} y={166} />
      <DiagramNode
        accent="amber"
        height={40}
        label="HITL GATE"
        width={110}
        x={395}
        y={166}
      />
      <DiagramNode height={36} label="RESPONSE" width={118} x={261} y={252} />
      {!reduced && tick > 0 ? (
        <g key={`agentic-${tick}`}>
          <circle fill="var(--ritwik-color-signal-cyan)" r="4">
            <animateMotion dur="0.62s" fill="freeze" path="M320 30 V107" />
          </circle>
          {paths.map((path, index) => (
            <circle
              fill={
                index === 2
                  ? "var(--ritwik-color-signal-amber)"
                  : "var(--ritwik-color-signal-cyan)"
              }
              key={path}
              r="3.5"
            >
              <animateMotion
                begin={`${0.65 + index * 0.28}s`}
                dur="0.85s"
                fill="freeze"
                path={path}
              />
            </circle>
          ))}
          <circle
            cx="320"
            cy="107"
            fill="none"
            r="28"
            stroke="var(--ritwik-color-signal-cyan)"
          >
            <animate
              attributeName="opacity"
              begin="0.5s"
              dur="0.75s"
              values="0;0.8;0"
            />
            <animate
              attributeName="r"
              begin="0.5s"
              dur="0.75s"
              values="22;42;48"
            />
          </circle>
          <circle fill="var(--ritwik-color-signal-cyan)" r="4">
            <animateMotion
              begin="1.8s"
              dur="0.82s"
              fill="freeze"
              path="M190 206 C190 240 280 238 320 270"
            />
          </circle>
        </g>
      ) : null}
    </svg>
  );
}

function InterviewVisual({
  reduced,
  tick,
}: Readonly<{ reduced: boolean; tick: number }>) {
  const flowPath = "M74 152 H166 H258 H350 H442 H548";

  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 640 300">
      <path
        d={flowPath}
        fill="none"
        stroke="var(--ritwik-color-signal-amber)"
        strokeDasharray="4 8"
        strokeOpacity="0.65"
        strokeWidth="1.6"
      />
      <path
        d="M40 90 H106 V202 H40 Z M88 90 L106 108 H88 Z M54 122 H90 M54 139 H84 M54 156 H91 M54 173 H78"
        fill="rgb(6 18 31 / .95)"
        stroke="var(--ritwik-color-border-strong)"
      />
      <text
        fill="var(--ritwik-color-foreground-secondary)"
        fontFamily="monospace"
        fontSize="8"
        textAnchor="middle"
        x="73"
        y="222"
      >
        RESUME
      </text>
      <DiagramNode
        accent="muted"
        height={46}
        label="ROLE CONTEXT"
        width={92}
        x={120}
        y={129}
      />
      <DiagramNode height={62} label="QUESTIONS" width={94} x={224} y={121} />
      <DiagramNode
        accent="muted"
        height={42}
        label="ANSWER"
        width={80}
        x={330}
        y={131}
      />
      <g>
        <path
          d="M438 113 H506 L522 152 L506 191 H438 L422 152 Z"
          fill="rgb(242 185 95 / .09)"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth="1.6"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="472"
          y="149"
        >
          EVALUATION
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="472"
          y="164"
        >
          TRANSFORM
        </text>
      </g>
      <g>
        <rect
          fill="rgb(6 18 31 / .95)"
          height="100"
          rx="6"
          stroke="var(--ritwik-color-signal-cyan)"
          width="76"
          x="536"
          y="102"
        />
        <path
          d="M550 126 H598 M550 144 H592 M550 162 H600 M550 180 H584"
          stroke="var(--ritwik-color-foreground-muted)"
        />
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="574"
          y="222"
        >
          REPORT
        </text>
      </g>
      {!reduced && tick > 0 ? (
        <g key={`interview-${tick}`}>
          <circle fill="var(--ritwik-color-signal-amber)" r="4">
            <animateMotion dur="2.6s" fill="freeze" path={flowPath} />
          </circle>
          <rect
            fill="none"
            height="108"
            rx="8"
            stroke="var(--ritwik-color-signal-cyan)"
            width="84"
            x="532"
            y="98"
          >
            <animate
              attributeName="opacity"
              begin="2.2s"
              dur="0.8s"
              values="0;0.9;0"
            />
            <animate
              attributeName="stroke-width"
              begin="2.2s"
              dur="0.8s"
              values="1;3;1"
            />
          </rect>
        </g>
      ) : null}
    </svg>
  );
}

function WhiteboardVisual({
  reduced,
  tick,
}: Readonly<{ reduced: boolean; tick: number }>) {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 640 300">
      <defs>
        <pattern
          height="22"
          id="earlier-canvas-grid"
          patternUnits="userSpaceOnUse"
          width="22"
        >
          <path
            d="M22 0 H0 V22"
            fill="none"
            stroke="var(--ritwik-color-border)"
            strokeOpacity="0.42"
          />
        </pattern>
      </defs>
      <DiagramNode height={52} label="CLIENT A" width={108} x={30} y={52} />
      <DiagramNode height={52} label="CLIENT B" width={108} x={502} y={196} />
      <path
        d="M138 78 C208 78 216 126 252 126 M388 174 C424 174 432 222 502 222"
        fill="none"
        stroke="var(--ritwik-color-signal-cyan)"
        strokeDasharray="5 7"
        strokeWidth="1.7"
      />
      <path
        d="M502 222 C432 222 424 174 388 174 M252 126 C216 126 208 78 138 78"
        fill="none"
        stroke="var(--ritwik-color-signal-amber)"
        strokeDasharray="3 9"
        strokeOpacity="0.6"
        strokeWidth="1.4"
      />
      <g>
        <rect
          fill="url(#earlier-canvas-grid)"
          height="172"
          rx="10"
          stroke="var(--ritwik-color-signal-cyan)"
          width="220"
          x="210"
          y="64"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          x="320"
          y="96"
        >
          SHARED CANVAS
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="320"
          y="114"
        >
          ROOM STATE
        </text>
        <path
          d="M254 175 C278 130 301 207 329 153 S374 173 397 137"
          fill="none"
          stroke="var(--ritwik-color-signal-amber)"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M267 200 L284 188 L296 204"
          fill="none"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth="2"
        />
      </g>
      {!reduced && tick > 0 ? (
        <g key={`whiteboard-${tick}`}>
          <circle fill="var(--ritwik-color-signal-cyan)" r="4">
            <animateMotion
              dur="1.25s"
              fill="freeze"
              path="M84 78 H138 C208 78 216 126 252 126 H320"
            />
          </circle>
          <circle fill="var(--ritwik-color-signal-cyan)" r="4">
            <animateMotion
              begin="1.15s"
              dur="1.25s"
              fill="freeze"
              path="M320 174 H388 C424 174 432 222 502 222 H556"
            />
          </circle>
          <circle fill="var(--ritwik-color-signal-amber)" r="3.5">
            <animateMotion
              begin="2.45s"
              dur="1.65s"
              fill="freeze"
              path="M556 222 H502 C432 222 424 174 388 174 H252 C216 174 208 78 138 78 H84"
            />
          </circle>
        </g>
      ) : null}
    </svg>
  );
}

function EarlierSystemVisual({
  item,
  reduced,
  tick,
}: Readonly<{ item: EarlierSystem; reduced: boolean; tick: number }>) {
  return (
    <div className="relative min-h-64 overflow-hidden border-y border-border bg-[radial-gradient(circle_at_50%_50%,rgb(47_127_255_/.1),transparent_65%),rgb(4_12_22_/.5)] px-2 py-4 transition-[border-color,filter] duration-300 group-hover:border-signal-cyan/45 group-focus-within:border-signal-cyan/45 sm:px-4">
      <span
        aria-hidden="true"
        className="signal-grid pointer-events-none absolute inset-0 opacity-20"
      />
      <p className="sr-only">{item.visualLabel}</p>
      <div className="relative h-64">
        {item.project.id === "stateful-agentic-ai-assistant" ? (
          <AgenticVisual reduced={reduced} tick={tick} />
        ) : item.project.id === "ai-mock-interview-platform" ? (
          <InterviewVisual reduced={reduced} tick={tick} />
        ) : (
          <WhiteboardVisual reduced={reduced} tick={tick} />
        )}
      </div>
    </div>
  );
}

function ProgressionConnector({
  direction,
}: Readonly<{ direction: "left" | "right" }>) {
  const path =
    direction === "right"
      ? "M24 2 C34 24 60 24 76 54"
      : "M76 2 C66 24 40 24 24 54";

  return (
    <div className="relative h-14" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 56"
      >
        <path
          className="hidden min-[901px]:block"
          d={path}
          fill="none"
          stroke="var(--ritwik-color-border-strong)"
          strokeDasharray="2 5"
          strokeWidth="1"
        />
        <path
          className="min-[901px]:hidden"
          d="M50 2 V54"
          fill="none"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeDasharray="2 7"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function EarlierSystemChapter({
  ambientTick,
  expanded,
  index,
  item,
  onToggle,
  reduced,
}: Readonly<{
  ambientTick: number;
  expanded: boolean;
  index: number;
  item: EarlierSystem;
  onToggle: () => void;
  reduced: boolean;
}>) {
  const chapterRef = useRef<HTMLElement>(null);
  const [entryReady, setEntryReady] = useState(false);
  const [interactionTick, setInteractionTick] = useState(0);
  const inView = useInView(chapterRef, {
    margin: "0px 0px -18% 0px",
  });
  const visualFirst = index === 1;
  const visualTick =
    inView && (entryReady || reduced)
      ? ambientTick + interactionTick * 1000 + index * 100 + 1
      : 0;
  const contentPlacement = visualFirst
    ? "min-[901px]:col-start-2"
    : "min-[901px]:col-start-1";
  const visualPlacement = visualFirst
    ? "min-[901px]:col-start-1"
    : "min-[901px]:col-start-2";
  const align = index === 1 ? "min-[901px]:ml-auto" : "min-[901px]:mr-auto";
  const detailsId = `${item.project.id}-earlier-details`;

  const activateVisual = () => setInteractionTick((current) => current + 1);

  useEffect(() => {
    if (reduced) return;
    if (!inView || entryReady) return;
    const timer = window.setTimeout(() => setEntryReady(true), 620);
    return () => window.clearTimeout(timer);
  }, [entryReady, inView, reduced]);

  return (
    <Reveal delay={index * 0.05} y="clamp(20px, 2.2vw, 28px)">
      <article
        className={`group relative w-full min-w-0 overflow-hidden border-y border-border bg-[linear-gradient(115deg,rgb(9_25_43_/.42),rgb(4_8_14_/.2))] px-4 py-7 transition-[border-color,box-shadow] duration-500 hover:border-signal-cyan/40 hover:shadow-[0_26px_80px_rgb(0_0_0_/.18)] focus-within:border-signal-cyan/50 focus-within:shadow-[0_26px_80px_rgb(0_0_0_/.2)] sm:px-7 sm:py-9 min-[901px]:w-[86%] min-[1200px]:w-[76%] ${align}`}
        onFocusCapture={activateVisual}
        onKeyDown={(event) => {
          if (event.key === "Escape" && expanded) onToggle();
        }}
        onMouseEnter={activateVisual}
        ref={chapterRef}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 ${index === 1 ? "bg-[radial-gradient(circle_at_82%_30%,rgb(47_127_255_/.13),transparent_42%)]" : "bg-[radial-gradient(circle_at_18%_30%,rgb(47_127_255_/.13),transparent_42%)]"}`}
        />
        <div className="relative grid items-center gap-7 min-[901px]:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] min-[901px]:gap-9">
          <div className={`row-start-1 min-w-0 ${contentPlacement}`}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.62rem] font-semibold tracking-[0.11em] uppercase">
              <span className="text-signal-cyan">
                Earlier system / {item.sequence}
              </span>
              <span className="text-foreground-muted">
                {item.project.period}
              </span>
            </div>
            <h3 className="mt-4 text-[clamp(1.9rem,3.5vw,3.35rem)] leading-[0.96] font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-white group-focus-within:text-white">
              {item.project.title}
            </h3>
            <p className="mt-3 font-mono text-[0.61rem] tracking-[0.1em] text-signal-amber uppercase">
              {item.signal}
            </p>
            <p className="mt-4 hidden max-w-xl text-sm leading-6 text-foreground-secondary min-[901px]:block min-[901px]:text-base min-[901px]:leading-7">
              {item.purpose}
            </p>
            <button
              aria-controls={detailsId}
              aria-expanded={expanded}
              className="mt-5 hidden min-h-11 items-center gap-2 border-b border-border-strong font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-foreground-muted uppercase transition-[border-color,color] hover:border-signal-cyan hover:text-signal-cyan focus-visible:border-signal-cyan focus-visible:text-signal-cyan min-[901px]:inline-flex"
              onClick={() => {
                activateVisual();
                onToggle();
              }}
              type="button"
            >
              {expanded ? "Collapse evidence" : "Inspect system"}
              <span
                aria-hidden="true"
                className={`text-signal-cyan transition-transform ${expanded ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
          </div>

          <div
            className={`row-start-2 min-w-0 ${visualPlacement} min-[901px]:row-start-1`}
          >
            <EarlierSystemVisual
              item={item}
              reduced={reduced || !inView}
              tick={visualTick}
            />
          </div>

          <div className="row-start-3 min-[901px]:hidden">
            <p className="text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
              {item.purpose}
            </p>
            <button
              aria-controls={detailsId}
              aria-expanded={expanded}
              className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-border-strong font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-foreground-muted uppercase transition-[border-color,color] hover:border-signal-cyan hover:text-signal-cyan focus-visible:border-signal-cyan focus-visible:text-signal-cyan"
              onClick={() => {
                activateVisual();
                onToggle();
              }}
              type="button"
            >
              {expanded ? "Collapse evidence" : "Inspect system"}
              <span
                aria-hidden="true"
                className={`text-signal-cyan transition-transform ${expanded ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4 font-mono text-[0.58rem] tracking-[0.09em] uppercase">
          <span className="text-foreground-muted">
            Engineering progression →
          </span>
          {item.related.map((label) => (
            <span
              className="border-b border-signal-amber/40 px-1 py-1 text-signal-amber transition-[border-color,color] group-hover:border-signal-amber group-focus-within:border-signal-amber"
              key={label}
            >
              {label}
            </span>
          ))}
        </div>

        <div aria-hidden={!expanded} id={detailsId}>
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                animate={{ height: "auto", opacity: 1, y: 0 }}
                className="relative overflow-hidden"
                exit={
                  reduced
                    ? { height: 0, opacity: 0 }
                    : { height: 0, opacity: 0, y: -6 }
                }
                initial={
                  reduced
                    ? { height: 0, opacity: 1 }
                    : { height: 0, opacity: 0, y: 8 }
                }
                key={detailsId}
                transition={{
                  duration: reduced ? 0 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mt-7 grid gap-6 border-t border-border pt-7 min-[901px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
                  <div>
                    <p className="font-mono text-[0.61rem] font-semibold tracking-[0.11em] text-signal-cyan uppercase">
                      Evidence / implemented scope
                    </p>
                    <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                      {item.evidence}
                    </p>
                    {item.project.deploymentNote ? (
                      <p className="mt-3 border-l border-signal-amber/55 pl-4 text-xs leading-5 text-foreground-muted">
                        {item.project.deploymentNote}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="font-mono text-[0.61rem] font-semibold tracking-[0.11em] text-foreground-muted uppercase">
                      Techniques
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.techniques.map((technique) => (
                        <li
                          className="border border-border-strong bg-background/55 px-2.5 py-1.5 font-mono text-[0.62rem] text-foreground-secondary"
                          key={technique}
                        >
                          {technique}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-xs leading-5 text-foreground-muted">
                      {item.progression}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {item.project.caseStudyPath ? (
                        <ActionLink
                          href={item.project.caseStudyPath}
                          variant="primary"
                        >
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
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </article>
    </Reveal>
  );
}

export function SelectedEarlierSystems() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "0px 0px -12% 0px" });
  const ambientTick = useAmbientPulse(inView && !reduced, 9200, 6400);

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

      <ol className="mt-8">
        {earlierSystems.map((item, index) => (
          <li key={item.project.id}>
            <EarlierSystemChapter
              ambientTick={ambientTick}
              expanded={expandedId === item.project.id}
              index={index}
              item={item}
              onToggle={() =>
                setExpandedId((current) =>
                  current === item.project.id ? null : item.project.id,
                )
              }
              reduced={reduced}
            />
            {index < earlierSystems.length - 1 ? (
              <ProgressionConnector
                direction={index === 0 ? "right" : "left"}
              />
            ) : null}
          </li>
        ))}
      </ol>

      <Reveal delay={0.12} y={18}>
        <div className="mt-6 flex justify-start min-[901px]:pl-[12%]">
          <a
            className="group inline-flex min-h-11 items-center gap-3 border-y border-border px-4 py-3 font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-foreground-muted uppercase transition-[border-color,color] hover:border-signal-cyan hover:text-signal-cyan focus-visible:border-signal-cyan focus-visible:text-signal-cyan"
            href="#systems"
          >
            Current flagship systems
            <span
              aria-hidden="true"
              className="text-signal-cyan transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </Reveal>
    </div>
  );
}
