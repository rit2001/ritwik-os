"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import type { ExperienceRole } from "@/data/experience";

import { motionEase, motionTiming, motionTravel } from "./motionTokens";

function TimelineItem({
  role,
  index,
  total,
  progress,
  shouldReduceMotion,
}: Readonly<{
  role: ExperienceRole;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  shouldReduceMotion: boolean;
}>) {
  const start = index / total;
  const end = (index + 0.68) / total;
  const markerOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, end, Math.min(1, end + 0.08)],
    [0.45, 1, 1, 0.45],
  );
  const markerScale = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, end, Math.min(1, end + 0.08)],
    [0.9, 1.18, 1.18, 0.9],
  );
  const textOpacity = useTransform(
    progress,
    [Math.max(0, start - 0.08), start, end, Math.min(1, end + 0.1)],
    [0.82, 1, 1, 0.88],
  );
  const item = {
    hidden: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0.78, y: motionTravel.compact },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.article
      className="relative pb-10 pl-6 last:pb-0 sm:pl-8"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : motionTiming.stagger,
          },
        },
      }}
    >
      <motion.span
        className="absolute top-2 -left-[6px] h-3 w-3 rounded-xs border border-accent bg-background"
        aria-hidden="true"
        style={{
          opacity: shouldReduceMotion ? 1 : markerOpacity,
          scale: shouldReduceMotion ? 1 : markerScale,
        }}
      />
      <motion.div
        className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]"
        style={{ opacity: shouldReduceMotion ? 1 : textOpacity }}
      >
        <div>
          <motion.p
            className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase"
            transition={{
              duration: shouldReduceMotion ? 0 : motionTiming.itemReveal,
              ease: motionEase,
            }}
            variants={item}
          >
            {role.company}
          </motion.p>
          <motion.h3
            className="mt-3 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground"
            transition={{
              duration: shouldReduceMotion ? 0 : motionTiming.itemReveal,
              ease: motionEase,
            }}
            variants={item}
          >
            {role.role}
          </motion.h3>
          <motion.div
            transition={{
              duration: shouldReduceMotion ? 0 : motionTiming.itemReveal,
              ease: motionEase,
            }}
            variants={item}
          >
            <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
              {role.location}
            </p>
            <p className="mt-1 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
              {role.dates}
            </p>
          </motion.div>
        </div>
        <div>
          <motion.p
            className="text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary"
            transition={{
              duration: shouldReduceMotion ? 0 : motionTiming.itemReveal,
              ease: motionEase,
            }}
            variants={item}
          >
            {role.summary}
          </motion.p>
          <motion.ul
            className="mt-5 space-y-3"
            transition={{
              duration: shouldReduceMotion ? 0 : motionTiming.itemReveal,
              ease: motionEase,
            }}
            variants={item}
          >
            {role.evidence.map((item) => (
              <li
                className="border-l border-border-strong pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                key={item}
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function ExperienceTimeline({
  roles,
}: Readonly<{ roles: readonly ExperienceRole[] }>) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 45%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={timelineRef} className="relative mt-10">
      <div
        className="absolute top-0 bottom-0 left-0 w-0.5 bg-border"
        aria-hidden="true"
      >
        <motion.div
          className="h-full origin-top bg-accent"
          style={{ scaleY: reduce ? 1 : lineScale }}
        />
      </div>
      <div>
        {roles.map((role, index) => (
          <TimelineItem
            index={index}
            key={role.company}
            progress={scrollYProgress}
            role={role}
            shouldReduceMotion={reduce}
            total={roles.length}
          />
        ))}
      </div>
    </div>
  );
}
