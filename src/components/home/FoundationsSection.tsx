"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  algorithmProfiles,
  achievementSignals,
} from "@/data/competitive-programming";
import { profile } from "@/data/profile";

const academicMilestones = [
  { year: "2021", label: "Academic foundation" },
  { year: "2026", label: "Dual-degree period" },
] as const;

export function FoundationsSection() {
  const leetcode = algorithmProfiles[0];
  const codeforces = algorithmProfiles[1];
  const reduced = useReducedMotion() === true;

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(23rem,0.94fr)]">
      <section
        aria-label="IIT Kharagpur academic foundation"
        className="foundation-panel group relative isolate min-h-[34rem] overflow-hidden border-y border-border bg-[radial-gradient(circle_at_75%_32%,rgb(47_127_255_/_0.15),transparent_25rem),linear-gradient(145deg,rgb(11_25_42_/_0.94),rgb(4_7_13_/_0.97))] px-6 py-8 outline-none transition-[border-color,box-shadow] hover:border-signal-cyan/45 hover:shadow-[0_24px_80px_rgb(47_127_255_/.08)] focus-visible:border-signal-cyan/55 focus-visible:shadow-[0_24px_80px_rgb(47_127_255_/.1)] sm:px-10 sm:py-10"
        tabIndex={0}
      >
        <div className="signal-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />
        <span
          className="foundation-shimmer pointer-events-none absolute inset-y-0 -left-1/3 -z-[5] w-1/3 bg-gradient-to-r from-transparent via-signal-cyan/8 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[-2%] bottom-0 h-[82%] w-[68%] opacity-38"
          viewBox="0 0 520 420"
        >
          <motion.path
            d="M28 380 H500 M92 380 V148 L180 90 L268 148 V380 M268 380 V112 L350 54 L432 112 V380"
            fill="none"
            initial={reduced ? false : { pathLength: 0, opacity: 0.25 }}
            stroke="var(--ritwik-color-accent)"
            strokeWidth="2"
            transition={{ duration: reduced ? 0 : 1.35 }}
            viewport={{ once: true, amount: 0.35 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
          />
          <motion.path
            d="M62 380 V214 H122 M122 380 V186 H180 M180 380 V214 H238 M296 380 V160 H350 M350 380 V132 H406 M406 380 V160 H468"
            fill="none"
            initial={reduced ? false : { pathLength: 0 }}
            stroke="var(--ritwik-color-signal-cyan)"
            strokeWidth="1"
            transition={{
              delay: reduced ? 0 : 0.24,
              duration: reduced ? 0 : 1.25,
            }}
            viewport={{ once: true, amount: 0.35 }}
            whileInView={{ pathLength: 1 }}
          />
          <path
            d="M74 250 H244 M74 294 H244 M292 222 H458 M292 272 H458 M292 322 H458"
            fill="none"
            stroke="var(--ritwik-color-border-strong)"
          />
          <circle
            cx="350"
            cy="54"
            fill="var(--ritwik-color-signal-amber)"
            r="5"
          />
          <circle
            cx="350"
            cy="54"
            fill="none"
            r="16"
            stroke="var(--ritwik-color-signal-amber)"
          />
        </svg>

        <div className="relative flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-signal-cyan bg-accent-muted/25 font-mono text-[0.62rem] font-semibold tracking-[0.08em] text-signal-cyan uppercase shadow-[0_0_30px_rgb(47_127_255_/_0.15)]">
            IIT
            <br />
            KGP
          </span>
          <div>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.15em] text-signal-cyan uppercase">
              IIT KGP · Institutional marker
            </p>
            <p className="mt-1 text-sm text-foreground-muted">
              Indian Institute of Technology Kharagpur
            </p>
          </div>
        </div>

        <h3 className="mt-8 max-w-2xl text-[clamp(2.9rem,6vw,5.7rem)] leading-[0.85] font-semibold tracking-[-0.045em] text-foreground uppercase drop-shadow-[0_0_30px_rgb(47_127_255_/.12)]">
          IIT Kharagpur
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-foreground-secondary sm:text-lg">
          Indian Institute of Technology Kharagpur
        </p>

        <dl className="relative mt-8 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-5 border-y border-border bg-background/45 px-4 py-5 sm:grid-cols-4">
          <div>
            <dt className="font-mono text-[0.61rem] tracking-[0.11em] text-foreground-muted uppercase">
              Degree
            </dt>
            <dd className="mt-2 text-sm font-semibold text-foreground">
              Dual Degree
            </dd>
            <dd className="mt-1 text-xs text-foreground-secondary">
              B.Tech + M.Tech
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.61rem] tracking-[0.11em] text-foreground-muted uppercase">
              Discipline
            </dt>
            <dd className="mt-2 text-sm font-semibold text-foreground">
              Mechanical Engineering
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.61rem] tracking-[0.11em] text-foreground-muted uppercase">
              Period
            </dt>
            <dd className="mt-2 font-mono text-sm font-semibold text-signal-cyan">
              {profile.education.dates}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.61rem] tracking-[0.11em] text-foreground-muted uppercase">
              CGPA
            </dt>
            <dd className="mt-2 font-mono text-sm font-semibold text-foreground">
              {profile.education.cgpa.replace("/", " / ")}
            </dd>
          </div>
        </dl>

        <div className="relative mt-8 grid max-w-2xl grid-cols-2 gap-5 pl-6">
          <motion.span
            className="absolute top-3 right-0 left-0 h-px bg-gradient-to-r from-signal-cyan via-signal-cyan to-signal-amber"
            initial={reduced ? false : { scaleX: 0 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: reduced ? 0 : 1.1 }}
            viewport={{ once: true, amount: 0.45 }}
            whileInView={{ scaleX: 1 }}
          />
          {academicMilestones.map((milestone, index) => (
            <div className="relative pt-7" key={milestone.year}>
              <motion.span
                className={`absolute top-[0.45rem] -left-[0.33rem] h-3 w-3 rounded-full border bg-background ${
                  index === academicMilestones.length - 1
                    ? "border-signal-amber shadow-[0_0_16px_rgb(242_185_95_/_0.45)]"
                    : "border-signal-cyan"
                }`}
                initial={reduced ? false : { opacity: 0.35, scale: 0.65 }}
                transition={{
                  delay: reduced ? 0 : 0.55 + index * 0.35,
                  duration: reduced ? 0 : 0.45,
                }}
                viewport={{ once: true, amount: 0.45 }}
                whileInView={{ opacity: 1, scale: 1 }}
              />
              <p
                className={`font-mono text-[0.65rem] tracking-[0.11em] uppercase ${
                  index === academicMilestones.length - 1
                    ? "text-signal-amber"
                    : "text-signal-cyan"
                }`}
              >
                {milestone.year}
              </p>
              <p className="mt-1 text-xs text-foreground-secondary">
                {milestone.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-7 max-w-2xl overflow-hidden border-y border-border bg-background/65 px-4 py-4 transition-[border-color,box-shadow] group-hover:border-signal-amber/60 group-hover:shadow-[0_0_28px_rgb(242_185_95_/.08)] group-focus-visible:border-signal-amber/60 group-focus-visible:shadow-[0_0_28px_rgb(242_185_95_/.08)] sm:flex sm:items-center sm:justify-between sm:gap-6">
          <motion.span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px bg-signal-amber shadow-[0_0_18px_rgb(242_185_95_/.7)]"
            initial={reduced ? false : { opacity: 0, scaleY: 0 }}
            transition={{ delay: reduced ? 0 : 1.05, duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
          />
          <p className="font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-foreground-muted uppercase">
            Academic honour
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground-secondary sm:mt-0 sm:text-right">
            {achievementSignals[3]}
          </p>
        </div>

        <p className="relative mt-6 max-w-xl text-sm leading-6 text-foreground-muted">
          Engineering depth, built over time.
        </p>
      </section>

      <section
        className="grid gap-4"
        aria-labelledby="algorithm-foundations-title"
      >
        <div className="border-b border-border pb-5">
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.15em] text-signal-cyan uppercase">
            Algorithmic proof
          </p>
          <h3
            className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-foreground"
            id="algorithm-foundations-title"
          >
            Repetition, speed, and proof under constraint.
          </h3>
        </div>

        <a
          className="algorithm-module group relative min-h-[16rem] overflow-hidden border border-border bg-[radial-gradient(circle_at_82%_30%,rgb(47_127_255_/_0.16),transparent_13rem),rgb(7_16_27_/_0.6)] px-5 py-5 transition-[border-color,transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-signal-cyan hover:shadow-[0_18px_55px_rgb(47_127_255_/_0.12)] focus-visible:-translate-y-1 focus-visible:border-signal-cyan"
          href={leetcode.profileUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            className="leetcode-knight-travel pointer-events-none absolute top-10 right-32 z-10 font-serif text-2xl text-signal-cyan opacity-0"
            aria-hidden="true"
          >
            ♞
          </span>
          <svg
            aria-hidden="true"
            className="absolute top-5 right-5 h-28 w-28 opacity-24 transition-opacity group-hover:opacity-55 group-focus-visible:opacity-55"
            viewBox="0 0 120 120"
          >
            <path
              d="M28 101 H94 M38 90 C42 67 54 58 71 48 L57 43 L48 22 C70 24 89 42 88 65 C87 77 82 84 78 90 M44 67 L66 69"
              fill="none"
              stroke="var(--ritwik-color-signal-cyan)"
              strokeWidth="3"
            />
            <path
              d="M18 18 H102 V102 H18 Z M46 18 V102 M74 18 V102 M18 46 H102 M18 74 H102"
              fill="none"
              opacity="0.35"
              stroke="var(--ritwik-color-border-strong)"
            />
          </svg>
          <p className="font-mono text-[0.62rem] tracking-[0.11em] text-foreground-muted uppercase">
            Knight geometry · consistency trail
          </p>
          <div className="mt-4 flex items-end gap-3">
            <h4 className="text-2xl font-semibold text-foreground">LeetCode</h4>
            <span className="font-mono text-sm font-semibold text-signal-cyan">
              {leetcode.status} ↗
            </span>
          </div>
          <div className="mt-6 flex items-center gap-2" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span
                className={`h-1 flex-1 ${index < 9 ? "bg-signal-cyan/70" : "bg-border-strong"}`}
                key={index}
              />
            ))}
            <span className="h-3 w-3 rounded-full bg-signal-amber shadow-[0_0_14px_rgb(242_185_95_/_0.5)]" />
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3">
            {leetcode.stats.map((stat) => (
              <div
                className="border-l border-border-strong pl-3"
                key={stat.label}
              >
                <dt className="text-[0.65rem] text-foreground-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-mono text-xs font-semibold text-foreground-secondary">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <span className="mt-4 block max-h-0 overflow-hidden border-t border-border pt-0 text-xs leading-5 text-foreground-muted opacity-0 transition-all group-hover:max-h-20 group-hover:pt-4 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:pt-4 group-focus-visible:opacity-100">
            Peak rating and percentile are point-in-time proof; the streak is a
            consistency signal, not a fabricated rating history.
          </span>
        </a>

        <a
          className="algorithm-module codeforces-module group relative min-h-[13rem] overflow-hidden border border-border bg-[linear-gradient(135deg,rgb(242_185_95_/_0.06),rgb(7_16_27_/_0.58))] px-5 py-5 transition-[border-color,transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-signal-amber hover:shadow-[0_18px_55px_rgb(242_185_95_/_0.08)] focus-visible:-translate-y-1 focus-visible:border-signal-amber"
          href={codeforces.profileUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            className="codeforces-rank-signal pointer-events-none absolute right-[6.8rem] bottom-7 h-3 w-3 rounded-full bg-signal-amber opacity-0 shadow-[0_0_16px_rgb(242_185_95_/.7)]"
            aria-hidden="true"
          />
          <div
            className="absolute top-6 right-5 flex h-32 w-24 flex-col-reverse gap-2 opacity-35 transition-opacity group-hover:opacity-75 group-focus-visible:opacity-75"
            aria-hidden="true"
          >
            {["818", "1415", "SPECIALIST"].map((label, index) => (
              <span
                className="border-t border-signal-amber pt-1 text-right font-mono text-[0.55rem] text-signal-amber"
                key={label}
                style={{ width: `${58 + index * 21}%` }}
              >
                {label}
              </span>
            ))}
          </div>
          <p className="font-mono text-[0.62rem] tracking-[0.11em] text-foreground-muted uppercase">
            Ranking ladder · contest signal
          </p>
          <div className="mt-4 flex items-end gap-3">
            <h4 className="text-2xl font-semibold text-foreground">
              Codeforces
            </h4>
            <span className="font-mono text-sm font-semibold text-signal-amber">
              {codeforces.status} ↗
            </span>
          </div>
          <dl className="mt-6 max-w-sm space-y-3">
            {codeforces.stats.map((stat) => (
              <div
                className="grid grid-cols-[7rem_minmax(0,1fr)] border-l border-border-strong pl-3"
                key={stat.label}
              >
                <dt className="text-[0.65rem] text-foreground-muted">
                  {stat.label}
                </dt>
                <dd className="font-mono text-xs leading-5 font-semibold text-foreground-secondary">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <span className="mt-4 block max-h-0 overflow-hidden border-t border-border pt-0 text-xs leading-5 text-foreground-muted opacity-0 transition-all group-hover:max-h-20 group-hover:pt-4 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:pt-4 group-focus-visible:opacity-100">
            The ladder is symbolic; only the verified peak and Round 952 result
            are shown.
          </span>
        </a>

        <ul className="grid gap-3 border-t border-border pt-5 sm:grid-cols-3 lg:grid-cols-1">
          {[
            [
              "Selected",
              "Amazon ML Summer School 2024",
              "Machine learning programme",
            ],
            ["Top 3", "GCOS 2024", "IIT Kharagpur"],
            ["Top 5", "Overnite", "Kshitij, IIT Kharagpur"],
          ].map(([rank, title, context]) => (
            <li
              className="achievement-proof group relative min-h-24 border border-border border-l-2 border-l-signal-amber/70 bg-[radial-gradient(circle_at_92%_18%,rgb(242_185_95_/.12),transparent_5rem),linear-gradient(90deg,rgb(242_185_95_/.07),transparent)] px-4 py-4 outline-none transition-[border-color,background-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-signal-amber/65 hover:shadow-[0_16px_40px_rgb(242_185_95_/.08)] focus-visible:-translate-y-0.5 focus-visible:border-signal-amber/65 focus-visible:shadow-[0_16px_40px_rgb(242_185_95_/.08)]"
              key={title}
              tabIndex={0}
            >
              <span
                className="absolute top-4 -left-[0.42rem] h-3 w-3 rotate-45 border border-background bg-signal-amber transition-shadow group-hover:shadow-[0_0_18px_rgb(242_185_95_/.75)] group-focus-visible:shadow-[0_0_18px_rgb(242_185_95_/.75)]"
                aria-hidden="true"
              />
              <span className="font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-signal-amber uppercase">
                {rank}
              </span>
              <span className="mt-1 block text-sm font-semibold text-foreground">
                {title}
              </span>
              <span className="mt-1 block text-xs text-foreground-muted">
                {context}
              </span>
              <span
                className="mt-3 block h-px w-10 origin-left scale-x-50 bg-signal-amber transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
