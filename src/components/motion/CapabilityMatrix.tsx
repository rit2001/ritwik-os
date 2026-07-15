"use client";

import { motion, useReducedMotion } from "motion/react";

import type { CapabilityGroup } from "@/data/capabilities";

import {
  motionEase,
  motionTiming,
  motionTravel,
  motionViewport,
} from "./motionTokens";

export function CapabilityMatrix({
  groups,
}: Readonly<{ groups: readonly CapabilityGroup[] }>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.div
      className="mt-10 overflow-hidden rounded-md border border-border bg-border"
      initial={reduce ? false : { opacity: 0.78, y: motionTravel.item }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{
        duration: reduce ? 0 : motionTiming.sectionReveal,
        ease: motionEase,
      }}
    >
      <div className="grid gap-px md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <motion.article
            className="group/capability min-h-full bg-background p-5 transition-colors duration-[var(--duration-slow)] hover:bg-background-elevated/65 sm:p-6"
            key={group.title}
            variants={{
              hidden: reduce
                ? { opacity: 1 }
                : { opacity: 0.82, y: motionTravel.compact },
              show: { opacity: 1, y: 0 },
            }}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={motionViewport}
            transition={{
              duration: reduce ? 0 : motionTiming.itemReveal,
              ease: motionEase,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground">
                {group.title}
              </h3>
              <span className="rounded-xs border border-border bg-surface px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-muted uppercase transition-colors duration-[var(--duration-base)] group-hover/capability:border-accent group-hover/capability:text-foreground">
                {group.status}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="mt-4 block h-px w-10 bg-border-strong transition-[background-color,width] duration-[var(--duration-slow)] group-hover/capability:w-14 group-hover/capability:bg-accent"
            />
            <motion.ul
              className="mt-5 flex flex-wrap gap-2"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduce ? 0 : 0.035,
                  },
                },
              }}
            >
              {group.items.map((item) => (
                <motion.li
                  className="rounded-xs border border-border bg-surface-muted px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.04em] text-foreground-secondary"
                  key={item}
                  variants={{
                    hidden: reduce ? { opacity: 1 } : { opacity: 0.72 },
                    show: { opacity: 1 },
                  }}
                  transition={{ duration: reduce ? 0 : 0.28, ease: motionEase }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
