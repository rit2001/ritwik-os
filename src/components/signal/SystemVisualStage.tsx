"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import type { SignalProjectId } from "./SignalProvider";

type VisualProps = {
  activeStep: number;
  reduced: boolean;
};

function ThesisLensVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  const rerankingActive = activeStep === 1 || activeStep === 3;
  const evidenceActive = activeStep === 2;
  const order = rerankingActive ? [2, 0, 3, 1, 4] : [0, 1, 2, 3, 4];

  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 820 500">
      <defs>
        <linearGradient id="tl-filing" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#15375f" />
          <stop offset="1" stopColor="#07101b" />
        </linearGradient>
        <radialGradient id="tl-answer">
          <stop stopColor="rgb(94 231 247 / 0.3)" />
          <stop offset="1" stopColor="rgb(47 127 255 / 0.04)" />
        </radialGradient>
      </defs>

      <g opacity={activeStep === 0 ? 1 : 0.68}>
        <rect
          fill="url(#tl-filing)"
          height="190"
          rx="8"
          stroke="var(--ritwik-color-accent)"
          width="126"
          x="34"
          y="143"
        />
        <path
          d="M54 178 H138 M54 199 H128 M54 220 H138 M54 241 H118 M54 262 H136 M54 283 H124"
          stroke="var(--ritwik-color-foreground-muted)"
          strokeWidth="1.5"
        />
        <path
          d="M126 143 L160 177 H126 Z"
          fill="rgb(102 168 255 / 0.22)"
          stroke="var(--ritwik-color-accent)"
        />
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          x="97"
          y="360"
        >
          FINANCIAL FILING
        </text>
      </g>

      <path
        d="M174 238 H201"
        stroke="var(--ritwik-color-border-strong)"
        strokeWidth="2"
      />
      <path
        d="M194 231 L203 238 L194 245"
        fill="none"
        stroke="var(--ritwik-color-signal-cyan)"
        strokeWidth="2"
      />

      <g opacity={activeStep === 0 ? 1 : 0.72}>
        {[0, 1, 2, 3, 4].map((index) => (
          <g
            className={!reduced ? "thesis-split" : undefined}
            key={index}
            style={{ animationDelay: `${index * 110}ms` }}
            transform={`translate(206 ${116 + index * 54})`}
          >
            <rect
              fill="rgb(8 25 43 / 0.96)"
              height="38"
              rx="4"
              stroke={
                index < 3
                  ? "var(--ritwik-color-signal-cyan)"
                  : "var(--ritwik-color-border-strong)"
              }
              width={index % 2 === 0 ? 112 : 96}
            />
            <text
              fill="var(--ritwik-color-foreground-secondary)"
              fontFamily="monospace"
              fontSize="9"
              x="12"
              y="23"
            >
              CHUNK {String(index + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="9"
          x="206"
          y="408"
        >
          DOCUMENT SPLITS
        </text>
      </g>

      <path
        d="M326 238 H356"
        stroke="var(--ritwik-color-border-strong)"
        strokeWidth="2"
      />
      <g opacity={rerankingActive ? 1 : 0.75}>
        <rect
          fill="rgb(13 42 80 / 0.48)"
          height="286"
          rx="8"
          stroke={
            rerankingActive
              ? "var(--ritwik-color-signal-cyan)"
              : "var(--ritwik-color-border-strong)"
          }
          width="142"
          x="358"
          y="91"
        />
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="429"
          y="76"
        >
          RETRIEVAL CANDIDATES
        </text>
        {[0, 1, 2, 3, 4].map((candidate, slot) => {
          const rank = order[slot];
          const survives = rank < 2;
          return (
            <g
              className="transition-[opacity,transform] duration-700"
              key={candidate}
              style={{
                opacity: rerankingActive && !survives ? 0.28 : 1,
                transform: `translate(373px, ${110 + rank * 49}px)`,
              }}
            >
              <rect
                className={
                  !reduced && rerankingActive && survives
                    ? "thesis-selected"
                    : undefined
                }
                fill={survives ? "rgb(10 48 69 / 0.9)" : "rgb(7 16 27 / 0.95)"}
                height="36"
                rx="4"
                stroke={
                  survives
                    ? "var(--ritwik-color-signal-cyan)"
                    : "var(--ritwik-color-border-strong)"
                }
                width="112"
              />
              <text
                fill="var(--ritwik-color-foreground-secondary)"
                fontFamily="monospace"
                fontSize="9"
                x="10"
                y="22"
              >
                CANDIDATE {candidate + 1}
              </text>
            </g>
          );
        })}
      </g>

      <g opacity={rerankingActive ? 1 : 0.68}>
        <path
          d="M518 151 H590 L612 234 L590 317 H518 L540 234 Z"
          fill="rgb(47 127 255 / 0.1)"
          stroke={
            rerankingActive
              ? "var(--ritwik-color-signal-amber)"
              : "var(--ritwik-color-border-strong)"
          }
          strokeWidth={rerankingActive ? 2.5 : 1.5}
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          x="565"
          y="218"
        >
          RERANK
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          x="565"
          y="241"
        >
          0.704 → 0.811
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="565"
          y="258"
        >
          nDCG@5 · FROZEN HOLDOUT
        </text>
      </g>

      <g opacity={evidenceActive || rerankingActive ? 1 : 0.7}>
        <path
          d="M613 205 C644 205 645 185 674 185 M613 264 C644 264 645 284 674 284"
          fill="none"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth="2"
        />
        <circle
          cx="718"
          cy="234"
          fill="url(#tl-answer)"
          r="74"
          stroke={
            evidenceActive
              ? "var(--ritwik-color-signal-cyan)"
              : "var(--ritwik-color-accent)"
          }
          strokeWidth={evidenceActive ? 3 : 1.5}
        />
        <rect
          fill="rgb(6 23 38 / 0.95)"
          height="34"
          rx="4"
          stroke="var(--ritwik-color-signal-cyan)"
          width="82"
          x="677"
          y="168"
        />
        <rect
          fill="rgb(6 23 38 / 0.95)"
          height="34"
          rx="4"
          stroke="var(--ritwik-color-signal-cyan)"
          width="82"
          x="677"
          y="267"
        />
        <text
          fill="var(--ritwik-color-foreground-secondary)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="718"
          y="188"
        >
          EVIDENCE 01
        </text>
        <text
          fill="var(--ritwik-color-foreground-secondary)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="718"
          y="287"
        >
          EVIDENCE 02
        </text>
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="718"
          y="229"
        >
          CITED ANSWER
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="718"
          y="246"
        >
          GROUNDED EVIDENCE
        </text>
      </g>

      <text
        fill="var(--ritwik-color-foreground-muted)"
        fontFamily="monospace"
        fontSize="8"
        textAnchor="middle"
        x="410"
        y="466"
      >
        FILING → SPLITS → CANDIDATES → REORDER → STRONG EVIDENCE → CITATION
      </text>
    </svg>
  );
}

function TraceForgeVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  const captureActive = activeStep === 0;
  const sealActive = activeStep === 1;
  const replayActive = activeStep === 2;
  const diffActive = activeStep === 3;

  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 820 500">
      <defs>
        <radialGradient id="tf-core">
          <stop stopColor="rgb(94 231 247 / 0.3)" />
          <stop offset="0.6" stopColor="rgb(47 127 255 / 0.12)" />
          <stop offset="1" stopColor="rgb(4 7 13 / 0.92)" />
        </radialGradient>
      </defs>

      <g opacity={captureActive ? 1 : 0.68}>
        <rect
          fill="rgb(7 20 34 / 0.96)"
          height="70"
          rx="8"
          stroke="var(--ritwik-color-accent)"
          width="138"
          x="34"
          y="74"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          x="103"
          y="104"
        >
          LIVE EXECUTION
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="103"
          y="123"
        >
          MODEL · HTTP · EVENTS
        </text>
        {["MODEL", "HTTP", "TOOL", "STATE"].map((label, index) => (
          <g
            className={
              !reduced && captureActive ? "trace-capture-event" : undefined
            }
            key={label}
            style={{ animationDelay: `${index * 180}ms` }}
            transform={`translate(${54 + index * 26} ${176 + index * 48})`}
          >
            <circle
              fill={
                index % 2
                  ? "var(--ritwik-color-signal-amber)"
                  : "var(--ritwik-color-signal-cyan)"
              }
              r="5"
            />
            <text
              fill="var(--ritwik-color-foreground-muted)"
              fontFamily="monospace"
              fontSize="7"
              x="12"
              y="3"
            >
              {label}
            </text>
          </g>
        ))}
        <path
          d="M168 112 C236 112 228 218 286 232"
          fill="none"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeDasharray="3 7"
          strokeWidth="2"
        />
      </g>

      <g opacity={sealActive || captureActive ? 1 : 0.82}>
        <circle
          className={!reduced && sealActive ? "trace-seal-pulse" : undefined}
          cx="376"
          cy="248"
          fill="none"
          r="132"
          stroke="var(--ritwik-color-signal-cyan)"
        />
        {[0, 1, 2, 3].map((layer) => (
          <path
            d={`M376 ${113 + layer * 13} L${485 - layer * 10} ${190 + layer * 8} L${448 - layer * 8} ${331 - layer * 9} L${304 + layer * 7} ${347 - layer * 11} L${259 + layer * 11} ${209 + layer * 7} Z`}
            fill={layer === 3 ? "url(#tf-core)" : "none"}
            key={layer}
            opacity={0.34 + layer * 0.17}
            stroke={
              layer === 3
                ? "var(--ritwik-color-signal-cyan)"
                : "var(--ritwik-color-accent)"
            }
            strokeWidth={layer === 3 && sealActive ? 3 : 1.4}
          />
        ))}
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          x="376"
          y="236"
        >
          REPLAY CAPSULE
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="376"
          y="257"
        >
          {sealActive ? "SEALED · SHA-256" : "CAPTURING BOUNDARIES"}
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="376"
          y="276"
        >
          SEQUENCE + REQUEST FINGERPRINT
        </text>
      </g>

      <g opacity={replayActive ? 1 : 0.68}>
        <path
          d="M490 214 C536 214 536 128 582 128 M490 282 C536 282 536 370 582 370"
          fill="none"
          stroke="var(--ritwik-color-accent)"
          strokeWidth="2"
        />
        <rect
          fill="rgb(8 25 43 / 0.96)"
          height="76"
          rx="38"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth={replayActive ? 2.5 : 1.4}
          width="144"
          x="574"
          y="90"
        />
        <rect
          fill="rgb(8 25 43 / 0.96)"
          height="76"
          rx="38"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth={replayActive ? 2.5 : 1.4}
          width="144"
          x="574"
          y="332"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="646"
          y="121"
        >
          ORIGINAL
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="646"
          y="141"
        >
          FINGERPRINT ✓
        </text>
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="646"
          y="363"
        >
          REPLAY
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="646"
          y="383"
        >
          NO LIVE FALLBACK
        </text>
      </g>

      <g opacity={diffActive ? 1 : 0.72}>
        <path
          d="M646 166 V206 M646 332 V292"
          stroke="var(--ritwik-color-border-strong)"
          strokeWidth="2"
        />
        <rect
          fill="rgb(242 185 95 / 0.09)"
          height="86"
          rx="8"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth={diffActive ? 3 : 1.5}
          width="164"
          x="564"
          y="206"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          x="646"
          y="239"
        >
          STRUCTURAL DIFF
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="646"
          y="261"
        >
          REGRESSION RESULT
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="646"
          y="278"
        >
          EXACT MATCH / REVIEW
        </text>
      </g>
    </svg>
  );
}

function ConvergeVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  const offlineActive = activeStep === 0 || activeStep === 2;
  const authorityActive = activeStep === 1;
  const deliveryActive = activeStep === 3;

  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 860 500">
      <g opacity={activeStep === 0 ? 1 : 0.72}>
        {[
          [42, 72, "CLIENT A"],
          [42, 204, "CLIENT B"],
          [42, 354, "OFFLINE CLIENT"],
        ].map(([x, y, label], index) => (
          <g key={String(label)}>
            <rect
              fill="rgb(7 20 34 / 0.96)"
              height="66"
              rx="8"
              stroke={
                index === 2
                  ? "var(--ritwik-color-signal-amber)"
                  : "var(--ritwik-color-accent)"
              }
              width="142"
              x={Number(x)}
              y={Number(y)}
            />
            <circle
              cx={Number(x) + 20}
              cy={Number(y) + 20}
              fill={
                index === 2
                  ? "var(--ritwik-color-signal-amber)"
                  : "var(--ritwik-color-success)"
              }
              r="4"
            />
            <text
              fill="var(--ritwik-color-foreground)"
              fontFamily="monospace"
              fontSize="10"
              x={Number(x) + 20}
              y={Number(y) + 43}
            >
              {String(label)}
            </text>
          </g>
        ))}
        <g opacity={offlineActive ? 1 : 0.55}>
          <rect
            fill="rgb(242 185 95 / 0.08)"
            height="34"
            rx="4"
            stroke="var(--ritwik-color-signal-amber)"
            width="118"
            x="54"
            y="433"
          />
          <text
            fill="var(--ritwik-color-signal-amber)"
            fontFamily="monospace"
            fontSize="8"
            textAnchor="middle"
            x="113"
            y="454"
          >
            QUEUED OP · IDB
          </text>
        </g>
      </g>

      <path
        d="M184 105 C230 105 224 222 270 222 M184 237 H270"
        fill="none"
        stroke="var(--ritwik-color-accent)"
        strokeWidth="2"
      />
      <path
        className={!reduced && offlineActive ? "converge-reconnect" : undefined}
        d="M184 387 C238 387 218 276 270 258"
        fill="none"
        stroke="var(--ritwik-color-signal-amber)"
        strokeDasharray="6 7"
        strokeWidth="2"
      />

      <g opacity={authorityActive ? 1 : 0.82}>
        <path
          d="M292 162 H408 L436 237 L408 312 H292 L264 237 Z"
          fill="rgb(47 127 255 / 0.13)"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth={authorityActive ? 3 : 1.6}
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          x="350"
          y="223"
        >
          BOARD AUTHORITY
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="350"
          y="244"
        >
          ORDER COMMAND
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="350"
          y="263"
        >
          IDEMPOTENT RECEIPT
        </text>
      </g>

      <g opacity={activeStep === 2 ? 1 : 0.8}>
        <ellipse
          cx="508"
          cy="190"
          fill="rgb(16 40 62 / 0.95)"
          rx="62"
          ry="20"
          stroke="var(--ritwik-color-accent)"
        />
        <path
          d="M446 190 V277 C446 288 474 298 508 298 S570 288 570 277 V190"
          fill="rgb(7 20 34 / 0.96)"
          stroke="var(--ritwik-color-accent)"
          strokeWidth={activeStep === 2 ? 2.5 : 1.4}
        />
        <ellipse
          cx="508"
          cy="277"
          fill="none"
          rx="62"
          ry="20"
          stroke="var(--ritwik-color-accent)"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="10"
          textAnchor="middle"
          x="508"
          y="228"
        >
          POSTGRESQL
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="508"
          y="246"
        >
          COMMIT + OUTBOX
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="508"
          y="264"
        >
          BOARD SEQUENCE
        </text>
      </g>

      <g opacity={deliveryActive ? 1 : 0.7}>
        <rect
          fill="rgb(242 185 95 / 0.08)"
          height="58"
          rx="7"
          stroke="var(--ritwik-color-signal-amber)"
          width="120"
          x="612"
          y="105"
        />
        <rect
          fill="rgb(94 231 247 / 0.07)"
          height="58"
          rx="7"
          stroke="var(--ritwik-color-signal-cyan)"
          width="120"
          x="612"
          y="186"
        />
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="672"
          y="129"
        >
          OUTBOX WORKER
        </text>
        <text
          fill="var(--ritwik-color-foreground-secondary)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="672"
          y="147"
        >
          PUBLISH
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="672"
          y="210"
        >
          REDIS STREAM
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="672"
          y="228"
        >
          AT LEAST ONCE
        </text>
        {[0, 1].map((index) => (
          <g key={index}>
            <rect
              fill="rgb(7 20 34 / 0.96)"
              height="54"
              rx="7"
              stroke="var(--ritwik-color-accent)"
              width="102"
              x="750"
              y={116 + index * 128}
            />
            <text
              fill="var(--ritwik-color-foreground-secondary)"
              fontFamily="monospace"
              fontSize="8"
              textAnchor="middle"
              x="801"
              y={148 + index * 128}
            >
              REPLICA {index === 0 ? "A" : "B"}
            </text>
          </g>
        ))}
      </g>

      <path
        d="M436 237 H446 M570 215 H612 M732 215 C758 215 750 143 750 143 M732 215 C758 215 750 271 750 271"
        fill="none"
        stroke="var(--ritwik-color-border-strong)"
        strokeWidth="2"
      />
      {["041", "042", "043"].map((sequence, index) => (
        <g
          className={!reduced ? "converge-sequence-token" : undefined}
          key={sequence}
          style={{ animationDelay: `${index * 700}ms` }}
          transform={`translate(${420 + index * 92} ${348 - index * 22})`}
        >
          <circle
            fill="rgb(4 7 13 / 0.96)"
            r="18"
            stroke="var(--ritwik-color-signal-cyan)"
          />
          <text
            fill="var(--ritwik-color-signal-cyan)"
            fontFamily="monospace"
            fontSize="8"
            textAnchor="middle"
            y="3"
          >
            {sequence}
          </text>
        </g>
      ))}
      <text
        fill="var(--ritwik-color-signal-amber)"
        fontFamily="monospace"
        fontSize="8"
        x="208"
        y="408"
      >
        RECONNECT → FIXED-WATERMARK CATCH-UP → CURRENT STATE
      </text>
    </svg>
  );
}

