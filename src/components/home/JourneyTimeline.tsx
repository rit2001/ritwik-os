"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import {
  type SignalLocationId,
  type SignalProjectId,
  useSignalState,
} from "@/components/signal/SignalProvider";

type JourneyEvent = {
  id: string;
  date: string;
  title: string;
  role: string;
  location: string;
  evidence: string;
  locationId?: SignalLocationId;
  projectIds?: readonly SignalProjectId[];
  desktopPosition: string;
};

const journeyEvents: readonly JourneyEvent[] = [
  {
    id: "iit-kharagpur",
    date: "2021",
    title: "IIT Kharagpur",
    role: "Dual Degree begins",
    location: "Kharagpur, India",
    evidence:
      "B.Tech + M.Tech in Mechanical Engineering, with algorithms and systems work becoming the software foundation.",
    desktopPosition: "left-[2%] top-[67%]",
  },
  {
    id: "pepcorns",
    date: "2024 MAR–APR",
    title: "Pepcorns",
    role: "Full-Stack Developer Intern",
    location: "Remote · Pune",
    evidence:
      "Built referral attribution, reward issuance, backend integrations, and reusable React workflows.",
    locationId: "pune",
    desktopPosition: "left-[24%] top-[25%]",
  },
  {
    id: "search-in",
    date: "2024 JUN–JUL",
    title: "Search-in",
    role: "Full-Stack Developer Intern",
    location: "Remote · Bengaluru",
    evidence:
      "Built operational APIs and interfaces, with indexed queries, Redis caching, and measured workflow improvement.",
    locationId: "bengaluru",
    desktopPosition: "left-[46%] top-[58%]",
  },
  {
    id: "taskly",
    date: "2025 MAR–JUL",
    title: "Taskly Technologies",
    role: "Software Engineering Intern",
    location: "Remote · Toronto, Canada",
    evidence:
      "Delivered AI-assisted JobSense modules across Next.js, FastAPI, PostgreSQL, authentication, and deployment workflows.",
    locationId: "toronto",
    desktopPosition: "left-[67%] top-[18%]",
  },
  {
    id: "flagship-systems",
    date: "2026",
    title: "Building Flagship Systems",
    role: "Applied AI · Replay · Distributed Collaboration",
    location: "ThesisLens · TraceForge · Converge",
    evidence:
      "Current engineering depth spans retrieval evaluation, deterministic agent replay, and authoritative collaborative state.",
    projectIds: ["thesislens", "traceforge", "converge"],
    desktopPosition: "right-[1%] top-[52%]",
  },
] as const;

