"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  type SignalLocationId,
  useSignalState,
} from "@/components/signal/SignalProvider";
import {
  type ProfessionalSignal,
  professionalSignals,
} from "@/data/professional-signals";

const ThreeGlobeCanvas = dynamic(() => import("./ThreeGlobeCanvas"), {
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-[12%] animate-pulse rounded-full border border-signal-cyan/20 bg-[radial-gradient(circle_at_35%_28%,rgb(91_165_218_/_0.22),rgb(4_13_26_/_0.92)_58%,transparent_72%)]"
    />
  ),
  ssr: false,
});

const publicSignals: readonly ProfessionalSignal[] = professionalSignals.filter(
  (signal) => signal.visibility === "public",
);

export function ProfessionalTopology() {
  const { activeLocation, setActiveLocation } = useSignalState();
  const rootRef = useRef<HTMLElement>(null);
  const [hoveredLocation, setHoveredLocation] =
    useState<SignalLocationId | null>(null);
  const [lockedLocation, setLockedLocation] = useState<SignalLocationId | null>(
    null,
  );
  const [showHint, setShowHint] = useState(true);

  const displayedLocation = hoveredLocation ?? lockedLocation ?? activeLocation;
  const activeSignal = useMemo(
    () =>
      displayedLocation
        ? publicSignals.find((signal) => signal.id === displayedLocation)
        : undefined,
    [displayedLocation],
  );

  const dismissHint = useCallback(() => setShowHint(false), []);

  useEffect(() => {
    const timer = window.setTimeout(dismissHint, 5000);
    return () => window.clearTimeout(timer);
  }, [dismissHint]);

  useEffect(() => {
    const release = () => {
      setLockedLocation(null);
      setHoveredLocation(null);
      setActiveLocation(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && lockedLocation) release();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        lockedLocation &&
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        release();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [lockedLocation, setActiveLocation]);

  const handleHover = useCallback(
    (id: SignalLocationId | null) => {
      if (id) dismissHint();
      setHoveredLocation(id);
      if (!lockedLocation) setActiveLocation(id);
    },
    [dismissHint, lockedLocation, setActiveLocation],
  );

  const handleSelect = useCallback(
    (id: SignalLocationId) => {
      dismissHint();
      setHoveredLocation(null);
      setLockedLocation((current) => {
        const next = current === id ? null : id;
        setActiveLocation(next);
        return next;
      });
    },
    [dismissHint, setActiveLocation],
  );

  return (
    <figure
      aria-label="Interactive professional geography"
      className="relative mx-auto w-full max-w-[34rem] lg:max-w-[31rem]"
      ref={rootRef}
    >
      <div className="pointer-events-none absolute inset-[13%] rounded-full bg-[radial-gradient(circle_at_28%_24%,rgb(84_178_233_/_0.12),transparent_40%),radial-gradient(circle_at_68%_75%,rgb(26_91_159_/_0.15),transparent_42%)] blur-xl" />
      <div className="relative aspect-square min-h-[21rem] overflow-hidden rounded-[42%] sm:min-h-[27rem] lg:min-h-[29rem]">
        <ThreeGlobeCanvas
          activeLocation={displayedLocation}
          onExplore={dismissHint}
          onHover={handleHover}
          onSelect={handleSelect}
          rotationPaused={Boolean(hoveredLocation || lockedLocation)}
        />

        {showHint ? (
          <div className="pointer-events-none absolute top-[7%] left-1/2 z-30 -translate-x-1/2 rounded-full border border-signal-cyan/25 bg-background/82 px-3 py-1.5 font-mono text-[0.62rem] font-semibold tracking-[0.14em] whitespace-nowrap text-signal-cyan uppercase shadow-[0_0_20px_rgb(58_189_230_/_0.12)] backdrop-blur-sm">
            Drag to explore
          </div>
        ) : null}

        {activeSignal ? (
          <div
            aria-live="polite"
            className="absolute right-3 bottom-2 left-3 z-30 border-y border-signal-cyan/28 bg-[linear-gradient(90deg,rgb(3_10_20_/_0.94),rgb(5_19_34_/_0.86))] px-4 py-3 shadow-[0_16px_46px_rgb(0_0_0_/_0.38)] backdrop-blur-md sm:top-[16%] sm:right-0 sm:bottom-auto sm:left-auto sm:w-[15rem] sm:border-y-0 sm:border-l-2"
          >
            <p className="font-mono text-[0.66rem] font-semibold tracking-[0.15em] text-signal-cyan uppercase">
              {activeSignal.label}
            </p>
            <p className="mt-1 font-mono text-[0.6rem] tracking-[0.12em] text-foreground-muted uppercase">
              {activeSignal.country}
            </p>
            {activeSignal.organization ? (
              <p className="mt-3 text-sm font-semibold text-foreground">
                {activeSignal.organization}
              </p>
            ) : null}
            <p className="mt-1 text-xs leading-5 text-foreground-secondary">
              {activeSignal.context}
            </p>
          </div>
        ) : null}
      </div>

      <figcaption className="sr-only">
        <p>
          Remote engineering experience does not imply physical residence. The
          United States marker represents Scale AI LLM evaluation work on a
          freelance or part-time basis, not residence.
        </p>
        <span>Professional locations and context:</span>
        <ul>
          {publicSignals.map((signal) => (
            <li key={signal.id}>
              {signal.label}, {signal.country}: {signal.detail}.
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
