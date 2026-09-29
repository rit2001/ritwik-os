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
  const sealed = activeStep >= 1;

  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 820 500">
      <defs>
        <radialGradient id="tf-core">
          <stop stopColor="rgb(94 231 247 / 0.34)" />
          <stop offset="0.58" stopColor="rgb(47 127 255 / 0.13)" />
          <stop offset="1" stopColor="rgb(4 7 13 / 0.92)" />
        </radialGradient>
        <linearGradient id="tf-stream" x1="0" x2="1">
          <stop stopColor="rgb(94 231 247 / 0.08)" />
          <stop offset="1" stopColor="rgb(94 231 247 / 0.72)" />
        </linearGradient>
      </defs>

      <g opacity={captureActive ? 1 : 0.58}>
        <rect
          fill="rgb(7 20 34 / 0.96)"
          height="62"
          rx="8"
          stroke="var(--ritwik-color-accent)"
          width="154"
          x="24"
          y="50"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="101"
          y="77"
        >
          LIVE EXECUTION
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="101"
          y="96"
        >
          CONTROLLED BOUNDARIES
        </text>
        {["MODEL", "HTTP", "TOOL", "STATE"].map((label, index) => {
          const y = 158 + index * 78;
          const path = `M52 ${y} C136 ${y} 182 ${216 + index * 14} 251 ${236 + index * 7}`;
          return (
            <g key={label}>
              <path
                d={path}
                fill="none"
                stroke="url(#tf-stream)"
                strokeDasharray="3 7"
                strokeWidth="1.8"
              />
              <rect
                fill="rgb(5 17 29 / 0.96)"
                height="34"
                rx="17"
                stroke={
                  index % 2
                    ? "var(--ritwik-color-signal-amber)"
                    : "var(--ritwik-color-signal-cyan)"
                }
                width="92"
                x="28"
                y={y - 17}
              />
              <text
                fill="var(--ritwik-color-foreground-secondary)"
                fontFamily="monospace"
                fontSize="8"
                textAnchor="middle"
                x="74"
                y={y + 3}
              >
                {label}
              </text>
              {!reduced && captureActive ? (
                <circle
                  fill={
                    index % 2
                      ? "var(--ritwik-color-signal-amber)"
                      : "var(--ritwik-color-signal-cyan)"
                  }
                  r="4.5"
                >
                  <animateMotion
                    begin={`${index * 0.18}s`}
                    dur="0.9s"
                    fill="freeze"
                    path={path}
                    repeatCount="1"
                  />
                </circle>
              ) : null}
            </g>
          );
        })}
      </g>

      <g opacity={sealActive || captureActive ? 1 : 0.88}>
        <circle
          className={!reduced && sealActive ? "trace-seal-pulse" : undefined}
          cx="381"
          cy="252"
          fill="none"
          r="151"
          stroke="var(--ritwik-color-signal-cyan)"
        />
        {[0, 1, 2, 3].map((layer) => (
          <path
            className={
              !reduced && captureActive ? "trace-layer-build" : undefined
            }
            d={`M381 ${99 + layer * 14} L${509 - layer * 12} ${180 + layer * 9} L${465 - layer * 9} ${347 - layer * 10} L${297 + layer * 8} ${365 - layer * 12} L${245 + layer * 12} ${202 + layer * 8} Z`}
            fill={layer === 3 ? "url(#tf-core)" : "none"}
            key={layer}
            opacity={0.34 + layer * 0.17}
            style={{ animationDelay: `${layer * 150}ms` }}
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
          x="381"
          y="234"
        >
          REPLAY CAPSULE
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="381"
          y="257"
        >
          {sealed ? "SEALED · IMMUTABLE" : "CAPTURING BOUNDARIES"}
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="381"
          y="278"
        >
          SEQUENCE + REQUEST FINGERPRINT
        </text>
        <path
          d="M329 298 H433 M337 311 H425 M347 324 H415"
          opacity="0.65"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeDasharray="2 5"
        />
      </g>

      <g opacity={replayActive || diffActive ? 1 : 0.5}>
        <path
          d="M506 205 C548 205 544 121 586 121 M506 294 C548 294 544 379 586 379"
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
          width="142"
          x="578"
          y="83"
        />
        <rect
          fill="rgb(8 25 43 / 0.96)"
          height="76"
          rx="38"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth={replayActive ? 2.5 : 1.4}
          width="144"
          x="578"
          y="341"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="649"
          y="114"
        >
          ORIGINAL
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="649"
          y="134"
        >
          FINGERPRINT ✓
        </text>
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          textAnchor="middle"
          x="649"
          y="372"
        >
          REPLAY
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="649"
          y="392"
        >
          NO LIVE FALLBACK
        </text>
      </g>

      <g opacity={diffActive ? 1 : 0.72}>
        <path
          d="M649 159 V207 M649 341 V293"
          stroke="var(--ritwik-color-border-strong)"
          strokeWidth="2"
        />
        <rect
          fill="rgb(242 185 95 / 0.09)"
          height="86"
          rx="8"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth={diffActive ? 3 : 1.5}
          width="174"
          x="562"
          y="207"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          x="649"
          y="239"
        >
          STRUCTURAL DIFF
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="649"
          y="261"
        >
          REGRESSION RESULT
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="649"
          y="278"
        >
          EXACT MATCH / REVIEW
        </text>
      </g>
    </svg>
  );
}

function TraceForgeMobileVisual({ activeStep }: Readonly<VisualProps>) {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 320 610">
      <path
        d="M160 103 V170 M160 330 V365 M95 411 V458 M225 411 V458 M95 458 C95 475 160 472 160 492 M225 458 C225 475 160 472 160 492"
        fill="none"
        stroke="var(--ritwik-color-border-strong)"
        strokeWidth="2"
      />
      <text
        fill="var(--ritwik-color-foreground-muted)"
        fontFamily="monospace"
        fontSize="8"
        textAnchor="middle"
        x="160"
        y="40"
      >
        LIVE EXECUTION
      </text>
      {["MODEL", "HTTP", "TOOL", "STATE"].map((label, index) => (
        <g key={label} transform={`translate(${18 + index * 74} 57)`}>
          <rect
            fill="rgb(7 20 34 / .96)"
            height="34"
            rx="17"
            stroke={
              index % 2
                ? "var(--ritwik-color-signal-amber)"
                : "var(--ritwik-color-signal-cyan)"
            }
            width="64"
          />
          <text
            fill="var(--ritwik-color-foreground-secondary)"
            fontFamily="monospace"
            fontSize="7"
            textAnchor="middle"
            x="32"
            y="21"
          >
            {label}
          </text>
        </g>
      ))}
      <g opacity={activeStep <= 1 ? 1 : 0.78}>
        <circle
          cx="160"
          cy="250"
          fill="rgb(47 127 255 / .08)"
          r="82"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth={activeStep === 1 ? 3 : 1.5}
        />
        <circle
          cx="160"
          cy="250"
          fill="none"
          r="65"
          stroke="var(--ritwik-color-accent)"
        />
        <path
          d="M116 223 H204 M124 238 H196 M132 253 H188"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeDasharray="2 5"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          x="160"
          y="279"
        >
          REPLAY CAPSULE
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="160"
          y="296"
        >
          {activeStep > 0 ? "SEALED · IMMUTABLE" : "CAPTURING"}
        </text>
      </g>
      {[
        [42, "ORIGINAL", "FINGERPRINT ✓"],
        [172, "REPLAY", "NO LIVE FALLBACK"],
      ].map(([x, label, sub]) => (
        <g key={String(label)} opacity={activeStep >= 2 ? 1 : 0.55}>
          <rect
            fill="rgb(7 20 34 / .96)"
            height="46"
            rx="23"
            stroke={
              label === "ORIGINAL"
                ? "var(--ritwik-color-signal-cyan)"
                : "var(--ritwik-color-signal-amber)"
            }
            width="106"
            x={Number(x)}
            y="365"
          />
          <text
            fill="var(--ritwik-color-foreground)"
            fontFamily="monospace"
            fontSize="8"
            textAnchor="middle"
            x={Number(x) + 53}
            y="385"
          >
            {String(label)}
          </text>
          <text
            fill="var(--ritwik-color-foreground-muted)"
            fontFamily="monospace"
            fontSize="6"
            textAnchor="middle"
            x={Number(x) + 53}
            y="400"
          >
            {String(sub)}
          </text>
        </g>
      ))}
      <g opacity={activeStep === 3 ? 1 : 0.58}>
        <rect
          fill="rgb(242 185 95 / .08)"
          height="72"
          rx="8"
          stroke="var(--ritwik-color-signal-amber)"
          strokeWidth={activeStep === 3 ? 3 : 1.5}
          width="190"
          x="65"
          y="492"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="160"
          y="521"
        >
          STRUCTURAL DIFF
        </text>
        <text
          fill="var(--ritwik-color-signal-amber)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="160"
          y="543"
        >
          REGRESSION RESULT
        </text>
      </g>
    </svg>
  );
}

