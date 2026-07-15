"use client";

import { motion, useReducedMotion } from "motion/react";

import type { AlgorithmProfile } from "@/data/competitive-programming";

import {
  motionEase,
  motionTiming,
  motionTravel,
  motionViewport,
} from "./motionTokens";

export function AlgorithmProfileCard({
  profile,
}: Readonly<{ profile: AlgorithmProfile }>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;

  return (
    <motion.a
      aria-label={`Open Ritwik Biswas ${profile.platform} profile`}
      className="group relative block h-full overflow-hidden rounded-md border border-border bg-surface/55 p-5 transition-[background-color,border-color,transform] duration-[var(--duration-slow)] ease-[var(--ease-standard)] hover:border-accent hover:bg-surface/85 focus-visible:border-accent focus-visible:bg-surface/85 active:translate-y-px sm:p-6"
      href={profile.profileUrl}
      rel="noopener noreferrer"
      target="_blank"
      whileHover={
        reduce
          ? undefined
          : {
              y: -5,
              transition: { duration: motionTiming.quick, ease: motionEase },
            }
      }
      whileTap={reduce ? undefined : { y: -1 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-slow)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
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
        <motion.p
          className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase"
          variants={{
            hidden: reduce
              ? { opacity: 1 }
              : { opacity: 0.8, y: motionTravel.compact },
            show: { opacity: 1, y: 0 },
          }}
        >
          {profile.platform}
        </motion.p>
        <motion.h3
          className="mt-3 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground"
          variants={{
            hidden: reduce
              ? { opacity: 1 }
              : { opacity: 0.8, y: motionTravel.compact },
            show: { opacity: 1, y: 0 },
          }}
        >
          {profile.status}
        </motion.h3>
        <dl className="mt-6 grid gap-4">
          {profile.stats.map((stat) => (
            <motion.div
              className="border-t border-border pt-4"
              key={stat.label}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0.76, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                {stat.label}
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] font-semibold text-foreground">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
        <motion.span
          className="mt-6 inline-flex min-h-11 items-center rounded-sm font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-accent uppercase underline decoration-transparent underline-offset-4 transition-colors duration-[var(--duration-base)] group-hover:text-foreground group-hover:decoration-current group-focus-visible:text-foreground"
          variants={{
            hidden: reduce
              ? { opacity: 1 }
              : { opacity: 0.8, y: motionTravel.compact },
            show: { opacity: 1, y: 0 },
          }}
        >
          Profile{" "}
          <span
            aria-hidden="true"
            className="ml-1 inline-block transition-transform duration-[var(--duration-base)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
          >
            →
          </span>
        </motion.span>
      </motion.div>
    </motion.a>
  );
}
