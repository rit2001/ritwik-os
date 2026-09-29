import { ActionLink } from "@/components/ui/ActionLink";
import { getProject } from "@/data/projects";

const earlierSystems = [
  {
    project: getProject("stateful-agentic-ai-assistant"),
    sequence: "01",
    year: "2026",
    signal: "AI systems foundation",
    technologies: ["LangGraph", "RAG", "HITL", "AWS"],
    progression:
      "Portfolio progression toward evidence-grounded AI and replayable workflows in ThesisLens and TraceForge; no direct code lineage is claimed.",
    related: ["ThesisLens", "TraceForge"],
  },
  {
    project: getProject("ai-mock-interview-platform"),
    sequence: "02",
    year: "2025",
    signal: "Product / backend foundation",
    technologies: ["Node / Express", "PDF parsing", "LLM interview workflow"],
    progression:
      "A complete product loop spanning inputs, generated interviews, evaluation, structured feedback, and reports.",
    related: ["Product engineering"],
  },
  {
    project: getProject("real-time-collaborative-whiteboard"),
    sequence: "03",
    year: "2025",
    signal: "Collaboration foundation",
    technologies: ["Socket.IO", "Shared canvas", "Persistent state"],
    progression:
      "Earlier collaboration work superseded in portfolio depth by Converge; this is engineering progression, not a direct code-lineage claim.",
    related: ["Converge"],
  },
] as const;

export function SelectedEarlierSystems() {
  return (
    <div className="relative mt-12">
      <div
        className="absolute top-12 right-[8%] left-[8%] hidden h-px bg-gradient-to-r from-border-strong via-signal-cyan/70 to-signal-amber/70 lg:block"
        aria-hidden="true"
      />
      <ol className="relative grid gap-8 lg:grid-cols-3 lg:gap-10">
        {earlierSystems.map((item, index) => (
          <li
            className="group relative border-l border-border-strong pl-6 lg:border-l-0 lg:pt-20 lg:pl-0"
            key={item.project.id}
          >
            <span
              className={`absolute top-1 -left-2.5 grid h-5 w-5 rotate-45 place-items-center border bg-background transition-[border-color,box-shadow,transform] group-hover:scale-125 group-hover:border-signal-cyan group-hover:shadow-[0_0_22px_var(--ritwik-color-signal-glow)] group-focus-within:scale-125 group-focus-within:border-signal-cyan lg:top-[2.4rem] lg:left-1/2 lg:-translate-x-1/2 ${
                index === 2 ? "border-signal-amber" : "border-border-strong"
              }`}
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
            </span>

            <div className="min-h-[22rem] border-y border-border bg-[linear-gradient(150deg,rgb(10_20_33_/_0.62),rgb(4_7_13_/_0.42))] px-5 py-5 transition-colors group-hover:border-border-strong group-focus-within:border-border-strong">
              <div className="flex items-center justify-between gap-3 font-mono text-[0.62rem] font-semibold tracking-[0.11em] uppercase">
                <span className="text-signal-cyan">
                  Build / {item.sequence}
                </span>
                <span className="text-foreground-muted">{item.year}</span>
              </div>
              <p className="mt-5 font-mono text-[0.62rem] tracking-[0.1em] text-signal-amber uppercase">
                {item.signal}
              </p>
              <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-foreground">
                {item.project.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-foreground-muted">
                {item.project.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.technologies.map((technology) => (
                  <li
                    className="border border-border-strong px-2 py-1 font-mono text-[0.62rem] text-foreground-secondary"
                    key={technology}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs leading-5 text-foreground-muted">
                  {item.progression}
                </p>
                <p className="mt-3 font-mono text-[0.6rem] tracking-[0.1em] text-signal-cyan uppercase">
                  → {item.related.join(" / ")}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {item.project.caseStudyPath ? (
                  <ActionLink
                    href={item.project.caseStudyPath}
                    variant="primary"
                  >
                    View Case Study
                  </ActionLink>
                ) : null}
                {item.project.repositoryUrl ? (
                  <ActionLink
                    href={item.project.repositoryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Repository ↗
                  </ActionLink>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
