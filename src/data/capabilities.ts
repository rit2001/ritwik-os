export type CapabilityStatus =
  "Production Experience" | "Working Knowledge" | "Currently Building";

export type CapabilityGroup = {
  title: string;
  status: CapabilityStatus;
  items: readonly string[];
};

export const capabilityGroups = [
  {
    title: "AI Systems",
    status: "Production Experience",
    items: [
      "LangGraph",
      "Stateful agent workflows",
      "Retrieval-Augmented Generation",
      "FAISS",
      "Embeddings",
      "Human-in-the-Loop execution",
      "LangSmith observability",
      "LLM API integration",
    ],
  },
  {
    title: "Backend Systems",
    status: "Production Experience",
    items: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Socket.IO",
      "Authentication and authorization",
      "API design",
    ],
  },
  {
    title: "Data and Infrastructure",
    status: "Working Knowledge",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
      "SQLite",
      "Docker",
      "AWS",
      "GitHub Actions",
      "Nginx",
    ],
  },
  {
    title: "Frontend Product Engineering",
    status: "Production Experience",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Firebase",
      "responsive product interfaces",
    ],
  },
  {
    title: "Algorithms and Foundations",
    status: "Working Knowledge",
    items: [
      "C++",
      "Python",
      "Data Structures and Algorithms",
      "System Design",
      "Competitive Programming",
    ],
  },
  {
    title: "Observability and Platform",
    status: "Currently Building",
    items: [
      "Go",
      "Kafka",
      "OpenTelemetry",
      "Kubernetes",
      "Terraform",
      "distributed tracing",
      "telemetry pipelines",
    ],
  },
] as const satisfies readonly CapabilityGroup[];
