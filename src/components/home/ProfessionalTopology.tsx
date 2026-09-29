"use client";

import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
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
  const hoverReleaseRef = useRef<number | null>(null);
  const showcaseStartRef = useRef<number | null>(null);
  const showcaseEndRef = useRef<number | null>(null);
  const showcaseIndexRef = useRef(0);
  const lastInteractionAtRef = useRef(0);
  const [hoveredLocation, setHoveredLocation] =
    useState<SignalLocationId | null>(null);
  const [lockedLocation, setLockedLocation] = useState<SignalLocationId | null>(
    null,
  );
  const [automatedLocation, setAutomatedLocation] =
    useState<SignalLocationId | null>(null);
  const [showHint, setShowHint] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = useReducedMotion() === true;
  const globeInView = useInView(rootRef, { margin: "120px" });

  const detailLocation = lockedLocation ?? hoveredLocation ?? automatedLocation;
  const displayedLocation = detailLocation ?? activeLocation;
  const activeSignal = useMemo(
    () =>
      detailLocation
        ? publicSignals.find((signal) => signal.id === detailLocation)
        : undefined,
    [detailLocation],
  );

  const dismissHint = useCallback(() => setShowHint(false), []);
  const markInteraction = useCallback(() => {
    lastInteractionAtRef.current = performance.now();
  }, []);

  const clearShowcaseTimers = useCallback(() => {
    if (showcaseStartRef.current) {
      window.clearTimeout(showcaseStartRef.current);
      showcaseStartRef.current = null;
    }
    if (showcaseEndRef.current) {
      window.clearTimeout(showcaseEndRef.current);
      showcaseEndRef.current = null;
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(dismissHint, 5000);
    return () => window.clearTimeout(timer);
  }, [dismissHint]);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    clearShowcaseTimers();
    const resetTimer = window.setTimeout(() => setAutomatedLocation(null), 0);
    if (
      reduced ||
      !globeInView ||
      !pageVisible ||
      hoveredLocation ||
      lockedLocation
    ) {
      return () => window.clearTimeout(resetTimer);
    }

    const beginShowcase = () => {
      const signal = publicSignals[showcaseIndexRef.current];
      if (!signal) return;
      showcaseIndexRef.current =
        (showcaseIndexRef.current + 1) % publicSignals.length;
      setAutomatedLocation(signal.id as SignalLocationId);
      showcaseEndRef.current = window.setTimeout(
        () => setAutomatedLocation(null),
        3000,
      );
      showcaseStartRef.current = window.setTimeout(beginShowcase, 10000);
    };

    const interactionAge = lastInteractionAtRef.current
      ? performance.now() - lastInteractionAtRef.current
      : Number.POSITIVE_INFINITY;
    const restartBuffer = Number.isFinite(interactionAge)
      ? Math.max(0, 2000 - interactionAge)
      : 0;
    showcaseStartRef.current = window.setTimeout(
      beginShowcase,
      7000 + restartBuffer,
    );
    return () => {
      window.clearTimeout(resetTimer);
      clearShowcaseTimers();
    };
  }, [
    clearShowcaseTimers,
    globeInView,
    hoveredLocation,
    lockedLocation,
    pageVisible,
    reduced,
  ]);

  useEffect(() => {
    const release = () => {
      markInteraction();
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
  }, [lockedLocation, markInteraction, setActiveLocation]);

  const handleHover = useCallback(
    (id: SignalLocationId | null) => {
      markInteraction();
      clearShowcaseTimers();
      setAutomatedLocation(null);
      if (hoverReleaseRef.current) {
        window.clearTimeout(hoverReleaseRef.current);
        hoverReleaseRef.current = null;
      }
      if (id) {
        dismissHint();
        setHoveredLocation(id);
        if (!lockedLocation) setActiveLocation(id);
        return;
      }
      hoverReleaseRef.current = window.setTimeout(() => {
        setHoveredLocation(null);
        if (!lockedLocation) setActiveLocation(null);
      }, 420);
    },
    [
      clearShowcaseTimers,
      dismissHint,
      lockedLocation,
      markInteraction,
      setActiveLocation,
    ],
  );

  useEffect(() => () => {
    if (hoverReleaseRef.current) {
      window.clearTimeout(hoverReleaseRef.current);
    }
  });

  const handleSelect = useCallback(
    (id: SignalLocationId) => {
      markInteraction();
      clearShowcaseTimers();
      setAutomatedLocation(null);
      dismissHint();
      setHoveredLocation(null);
      const next = lockedLocation === id ? null : id;
      setLockedLocation(next);
      setActiveLocation(next);
    },
    [
      clearShowcaseTimers,
      dismissHint,
      lockedLocation,
      markInteraction,
      setActiveLocation,
    ],
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

        <div aria-live="polite">
          <AnimatePresence initial={false} mode="wait">
            {activeSignal ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-3 bottom-2 left-3 z-30 border-y border-signal-cyan/24 bg-[linear-gradient(90deg,rgb(3_10_20_/_0.86),rgb(5_19_34_/_0.76))] px-3.5 py-2.5 shadow-[0_14px_38px_rgb(0_0_0_/_0.3)] backdrop-blur-md sm:top-[18%] sm:right-1 sm:bottom-auto sm:left-auto sm:w-[13.5rem] sm:border-y-0 sm:border-l"
                exit={reduced ? undefined : { opacity: 0, y: 5 }}
                initial={reduced ? false : { opacity: 0, y: 7 }}
                key={activeSignal.id}
                transition={{ duration: reduced ? 0 : 0.24 }}
              >
                <p className="font-mono text-[0.64rem] font-semibold tracking-[0.14em] text-signal-cyan uppercase">
                  {activeSignal.label}
                </p>
                <p className="mt-0.5 font-mono text-[0.56rem] tracking-[0.11em] text-foreground-muted uppercase">
                  {activeSignal.country}
                </p>
                {activeSignal.organization ? (
                  <p className="mt-2 text-[0.82rem] font-semibold text-foreground">
                    {activeSignal.organization}
                  </p>
                ) : null}
                <p className="mt-1 text-[0.68rem] leading-4 text-foreground-secondary">
                  {activeSignal.context}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
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
