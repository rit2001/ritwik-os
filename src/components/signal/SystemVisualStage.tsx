"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import type { SignalProjectId } from "./SignalProvider";

type VisualProps = {
  activeStep: number;
  reduced: boolean;
};

function nodeClass(active: boolean) {
  return active
    ? "fill-[rgb(12_41_72_/_0.92)] stroke-[var(--ritwik-color-signal-cyan)]"
    : "fill-[rgb(7_16_27_/_0.9)] stroke-[var(--ritwik-color-border-strong)]";
}

function ThesisLensVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 720 460">
      <defs>
        <linearGradient id="tl-doc" x1="0" x2="1">
          <stop stopColor="#102746" />
          <stop offset="1" stopColor="#081321" />
        </linearGradient>
        <filter id="tl-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path
          id="tl-route"
          d="M118 230 C180 230 170 114 240 114 S300 230 354 230 S430 110 486 110 S560 230 624 230"
        />
      </defs>

      <g className="opacity-30">
        {Array.from({ length: 12 }, (_, index) => (
          <line
            key={index}
            stroke="var(--ritwik-color-border-subtle)"
            x1="0"
            x2="720"
            y1={38 + index * 34}
            y2={38 + index * 34}
          />
        ))}
      </g>

      <g className={activeStep === 0 ? "opacity-100" : "opacity-[0.58]"}>
        <rect
          fill="url(#tl-doc)"
          height="154"
          rx="8"
          stroke="var(--ritwik-color-accent)"
          width="108"
          x="36"
          y="153"
        />
        <path
          d="M54 184 H124 M54 202 H114 M54 220 H124 M54 238 H103 M54 256 H120"
          stroke="var(--ritwik-color-foreground-muted)"
        />
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="10"
          x="52"
          y="283"
        >
          FINANCIAL FILING
        </text>
      </g>

      <g className={activeStep === 1 ? "opacity-100" : "opacity-[0.64]"}>
        {[72, 112, 152, 192].map((y, index) => (
          <rect
            className={nodeClass(activeStep === 1 && index < 3)}
            height="28"
            key={y}
            rx="4"
            width={index % 2 ? 104 : 86}
            x="212"
            y={y}
          />
        ))}
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="10"
          x="212"
          y="252"
        >
          SEMANTIC CHUNKS
        </text>
      </g>

      <g className={activeStep === 2 ? "opacity-100" : "opacity-[0.64]"}>
        <path
          d="M350 188 L390 230 L350 272 L310 230 Z"
          className={nodeClass(activeStep === 2)}
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          x="350"
          y="226"
        >
          HYBRID
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="350"
          y="241"
        >
          RETRIEVAL
        </text>
      </g>

      <g className={activeStep === 3 ? "opacity-100" : "opacity-[0.64]"}>
        {[0, 1, 2, 3].map((index) => {
          const order = activeStep === 3 ? [1, 3, 0, 2][index] : index;
          return (
            <g key={index} transform={`translate(442 ${126 + order * 48})`}>
              <rect
                className={nodeClass(activeStep === 3 && order === 0)}
                height="34"
                rx="4"
                width="90"
              />
              <text
                fill="var(--ritwik-color-foreground-secondary)"
                fontFamily="monospace"
                fontSize="10"
                x="12"
                y="21"
              >
                CANDIDATE {index + 1}
              </text>
            </g>
          );
        })}
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="10"
          x="442"
          y="338"
        >
          CROSS-ENCODER ORDER
        </text>
      </g>

      <g className={activeStep >= 3 ? "opacity-100" : "opacity-72"}>
        <circle
          cx="630"
          cy="230"
          fill="rgb(94 231 247 / 0.12)"
          filter="url(#tl-glow)"
          r="70"
          stroke="var(--ritwik-color-signal-cyan)"
        />
        <circle
          cx="630"
          cy="230"
          fill="none"
          r="49"
          stroke="rgb(94 231 247 / 0.45)"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="630"
          y="224"
        >
          GROUNDED
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="630"
          y="242"
        >
          EVIDENCE
        </text>
      </g>

      <use
        fill="none"
        href="#tl-route"
        stroke="rgb(94 231 247 / 0.28)"
        strokeWidth="2"
      />
      {!reduced ? (
        <circle fill="var(--ritwik-color-signal-cyan)" r="5">
          <animateMotion dur="3.8s" repeatCount="indefinite">
            <mpath href="#tl-route" />
          </animateMotion>
        </circle>
      ) : (
        <circle
          cx="624"
          cy="230"
          fill="var(--ritwik-color-signal-cyan)"
          r="5"
        />
      )}
    </svg>
  );
}

function TraceForgeVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 720 460">
      <defs>
        <linearGradient id="tf-capsule" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="rgb(94 231 247 / 0.32)" />
          <stop offset="0.45" stopColor="rgb(47 127 255 / 0.12)" />
          <stop offset="1" stopColor="rgb(242 185 95 / 0.12)" />
        </linearGradient>
        <filter id="tf-glow">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id="tf-in" d="M76 108 C156 108 180 178 258 190" />
        <path
          id="tf-out"
          d="M384 230 C450 230 472 136 536 136 M384 230 C450 230 472 324 536 324"
        />
      </defs>

      <g className={activeStep === 0 ? "opacity-100" : "opacity-[0.62]"}>
        <rect
          className={nodeClass(activeStep === 0)}
          height="64"
          rx="8"
          width="126"
          x="42"
          y="76"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="105"
          y="104"
        >
          CONTROLLED RUN
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="105"
          y="122"
        >
          MODEL · HTTP · EVENTS
        </text>
        {[0, 1, 2, 3, 4].map((index) => (
          <circle
            cx={95 + index * 17}
            cy={168 + (index % 2) * 18}
            fill={index % 2 ? "#f2b95f" : "#5ee7f7"}
            key={index}
            opacity="0.75"
            r="4"
          />
        ))}
      </g>

      <g
        className={activeStep === 1 ? "opacity-100" : "opacity-[0.76]"}
        filter="url(#tf-glow)"
      >
        <path
          d="M264 162 L354 136 L414 190 L390 298 L296 322 L238 266 Z"
          fill="url(#tf-capsule)"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth={activeStep === 1 ? 3 : 1.5}
        />
        <path
          d="M264 162 L296 236 L296 322 M354 136 L356 235 L414 190 M356 235 L390 298 M296 236 L238 266"
          fill="none"
          stroke="rgb(94 231 247 / 0.42)"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="12"
          textAnchor="middle"
          x="330"
          y="226"
        >
          REPLAY CAPSULE
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="330"
          y="244"
        >
          SEALED · VERSIONED · SHA-256
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="330"
          y="264"
        >
          REQUEST FINGERPRINTS
        </text>
      </g>

      <g className={activeStep === 2 ? "opacity-100" : "opacity-[0.62]"}>
        <rect
          className={nodeClass(activeStep === 2)}
          height="56"
          rx="8"
          width="112"
          x="518"
          y="108"
        />
        <rect
          className={nodeClass(activeStep === 2)}
          height="56"
          rx="8"
          width="112"
          x="518"
          y="296"
        />
        <text
          fill="#c8d0da"
          fontFamily="monospace"
          fontSize="11"
          x="541"
          y="141"
        >
          ORIGINAL
        </text>
        <text
          fill="#c8d0da"
          fontFamily="monospace"
          fontSize="11"
          x="548"
          y="329"
        >
          REPLAY
        </text>
      </g>

      <g className={activeStep === 3 ? "opacity-100" : "opacity-[0.7]"}>
        <path
          d="M574 164 V214 M574 296 V246"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth="2"
        />
        <rect
          fill="rgb(242 185 95 / 0.12)"
          height="56"
          rx="8"
          stroke="var(--ritwik-color-signal-amber)"
          width="132"
          x="508"
          y="202"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="574"
          y="225"
        >
          STRUCTURAL DIFF
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="574"
          y="242"
        >
          → REGRESSION
        </text>
      </g>

      <use
        fill="none"
        href="#tf-in"
        stroke="rgb(94 231 247 / 0.35)"
        strokeWidth="2"
      />
      <use
        fill="none"
        href="#tf-out"
        stroke="rgb(102 168 255 / 0.32)"
        strokeWidth="2"
      />
      {!reduced ? (
        <circle fill="var(--ritwik-color-signal-cyan)" r="5">
          <animateMotion dur="2.2s" repeatCount="indefinite">
            <mpath href="#tf-in" />
          </animateMotion>
        </circle>
      ) : null}
    </svg>
  );
}

function ConvergeVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 720 460">
      <defs>
        <path
          id="cv-main"
          d="M112 118 C198 118 200 214 286 214 H404 C470 214 470 118 548 118"
        />
        <path id="cv-branch" d="M404 214 C478 214 478 328 558 328" />
        <filter id="cv-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className={activeStep === 0 ? "opacity-100" : "opacity-[0.64]"}>
        {[68, 154, 240].map((y, index) => (
          <g key={y}>
            <rect
              className={nodeClass(activeStep === 0)}
              height="52"
              rx="7"
              width="118"
              x="36"
              y={y}
            />
            <text
              fill="var(--ritwik-color-foreground-secondary)"
              fontFamily="monospace"
              fontSize="10"
              x="58"
              y={y + 30}
            >
              {index === 2
                ? "OFFLINE CLIENT"
                : `CLIENT ${index === 0 ? "A" : "B"}`}
            </text>
          </g>
        ))}
        <path
          d="M96 292 V342 H218"
          fill="none"
          stroke="var(--ritwik-color-signal-amber)"
          strokeDasharray="5 6"
        />
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="9"
          x="54"
          y="365"
        >
          INDEXEDDB · PENDING
        </text>
      </g>

      <g className={activeStep === 1 ? "opacity-100" : "opacity-[0.76]"}>
        <path
          d="M232 154 H364 L390 214 L364 274 H232 L206 214 Z"
          fill="rgb(47 127 255 / 0.14)"
          filter="url(#cv-glow)"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth={activeStep === 1 ? 3 : 1.5}
        />
        <text
          fill="#f5f7fa"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="298"
          y="205"
        >
          API / BOARD
        </text>
        <text
          fill="#5ee7f7"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          x="298"
          y="224"
        >
          AUTHORITY
        </text>
        <text
          fill="#8f9aa8"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="298"
          y="243"
        >
          NEXT SEQUENCE
        </text>
      </g>

      <g className={activeStep === 2 ? "opacity-100" : "opacity-[0.68]"}>
        <ellipse
          cx="420"
          cy="172"
          fill="rgb(16 40 62 / 0.92)"
          rx="70"
          ry="22"
          stroke="var(--ritwik-color-accent)"
        />
        <path
          d="M350 172 V250 C350 262 381 274 420 274 S490 262 490 250 V172"
          fill="rgb(8 22 36 / 0.9)"
          stroke="var(--ritwik-color-accent)"
        />
        <ellipse
          cx="420"
          cy="250"
          fill="none"
          rx="70"
          ry="22"
          stroke="var(--ritwik-color-accent)"
        />
        <text
          fill="#f5f7fa"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="420"
          y="209"
        >
          POSTGRESQL
        </text>
        <text
          fill="#8f9aa8"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="420"
          y="228"
        >
          OP · RECEIPT · OUTBOX
        </text>
      </g>

      <g className={activeStep === 3 ? "opacity-100" : "opacity-[0.68]"}>
        <rect
          fill="rgb(242 185 95 / 0.1)"
          height="54"
          rx="7"
          stroke="var(--ritwik-color-signal-amber)"
          width="112"
          x="512"
          y="78"
        />
        <text
          fill="#f2b95f"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="568"
          y="101"
        >
          OUTBOX WORKER
        </text>
        <text
          fill="#c8d0da"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="568"
          y="118"
        >
          REDIS STREAM
        </text>
        {[0, 1].map((index) => (
          <g key={index}>
            <rect
              className={nodeClass(activeStep === 3)}
              height="52"
              rx="7"
              width="110"
              x="512"
              y={284 + index * 72}
            />
            <text
              fill="#c8d0da"
              fontFamily="monospace"
              fontSize="10"
              x="535"
              y={315 + index * 72}
            >
              REPLICA {index === 0 ? "A" : "B"}
            </text>
          </g>
        ))}
      </g>

      <use
        fill="none"
        href="#cv-main"
        stroke="rgb(94 231 247 / 0.34)"
        strokeWidth="2"
      />
      <use
        fill="none"
        href="#cv-branch"
        stroke="rgb(242 185 95 / 0.3)"
        strokeWidth="2"
      />
      {!reduced ? (
        <>
          <circle fill="var(--ritwik-color-signal-cyan)" r="5">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#cv-main" />
            </animateMotion>
          </circle>
          <circle fill="var(--ritwik-color-signal-amber)" r="4">
            <animateMotion begin="1.2s" dur="3s" repeatCount="indefinite">
              <mpath href="#cv-branch" />
            </animateMotion>
          </circle>
        </>
      ) : null}
    </svg>
  );
}

const fallbackLabels: Record<SignalProjectId, readonly string[]> = {
  thesislens: [
    "Financial filing",
    "Semantic chunks",
    "Hybrid retrieval",
    "Reranking",
    "Grounded evidence",
  ],
  traceforge: [
    "Controlled run",
    "Sealed capsule",
    "Original / replay",
    "Structural diff",
    "Regression test",
  ],
  converge: [
    "Persisted client command",
    "Board authority",
    "PostgreSQL commit",
    "At-least-once delivery",
    "Replica catch-up",
  ],
};

export function SystemVisualStage({
  project,
  activeStep = 0,
  className = "",
}: Readonly<{
  project: SignalProjectId;
  activeStep?: number;
  className?: string;
}>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion() === true;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setIsVisible(visible);
        if (visible) setNearViewport(true);
      },
      { rootMargin: "280px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative min-h-[23rem] overflow-hidden border border-border bg-[linear-gradient(145deg,rgb(10_20_33_/_0.96),rgb(4_7_13_/_0.92))] sm:min-h-[28rem] ${className}`}
      ref={hostRef}
    >
      <div className="signal-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="absolute top-4 left-4 z-10 font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-signal-cyan uppercase">
        Live system view / {project}
      </div>
      <ol className="sr-only">
        {fallbackLabels[project].map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      {nearViewport ? (
        <div className="absolute inset-0 pt-8">
          {project === "thesislens" ? (
            <ThesisLensVisual
              activeStep={activeStep}
              reduced={reduced || !isVisible}
            />
          ) : project === "traceforge" ? (
            <TraceForgeVisual
              activeStep={activeStep}
              reduced={reduced || !isVisible}
            />
          ) : (
            <ConvergeVisual
              activeStep={activeStep}
              reduced={reduced || !isVisible}
            />
          )}
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <p className="font-mono text-xs tracking-[0.12em] text-foreground-muted uppercase">
            {fallbackLabels[project].join(" → ")}
          </p>
        </div>
      )}
    </div>
  );
}
