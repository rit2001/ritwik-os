"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  motionEase,
  motionTiming,
  motionTravel,
  motionViewport,
} from "./motionTokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  id,
  delay = 0,
  y = motionTravel.section,
}: Readonly<RevealProps>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0.72, y }}
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