const fallbackLabels: Record<SignalProjectId, readonly string[]> = {
  thesislens: [
    "Financial filing",
    "Document splits",
    "Retrieval candidates",
    "Reranking",
    "Cited answer",
  ],
  traceforge: [
    "Live execution",
    "Sealed Replay Capsule",
    "Original and replay branches",
    "Structural diff",
    "Regression result",
  ],
  converge: [
    "Connected and offline clients",
    "Board authority",
    "PostgreSQL commit",
    "Outbox and Redis Stream",
    "Replica delivery and catch-up",
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

  const atmosphere =
    project === "thesislens"
      ? "bg-[radial-gradient(circle_at_72%_48%,rgb(47_127_255_/_0.14),transparent_38%),linear-gradient(145deg,rgb(10_20_33_/_0.98),rgb(4_7_13_/_0.94))]"
      : project === "traceforge"
        ? "bg-[radial-gradient(circle_at_46%_52%,rgb(94_231_247_/_0.12),transparent_32%),linear-gradient(160deg,rgb(5_18_31_/_0.98),rgb(4_7_13_/_0.96))]"
        : "bg-[radial-gradient(circle_at_42%_52%,rgb(47_127_255_/_0.12),transparent_34%),linear-gradient(135deg,rgb(7_18_31_/_0.98),rgb(4_7_13_/_0.95))]";

  return (
    <div
      className={`relative min-h-[23rem] overflow-hidden border border-border ${atmosphere} sm:min-h-[30rem] ${className}`}
      data-project-stage={project}
      ref={hostRef}
    >
      <div className="signal-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="absolute top-4 left-4 z-10 font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-signal-cyan uppercase">
        {project === "thesislens"
          ? "Evidence transformation"
          : project === "traceforge"
            ? "Deterministic replay capsule"
            : "Authoritative collaboration topology"}
      </div>
      <ol className="sr-only">
        {fallbackLabels[project].map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
      {nearViewport ? (
        <div className="absolute inset-0 pt-7">
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
        <div className="absolute inset-0 grid place-items-center px-8 text-center">
          <p className="font-mono text-xs leading-6 tracking-[0.1em] text-foreground-muted uppercase">
            {fallbackLabels[project].join(" → ")}
          </p>
        </div>
      )}
    </div>
  );
}
