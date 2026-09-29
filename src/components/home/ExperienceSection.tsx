"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef, useState } from "react";

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

export function ExperienceSection() {
  const hostRef = useRef<HTMLDivElement>(null);
  const roles = [...experience].reverse();
  const [activeCompany, setActiveCompany] = useState<string>(
    roles[0]?.company ?? "",
  );
  const { setActiveLocation } = useSignalState();
  const reduced = useReducedMotion() === true;
  const inView = useInView(hostRef, { margin: "120px" });
  const activeRole =
    roles.find((role) => role.company === activeCompany) ?? roles[0];

  const activate = (company: string) => {
    setActiveCompany(company);
    setActiveLocation(locationByCompany[company] ?? null);
  };

  return (
    <div className="relative mt-14" ref={hostRef}>
      <div className="relative hidden min-h-40 sm:block">
        <div
          className="absolute top-9 right-[8%] left-[8%] h-px bg-border-strong"
          aria-hidden="true"
        >
          <span className="block h-px bg-gradient-to-r from-signal-amber via-signal-cyan to-accent" />
          <span
            className={`${inView && !reduced ? "signal-sweep-x" : ""} absolute -top-[0.24rem] h-2.5 w-2.5 rounded-full bg-signal-cyan shadow-[0_0_18px_var(--ritwik-color-signal-cyan)]`}
          />
        </div>

        <div className="relative grid grid-cols-3 gap-10">
          {roles.map((role, index) => {
            const active = activeCompany === role.company;
            return (
              <button
                className="group relative pt-[4.3rem] text-left"
                key={role.company}
                onClick={() => activate(role.company)}
                onFocus={() => activate(role.company)}
                onMouseEnter={() => activate(role.company)}
                type="button"
                aria-pressed={active}
              >
                <span
                  className={`absolute top-[1.58rem] left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rotate-45 border transition-[border-color,background-color,box-shadow,transform] group-hover:scale-110 group-focus-visible:scale-110 ${
                    active
                      ? "border-signal-cyan bg-accent-muted shadow-[0_0_28px_var(--ritwik-color-signal-glow)]"
                      : "border-border-strong bg-background"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`h-2 w-2 rounded-full -rotate-45 ${active ? "bg-signal-cyan" : "bg-foreground-muted"}`}
                  />
                  {active ? (
                    <span className="signal-ripple absolute inset-[-0.45rem] rounded-full border border-signal-cyan" />
                  ) : null}
                </span>
                <span className="block text-center font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
                  0{index + 1} · {role.dates}
                </span>
                <span
                  className={`mt-3 block text-center text-lg font-semibold transition-colors ${active ? "text-foreground" : "text-foreground-secondary"}`}
                >
                  {role.company.replace(" INC.", "")}
                </span>
                <span className="mt-1 block text-center font-mono text-[0.65rem] tracking-[0.06em] text-foreground-muted uppercase">
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
              onClick={() => activate(role.company)}
              onFocus={() => activate(role.company)}
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
