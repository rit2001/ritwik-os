import { getProject } from "../../data/projects";
import type { WorkMeta } from "../../types/content";

const project = getProject("thesislens");

export const thesisLensMeta = {
  projectId: project.id,
  slug: "thesislens",
  title: project.title,
  shortTitle: "ThesisLens",
  category: project.category,
  summary: project.summary,
  status: "in-development",
  statusLabel: "In Development",
  year: project.period,
  featured: true,
  ongoing: true,
  stack: project.stack,
  roles: [
    "Financial filing ingestion",
    "Retrieval architecture",
    "Evaluation and reranker experimentation",
    "Evidence-aware AI orchestration",
    "Deployment readiness",
  ],
  repositoryUrl: project.repositoryUrl,
  caseStudyPath: "/work/thesislens",
  seoTitle: "ThesisLens — Retrieval and Evaluation Case Study | Ritwik Biswas",
  seoDescription:
    "An evidence-audited engineering case study covering ThesisLens filing ingestion, deterministic SQL/RAG routing, citation provenance, and a measured local MiniLM reranker experiment.",
  publishedDate: "2026-09-27",
  updatedDate: "2026-09-27",
  readingTime: "16 min read",
  draft: false,
  relatedProjectSlugs: ["traceforge"],
  currentMilestone:
    "Implemented serving foundations and deployment readiness, with the local reranker retained as an offline experiment after a mixed holdout result.",
  headerFacts: [
    {
      label: "Evidence scope",
      value: "44 queries · 1,012 judged pairs · 8-query frozen holdout",
    },
  ],
  toc: [
    { href: "#overview", label: "Overview" },
    { href: "#problem-and-scope", label: "Problem and Scope" },
    { href: "#system-architecture", label: "System Architecture" },
    {
      href: "#ingestion-and-kpi-pipeline",
      label: "Ingestion and KPI Pipeline",
    },
    { href: "#retrieval-architecture", label: "Retrieval Architecture" },
    { href: "#benchmark-design", label: "Benchmark Design" },
    { href: "#cross-encoder-training", label: "Cross-Encoder Training" },
    { href: "#measured-results", label: "Measured Results" },
    {
      href: "#ranking-latency-tradeoff",
      label: "Ranking and Latency Trade-off",
    },
    { href: "#routing-and-research", label: "Routing and Research" },
    { href: "#evidence-validation", label: "Evidence Validation" },
    { href: "#investment-thesis-engine", label: "Investment-Thesis Engine" },
    { href: "#operations-and-testing", label: "Operations and Testing" },
    { href: "#limitations", label: "Limitations" },
    { href: "#current-status", label: "Current Status" },
    { href: "#lessons", label: "Lessons" },
  ],
} satisfies WorkMeta;
