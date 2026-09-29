"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export function ViewportActivity({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = (visible: boolean) =>
      setActive(visible && document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      ([entry]) => update(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px" },
    );
    const onVisibilityChange = () => {
      const bounds = host.getBoundingClientRect();
      update(bounds.bottom > -120 && bounds.top < window.innerHeight + 120);
    };
    observer.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

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
