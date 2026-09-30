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
    "Replay contract and evidence integrity",
    "Recorded dependency playback",
    "Regression-test export",
    "Optional distributed capture delivery",
    "Bounded local infrastructure",
  ],
  repositoryUrl: project.repositoryUrl,
  caseStudyPath: "/work/traceforge",
  seoTitle:
    "TraceForge — Deterministic Agent Replay Case Study | Ritwik Biswas",
  seoDescription:
    "An evidence-audited case study of TraceForge Replay Capsules, exact offline model and HTTP fixture replay, regression export, and bounded Go/Kafka delivery infrastructure.",
  publishedDate: "2026-07-15",
  updatedDate: "2026-09-27",
  readingTime: "18 min read",
  draft: false,
  relatedProjectSlugs: ["thesislens"],
  currentMilestone:
    "Experimental Beta v0.4.1: exact offline replay and regression export are implemented; generic real-agent capture and fork replay remain planned.",
  headerFacts: [
    {
      label: "Replay contract",
      value: "Replay Capsule 0.1.0 · Capture Event 0.2.0",
    },
    {
      label: "Storage boundary",
      value: "SQLite operational state · sealed JSON evidence",
    },
  ],
  toc: [
    { href: "#overview", label: "Overview" },
    {
      href: "#problem-and-reliability-model",
      label: "Problem and Reliability Model",
    },
    { href: "#system-architecture", label: "System Architecture" },
    { href: "#capture-contracts", label: "Capture Contracts" },
    { href: "#ingestion-gateway", label: "Ingestion Gateway" },
    { href: "#delivery-and-idempotency", label: "Delivery and Idempotency" },
    { href: "#exact-replay", label: "Exact Replay" },
    { href: "#frozen-boundaries", label: "Frozen Boundaries" },
    { href: "#langgraph-and-fixtures", label: "LangGraph and Fixtures" },
    { href: "#comparison-and-regression", label: "Comparison and Regression" },
    { href: "#storage-and-observability", label: "Storage and Observability" },
    { href: "#failure-path-evidence", label: "Failure-Path Evidence" },
    { href: "#local-infrastructure", label: "Local Infrastructure" },
    { href: "#security-and-trust", label: "Security and Trust" },
    { href: "#limitations", label: "Limitations" },
    {
      href: "#current-status-and-roadmap",
      label: "Current Status and Roadmap",
    },
    { href: "#lessons", label: "Lessons" },
  ],
} satisfies WorkMeta;
