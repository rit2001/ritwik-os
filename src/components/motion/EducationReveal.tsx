"use client";

import { motion, useReducedMotion } from "motion/react";

import type { RecruiterBrief } from "@/data/recruiter-brief";

import { motionTiming, motionTravel, motionViewport } from "./motionTokens";

export function EducationReveal({
  education,
}: Readonly<{ education: RecruiterBrief["education"] }>) {
  const shouldReduceMotion = useReducedMotion();
  const reduce = shouldReduceMotion === true;
  const item = {
    hidden: reduce
      ? { opacity: 1 }
      : { opacity: 0.78, y: motionTravel.compact },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.aside
      aria-label="Education"
      className="border-l border-border-strong pl-5 lg:pl-7"
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
        variants={item}
      >
        Education
      </motion.p>
      <motion.h3
        className="mt-4 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground"
        variants={item}
      >
        {education.institution}
      </motion.h3>
      <motion.p
        className="mt-4 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary"
        variants={item}
      >
        {education.degree}
      </motion.p>
      <motion.dl
        className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5"
        variants={item}
      >
        <div>
          <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
            Years
          </dt>
          <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {education.dates}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
            CGPA
          </dt>
          <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {education.cgpa}
          </dd>
        </div>
      </motion.dl>
    </motion.aside>
  );
}