export function JourneyTimeline() {
  const {
    activeTimelineEvent,
    setActiveTimelineEvent,
    setActiveLocation,
    setActiveProject,
  } = useSignalState();
  const [activeId, setActiveId] = useState(
    activeTimelineEvent ?? journeyEvents[0].id,
  );
  const reduceMotion = useReducedMotion() === true;
  const activeEvent =
    journeyEvents.find((event) => event.id === activeId) ?? journeyEvents[0];

  const activate = (event: JourneyEvent) => {
    setActiveId(event.id);
    setActiveTimelineEvent(event.id);
    if (event.locationId) setActiveLocation(event.locationId);
    if (event.projectIds?.[0]) setActiveProject(event.projectIds[0]);
  };

  return (
    <div className="mt-12">
      <div className="relative hidden h-[23rem] lg:block">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-8 h-[15rem] w-full"
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
        >
          <path
            d="M32 170 C150 170 188 50 310 62 S520 206 642 150 S810 32 930 68 S1068 186 1170 146"
            fill="none"
            stroke="var(--ritwik-color-border-strong)"
            strokeWidth="2"
          />
          <motion.path
            d="M32 170 C150 170 188 50 310 62 S520 206 642 150 S810 32 930 68 S1068 186 1170 146"
            fill="none"
            stroke="var(--ritwik-color-signal-cyan)"
            strokeLinecap="round"
            strokeWidth="2"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: reduceMotion ? 0 : 1.1,
              ease: [0.2, 0, 0, 1],
            }}
          />
          {!reduceMotion ? (
            <circle fill="var(--ritwik-color-signal-amber)" r="5">
              <animateMotion
                begin="0.35s"
                dur="1.15s"
                fill="freeze"
                path="M32 170 C150 170 188 50 310 62 S520 206 642 150 S810 32 930 68 S1068 186 1170 146"
              />
            </circle>
          ) : (
            <circle
              cx="1170"
              cy="146"
              fill="var(--ritwik-color-signal-amber)"
              r="5"
            />
          )}
        </svg>

        {journeyEvents.map((event) => {
          const active = activeEvent.id === event.id;
          return (
            <button
              className={`absolute w-[13.5rem] text-left transition-transform duration-[var(--duration-base)] hover:-translate-y-1 focus-visible:-translate-y-1 ${event.desktopPosition}`}
              key={event.id}
              onClick={() => activate(event)}
              onFocus={() => activate(event)}
              onMouseEnter={() => activate(event)}
              type="button"
              aria-expanded={active}
            >
              <span
                className={`relative mb-3 block h-4 w-4 rounded-full border-2 ${
                  active
                    ? "border-signal-cyan bg-signal-cyan shadow-[0_0_24px_var(--ritwik-color-signal-cyan)]"
                    : "border-border-strong bg-background"
                }`}
              >
                {active ? (
                  <span className="signal-ripple absolute inset-[-0.35rem] rounded-full border border-signal-cyan" />
                ) : null}
              </span>
              <span className="block font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
                {event.date}
              </span>
              <span className="mt-1 block text-base font-semibold text-foreground">
                {event.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-foreground-muted">
                {event.location}
              </span>
            </button>
          );
        })}
      </div>

      <ol className="relative grid gap-3 pl-5 lg:hidden">
        <span
          className="absolute top-3 bottom-3 left-[0.42rem] w-px bg-gradient-to-b from-signal-cyan via-accent to-signal-amber"
          aria-hidden="true"
        />
        {journeyEvents.map((event) => {
          const active = activeEvent.id === event.id;
          return (
            <li key={event.id}>
              <button
                className={`relative w-full border px-4 py-4 text-left transition-colors ${
                  active
                    ? "border-signal-cyan bg-accent-muted/35"
                    : "border-border bg-background-elevated/35"
                }`}
                onClick={() => activate(event)}
                onFocus={() => activate(event)}
                type="button"
                aria-expanded={active}
              >
                <span
                  className={`absolute top-5 -left-[1.25rem] h-3 w-3 rounded-full border ${
                    active
                      ? "border-signal-cyan bg-signal-cyan"
                      : "border-border-strong bg-background"
                  }`}
                  aria-hidden="true"
                />
                <span className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-signal-cyan uppercase">
                  {event.date}
                </span>
                <span className="mt-1 block font-semibold text-foreground">
                  {event.title}
                </span>
                <span className="mt-1 block text-sm text-foreground-muted">
                  {event.role} · {event.location}
                </span>
                {active ? (
                  <span className="mt-3 block text-sm leading-6 text-foreground-secondary">
                    {event.evidence}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 grid gap-6 border-y border-border bg-background-elevated/35 px-5 py-6 sm:px-7 lg:grid-cols-[12rem_minmax(0,1fr)_auto] lg:items-center">
        <div>
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
            Active signal / {activeEvent.date}
          </p>
          <p className="mt-2 text-xl font-semibold text-foreground">
            {activeEvent.title}
          </p>
        </div>
        <div>
          <p className="font-medium text-foreground-secondary">
            {activeEvent.role}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">
            {activeEvent.evidence}
          </p>
        </div>
        {activeEvent.projectIds ? (
          <div className="flex flex-wrap gap-2">
            {activeEvent.projectIds.map((project) => (
              <a
                className="inline-flex min-h-10 items-center border border-border-strong px-3 font-mono text-xs font-semibold tracking-[0.08em] text-foreground uppercase transition-colors hover:border-signal-cyan hover:text-signal-cyan focus-visible:border-signal-cyan focus-visible:text-signal-cyan"
                href={`#${project}`}
                key={project}
                onFocus={() => setActiveProject(project)}
                onMouseEnter={() => setActiveProject(project)}
              >
                {project}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
