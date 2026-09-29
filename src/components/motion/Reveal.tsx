"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { motionEase, motionTiming, motionViewport } from "./motionTokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  y?: number | string;
};

export function Reveal({
  children,
  className,
  id,
  delay = 0,
  y = "clamp(22px, 2.2vw, 32px)",
}: Readonly<RevealProps>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? 0 : motionTiming.sectionReveal,
        delay: reduce ? 0 : delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
