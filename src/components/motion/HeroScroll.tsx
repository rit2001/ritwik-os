"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";

export function HeroScroll({
  children,
  className,
  variant,
}: Readonly<{
  children: ReactNode;
  className?: string;
  variant: "content" | "panel";
}>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;
  const [canUseScrollMotion, setCanUseScrollMotion] = useState(false);
  const { scrollYProgress } = useScroll();
  const contentY = useTransform(scrollYProgress, [0, 0.22], [0, -20]);
  const panelY = useTransform(scrollYProgress, [0, 0.22], [0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.94]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setCanUseScrollMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  const enabled = canUseScrollMotion && !reduce;

  return (
    <motion.div
      className={className}
      style={{
        opacity: enabled ? opacity : 1,
        y: enabled ? (variant === "content" ? contentY : panelY) : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
