export type CapabilityGroup = {
  title: string;
  items: readonly string[];
  demonstratedIn: readonly string[];
};

export const capabilityGroups = [
  {
    title: "Backend & Distributed Systems",
    items: [
      "Go",
      "FastAPI",
      "Kafka",
      "OpenTelemetry",
      "versioned protocols",
      "idempotent commands",
      "deterministic reducers",
    ],
    demonstratedIn: ["TraceForge", "Converge"],
  },
  {
    title: "AI & Retrieval Systems",
    items: [
      "LangGraph",
      "RAG",
      "hybrid retrieval",
      "cross-encoder reranking",
      "embeddings",
      "Human-in-the-Loop",
    ],
    demonstratedIn: [
      "ThesisLens",
      "Stateful Agentic AI Assistant",
      "TraceForge",
    ],
  },
  {
    title: "Data & State",
    items: [
      "PostgreSQL",
      "Redis",
      "IndexedDB",
      "SQLite",
      "transactional outbox",
      "stateful sessions",
    ],
    demonstratedIn: ["Converge", "ThesisLens", "Stateful Agentic AI Assistant"],
  },
  {
    title: "Cloud & Platform",
    items: [
      "Docker",
      "GitHub Actions",
      "Kubernetes",
      "Terraform",
      "AWS EC2",
      "containerized workers",
    ],
    demonstratedIn: [
      "TraceForge",
      "Stateful Agentic AI Assistant",
      "ThesisLens",
    ],
  },
  {
    title: "Product Engineering",
    items: [
      "TypeScript",
      "React",
      "Konva",
      "Socket.IO",
      "Playwright",
      "responsive interfaces",
    ],
    demonstratedIn: ["Converge", "AI Mock Interview Platform"],
  },
  {
    title: "Algorithmic Foundations",
    items: [
      "C++",
      "Python",
      "data structures and algorithms",
      "system design",
      "competitive programming",
    ],
    demonstratedIn: ["LeetCode", "Codeforces"],
  },
] as const satisfies readonly CapabilityGroup[];
