import {
  EvidenceTable,
  InvariantCallout,
  MetricDelta,
  SystemFlow,
  TradeoffDecision,
} from "./EvidencePrimitives";

const architectureSteps = [
  {
    label: "Ingest",
    name: "PDF → Markdown",
    description: "Parse one filing and preserve report identity.",
  },
  {
    label: "Structure",
    name: "Semantic chunks",
    description:
      "Embed-assisted boundaries plus deterministic safety splitting.",
  },
  {
    label: "Index",
    name: "Azure AI Search",
    description: "Store lexical fields, vectors, and stable chunk coordinates.",
  },
  {
    label: "Research",
    name: "SQL / RAG routing",
    description: "Select structured facts, filing evidence, or both.",
  },
  {
    label: "Ground",
    name: "Validated provenance",
    description: "Expose only current-request structured or filing sources.",
  },
] as const;

const ingestionSteps = [
  {
    name: "Filing PDF",
    description: "Validated upload scoped to company and fiscal year.",
  },
  { name: "Markdown", description: "pymupdf4llm conversion." },
  { name: "Semantic chunks", description: "Percentile semantic breakpoints." },
  {
    name: "Safe child chunks",
    description: "Deterministic 24,000-byte ceiling.",
  },
  {
    name: "Search + KPI state",
    description: "Azure AI Search documents and PostgreSQL metrics.",
  },
] as const;

export function ThesisLensArchitecture() {
  return (
    <SystemFlow
      label="Implemented system flow"
      note="The serving path remains lexical by default. Azure hybrid retrieval is optional, and the local cross-encoder experiment is not part of this flow."
      steps={architectureSteps}
    />
  );
}

export function ThesisLensIngestionFlow() {
  return (
    <SystemFlow
      label="Filing ingestion"
      note="Stable UUIDs are derived from report and chunk coordinates so retrying the same chunk does not create a new identity."
      steps={ingestionSteps}
    />
  );
}

export function RetrievalModeTable() {
  return (
    <EvidenceTable
      caption="Implemented retrieval paths"
      rows={[
        {
          label: "Serving default",
          value:
            "Azure AI Search lexical retrieval, report-filtered by company and fiscal year; five results for chat.",
        },
        {
          label: "Optional hybrid",
          value:
            "One 1,536-dimension query embedding, Azure-managed lexical/vector fusion over ten results, then five normalized results.",
        },
        {
          label: "KPI extraction",
          value:
            "Five targeted lexical queries, top three per group, merged by stable chunk identity.",
        },
        {
          label: "Thesis synthesis",
          value:
            "Six targeted retrieval groups, at most three results per group, then cross-group document deduplication.",
        },
        {
          label: "Offline experiment",
          value:
            "Local BM25 top-10 candidates reranked by a MiniLM cross-encoder; never invoked by the serving image.",
        },
      ]}
    />
  );
}

export function BenchmarkSetup() {
  return (
    <EvidenceTable
      caption="Relevance benchmark contract"
      rows={[
        {
          label: "Corpus",
          value: "46 FY2024 filing chunks: 23 Apple and 23 Tesla.",
        },
        {
          label: "Queries",
          value: "44 exhaustive questions: 32 Apple and 12 Tesla.",
        },
        {
          label: "Judgments",
          value:
            "1,012 query/chunk pairs: 58 grade 2, 61 grade 1, and 893 grade 0.",
        },
        {
          label: "Provenance",
          value:
            "Content-adjudicated after passage inspection; zero independently human-verified queries.",
        },
        {
          label: "Partitions",
          value:
            "25 train, 5 validation, 6 legacy-exposed evaluation, and 8 frozen final-holdout queries.",
        },
        {
          label: "Leakage controls",
          value:
            "Query groups remain within one split; frozen dataset and split digests are validated before training/evaluation.",
        },
      ]}
    />
  );
}

export function RerankerTrainingEvidence() {
  return (
    <EvidenceTable
      caption="Locked cross-encoder experiment"
      rows={[
        { label: "Base model", value: "cross-encoder/ms-marco-MiniLM-L6-v2" },
        {
          label: "Training data",
          value:
            "575 train pairs across 25 queries; 115 validation pairs across 5 queries.",
        },
        {
          label: "Objective",
          value:
            "Pointwise BCE-with-logits with grade targets 0.0, 0.5, and 1.0.",
        },
        {
          label: "Configuration",
          value:
            "Seed 10, batch 8, one epoch, 2e-5 learning rate, 512-token maximum length.",
        },
        {
          label: "Passage scoring",
          value:
            "220-word windows with 110-word stride; maximum window score ranks each candidate.",
        },
        {
          label: "Execution",
          value: "Local arm64 Mac CPU; training completed in 169.07 seconds.",
        },
      ]}
    />
  );
}

