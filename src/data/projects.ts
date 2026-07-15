export type ProjectStatus = "In Development" | "Completed";

export type ProjectUse = "Current Build";

export type Project = {
  title: string;
  category: string;
  status: ProjectStatus;
  summary: string;
  stack: readonly string[];
  githubUrl: string | null;
  liveDemoUrl: null;
  caseStudyPath?: string;
  use?: ProjectUse;
  deploymentNote?: string;
  repositoryNote?: string;
};

export const selectedProjects: readonly Project[] = [
  {
    title: "TraceForge",
    category: "Distributed Tracing and Event Pipeline",
    status: "In Development",
    summary:
      "Building a distributed tracing pipeline focused on OpenTelemetry ingestion, Kafka-backed event processing, containerized services, infrastructure automation, and operational visibility.",
    stack: [
      "Go",
      "Kafka",
      "OpenTelemetry",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
    githubUrl: null,
    liveDemoUrl: null,
    caseStudyPath: "/work/traceforge",
    use: "Current Build",
  },
  {
    title: "Stateful Agentic AI Assistant",
    category: "AI Systems and Cloud Deployment",
    status: "Completed",
    summary:
      "Designed a LangGraph-based assistant with persistent conversation state, threaded sessions, streaming responses, tool routing, document retrieval, Human-in-the-Loop approval, observability, and automated AWS deployment.",
    stack: [
      "LangGraph",
      "Groq",
      "FAISS",
      "HuggingFace Embeddings",
      "Docker",
      "AWS EC2",
      "LangSmith",
    ],
    githubUrl: "https://github.com/rit2001/Agentic-Chatbot-AWS",
    liveDemoUrl: null,
    caseStudyPath: "/work/stateful-agentic-ai-assistant",
    deploymentNote:
      "On-demand AWS EC2 deployment; not continuously hosted to avoid unnecessary cloud cost.",
  },
  {
    title: "AI Mock Interview Platform",
    category: "Full-Stack AI Product",
    status: "Completed",
    summary:
      "Built an LLM-powered interview platform that generates role-aware technical and behavioral questions, evaluates submitted answers, produces structured feedback, and supports authentication, credit purchases, and downloadable reports.",
    stack: [
      "Node.js",
      "Express.js",
      "OpenRouter",
      "Firebase",
      "Razorpay",
      "PDF Reporting",
    ],
    githubUrl: "https://github.com/rit2001/smart-interview-agent",
    liveDemoUrl: null,
    deploymentNote:
      "Deployment configuration is documented in the repository; no continuously active public demo.",
  },
  {
    title: "Real-Time Collaborative Whiteboard",
    category: "Real-Time Distributed Application",
    status: "Completed",
    summary:
      "Built a room-based collaborative whiteboard using bidirectional Socket.IO events, persistent MongoDB state, JWT authentication, drawing tools, and backend APIs for users, sessions, rooms, and shared canvases.",
    stack: ["Node.js", "Express.js", "Socket.IO", "MongoDB", "JWT"],
    githubUrl: "https://github.com/rit2001/placement_2025/tree/main/whiteboard",
    liveDemoUrl: null,
    repositoryNote:
      "Current source is stored inside an existing monorepo directory. A standalone repository will replace this link later.",
  },
] as const;
