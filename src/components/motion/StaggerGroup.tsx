"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  motionEase,
  motionTiming,
  motionTravel,
  motionViewport,
} from "./motionTokens";

export function StaggerGroup({
  children,
  className,
  stagger = motionTiming.stagger,
}: Readonly<{
  children: ReactNode;
  className?: string;
  stagger?: number;
}>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={motionViewport}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = motionTravel.item,
}: Readonly<{
  children: ReactNode;
  className?: string;
  y?: number;
}>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0.76, y },
        show: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: reduce ? 0 : motionTiming.itemReveal,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
