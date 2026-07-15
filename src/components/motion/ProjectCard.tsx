"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { motionEase, motionTiming } from "./motionTokens";

export function ProjectCard({
  ariaLabel,
  children,
  href,
  interactive: interactiveOverride,
}: Readonly<{
  ariaLabel?: string;
  children: ReactNode;
  href?: string | null;
  interactive?: boolean;
}>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;
  const interactive = interactiveOverride ?? Boolean(href);
  const isExternal = Boolean(href && /^https?:\/\//.test(href));
  const className = [
    "group relative flex min-h-full flex-col overflow-hidden rounded-md border border-border bg-surface/55 p-5 transition-[background-color,border-color,transform] duration-[var(--duration-slow)] ease-[var(--ease-standard)] sm:p-6",
    interactive
      ? "focus-within:border-accent focus-within:bg-surface/85 focus-visible:border-accent focus-visible:bg-surface/85 hover:border-accent hover:bg-surface/85 active:translate-y-px"
      : "bg-surface/45",
  ]
    .filter(Boolean)
    .join(" ");
  const hover =
    interactive && !reduce
      ? {
          y: -5,
          transition: { duration: motionTiming.quick, ease: motionEase },
        }
      : undefined;
  const tap = interactive && !reduce ? { y: -1 } : undefined;

  const accentLine = interactive ? (
    <span
      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-slow)] group-focus-within:scale-x-100 group-focus-visible:scale-x-100 group-hover:scale-x-100"
      aria-hidden="true"
    />
  ) : null;

  if (href) {
    return (
      <motion.a
        aria-label={ariaLabel}
        className={className}
        href={href}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        whileHover={hover}
        whileTap={tap}
      >
        {accentLine}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.article className={className} whileHover={hover} whileTap={tap}>
      {accentLine}
      {children}
    </motion.article>
  );
}