function ConvergeVisual({ activeStep, reduced }: Readonly<VisualProps>) {
  const offlineActive = activeStep === 0 || activeStep === 2;
  const recovered = activeStep === 2;
  const authorityActive = activeStep === 1;
  const deliveryActive = activeStep === 3;
  const operationPath =
    "M184 105 C226 105 230 222 270 222 H446 C470 222 476 210 508 210 H612 V134 H672 V215 H750 C770 215 770 143 793 143";

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
                  ? recovered
                    ? "var(--ritwik-color-signal-cyan)"
                    : "var(--ritwik-color-signal-amber)"
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
                  ? recovered
                    ? "var(--ritwik-color-signal-cyan)"
                    : "var(--ritwik-color-signal-amber)"
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
            {index === 2 ? (
              <text
                fill={
                  recovered
                    ? "var(--ritwik-color-signal-cyan)"
                    : "var(--ritwik-color-signal-amber)"
                }
                fontFamily="monospace"
                fontSize="7"
                x={Number(x) + 20}
                y={Number(y) + 57}
              >
                {recovered ? "CURRENT" : "DISCONNECTED"}
              </text>
            ) : null}
          </g>
        ))}
        <g opacity={recovered ? 0.18 : offlineActive ? 1 : 0.55}>
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
            QUEUED OP · INDEXEDDB
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
        stroke={
          recovered
            ? "var(--ritwik-color-signal-cyan)"
            : "var(--ritwik-color-signal-amber)"
        }
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
        {authorityActive && !reduced ? (
          <ellipse
            className="signal-ripple"
            cx="508"
            cy="277"
            fill="none"
            rx="70"
            ry="27"
            stroke="var(--ritwik-color-signal-cyan)"
          />
        ) : null}
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
          key={sequence}
          transform={
            !reduced && activeStep > 0
              ? undefined
              : `translate(${420 + index * 72} 344)`
          }
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
          {!reduced && activeStep > 0 ? (
            <animateMotion
              begin={`${index * 0.82}s`}
              dur="0.78s"
              fill="freeze"
              path={operationPath}
              repeatCount="1"
            />
          ) : null}
        </g>
      ))}
      <text
        fill="var(--ritwik-color-signal-amber)"
        fontFamily="monospace"
        fontSize="8"
        x="208"
        y="408"
      >
        {recovered
          ? "FIXED-WATERMARK CATCH-UP ✓ · QUEUE DRAINED · CURRENT"
          : "DISCONNECTED · LOCAL INTENT PERSISTED · RECONNECT READY"}
      </text>
    </svg>
  );
}

