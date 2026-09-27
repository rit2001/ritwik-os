"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import {
  type SignalLocationId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import { professionalSignals } from "@/data/professional-signals";

const ThreeGlobeCanvas = dynamic(() => import("./ThreeGlobeCanvas"), {
  ssr: false,
});

export function ProfessionalTopology() {
  const { activeLocation, setActiveLocation } = useSignalState();
  const [hoveredLocation, setHoveredLocation] =
    useState<SignalLocationId | null>(null);
  const publicSignals = useMemo(
    () =>
      professionalSignals.filter((signal) => signal.visibility === "public"),
    [],
  );
  const displayedId = hoveredLocation ?? activeLocation ?? "kolkata";
  const displayedSignal = publicSignals.find(
    (signal) => signal.id === displayedId,
  );

  return (
    <figure className="relative isolate min-h-[31rem] lg:min-h-[41rem]">
      <div
        className="pointer-events-none absolute inset-[-8%] -z-10 rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(47 127 255 / 0.24), transparent 64%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-[25rem] overflow-hidden sm:h-[31rem] lg:h-[35rem]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-75"
          viewBox="0 0 680 560"
        >
          <defs>
            <radialGradient id="globe-fallback-fill">
              <stop offset="0" stopColor="rgb(47 127 255 / 0.18)" />
              <stop offset="0.72" stopColor="rgb(9 31 57 / 0.22)" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="340" cy="280" r="206" fill="url(#globe-fallback-fill)" />
          <circle
            cx="340"
            cy="280"
            fill="none"
            r="190"
            stroke="rgb(102 168 255 / 0.24)"
          />
          {[122, 164, 206, 248, 290, 332, 374, 416].map((x) => (
            <ellipse
              cx="340"
              cy="280"
              fill="none"
              key={x}
              rx={Math.abs(x - 340) * 0.85 + 32}
              ry="190"
              stroke="rgb(102 168 255 / 0.09)"
            />
          ))}
          {[146, 202, 258, 314, 370, 426].map((y) => (
            <ellipse
              cx="340"
              cy="280"
              fill="none"
              key={y}
              rx="190"
              ry={Math.abs(y - 280) * 0.55 + 26}
              stroke="rgb(94 231 247 / 0.09)"
            />
          ))}
        </svg>

        <ThreeGlobeCanvas
          activeLocation={activeLocation}
          onHover={setHoveredLocation}
          onSelect={setActiveLocation}
        />

        <div className="pointer-events-none absolute top-5 left-0 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.16em] text-signal-cyan uppercase">
          Professional signal map / drag to rotate
        </div>

        {displayedSignal ? (
          <div
            className="pointer-events-none absolute right-0 bottom-5 max-w-[15rem] border-l-2 border-signal-cyan bg-background/75 px-4 py-3 backdrop-blur-sm"
            aria-live="polite"
          >
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.13em] text-signal-cyan uppercase">
              {displayedSignal.label}
            </p>
            <p className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {displayedSignal.detail}
            </p>
          </div>
        ) : null}
      </div>

      <figcaption className="relative -mt-2 border-t border-border pt-4">
        <p className="sr-only">
          Interactive globe of public professional signals. Remote engineering
          experience does not imply physical residence. The USA marker carries
          no employment or residence claim.
        </p>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {publicSignals.map((signal) => {
            const id = signal.id as SignalLocationId;
            const isActive = displayedId === id;

            return (
              <li key={signal.id}>
                <button
                  className={`group relative min-h-16 w-full overflow-hidden border px-3 py-2 text-left transition-[border-color,background-color,transform] duration-[var(--duration-base)] focus-visible:border-signal-cyan ${
                    isActive
                      ? "border-signal-cyan bg-accent-muted/45"
                      : "border-border bg-background-elevated/35 hover:border-border-strong hover:bg-surface/50"
                  }`}
                  onClick={() => setActiveLocation(id)}
                  onFocus={() => setActiveLocation(id)}
                  onMouseEnter={() => setHoveredLocation(id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  type="button"
                  aria-pressed={activeLocation === id}
                >
                  {isActive ? (
                    <span
                      className="signal-ripple absolute top-3 left-3 h-3 w-3 rounded-full border border-signal-cyan"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="block pl-5 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground uppercase">
                    {signal.label}
                  </span>
                  <span className="mt-1 block pl-5 text-[0.68rem] leading-4 text-foreground-muted">
                    {signal.relationship === "current-base"
                      ? "Current base"
                      : signal.relationship === "country-marker"
                        ? "United States"
                        : signal.id === "toronto"
                          ? "Remote experience"
                          : "Engineering experience"}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </figcaption>
    </figure>
  );
}
