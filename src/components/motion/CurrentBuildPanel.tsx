"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  motionEase,
  motionTiming,
  motionTravel,
  motionViewport,
} from "./motionTokens";

export function CurrentBuildPanel({
  children,
}: Readonly<{ children: ReactNode }>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.aside
      aria-labelledby="current-build-title"
      className="relative overflow-hidden rounded-md border border-border-strong bg-surface/70 p-5 shadow-elevation-1 sm:p-6"
      initial={
        reduce ? false : { borderColor: "var(--ritwik-color-border-subtle)" }
      }
      whileInView={{ borderColor: "var(--ritwik-color-border-strong)" }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? 0 : motionTiming.sectionReveal,
        ease: motionEase,
      }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={motionViewport}
        transition={{ duration: reduce ? 0 : 0.72, ease: motionEase }}
      />
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={motionViewport}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduce ? 0 : motionTiming.stagger,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.aside>
  );
}

export function CurrentBuildItem({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce
          ? { opacity: 1 }
          : { opacity: 0.78, y: motionTravel.compact },
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

export function CurrentBuildStatus({
  children,
}: Readonly<{ children: ReactNode }>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.dd
      animate={
        reduce
          ? undefined
          : {
              boxShadow: [
                "0 0 0 0 rgb(227 193 111 / 0)",
                "0 0 0 5px rgb(227 193 111 / 0.16)",
                "0 0 0 0 rgb(227 193 111 / 0)",
              ],
            }
      }
      className="mt-2 inline-flex min-h-8 items-center rounded-xs border border-warning/60 bg-surface-muted px-3 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-warning uppercase"
      transition={{ delay: 0.5, duration: 0.9, repeat: 2, ease: motionEase }}
    >
      {children}
    </motion.dd>
  );
}
