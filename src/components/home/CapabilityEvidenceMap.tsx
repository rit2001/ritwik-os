import { capabilityGroups } from "@/data/capabilities";

export function CapabilityEvidenceMap() {
  return (
    <div className="mt-10 border-y border-border">
      {capabilityGroups.map((group, index) => (
        <article
          className="grid gap-5 border-b border-border py-7 last:border-b-0 md:grid-cols-[2rem_minmax(13rem,0.7fr)_minmax(0,1.3fr)] md:gap-7"
          key={group.title}
        >
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-accent uppercase">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3 className="text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground">
              {group.title}
            </h3>
            <p className="mt-4 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
              Where
            </p>
            <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-accent">
              {group.demonstratedIn.join(" · ")}
            </p>
          </div>
          <div>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
              What
            </p>
            <p className="mt-3 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              {group.items.join(" · ")}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
