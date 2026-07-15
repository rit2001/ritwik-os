"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;
  const { scrollYProgress } = useScroll();

  if (reduce) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-[calc(var(--z-header)+1)] h-0.5 origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
