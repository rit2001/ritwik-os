"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  x: number;
  y: number;
};

const timelinePath =
  "M90 166 C170 166 230 70 330 76 S470 178 570 164 S730 70 840 78 S1010 180 1110 150";

const journeyEvents: readonly JourneyEvent[] = [
  {
    id: "iit-kharagpur",
    date: "2021",
    title: "IIT Kharagpur",
    role: "Dual Degree begins",
    location: "Kharagpur, India",
    evidence:
      "B.Tech + M.Tech in Mechanical Engineering, with algorithms and systems work becoming the software foundation.",
    locationId: "kolkata",
    x: 7.5,
    y: 166,
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
    x: 27.5,
    y: 76,
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
    x: 47.5,
    y: 164,
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
    x: 70,
    y: 78,
  },
  {
    id: "flagship-systems",
    date: "2026",
    title: "Flagship systems",
    role: "Applied AI · Replay · Distributed Collaboration",
    location: "ThesisLens · TraceForge · Converge",
    evidence:
      "Current engineering depth spans retrieval evaluation, deterministic agent replay, and authoritative collaborative state.",
    projectIds: ["thesislens", "traceforge", "converge"],
    x: 92.5,
    y: 150,
  },
] as const;

export function JourneyTimeline() {
  const hostRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const {
    activeTimelineEvent,
    setActiveTimelineEvent,
    setActiveLocation,
    setActiveProject,
  } = useSignalState();
  const [activeId, setActiveId] = useState(
    activeTimelineEvent ?? journeyEvents[0].id,
  );
  const [entrySignalVisible, setEntrySignalVisible] = useState(false);
  const reduceMotion = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "120px" });
  const activeEvent =
    journeyEvents.find((event) => event.id === activeId) ?? journeyEvents[0];
  const activeIndex = journeyEvents.findIndex(
    (event) => event.id === activeEvent.id,
  );

  const activate = useCallback(
    (event: JourneyEvent) => {
      setActiveId(event.id);
      setActiveTimelineEvent(event.id);
      setActiveLocation(event.locationId ?? null);
      setActiveProject(event.projectIds?.[0] ?? null);
    },
    [setActiveLocation, setActiveProject, setActiveTimelineEvent],
  );

  useEffect(() => {
    if (!inView || reduceMotion || hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    const timers = journeyEvents.map((event, index) =>
      window.setTimeout(() => activate(event), 820 + index * 570),
    );
    const signalStart = window.setTimeout(
      () => setEntrySignalVisible(true),
      720,
    );
    const signalEnd = window.setTimeout(
      () => setEntrySignalVisible(false),
      3800,
    );
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(signalStart);
      window.clearTimeout(signalEnd);
    };
  }, [activate, inView, reduceMotion]);

  return (
    <div className="mt-8" ref={hostRef}>
      <div className="relative hidden h-[18rem] lg:block">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[15rem] w-full overflow-visible"
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
        >
          <path
            d={timelinePath}
            fill="none"
            stroke="var(--ritwik-color-border-strong)"
            strokeWidth="2"
          />
          <motion.path
            animate={{ pathLength: (activeIndex + 1) / journeyEvents.length }}
            d={timelinePath}
            fill="none"
            initial={false}
            stroke="var(--ritwik-color-signal-cyan)"
            strokeLinecap="round"
            strokeWidth="3"
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: [0.2, 0, 0, 1],
            }}
          />
          {!reduceMotion && entrySignalVisible ? (
            <circle
              fill="var(--ritwik-color-signal-amber)"
              filter="drop-shadow(0 0 6px var(--ritwik-color-signal-amber))"
              key="journey-entry-packet"
              r="4.5"
            >
              <animateMotion
                dur="2.85s"
                fill="freeze"
                path={timelinePath}
                repeatCount="1"
              />
            </circle>
          ) : null}
        </svg>

        {journeyEvents.map((event, index) => {
          const active = activeEvent.id === event.id;
          const reached = index <= activeIndex;
          return (
            <button
              className="group absolute w-[11.5rem] -translate-x-1/2 text-center"
              key={event.id}
              onClick={() => activate(event)}
              onFocus={() => activate(event)}
              onMouseEnter={() => activate(event)}
              style={{ left: `${event.x}%`, top: `${event.y - 8}px` }}
              type="button"
              aria-expanded={active}
            >
              <span
                className={`relative mx-auto block h-4 w-4 rounded-full border-2 transition-[border-color,background-color,box-shadow,transform] duration-[var(--duration-base)] group-hover:scale-125 group-focus-visible:scale-125 ${
                  active
                    ? "scale-125 border-signal-cyan bg-signal-cyan shadow-[0_0_26px_var(--ritwik-color-signal-cyan)]"
                    : reached
                      ? "border-signal-cyan bg-background"
                      : "border-border-strong bg-background"
                }`}
              >
                {active ? (
                  <span className="signal-ripple absolute inset-[-0.45rem] rounded-full border border-signal-cyan" />
                ) : null}
              </span>
              <span
                className={`mt-3 block border-t px-2 pt-3 transition-colors ${
                  active ? "border-signal-cyan" : "border-border"
                }`}
              >
                <span className="block font-mono text-[0.63rem] font-semibold tracking-[0.1em] text-signal-cyan uppercase">
                  {event.date}
                </span>
                <span className="mt-1 block text-sm font-semibold text-foreground">
                  {event.title}
                </span>
                <span className="mt-1 block text-[0.68rem] leading-4 text-foreground-muted">
                  {event.location}
                </span>
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
                className={`relative w-full border-l px-4 py-4 text-left transition-colors ${
                  active
                    ? "border-signal-cyan bg-accent-muted/35"
                    : "border-border-strong bg-background-elevated/25"
                }`}
                onClick={() => activate(event)}
                onFocus={() => activate(event)}
                type="button"
                aria-expanded={active}
              >
                <span
                  className={`absolute top-5 -left-[1.25rem] h-3 w-3 rounded-full border ${
                    active
                      ? "border-signal-cyan bg-signal-cyan shadow-[0_0_16px_var(--ritwik-color-signal-cyan)]"
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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 grid gap-6 border-y border-border bg-[linear-gradient(90deg,rgb(13_42_80_/_0.34),rgb(7_16_27_/_0.35))] px-5 py-6 sm:px-7 lg:grid-cols-[12rem_minmax(0,1fr)_auto] lg:items-center"
          exit={reduceMotion ? undefined : { opacity: 0, y: 5 }}
          initial={reduceMotion ? false : { opacity: 0, y: 7 }}
          key={activeEvent.id}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
        >
          <div>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
              Active milestone / {activeEvent.date}
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
          ) : (
            <span className="font-mono text-[0.65rem] tracking-[0.1em] text-foreground-muted uppercase">
              Geography linked to globe
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
