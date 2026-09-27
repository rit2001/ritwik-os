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
      "An evidence-grounded financial research platform combining semantic document ingestion, evidence-guarded KPI extraction, deterministic SQL/RAG routing, and current-request citation validation.",
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
        context:
          "Exhaustive Apple and Tesla FY2024 content-adjudicated evaluation corpus",
      },
      {
        kind: "delta",
        label: "Holdout nDCG@5",
        before: "0.704",
        after: "0.811",
        context:
          "Eight-query frozen holdout: local BM25 versus the fine-tuned MiniLM reranker",
      },
      {
        kind: "delta",
        label: "Holdout Recall@3",
        before: "0.448",
        after: "0.604",
        context:
          "Eight-query frozen holdout: local BM25 versus the fine-tuned MiniLM reranker",
      },
      {
        kind: "proof",
        label: "Retrieval tradeoff",
        detail:
          "Mean reranking-only latency was about 3.19s/query on local CPU and MRR declined from 1.000 to 0.938, so the reranker remains offline and lexical remains the serving default.",
      },
    ],
    caseStudyPath: "/work/thesislens",
    repositoryUrl: "https://github.com/rit2001/thesislens",
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
      "Local-first replay and regression infrastructure that seals sanitized agent execution into immutable capsules and replays recorded model and HTTP dependencies offline.",
    stack: [
      "Python",
      "Go",
      "Kafka",
      "SQLite",
      "LangGraph",
      "OpenTelemetry",
      "Prometheus",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
    evidence: [
      {
        kind: "proof",
        label: "Exact replay contract",
        detail:
          "Versioned sealed capsules bind sanitized requests with RFC 8785 and SHA-256; exact replay consumes recorded model and HTTP outcomes in order and fails closed on mismatch.",
      },
      {
        kind: "proof",
        label: "Optional distributed capture",
        detail:
          "A Go gateway accepts validated events into a bounded queue, Kafka delivers at least once, and a Python worker uses SQLite event-ID deduplication before sealing evidence.",
      },
      {
        kind: "proof",
        label: "Regression evidence",
        detail:
          "Normalized structural comparison, developer-authored regression specifications, and pytest export turn reviewed capsules into offline failure-path tests.",
      },
      {
        kind: "proof",
        label: "Bounded local infrastructure",
        detail:
          "Native OpenTelemetry and Prometheus instrumentation, non-root containers, one locally verified kind deployment, and a narrow Terraform-managed kind foundation remain development-only evidence.",
      },
    ],
    caseStudyPath: "/work/traceforge",
    repositoryUrl: "https://github.com/rit2001/traceforge",
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
      "A PostgreSQL-authoritative collaboration system with board-local ordering, persist-before-optimism, verified snapshot-and-tail recovery, and at-least-once multi-replica delivery.",
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Konva",
      "Fastify",
      "Socket.IO",
      "PostgreSQL",
      "Redis",
      "IndexedDB",
      "Clerk",
      "Docker Compose",
      "Playwright",
      "k6",
    ],
    evidence: [
      {
        kind: "count",
        label: "PostgreSQL integration tests",
        value: "245 across 29 files",
        context:
          "Recorded v1 release gate against real PostgreSQL for ordering, recovery, authorization, and collaborative state",
      },
      {
        kind: "proof",
        label: "Board-local authority",
        detail:
          "A transaction-scoped PostgreSQL advisory lock establishes per-board order; operation, projection, receipt, heads, undo evidence, and outbox commit or roll back together.",
      },
      {
        kind: "proof",
        label: "Offline and recovery boundary",
        detail:
          "IndexedDB persists stable command identities before optimism; generation fences, a fixed catch-up watermark, verified snapshots, and contiguous operation tails bound reconnection and recovery.",
      },
      {
        kind: "count",
        label: "Failure-injection scenarios",
        value: "59",
        context:
          "Recorded release evidence for two-API delivery, interruption, recovery, revocation, compaction, and presence behavior",
      },
    ],
    caseStudyPath: "/work/converge",
    repositoryUrl: "https://github.com/rit2001/converge",
    deploymentNote:
      "The audited release records one deployed API and worker; multi-replica behavior is locally failure-tested, not a production horizontal-scale claim.",
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

export function getProject(id: string) {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}
