"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function ProjectCard({
  children,
  interactive,
}: Readonly<{
  children: ReactNode;
  interactive: boolean;
}>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.article
      className={[
        "group relative flex min-h-full flex-col overflow-hidden rounded-md border border-border bg-surface/55 p-5 transition-colors duration-[var(--duration-base)] sm:p-6",
        interactive
          ? "focus-within:border-accent hover:border-border-strong active:translate-y-px"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      whileHover={
        interactive && !reduce
          ? { y: -4, transition: { duration: 0.18 } }
          : undefined
      }
      whileTap={interactive && !reduce ? { y: -1 } : undefined}
    >
      {interactive ? (
        <span
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-base)] group-focus-within:scale-x-100 group-hover:scale-x-100"
          aria-hidden="true"
        />
      ) : null}
      {children}
    </motion.article>
  );
}