function ConvergeMobileVisual({ activeStep }: Readonly<VisualProps>) {
  const recovered = activeStep === 2;
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 320 650">
      <path
        d="M82 88 C82 132 160 130 160 168 M238 88 C238 132 160 130 160 168 M160 230 V270 M160 330 V365 M160 413 V448 M160 496 V526 M160 576 C160 603 92 600 92 620 M160 576 C160 603 228 600 228 620"
        fill="none"
        stroke="var(--ritwik-color-border-strong)"
        strokeWidth="2"
      />
      <path
        d="M61 141 C20 190 30 290 78 314"
        fill="none"
        stroke={
          recovered
            ? "var(--ritwik-color-signal-cyan)"
            : "var(--ritwik-color-signal-amber)"
        }
        strokeDasharray="5 7"
        strokeWidth="2"
      />
      {[
        [28, "CLIENT A"],
        [188, "CLIENT B"],
      ].map(([x, label]) => (
        <g key={String(label)}>
          <rect
            fill="rgb(7 20 34 / .98)"
            height="44"
            rx="7"
            stroke="var(--ritwik-color-accent)"
            width="104"
            x={Number(x)}
            y="44"
          />
          <circle
            cx={Number(x) + 17}
            cy="60"
            fill="var(--ritwik-color-success)"
            r="3.5"
          />
          <text
            fill="var(--ritwik-color-foreground)"
            fontFamily="monospace"
            fontSize="8"
            textAnchor="middle"
            x={Number(x) + 52}
            y="73"
          >
            {String(label)}
          </text>
        </g>
      ))}
      <g>
        <rect
          fill="rgb(242 185 95 / .07)"
          height="42"
          rx="6"
          stroke={
            recovered
              ? "var(--ritwik-color-signal-cyan)"
              : "var(--ritwik-color-signal-amber)"
          }
          width="122"
          x="0"
          y="115"
        />
        <text
          fill={
            recovered
              ? "var(--ritwik-color-signal-cyan)"
              : "var(--ritwik-color-signal-amber)"
          }
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="61"
          y="133"
        >
          OFFLINE CLIENT
        </text>
        <text
          fill="var(--ritwik-color-foreground-muted)"
          fontFamily="monospace"
          fontSize="6"
          textAnchor="middle"
          x="61"
          y="148"
        >
          {recovered ? "CURRENT" : "QUEUED · INDEXEDDB"}
        </text>
      </g>
      <g opacity={activeStep === 1 ? 1 : 0.82}>
        <path
          d="M105 168 H215 L232 199 L215 230 H105 L88 199 Z"
          fill="rgb(47 127 255 / .14)"
          stroke="var(--ritwik-color-signal-cyan)"
          strokeWidth={activeStep === 1 ? 3 : 1.5}
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="9"
          fontWeight="700"
          textAnchor="middle"
          x="160"
          y="195"
        >
          BOARD AUTHORITY
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="160"
          y="212"
        >
          041 → 042 → 043
        </text>
      </g>
      <g>
        <rect
          fill="rgb(7 20 34 / .98)"
          height="60"
          rx="8"
          stroke="var(--ritwik-color-accent)"
          width="160"
          x="80"
          y="270"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="9"
          textAnchor="middle"
          x="160"
          y="294"
        >
          POSTGRESQL COMMIT
        </text>
        <text
          fill="var(--ritwik-color-signal-cyan)"
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="160"
          y="313"
        >
          SEQUENCE + OUTBOX ✓
        </text>
      </g>
      {[
        [104, 365, "OUTBOX WORKER", "PUBLISH"],
        [104, 448, "REDIS STREAM", "AT LEAST ONCE"],
      ].map(([x, y, label, sub]) => (
        <g key={String(label)} opacity={activeStep === 3 ? 1 : 0.72}>
          <rect
            fill="rgb(7 20 34 / .98)"
            height="48"
            rx="7"
            stroke={
              label === "OUTBOX WORKER"
                ? "var(--ritwik-color-signal-amber)"
                : "var(--ritwik-color-signal-cyan)"
            }
            width="112"
            x={Number(x)}
            y={Number(y)}
          />
          <text
            fill="var(--ritwik-color-foreground-secondary)"
            fontFamily="monospace"
            fontSize="8"
            textAnchor="middle"
            x="160"
            y={Number(y) + 20}
          >
            {String(label)}
          </text>
          <text
            fill="var(--ritwik-color-foreground-muted)"
            fontFamily="monospace"
            fontSize="6"
            textAnchor="middle"
            x="160"
            y={Number(y) + 35}
          >
            {String(sub)}
          </text>
        </g>
      ))}
      <g>
        <rect
          fill="rgb(7 20 34 / .98)"
          height="50"
          rx="7"
          stroke="var(--ritwik-color-accent)"
          width="160"
          x="80"
          y="526"
        />
        <text
          fill="var(--ritwik-color-foreground)"
          fontFamily="monospace"
          fontSize="8"
          textAnchor="middle"
          x="160"
          y="548"
        >
          FIXED-WATERMARK CATCH-UP
        </text>
        <text
          fill={
            recovered
              ? "var(--ritwik-color-signal-cyan)"
              : "var(--ritwik-color-foreground-muted)"
          }
          fontFamily="monospace"
          fontSize="7"
          textAnchor="middle"
          x="160"
          y="564"
        >
          {recovered ? "QUEUE DRAINED · CURRENT" : "RECOVERY READY"}
        </text>
      </g>
      {[
        [44, "REPLICA A"],
        [180, "REPLICA B"],
      ].map(([x, label]) => (
        <g key={String(label)}>
          <rect
            fill="rgb(7 20 34 / .98)"
            height="38"
            rx="6"
            stroke="var(--ritwik-color-accent)"
            width="96"
            x={Number(x)}
            y="606"
          />
          <text
            fill="var(--ritwik-color-foreground-secondary)"
            fontFamily="monospace"
            fontSize="7"
            textAnchor="middle"
            x={Number(x) + 48}
            y="630"
          >
            {String(label)}
          </text>
        </g>
      ))}
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
      className={`relative overflow-hidden border border-border ${atmosphere} ${project === "thesislens" ? "min-h-[23rem] sm:min-h-[30rem]" : "min-h-[38rem] sm:min-h-[30rem]"} ${className}`}
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
        <div className="absolute inset-0 pt-7" key={`${project}-${activeStep}`}>
          {project === "thesislens" ? (
            <ThesisLensVisual
              activeStep={activeStep}
              reduced={reduced || !isVisible}
            />
          ) : project === "traceforge" ? (
            <>
              <div className="hidden h-full sm:block">
                <TraceForgeVisual
                  activeStep={activeStep}
                  reduced={reduced || !isVisible}
                />
              </div>
              <div className="h-full sm:hidden">
                <TraceForgeMobileVisual
                  activeStep={activeStep}
                  reduced={reduced || !isVisible}
                />
              </div>
            </>
          ) : (
            <>
              <div className="hidden h-full sm:block">
                <ConvergeVisual
                  activeStep={activeStep}
                  reduced={reduced || !isVisible}
                />
              </div>
              <div className="h-full sm:hidden">
                <ConvergeMobileVisual
                  activeStep={activeStep}
                  reduced={reduced || !isVisible}
                />
              </div>
            </>
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
