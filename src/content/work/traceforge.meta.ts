import type { WorkMeta } from "../../types/content";

export const traceforgeMeta = {
  slug: "traceforge",
  title: "TraceForge",
  shortTitle: "TraceForge",
  category: "Distributed Tracing and Event Pipeline",
  summary:
    "Building a distributed tracing pipeline focused on OpenTelemetry ingestion, Kafka-backed event processing, containerized services, infrastructure automation, and operational visibility.",
  status: "in-development",
  statusLabel: "In Development",
  year: "2026",
  featured: true,
  ongoing: true,
  stack: ["Go", "Kafka", "OpenTelemetry", "Docker", "Kubernetes", "Terraform"],
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
  currentMilestone: "Architecture and repository bootstrap",
} satisfies WorkMeta;
