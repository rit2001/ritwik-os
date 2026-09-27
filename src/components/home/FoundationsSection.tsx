import {
  algorithmProfiles,
  achievementSignals,
} from "@/data/competitive-programming";
import { profile } from "@/data/profile";

export function FoundationsSection() {
  return (
    <div className="mt-10 grid border-y border-border lg:grid-cols-2 lg:divide-x lg:divide-border">
      <div className="py-8 lg:pr-10">
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
          Algorithms
        </p>
        <div className="mt-6 grid gap-7 sm:grid-cols-2">
          {algorithmProfiles.map((algorithm) => (
            <article key={algorithm.platform}>
              <a
                className="group inline-flex min-h-11 items-center gap-3 rounded-sm font-mono text-[length:var(--text-technical-size)] font-semibold tracking-[0.08em] text-foreground uppercase underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-current focus-visible:text-accent focus-visible:decoration-current"
                href={algorithm.profileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {algorithm.platform} / {algorithm.status}
                <span aria-hidden="true">↗</span>
              </a>
              <dl className="mt-4 space-y-3">
                {algorithm.stats.map((stat) => (
                  <div
                    className="flex items-baseline justify-between gap-4 border-b border-border pb-2"
                    key={stat.label}
                  >
                    <dt className="text-[length:var(--text-body-small-size)] text-foreground-muted">
                      {stat.label}
                    </dt>
                    <dd className="text-right font-mono text-[length:var(--text-technical-size)] font-semibold text-foreground-secondary">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
          {achievementSignals.slice(0, 3).map((achievement) => (
            <li
              className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
              key={achievement}
            >
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border py-8 lg:border-t-0 lg:pl-10">
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
          Education
        </p>
        <h3 className="mt-6 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
          IIT Kharagpur
        </h3>
        <p className="mt-4 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
          {profile.education.degree}
        </p>
        <dl className="mt-7 grid grid-cols-2 gap-px bg-border">
          <div className="bg-background py-4 pr-4">
            <dt className="font-mono text-[length:var(--text-label-size)] tracking-[0.1em] text-foreground-muted uppercase">
              Period
            </dt>
            <dd className="mt-2 font-mono text-[length:var(--text-technical-size)] text-foreground-secondary">
              {profile.education.dates}
            </dd>
          </div>
          <div className="bg-background py-4 pl-4">
            <dt className="font-mono text-[length:var(--text-label-size)] tracking-[0.1em] text-foreground-muted uppercase">
              CGPA
            </dt>
            <dd className="mt-2 font-mono text-[length:var(--text-technical-size)] text-foreground-secondary">
              {profile.education.cgpa}
            </dd>
          </div>
        </dl>
        <div className="mt-7 border-l-2 border-accent pl-4">
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
            Academic honour
          </p>
          <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
            {achievementSignals[3]}
          </p>
        </div>
      </div>
    </div>
  );
}
