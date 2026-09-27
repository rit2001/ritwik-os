import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <div className="mt-10 border-y border-border">
      {experience.map((role, index) => (
        <article
          className="grid gap-5 border-b border-border py-8 last:border-b-0 lg:grid-cols-[3rem_19rem_minmax(0,1fr)] lg:gap-8 lg:py-10"
          key={role.company}
        >
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3 className="text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
              {role.company}
            </h3>
            <p className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              {role.role}
            </p>
            <p className="mt-3 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.06em] text-foreground-muted uppercase">
              {role.dates} · {role.location}
            </p>
          </div>
          <div>
            <p className="text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              {role.summary}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {role.evidence.slice(0, 2).map((evidence) => (
                <li
                  className="border-l border-border-strong pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted"
                  key={evidence}
                >
                  {evidence}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
