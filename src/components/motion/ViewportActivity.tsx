"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export function ViewportActivity({
  activationDelay = 0,
  children,
  className = "",
}: Readonly<{
  activationDelay?: number;
  children: ReactNode;
  className?: string;
}>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activationTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = (visible: boolean) => {
      const shouldActivate = visible && document.visibilityState === "visible";
      if (activationTimerRef.current !== null) {
        window.clearTimeout(activationTimerRef.current);
        activationTimerRef.current = null;
      }
      if (!shouldActivate || activationDelay === 0) {
        setActive(shouldActivate);
        return;
      }
      activationTimerRef.current = window.setTimeout(() => {
        setActive(true);
        activationTimerRef.current = null;
      }, activationDelay);
    };
    const observer = new IntersectionObserver(
      ([entry]) => update(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -10% 0px" },
    );
    const onVisibilityChange = () => {
      const bounds = host.getBoundingClientRect();
      update(bounds.bottom > 0 && bounds.top < window.innerHeight * 0.9);
    };
    observer.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      if (activationTimerRef.current !== null) {
        window.clearTimeout(activationTimerRef.current);
      }
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [activationDelay]);

  return (
    <div
      className={className}
      data-ambient-active={active ? "true" : "false"}
      ref={hostRef}
    >
      {children}
    </div>
  );
}
