"use client";

import { useState } from "react";

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
  const roles = [...experience].reverse();
  const [activeCompany, setActiveCompany] = useState<string>(
    roles[0]?.company ?? "",
  );
  const { setActiveLocation } = useSignalState();

  const activate = (company: string) => {
    setActiveCompany(company);
    setActiveLocation(locationByCompany[company] ?? null);
  };

  return (
    <div className="relative mt-12">
      <div
        className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-border sm:block"
        aria-hidden="true"
      >
        <span className="block h-px bg-gradient-to-r from-signal-amber via-signal-cyan to-accent" />
        <span className="signal-sweep-x absolute -top-[0.22rem] h-2 w-2 rounded-full bg-signal-cyan shadow-[0_0_14px_var(--ritwik-color-signal-cyan)]" />
      </div>
      <div
        className="absolute top-6 bottom-6 left-2 w-px bg-gradient-to-b from-signal-amber via-signal-cyan to-accent sm:hidden"
        aria-hidden="true"
      />
      <span
        className="signal-sweep-y absolute left-[0.17rem] h-2 w-2 rounded-full bg-signal-cyan shadow-[0_0_14px_var(--ritwik-color-signal-cyan)] sm:hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {roles.map((role, index) => {
          const active = activeCompany === role.company;
          const contentId = `experience-${index}`;

          return (
            <article
              className={`relative ml-6 border transition-[border-color,background-color,transform] duration-[var(--duration-base)] sm:ml-0 sm:pt-8 ${
                active
                  ? "border-signal-cyan bg-accent-muted/24 sm:-translate-y-1"
                  : "border-border bg-background-elevated/35"
              }`}
              key={role.company}
            >
              <span
                className={`absolute top-5 -left-[1.68rem] h-3.5 w-3.5 rounded-full border-2 sm:top-0 sm:left-1/2 sm:-translate-x-1/2 ${
                  active
                    ? "border-signal-cyan bg-signal-cyan shadow-[0_0_20px_var(--ritwik-color-signal-cyan)]"
                    : "border-border-strong bg-background"
                }`}
                aria-hidden="true"
              />
              <button
                className="w-full px-5 py-5 text-left sm:pt-4"
                aria-controls={contentId}
                aria-expanded={active}
                onClick={() => activate(role.company)}
                onFocus={() => activate(role.company)}
                onMouseEnter={() => activate(role.company)}
                type="button"
              >
                <span className="font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
                  0{index + 1} / {role.dates}
                </span>
                <span className="mt-3 block text-xl font-semibold text-foreground">
                  {role.company}
                </span>
                <span className="mt-2 block text-sm leading-6 text-foreground-secondary">
                  {role.role}
                </span>
                <span className="mt-3 block font-mono text-[0.68rem] tracking-[0.06em] text-foreground-muted uppercase">
                  {role.location}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-[var(--duration-slow)] ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                id={contentId}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-border px-5 py-5">
                    <p className="text-sm leading-6 text-foreground-secondary">
                      {role.summary}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {role.evidence.slice(0, 2).map((evidence) => (
                        <li
                          className="border-l border-signal-cyan/45 pl-3 text-xs leading-5 text-foreground-muted"
                          key={evidence}
                        >
                          {evidence}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