export function BenchmarkResults() {
  return (
    <div className="my-8 grid gap-8 md:grid-cols-2">
      <MetricDelta
        after="0.8108"
        before="0.7041"
        context="Eight-query frozen holdout · local BM25 top-10 versus fine-tuned MiniLM reranking"
        label="nDCG@5"
      />
      <MetricDelta
        after="0.6042"
        before="0.4479"
        context="Same frozen holdout and candidate pools · grades 1 and 2 treated as relevant"
        label="Recall@3"
      />
    </div>
  );
}

export function RerankerTradeoff() {
  return (
    <TradeoffDecision
      constraint="The reranker stays offline and experimental; serving defaults to lexical retrieval."
      decision="Do not integrate the fine-tuned cross-encoder into the serving path."
      downside="Fine-tuned mean reranking time was 3,188 ms/query on CPU, MRR fell from 1.0000 to 0.9375, and Precision@1 fell from 1.0000 to 0.8750."
      why="The holdout showed better graded depth and Recall@3, but worse first-result quality and a disproportionate latency increase over the 5.1 ms local BM25 baseline."
    />
  );
}

export function RoutingEvidence() {
  return (
    <EvidenceTable
      caption="Deterministic evidence routing"
      rows={[
        {
          label: "Structured",
          value:
            "Direct allowlisted KPI questions use one fixed, parameterized PostgreSQL query and deterministic answer formatting.",
        },
        {
          label: "Qualitative",
          value:
            "Risk, outlook, demand, strategy, and other filing questions run fresh report-filtered retrieval before generation.",
        },
        {
          label: "Combined",
          value:
            "Questions asking for a supported KPI and its filing-grounded explanation collect both evidence types and keep their provenance separate.",
        },
        {
          label: "Safe default",
          value:
            "Ambiguous questions route to filing evidence; the system never asks a model to generate arbitrary SQL.",
        },
      ]}
    />
  );
}

export function CitationInvariant() {
  return (
    <InvariantCallout title="Current-request provenance only">
      A filing citation is accepted only when its request-local evidence ID
      resolves to a retrieved chunk for the selected company and fiscal year.
      History can clarify a follow-up, but cannot become evidence for it.
    </InvariantCallout>
  );
}

export function OperationsEvidence() {
  return (
    <EvidenceTable
      caption="Deployment-readiness evidence"
      rows={[
        {
          label: "Runtime",
          value:
            "FastAPI and one non-root Uvicorn worker in a Python 3.11 slim image.",
        },
        { label: "Liveness", value: "Dependency-free /health endpoint." },
        {
          label: "Readiness",
          value:
            "Bounded PostgreSQL and Azure AI Search checks with safe 200/503 responses.",
        },
        {
          label: "Observability",
          value:
            "Request UUIDs plus process-local dependency counts, retries, timings, and sanitized failure categories.",
        },
        {
          label: "CI",
          value:
            "Zero-cloud unit/regression suite, Python compilation, JavaScript syntax check, and Docker build verification.",
        },
        {
          label: "Boundary",
          value:
            "No evidence of continuous production deployment, traffic, multi-worker state sharing, or production-scale load.",
        },
      ]}
    />
  );
}

export function ThesisLensLimitations() {
  return (
    <EvidenceTable
      caption="Current limitations"
      rows={[
        {
          label: "Evaluation scope",
          value:
            "Two companies, one filing year, 46 chunks, and only eight final-holdout queries.",
        },
        {
          label: "Judgment quality",
          value:
            "Labels are content-adjudicated but not independently human-verified.",
        },
        {
          label: "Reranker",
          value:
            "BM25 bounds candidate recall; CPU timing covers reranking only and no concurrency/load test.",
        },
        {
          label: "Citation semantics",
          value:
            "The server validates evidence IDs and report scope, not full semantic entailment of each claim.",
        },
        {
          label: "State",
          value:
            "Conversation, ingestion-job, and aggregate telemetry state is process-local.",
        },
        {
          label: "Dependencies",
          value:
            "Serving requires configured Azure OpenAI, Azure AI Search, and PostgreSQL services.",
        },
      ]}
    />
  );
}
