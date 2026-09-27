import { professionalSignals } from "@/data/professional-signals";

const signalPositions = [
  { cx: 99, cy: 128 },
  { cx: 184, cy: 79 },
  { cx: 148, cy: 176 },
  { cx: 316, cy: 48 },
] as const;

export function ProfessionalTopology() {
  const publicSignals = professionalSignals.filter(
    (signal) => signal.visibility === "public",
  );

  return (
    <figure className="border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
      <div className="relative overflow-hidden border border-border bg-background-elevated/45">
        <svg aria-hidden="true" className="h-auto w-full" viewBox="0 0 400 224">
          <defs>
            <pattern
              id="topology-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="var(--ritwik-color-border-subtle)"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>
          <rect
            width="400"
            height="224"
            fill="url(#topology-grid)"
            opacity="0.7"
          />
          <path
            d="M99 128 L184 79 L316 48 M99 128 L148 176 L184 79"
            fill="none"
            stroke="var(--ritwik-color-border-strong)"
            strokeWidth="1.5"
          />
          <path
            d="M99 128 L184 79"
            fill="none"
            stroke="var(--ritwik-color-accent)"
            strokeWidth="1.5"
          />
          {signalPositions.map((position, index) => (
            <g key={`${position.cx}-${position.cy}`}>
              <circle
                cx={position.cx}
                cy={position.cy}
                fill="var(--ritwik-color-canvas)"
                r="8"
                stroke={
                  index === 0
                    ? "var(--ritwik-color-accent)"
                    : "var(--ritwik-color-border-strong)"
                }
                strokeWidth="1.5"
              />
              <circle
                cx={position.cx}
                cy={position.cy}
                fill={
                  index === 0
                    ? "var(--ritwik-color-accent)"
                    : "var(--ritwik-color-foreground-muted)"
                }
                r="2.5"
              />
            </g>
          ))}
        </svg>
        <p className="absolute top-4 left-4 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
          Professional topology / static
        </p>
      </div>

      <figcaption className="mt-5">
        <p className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
          A public map of current base and engineering relationships. Remote
          work is represented as experience, not residence.
        </p>
        <ol className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {publicSignals.map((signal) => (
            <li className="border-l border-border-strong pl-3" key={signal.id}>
              <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground uppercase">
                {signal.label}
              </p>
              <p className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
                {signal.detail}
                {signal.id === "canada"
                  ? " · Remote software-engineering experience"
                  : signal.relationship === "engineering-experience"
                    ? " · Engineering experience"
                    : ""}
              </p>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
