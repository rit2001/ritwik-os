import type { WorkMeta } from "../../types/content";
import { getProject } from "../../data/projects";

const project = getProject("stateful-agentic-ai-assistant");

export const statefulAgenticAiAssistantMeta = {
  projectId: project.id,
  slug: "stateful-agentic-ai-assistant",
  title: project.title,
  shortTitle: "Agentic AI Assistant",
  category: project.category,
  summary: project.summary,
  status: "completed",
  statusLabel: "Completed",
  year: project.period,
  featured: true,
  ongoing: false,
  stack: project.stack,
  roles: [
    "Agent orchestration",
    "Stateful memory",
    "Retrieval-augmented generation",
    "Human-in-the-Loop workflows",
    "Tool routing",
    "Cloud deployment",
    "Observability",
  ],
  repositoryUrl: project.repositoryUrl,
  caseStudyPath: "/work/stateful-agentic-ai-assistant",
  seoTitle: "Stateful Agentic AI Assistant | Ritwik Biswas",
  seoDescription:
    "A completed engineering case study covering LangGraph orchestration, thread-scoped memory, PDF retrieval, tool routing, Human-in-the-Loop approval, streaming, observability, Docker, and AWS EC2 deployment.",
  publishedDate: "2026-07-15",
  updatedDate: "2026-07-15",
  readingTime: "13 min read",
  draft: false,
  relatedProjectSlugs: ["traceforge"],
} satisfies WorkMeta;
