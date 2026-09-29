"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  algorithmProfiles,
  achievementSignals,
} from "@/data/competitive-programming";
import { profile } from "@/data/profile";

export function FoundationsSection() {
  const leetcode = algorithmProfiles[0];
  const codeforces = algorithmProfiles[1];
  const reduced = useReducedMotion() === true;

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(23rem,0.94fr)]">
      <section className="relative isolate min-h-[34rem] overflow-hidden border-y border-border bg-[radial-gradient(circle_at_75%_32%,rgb(47_127_255_/_0.15),transparent_25rem),linear-gradient(145deg,rgb(11_25_42_/_0.94),rgb(4_7_13_/_0.97))] px-6 py-8 sm:px-10 sm:py-10">
        <div className="signal-grid pointer-events-none absolute inset-0 -z-10 opacity-35" />
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
              Institutional foundation
            </p>
            <p className="mt-1 text-sm text-foreground-muted">
              Indian Institute of Technology Kharagpur
            </p>
          </div>
        </div>

        <h3 className="mt-8 max-w-xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-foreground uppercase">
          Engineering depth,
          <br />
          built over time.
        </h3>

        <div className="relative mt-9 max-w-2xl pl-6">
          <motion.span
            animate={undefined}
            className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-signal-cyan to-signal-amber"
            initial={reduced ? false : { scaleY: 0 }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: reduced ? 0 : 1.1 }}
            viewport={{ once: true, amount: 0.45 }}
            whileInView={{ scaleY: 1 }}
          />
          <div className="relative pb-6">
            <span className="absolute top-1 -left-[1.72rem] h-3 w-3 rounded-full border border-signal-cyan bg-background" />
            <p className="font-mono text-[0.65rem] tracking-[0.11em] text-signal-cyan uppercase">
              2021 · Foundation begins
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Dual Degree in Mechanical Engineering, alongside algorithms and
              software systems work.
            </p>
          </div>
          <div className="relative">
            <span className="absolute top-1 -left-[1.72rem] h-3 w-3 rounded-full border border-signal-amber bg-signal-amber shadow-[0_0_16px_rgb(242_185_95_/_0.45)]" />
            <p className="font-mono text-[0.65rem] tracking-[0.11em] text-signal-amber uppercase">
              2026 · Academic period
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              B.Tech + M.Tech · {profile.education.dates} · CGPA{" "}
              {profile.education.cgpa}
            </p>
          </div>
        </div>

        <div className="relative mt-9 max-w-2xl border-y border-border bg-background/65 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="font-mono text-[0.62rem] font-semibold tracking-[0.11em] text-foreground-muted uppercase">
            Academic honour
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground-secondary sm:mt-0 sm:text-right">
            {achievementSignals[3]}
          </p>
        </div>
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
              className="achievement-proof group relative border-l border-signal-amber/55 bg-[linear-gradient(90deg,rgb(242_185_95_/.07),transparent)] px-4 py-3 outline-none transition-[border-color,background-color,transform] hover:translate-x-1 hover:border-signal-amber focus-visible:translate-x-1 focus-visible:border-signal-amber"
              key={title}
              tabIndex={0}
            >
              <span
                className="absolute top-4 -left-[0.3rem] h-2.5 w-2.5 rotate-45 bg-signal-amber transition-shadow group-hover:shadow-[0_0_18px_rgb(242_185_95_/.75)] group-focus-visible:shadow-[0_0_18px_rgb(242_185_95_/.75)]"
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
