"use client";

import { motion, useReducedMotion } from "motion/react";

import { ActionLink } from "@/components/ui/ActionLink";
import type { WorkMeta } from "@/types/content";

export function AgenticCaseStudyCover({ meta }: Readonly<{ meta: WorkMeta }>) {
  const reduced = useReducedMotion() === true;
  const facts = [
    ["Status", meta.statusLabel],
    ["Project period", meta.year],
    ...(meta.headerFacts ?? []).map((fact) => [fact.label, fact.value]),
  ];
  const routes = [
    "M320 118 V165",
    "M320 245 C320 278 120 270 120 312",
    "M320 245 C320 278 255 270 255 312",
    "M320 245 C320 278 390 270 390 312",
    "M320 245 C320 278 525 270 525 312",
    "M120 368 C120 410 320 396 320 438 M255 368 C255 410 320 396 320 438 M390 368 C390 410 320 396 320 438 M525 368 C525 410 320 396 320 438",
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,.44fr)_minmax(34rem,.56fr)] lg:items-center lg:gap-14">
      <div>
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-signal-cyan uppercase">
          {meta.category}
        </p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.8rem,5.2vw,5.4rem)] leading-[0.89] font-semibold tracking-[-0.052em] text-balance text-foreground">
          {meta.title}
        </h1>
        <p className="mt-6 max-w-2xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
          {meta.summary}
        </p>

        <dl className="mt-7 grid gap-3 border-y border-border py-4 sm:grid-cols-2">
          {facts.slice(0, 4).map(([label, value]) => (
            <div
              className="border-l border-border-strong pl-3"
              key={`${label}-${value}`}
            >
              <dt className="font-mono text-[0.58rem] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-xs leading-5 text-foreground-secondary">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {meta.repositoryUrl || meta.demoUrl ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {meta.repositoryUrl ? (
              <ActionLink
                href={meta.repositoryUrl}
                rel="noopener noreferrer"
                target="_blank"
                variant="secondary"
              >
                GitHub ↗
              </ActionLink>
            ) : null}
            {meta.demoUrl ? (
              <ActionLink
                href={meta.demoUrl}
                rel="noopener noreferrer"
                target="_blank"
                variant="secondary"
              >
                Live Demo ↗
              </ActionLink>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative min-h-[28rem] overflow-hidden border border-border bg-[radial-gradient(circle_at_50%_42%,rgb(47_127_255_/.11),transparent_18rem),linear-gradient(145deg,rgb(8_20_34_/.96),rgb(4_7_13_/.95))]">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-20" />
        <p className="absolute top-4 left-4 z-10 font-mono text-[0.6rem] font-semibold tracking-[0.13em] text-signal-cyan uppercase">
          Stateful agent workflow
        </p>
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full pt-8"
          viewBox="0 0 640 500"
        >
          {routes.map((route, index) => (
            <motion.path
              d={route}
              fill="none"
              initial={reduced ? false : { pathLength: 0, opacity: 0.2 }}
              key={route}
              stroke={
                index === routes.length - 1
                  ? "var(--ritwik-color-signal-amber)"
                  : "var(--ritwik-color-accent)"
              }
              strokeWidth="1.7"
              transition={{
                delay: reduced ? 0 : index * 0.12,
                duration: reduced ? 0 : 0.72,
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
            />
          ))}
          <g>
            <rect
              fill="rgb(7 20 34 / .98)"
              height="54"
              rx="27"
              stroke="var(--ritwik-color-border-strong)"
              width="132"
              x="254"
              y="64"
            />
            <text
              fill="var(--ritwik-color-foreground)"
              fontFamily="monospace"
              fontSize="11"
              textAnchor="middle"
              x="320"
              y="97"
            >
              USER
            </text>
          </g>
          <g>
            <rect
              fill="rgb(13 42 80 / .62)"
              height="80"
              rx="10"
              stroke="var(--ritwik-color-signal-cyan)"
              strokeWidth="2"
              width="250"
              x="195"
              y="165"
            />
            <text
              fill="var(--ritwik-color-foreground)"
              fontFamily="monospace"
              fontSize="13"
              fontWeight="700"
              textAnchor="middle"
              x="320"
              y="199"
            >
              LANGGRAPH ORCHESTRATION
            </text>
            <text
              fill="var(--ritwik-color-signal-cyan)"
              fontFamily="monospace"
              fontSize="8"
              textAnchor="middle"
              x="320"
              y="222"
            >
              STATEFUL TOOL-USE LOOP
            </text>
          </g>
          {[
            [55, "RAG / FAISS", "RETRIEVAL"],
            [190, "TOOLS", "BOUND CALLS"],
            [325, "STATE / SQLITE", "CHECKPOINTS"],
            [460, "HITL APPROVAL", "INTERRUPT / RESUME"],
          ].map(([x, label, sub], index) => (
            <g key={String(label)}>
              <rect
                fill="rgb(7 20 34 / .98)"
                height="56"
                rx="7"
                stroke={
                  index === 3
                    ? "var(--ritwik-color-signal-amber)"
                    : "var(--ritwik-color-border-strong)"
                }
                width="110"
                x={Number(x)}
                y="312"
              />
              <text
                fill="var(--ritwik-color-foreground-secondary)"
                fontFamily="monospace"
                fontSize="8"
                textAnchor="middle"
                x={Number(x) + 55}
                y="337"
              >
                {String(label)}
              </text>
              <text
                fill="var(--ritwik-color-foreground-muted)"
                fontFamily="monospace"
                fontSize="6"
                textAnchor="middle"
                x={Number(x) + 55}
                y="353"
              >
                {String(sub)}
              </text>
            </g>
          ))}
          <g>
            <rect
              fill="rgb(94 231 247 / .08)"
              height="52"
              rx="26"
              stroke="var(--ritwik-color-signal-cyan)"
              width="154"
              x="243"
              y="438"
            />
            <text
              fill="var(--ritwik-color-foreground)"
              fontFamily="monospace"
              fontSize="11"
              textAnchor="middle"
              x="320"
              y="469"
            >
              RESPONSE
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
