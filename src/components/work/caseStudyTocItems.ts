export type CaseStudyTocItem = {
  href: string;
  label: string;
};

export const traceforgeTocItems = [
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
] as const satisfies readonly CaseStudyTocItem[];

export const agenticAssistantTocItems = [
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
] as const satisfies readonly CaseStudyTocItem[];

export function getCaseStudyTocItems(slug: string) {
  if (slug === "stateful-agentic-ai-assistant") {
    return agenticAssistantTocItems;
  }

  return traceforgeTocItems;
}
