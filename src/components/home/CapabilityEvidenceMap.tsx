"use client";

import { useMemo, useState } from "react";

import {
  type SignalProjectId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import { capabilityGroups } from "@/data/capabilities";

const projectLabels: Record<SignalProjectId, string> = {
  thesislens: "ThesisLens",
  traceforge: "TraceForge",
  converge: "Converge",
};

const projectIds = Object.keys(projectLabels) as SignalProjectId[];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CapabilityEvidenceMap() {
  const { activeProject, setActiveCapability, setActiveProject } =
    useSignalState();
  const [activeCapabilityId, setActiveCapabilityId] = useState(
    slugify(capabilityGroups[0].title),
  );
  const [localProject, setLocalProject] = useState<SignalProjectId | null>(
    activeProject,
  );

  const activeCapability = useMemo(
    () =>
      capabilityGroups.find(
        (group) => slugify(group.title) === activeCapabilityId,
      ) ?? capabilityGroups[0],
    [activeCapabilityId],
  );
  const displayedProject = localProject ?? activeProject;

  const activateCapability = (title: string) => {
    const id = slugify(title);
    setActiveCapabilityId(id);
    setActiveCapability(id);
    setLocalProject(null);
  };

  const activateProject = (project: SignalProjectId) => {
    setLocalProject(project);
    setActiveProject(project);
  };

  return (
    <div className="relative mt-12 overflow-hidden border-y border-border bg-background-elevated/25 px-4 py-8 sm:px-7 lg:min-h-[38rem] lg:px-10 lg:py-10">
      <div className="signal-grid pointer-events-none absolute inset-0 opacity-40" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 1200 600"
      >
        {[
          [255, 92, 560, 190],
          [255, 250, 560, 190],
          [255, 410, 560, 300],
          [945, 92, 640, 190],
          [945, 250, 640, 300],
          [945, 410, 640, 410],
        ].map(([x1, y1, x2, y2], index) => (
          <path
            className="signal-route"
            d={`M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
            fill="none"
            key={index}
            stroke="var(--ritwik-color-route)"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="grid gap-3">
          {capabilityGroups.slice(0, 3).map((group, index) => {
            const id = slugify(group.title);
            const linkedToProject = displayedProject
              ? (group.demonstratedIn as readonly string[]).includes(
                  projectLabels[displayedProject],
                )
              : false;
            const active = id === activeCapabilityId || linkedToProject;
            return (
              <button
                className={`relative min-h-24 border px-5 py-4 text-left transition-[border-color,background-color,transform] duration-[var(--duration-base)] hover:translate-x-1 focus-visible:translate-x-1 ${
                  active
                    ? "border-signal-cyan bg-accent-muted/35"
                    : "border-border bg-background/55"
                }`}
                key={group.title}
                onClick={() => activateCapability(group.title)}
                onFocus={() => activateCapability(group.title)}
                onMouseEnter={() => activateCapability(group.title)}
                type="button"
                aria-pressed={id === activeCapabilityId}
              >
                <span className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
                  Capability / 0{index + 1}
                </span>
                <span className="mt-2 block font-semibold text-foreground">
                  {group.title}
                </span>
                {active ? (
                  <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                    {group.items.slice(0, 4).join(" · ")}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="relative grid gap-3 border-y border-border py-6 lg:border-y-0 lg:border-x lg:px-5 lg:py-8">
          <p className="text-center font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-foreground-muted uppercase">
            Demonstrated systems
          </p>
          {projectIds.map((project) => {
            const linked = (
              activeCapability.demonstratedIn as readonly string[]
            ).includes(projectLabels[project]);
            const active = displayedProject === project || linked;
            return (
              <button
                className={`relative min-h-16 border px-4 text-center font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-[border-color,background-color,box-shadow] ${
                  active
                    ? "border-signal-amber bg-[rgb(242_185_95_/_0.08)] text-foreground shadow-[0_0_24px_rgb(242_185_95_/_0.08)]"
                    : "border-border bg-background text-foreground-muted"
                }`}
                key={project}
                onClick={() => activateProject(project)}
                onFocus={() => activateProject(project)}
                onMouseEnter={() => activateProject(project)}
                type="button"
                aria-pressed={displayedProject === project}
              >
                {projectLabels[project]}
              </button>
            );
          })}
        </div>

        <div className="grid gap-3">
          {capabilityGroups.slice(3).map((group, index) => {
            const id = slugify(group.title);
            const linkedToProject = displayedProject
              ? (group.demonstratedIn as readonly string[]).includes(
                  projectLabels[displayedProject],
                )
              : false;
            const active = id === activeCapabilityId || linkedToProject;
            return (
              <button
                className={`relative min-h-24 border px-5 py-4 text-left transition-[border-color,background-color,transform] duration-[var(--duration-base)] hover:-translate-x-1 focus-visible:-translate-x-1 ${
                  active
                    ? "border-signal-cyan bg-accent-muted/35"
                    : "border-border bg-background/55"
                }`}
                key={group.title}
                onClick={() => activateCapability(group.title)}
                onFocus={() => activateCapability(group.title)}
                onMouseEnter={() => activateCapability(group.title)}
                type="button"
                aria-pressed={id === activeCapabilityId}
              >
                <span className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
                  Capability / 0{index + 4}
                </span>
                <span className="mt-2 block font-semibold text-foreground">
                  {group.title}
                </span>
                {active ? (
                  <span className="mt-2 block text-xs leading-5 text-foreground-muted">
                    {group.items.slice(0, 4).join(" · ")}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-8 border-t border-border pt-5">
        <p className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-signal-cyan uppercase">
          Active map / {activeCapability.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground-secondary">
          {activeCapability.items.join(" · ")}
        </p>
        <p className="mt-2 text-xs leading-5 text-foreground-muted">
          Demonstrated in {activeCapability.demonstratedIn.join(" · ")}
        </p>
      </div>
    </div>
  );
}
