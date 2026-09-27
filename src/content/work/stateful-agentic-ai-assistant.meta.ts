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
  headerFacts: [
    { label: "Deployment", value: "On-demand AWS EC2" },
    { label: "Demo", value: "Not continuously hosted" },
    {
      label: "Evidence scope",
      value:
        "Repository-audited implementation and qualified deployment behavior",
    },
  ],
  toc: [
    { href: "#overview", label: "Overview" },
    { href: "#problem", label: "Problem" },
    { href: "#system-architecture", label: "System Architecture" },
    { href: "#langgraph-control-flow", label: "LangGraph Control Flow" },
    { href: "#memory-and-threads", label: "Memory and Threads" },
    { href: "#rag-pipeline", label: "RAG Pipeline" },
    { href: "#tool-system", label: "Tool System" },
    { href: "#human-in-the-loop", label: "Human-in-the-Loop" },
    { href: "#streaming-interface", label: "Streaming Interface" },
    { href: "#observability", label: "Observability" },
    { href: "#docker-and-deployment", label: "Docker and Deployment" },
    { href: "#engineering-challenges", label: "Engineering Challenges" },
    { href: "#reliability-review", label: "Reliability Review" },
    { href: "#what-i-would-improve", label: "What I Would Improve" },
    { href: "#current-status", label: "Current Status" },
    { href: "#lessons", label: "Lessons" },
  ],
} satisfies WorkMeta;
