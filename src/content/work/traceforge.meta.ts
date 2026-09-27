import type { WorkMeta } from "../../types/content";
import { getProject } from "../../data/projects";

const project = getProject("traceforge");

export const traceforgeMeta = {
  projectId: project.id,
  slug: "traceforge",
  title: project.title,
  shortTitle: "TraceForge",
  category: project.category,
  summary: project.summary,
  status: "in-development",
  statusLabel: "In Development",
  year: project.period,
  featured: true,
  ongoing: true,
  stack: project.stack,
  roles: [
    "Distributed tracing architecture",
    "Telemetry ingestion",
    "Event pipeline design",
    "Observability strategy",
    "Infrastructure automation",
  ],
  caseStudyPath: "/work/traceforge",
  seoTitle: "TraceForge — Distributed Tracing Pipeline | Ritwik Biswas",
  seoDescription:
    "An ongoing engineering case study documenting the architecture, planned service boundaries, observability strategy, and implementation roadmap for a distributed tracing and telemetry pipeline.",
  updatedDate: "2026-07-15",
  readingTime: "9 min read",
  draft: false,
  relatedProjectSlugs: [],
  currentMilestone:
    "Telemetry capture and deterministic replay foundations, with platform persistence and evaluation capabilities expanding.",
  headerFacts: [
    {
      label: "Evidence scope",
      value:
        "Capture contracts, deterministic replay, and reliability foundations",
    },
  ],
  toc: [
    { href: "#overview", label: "Overview" },
    { href: "#problem", label: "Problem" },
    { href: "#goals-and-scope", label: "Goals and Scope" },
    { href: "#current-milestone", label: "Current Milestone" },
    { href: "#proposed-architecture", label: "Proposed Architecture" },
    { href: "#service-boundaries", label: "Service Boundaries" },
    { href: "#engineering-decisions", label: "Engineering Decisions" },
    { href: "#open-questions", label: "Trade-offs and Open Questions" },
    { href: "#observability", label: "Observability" },
    { href: "#load-testing", label: "Load Testing" },
    { href: "#current-status", label: "Current Status" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#journal-note", label: "Engineering Journal Note" },
  ],
} satisfies WorkMeta;
