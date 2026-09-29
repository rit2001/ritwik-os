"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  type SignalLocationId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import { professionalSignals } from "@/data/professional-signals";

const ThreeGlobeCanvas = dynamic(() => import("./ThreeGlobeCanvas"), {
  ssr: false,
});

export function ProfessionalTopology() {
  const figureRef = useRef<HTMLElement>(null);
  const { activeLocation, setActiveLocation } = useSignalState();
  const [hoveredLocation, setHoveredLocation] =
    useState<SignalLocationId | null>(null);
  const [lockedLocation, setLockedLocation] = useState<SignalLocationId | null>(
    null,
  );
  const publicSignals = useMemo(
    () =>
      professionalSignals.filter((signal) => signal.visibility === "public"),
    [],
  );
  const displayedId = hoveredLocation ?? lockedLocation ?? activeLocation;
  const displayedSignal = publicSignals.find(
    (signal) => signal.id === displayedId,
  );

  useEffect(() => {
    if (!lockedLocation) return;

    const releaseOutside = (event: PointerEvent) => {
      if (!figureRef.current?.contains(event.target as Node)) {
        setLockedLocation(null);
        setActiveLocation(null);
      }
    };
    document.addEventListener("pointerdown", releaseOutside);
    return () => document.removeEventListener("pointerdown", releaseOutside);
  }, [lockedLocation, setActiveLocation]);

  const selectLocation = (id: SignalLocationId) => {
    const next = lockedLocation === id ? null : id;
    setLockedLocation(next);
    setActiveLocation(next);
  };

  return (
    <figure
      className="relative isolate min-h-[25rem] sm:min-h-[29rem] lg:min-h-[31rem]"
      ref={figureRef}
    >
      <div
        className="pointer-events-none absolute inset-[2%] -z-10 rounded-full opacity-75 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(47 127 255 / 0.26), rgb(47 127 255 / 0.07) 42%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-[23rem] overflow-visible sm:h-[27rem] lg:h-[29rem]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 680 560"
        >
          <defs>
            <radialGradient id="globe-fallback-fill" cx="42%" cy="36%">
              <stop offset="0" stopColor="rgb(63 142 225 / 0.28)" />
              <stop offset="0.58" stopColor="rgb(9 31 57 / 0.24)" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="340" cy="280" r="176" fill="url(#globe-fallback-fill)" />
          <circle
            cx="340"
            cy="280"
            fill="none"
            r="176"
            stroke="rgb(102 168 255 / 0.24)"
          />
          <circle
            cx="340"
            cy="280"
            fill="none"
            r="192"
            stroke="rgb(47 127 255 / 0.1)"
          />
        </svg>

        <ThreeGlobeCanvas
          activeLocation={displayedId ?? null}
          onHover={setHoveredLocation}
          onSelect={selectLocation}
          rotationPaused={Boolean(hoveredLocation || lockedLocation)}
        />

        <div className="pointer-events-none absolute top-2 left-0 z-20 font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-signal-cyan uppercase sm:text-[length:var(--text-label-size)]">
          Professional signal map / drag to rotate
        </div>

        {displayedSignal ? (
          <div
            className="pointer-events-none absolute right-0 bottom-0 z-30 max-w-[15rem] border-r-2 border-signal-amber bg-background/82 px-3 py-2 text-right backdrop-blur-sm sm:hidden"
            aria-live="polite"
          >
            <p className="font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-signal-cyan uppercase">
              {displayedSignal.label} · {displayedSignal.country}
            </p>
            <p className="mt-1 text-[0.65rem] leading-4 text-foreground-secondary">
              {displayedSignal.detail}
            </p>
          </div>
        ) : null}
      </div>

      <figcaption className="sr-only">
        <p>
          Interactive globe of public professional signals. Remote engineering
          experience does not imply physical residence. The United States marker
          represents Scale AI LLM evaluation work on a freelance or part-time
          basis, not residence.
        </p>
        <ol>
          {publicSignals.map((signal) => (
            <li key={signal.id}>
              {signal.label}, {signal.country}: {signal.detail}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
