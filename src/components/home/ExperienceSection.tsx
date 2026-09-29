"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAmbientPulse } from "@/components/motion/useAmbientPulse";
import {
  type SignalLocationId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import { experience } from "@/data/experience";

const locationByCompany: Record<string, SignalLocationId> = {
  PEPCORNS: "pune",
  "SEARCH-IN": "bengaluru",
  "TASKLY TECHNOLOGIES INC.": "toronto",
};

const routeRoles = [...experience].reverse();

export function ExperienceSection() {
  const hostRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const roles = routeRoles;
  const [activeCompany, setActiveCompany] = useState<string>(
    roles[0]?.company ?? "",
  );
  const [entrySignalVisible, setEntrySignalVisible] = useState(false);
  const [manualInteraction, setManualInteraction] = useState(false);
  const { setActiveLocation } = useSignalState();
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "120px" });
  const ambientTick = useAmbientPulse(
    inView && !reduced && !manualInteraction,
    10400,
    9400,
  );
  const activeRole =
    roles.find((role) => role.company === activeCompany) ?? roles[0];
  const activeIndex = roles.findIndex(
    (role) => role.company === activeRole.company,
  );

  const activate = useCallback(
    (company: string, manual = false) => {
      if (manual) setManualInteraction(true);
      setActiveCompany(company);
      setActiveLocation(locationByCompany[company] ?? null);
    },
    [setActiveLocation],
  );

  useEffect(() => {
    if (!inView || reduced || playedRef.current) return;
    playedRef.current = true;
    const timers = roles.map((role, index) =>
      window.setTimeout(() => activate(role.company), 820 + index * 640),
    );
    const signalStart = window.setTimeout(
      () => setEntrySignalVisible(true),
      720,
    );
    const signalEnd = window.setTimeout(
      () => setEntrySignalVisible(false),
      2920,
    );
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(signalStart);
      window.clearTimeout(signalEnd);
    };
  }, [activate, inView, reduced, roles]);

  return (
    <div
      className="relative mt-14"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setManualInteraction(false);
        }
      }}
      onMouseLeave={() => setManualInteraction(false)}
      ref={hostRef}
    >
      <div className="relative hidden min-h-52 sm:block">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 1000 130"
        >
          <path
            d="M80 82 C230 82 310 30 500 38 S760 92 920 82"
            fill="none"
            stroke="var(--ritwik-color-border-strong)"
            strokeWidth="2"
          />
          <motion.path
            animate={{ pathLength: (activeIndex + 1) / roles.length }}
            d="M80 82 C230 82 310 30 500 38 S760 92 920 82"
            fill="none"
            initial={false}
            stroke="var(--ritwik-color-signal-cyan)"
            strokeLinecap="round"
            strokeWidth="3"
            transition={{ duration: reduced ? 0 : 0.58 }}
          />
          {!reduced && entrySignalVisible ? (
            <circle
              fill="var(--ritwik-color-signal-amber)"
              filter="drop-shadow(0 0 8px var(--ritwik-color-signal-amber))"
              r="4"
            >
              <animateMotion
                dur="1.92s"
                fill="freeze"
                path="M80 82 C230 82 310 30 500 38 S760 92 920 82"
                repeatCount="1"
              />
            </circle>
          ) : null}
          {!reduced && ambientTick > 0 ? (
            <g key={`experience-ambient-${ambientTick}`}>
              <circle
                className="experience-ambient-packet"
                fill="var(--ritwik-color-signal-cyan)"
                r="4"
              >
                <animateMotion
                  dur="3.4s"
                  fill="freeze"
                  path="M80 82 C230 82 310 30 500 38 S760 92 920 82"
                  repeatCount="1"
                />
              </circle>
              {[
                [80, 82],
                [500, 38],
                [920, 82],
              ].map(([cx, cy], index) => (
                <circle
                  className="experience-ambient-ripple"
                  cx={cx}
                  cy={cy}
                  fill="none"
                  key={`${cx}-${cy}`}
                  r="11"
                  stroke="var(--ritwik-color-signal-cyan)"
                  style={{ animationDelay: `${index * 1.05}s` }}
                />
              ))}
            </g>
          ) : null}
        </svg>

        <div className="relative grid grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const active = activeCompany === role.company;
            const markerTop = index === 1 ? 1.45 : 4.2;
            return (
              <button
                className={`group relative min-h-48 text-center transition-transform duration-300 ${active ? "-translate-y-2" : ""}`}
                key={role.company}
                onClick={() => activate(role.company, true)}
                onFocus={() => activate(role.company, true)}
                onMouseEnter={() => activate(role.company, true)}
                type="button"
                aria-pressed={active}
              >
                <span
                  className={`absolute left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rotate-45 border transition-[border-color,background-color,box-shadow,transform] group-hover:scale-110 group-focus-visible:scale-110 ${
                    active
                      ? "border-signal-cyan bg-accent-muted shadow-[0_0_28px_var(--ritwik-color-signal-glow)]"
                      : "border-border-strong bg-background"
                  }`}
                  aria-hidden="true"
                  style={{ top: `${markerTop}rem` }}
                >
                  <span
                    className={`h-2 w-2 rounded-full -rotate-45 ${active ? "bg-signal-cyan" : "bg-foreground-muted"}`}
                  />
                  {active ? (
                    <span className="signal-ripple absolute inset-[-0.45rem] rounded-full border border-signal-cyan" />
                  ) : null}
                </span>
                <span
                  className="block font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase"
                  style={{ paddingTop: `${markerTop + 3.25}rem` }}
                >
                  0{index + 1} · {role.dates}
                </span>
                <span
                  className={`mt-2 block text-lg font-semibold transition-colors ${active ? "text-foreground" : "text-foreground-secondary"}`}
                >
                  {role.company.replace(" INC.", "")}
                </span>
                <span className="mt-1 block font-mono text-[0.65rem] tracking-[0.06em] text-foreground-muted uppercase">
                  {role.location}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative grid gap-2 pl-6 sm:hidden">
        <span
          className="absolute top-2 bottom-2 left-1.5 w-px bg-gradient-to-b from-signal-amber via-signal-cyan to-accent"
          aria-hidden="true"
        />
        {roles.map((role, index) => {
          const active = activeCompany === role.company;
          return (
            <button
              className={`relative border-l px-4 py-3 text-left ${active ? "border-signal-cyan bg-accent-muted/25" : "border-border-strong"}`}
              key={role.company}
              onClick={() => activate(role.company, true)}
              onFocus={() => activate(role.company, true)}
              type="button"
              aria-pressed={active}
            >
              <span
                className={`absolute top-5 -left-[1.55rem] h-3 w-3 rotate-45 border ${active ? "border-signal-cyan bg-signal-cyan" : "border-border-strong bg-background"}`}
                aria-hidden="true"
              />
              <span className="font-mono text-[0.63rem] tracking-[0.1em] text-signal-cyan uppercase">
                0{index + 1} · {role.dates}
              </span>
              <span className="mt-1 block font-semibold text-foreground">
                {role.company}
              </span>
              <span className="mt-1 block text-xs text-foreground-muted">
                {role.role} · {role.location}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-7 overflow-hidden border-y border-border bg-[linear-gradient(110deg,rgb(13_42_80_/_0.32),rgb(7_16_27_/_0.28))] px-5 py-6 sm:px-8 sm:py-7"
          exit={reduced ? undefined : { opacity: 0, y: 5 }}
          initial={reduced ? false : { opacity: 0, y: 7 }}
          key={activeRole.company}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <span
            className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-signal-cyan to-transparent"
            aria-hidden="true"
          />
          <div className="grid gap-7 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)] lg:gap-12">
            <div>
              <p className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
                Active milestone · {activeRole.location}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {activeRole.role}
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground-secondary">
                {activeRole.summary}
              </p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {activeRole.evidence.map((evidence, index) => (
                <li
                  className="relative border-l border-border-strong pl-5 text-sm leading-6 text-foreground-muted"
                  key={evidence}
                >
                  <span className="absolute top-1.5 -left-1 h-2 w-2 rounded-full bg-signal-amber" />
                  <span className="mb-1 block font-mono text-[0.6rem] tracking-[0.1em] text-foreground-muted uppercase">
                    Evidence {String(index + 1).padStart(2, "0")}
                  </span>
                  {evidence}
                </li>
              ))}
            </ol>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
