import {
  algorithmProfiles,
  achievementSignals,
} from "@/data/competitive-programming";
import { profile } from "@/data/profile";

export function FoundationsSection() {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)]">
      <section className="relative isolate min-h-[31rem] overflow-hidden border border-border bg-[linear-gradient(145deg,rgb(11_25_42_/_0.95),rgb(4_7_13_/_0.96))] px-6 py-8 sm:px-10 sm:py-10">
        <div className="signal-grid pointer-events-none absolute inset-0 -z-10 opacity-55" />
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] bottom-[-4%] h-[76%] w-[74%] opacity-30"
          viewBox="0 0 520 380"
        >
          <path
            d="M42 328 L42 124 L124 66 L206 124 V328 M206 328 V84 L302 28 L398 84 V328 M398 328 V154 L470 108 V328"
            fill="none"
            stroke="var(--ritwik-color-accent)"
            strokeWidth="2"
          />
          <path
            d="M18 328 H500 M70 170 H174 M70 214 H174 M70 258 H174 M238 112 H364 M238 164 H364 M238 216 H364 M238 268 H364 M422 194 H460 M422 238 H460 M422 282 H460"
            fill="none"
            stroke="var(--ritwik-color-signal-cyan)"
            strokeWidth="1"
          />
          <circle
            cx="302"
            cy="28"
            fill="var(--ritwik-color-signal-amber)"
            r="5"
          />
        </svg>

        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.15em] text-signal-cyan uppercase">
          Institution / 01
        </p>
        <h3 className="mt-6 max-w-xl text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-foreground uppercase">
          IIT
          <br />
          Kharagpur
        </h3>
        <p className="mt-7 max-w-xl text-lg leading-7 text-foreground-secondary">
          Dual Degree
          <br />
          B.Tech + M.Tech
          <br />
          Mechanical Engineering
        </p>

        <dl className="relative mt-10 grid max-w-xl grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-3">
          <div className="bg-background/85 px-4 py-4">
            <dt className="font-mono text-[0.65rem] tracking-[0.1em] text-foreground-muted uppercase">
              Period
            </dt>
            <dd className="mt-2 font-mono text-sm font-semibold text-foreground">
              {profile.education.dates}
            </dd>
          </div>
          <div className="bg-background/85 px-4 py-4">
            <dt className="font-mono text-[0.65rem] tracking-[0.1em] text-foreground-muted uppercase">
              CGPA
            </dt>
            <dd className="mt-2 font-mono text-sm font-semibold text-foreground">
              7.84 / 10
            </dd>
          </div>
          <div className="col-span-2 bg-background/85 px-4 py-4 sm:col-span-1">
            <dt className="font-mono text-[0.65rem] tracking-[0.1em] text-foreground-muted uppercase">
              Academic honour
            </dt>
            <dd className="mt-2 text-xs leading-5 text-foreground-secondary">
              {achievementSignals[3]}
            </dd>
          </div>
        </dl>
      </section>

      <section
        className="grid gap-4"
        aria-labelledby="algorithm-foundations-title"
      >
        <div className="border-b border-border pb-5">
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.15em] text-signal-cyan uppercase">
            Algorithmic foundations
          </p>
          <h3
            className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-foreground"
            id="algorithm-foundations-title"
          >
            Repetition, speed, and proof under constraint.
          </h3>
        </div>

        {algorithmProfiles.map((algorithm, index) => (
          <a
            className="group relative overflow-hidden border border-border bg-background-elevated/40 px-5 py-5 transition-[border-color,transform,box-shadow] duration-[var(--duration-base)] hover:-translate-y-1 hover:border-signal-cyan hover:shadow-[0_16px_50px_rgb(47_127_255_/_0.1)] focus-visible:-translate-y-1 focus-visible:border-signal-cyan"
            href={algorithm.profileUrl}
            key={algorithm.platform}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal-cyan to-accent transition-transform duration-[var(--duration-route)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              aria-hidden="true"
            />
            <span className="flex items-center justify-between gap-4">
              <span>
                <span className="font-mono text-[0.65rem] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  Proof module / 0{index + 1}
                </span>
                <span className="mt-2 block text-xl font-semibold text-foreground">
                  {algorithm.platform}
                </span>
              </span>
              <span className="font-mono text-sm font-semibold text-signal-cyan">
                {algorithm.status} ↗
              </span>
            </span>
            <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
              {algorithm.stats.map((stat) => (
                <div
                  className="border-l border-border-strong pl-3"
                  key={stat.label}
                >
                  <dt className="text-[0.68rem] text-foreground-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-mono text-xs leading-5 font-semibold text-foreground-secondary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <span className="mt-5 block border-t border-border pt-4 text-xs leading-5 text-foreground-muted transition-colors group-hover:text-foreground-secondary group-focus-visible:text-foreground-secondary">
              {index === 0
                ? "600+ consecutive Problem-of-the-Day submissions support long-horizon consistency."
                : "Global Rank 818 in Codeforces Round 952 anchors the specialist signal."}
            </span>
          </a>
        ))}

        <ul className="grid gap-2 border-t border-border pt-4 sm:grid-cols-3 lg:grid-cols-1">
          {achievementSignals.slice(0, 3).map((achievement) => (
            <li
              className="flex items-center gap-3 text-xs leading-5 text-foreground-secondary"
              key={achievement}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-amber" />
              {achievement}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
