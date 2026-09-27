export type PortfolioTier = "flagship" | "selected" | "archive";
export type ProjectStatus = "In Development" | "Completed";

export type EvidenceHighlight =
  | {
      kind: "delta";
      label: string;
      before: string;
      after: string;
      context: string;
    }
  | { kind: "count"; label: string; value: string; context: string }
  | { kind: "proof"; label: string; detail: string };

export type Project = {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  period: string;
  tier: PortfolioTier;
  displayOrder: number;
  summary: string;
  stack: readonly string[];
  evidence: readonly EvidenceHighlight[];
  caseStudyPath?: string;
  repositoryUrl?: string;
  deploymentNote?: string;
  supersededBy?: string;
};

export const projects: readonly Project[] = [
  {
    id: "thesislens",
    title: "ThesisLens",
    category: "Applied AI / Retrieval / Evaluation",
    status: "In Development",
    period: "Sep 2026 – Present",
    tier: "flagship",
    displayOrder: 1,
    summary:
      "An evidence-grounded financial research platform combining semantic document ingestion, validated KPI extraction, deterministic SQL/RAG routing, and claim-level citation validation.",
    stack: [
      "Python",
      "FastAPI",
      "Azure OpenAI",
      "Azure AI Search",
      "PostgreSQL",
      "RAG",
      "BM25 / Hybrid Retrieval",
      "SentenceTransformers",
      "Cross-Encoder Reranking",
      "Docker",
      "GitHub Actions",
    ],
    evidence: [
      {
        kind: "count",
        label: "Retrieval benchmark",
        value: "44 queries / 1,012 judged query-document pairs",
        context: "Evaluation corpus",
      },
      {
        kind: "delta",
        label: "Holdout nDCG@5",
        before: "0.704",
        after: "0.811",
        context: "Local MiniLM cross-encoder fine-tuning",
      },
      {
        kind: "delta",
        label: "Holdout Recall@3",
        before: "0.448",
        after: "0.604",
        context: "Local MiniLM cross-encoder fine-tuning",
      },
      {
        kind: "proof",
        label: "Retrieval tradeoff",
        detail:
          "The reranker added about 3.19s/query of CPU latency and reduced top-rank MRR, so lexical retrieval remains in the system.",
      },
    ],
  },
  {
    id: "traceforge",
    title: "TraceForge",
    category: "AI Infrastructure / Reliability / Deterministic Replay",
    status: "In Development",
    period: "Jul 2026 – Present",
    tier: "flagship",
    displayOrder: 2,
    summary:
      "AI infrastructure for resilient telemetry capture and deterministic AI-agent replay, with implemented ingestion and replay foundations and an expanding platform direction.",
    stack: [
      "Go",
      "Kafka",
      "OpenTelemetry",
      "Python",
      "LangGraph",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Distributed Systems",
    ],
    evidence: [
      {
        kind: "proof",
        label: "Current foundation",
        detail:
          "Non-blocking telemetry ingestion, versioned capture contracts, schema validation, idempotent processing, Kafka-backed asynchronous delivery, and replay fixtures with original-versus-replay diffing.",
      },
      {
        kind: "proof",
        label: "Expanding direction",
        detail:
          "PostgreSQL trace/span persistence, asynchronous evaluation, containerized workers, Kubernetes deployment, Terraform-managed infrastructure, and operational observability are being expanded.",
      },
    ],
    caseStudyPath: "/work/traceforge",
  },
  {
    id: "converge",
    title: "Converge",
    category: "Distributed Real-Time Collaboration",
    status: "In Development",
    period: "Aug 2026 – Present",
    tier: "flagship",
    displayOrder: 3,
    summary:
      "A server-authoritative collaboration system with deterministic state, durable offline synchronization, multi-replica fan-out, and collaborative editing controls.",
    stack: [
      "TypeScript",
      "React",
      "Konva",
      "Fastify",
      "Socket.IO",
      "PostgreSQL",
      "Redis",
      "IndexedDB",
      "Docker",
      "Playwright",
      "k6",
    ],
    evidence: [
      {
        kind: "proof",
        label: "Consistency model",
        detail:
          "PostgreSQL advisory-lock sequencing, deterministic reducers, versioned protocols, idempotent commands, and transactional operation/projection/outbox/receipt commits.",
      },
      {
        kind: "proof",
        label: "Resilience",
        detail:
          "IndexedDB persistence-before-optimism, durable command queues, generation-fenced reconnects, fixed-watermark catch-up, snapshot plus operation-tail replay, canonical hashing, and compaction.",
      },
      {
        kind: "count",
        label: "System depth",
        value: "25+ components / 190+ PostgreSQL integration tests",
        context:
          "With Playwright, k6, and multi-replica failure-injection and recovery suites",
      },
    ],
  },
  {
    id: "stateful-agentic-ai-assistant",
    title: "Stateful Agentic AI Assistant",
    category: "AI Systems and Cloud Deployment",
    status: "Completed",
    period: "May–Jun 2026",
    tier: "selected",
    displayOrder: 4,
    summary:
      "A LangGraph-based assistant with thread-scoped SQLite checkpointing, streamed responses, retrieval, Human-in-the-Loop approval, observability, and on-demand AWS deployment.",
    stack: [
      "Python",
      "Streamlit",
      "LangGraph",
      "Groq",
      "SQLite",
      "FAISS",
      "HuggingFace Embeddings",
      "Docker",
      "GitHub Actions",
      "AWS EC2",
      "LangSmith",
    ],
    evidence: [
      {
        kind: "proof",
        label: "Verified implementation",
        detail:
          "Thread-scoped memory, tool routing, PDF retrieval, Human-in-the-Loop approval, Docker image publishing, EC2 container replacement, and health verification.",
      },
    ],
    caseStudyPath: "/work/stateful-agentic-ai-assistant",
    repositoryUrl: "https://github.com/rit2001/Agentic-Chatbot-AWS",
    deploymentNote:
      "On-demand AWS EC2 deployment; not continuously hosted to avoid unnecessary cloud cost.",
  },
  {
    id: "ai-mock-interview-platform",
    title: "AI Mock Interview Platform",
    category: "Full-Stack AI Product",
    status: "Completed",
    period: "2025",
    tier: "selected",
    displayOrder: 5,
    summary:
      "An LLM-powered interview platform for role-aware question generation, answer evaluation, structured feedback, and downloadable reports.",
    stack: [
      "Node.js",
      "Express.js",
      "OpenRouter",
      "Firebase",
      "Razorpay",
      "PDF Reporting",
    ],
    evidence: [
      {
        kind: "proof",
        label: "Product scope",
        detail:
          "Role-aware technical and behavioral questions, submitted-answer evaluation, structured feedback, and downloadable reports.",
      },
    ],
    repositoryUrl: "https://github.com/rit2001/smart-interview-agent",
    deploymentNote:
      "Deployment configuration is documented in the repository; no continuously active public demo.",
  },
  {
    id: "real-time-collaborative-whiteboard",
    title: "Real-Time Collaborative Whiteboard",
    category: "Real-Time Distributed Application",
    status: "Completed",
    period: "2025",
    tier: "archive",
    displayOrder: 6,
    summary:
      "Historical earlier work in room-based real-time collaboration with Socket.IO events, persistent canvas state, drawing tools, and shared canvases.",
    stack: ["Node.js", "Express.js", "Socket.IO", "MongoDB", "JWT"],
    evidence: [
      {
        kind: "proof",
        label: "Historical scope",
        detail:
          "Bidirectional collaboration events, persistent state, drawing tools, and shared canvases.",
      },
    ],
    repositoryUrl:
      "https://github.com/rit2001/placement_2025/tree/main/whiteboard",
    supersededBy: "converge",
  },
] as const;

/**
 * Temporary V1 homepage projection. Phase 8.4 will replace this surface with
 * the tiered V2 portfolio presentation.
 */
export const legacyHomepageProjects = projects.filter((project) =>
  [
    "traceforge",
    "stateful-agentic-ai-assistant",
    "ai-mock-interview-platform",
    "real-time-collaborative-whiteboard",
  ].includes(project.id),
);

export function getProject(id: string) {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}
