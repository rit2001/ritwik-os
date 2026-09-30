"use client";

import { useEffect, useState } from "react";

export function useAmbientPulse(
  enabled: boolean,
  intervalMs: number,
  initialDelayMs = intervalMs,
) {
  const [tick, setTick] = useState(0);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!enabled || !documentVisible) return;
    const delay = tick === 0 ? initialDelayMs : intervalMs;
    const timer = window.setTimeout(() => setTick((value) => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [documentVisible, enabled, initialDelayMs, intervalMs, tick]);

  return tick;
}
