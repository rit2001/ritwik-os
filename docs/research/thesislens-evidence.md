# ThesisLens Evidence Audit

## Audit Metadata

- Repository: `https://github.com/rit2001/thesislens`
- Local source: audited local checkout outside this repository
- Audited branch: `main`
- Audited commit: `a1a394c13977fc83d8cf2b80bbeec2efc7c5d902`
- Audit date: 2026-09-27
- Repository state: clean and synchronized with `origin/main`
- Validation: `221` zero-cloud unit/regression tests passed without modifying the repository

The audit inspected source, tests, configuration, checked-in benchmark datasets,
checked-in benchmark results, phase reports, Docker configuration, and GitHub
Actions. It did not read `.env`, call Azure/OpenAI services, retrain a model,
re-run the frozen holdout, deploy the application, or modify ThesisLens.

## Executive Assessment

ThesisLens is an implemented FastAPI investment-research system with PDF-to-
Markdown ingestion, embedding-assisted semantic chunking, Azure AI Search,
targeted KPI extraction into PostgreSQL, deterministic SQL/RAG/combined routing,
report-scoped conversational state, request-local citation-ID validation, and a
structured investment-thesis workflow.

Its strongest measured result is an offline local reranker experiment over a
small, two-company FY2024 corpus. The fine-tuned MiniLM cross-encoder improved
frozen eight-query holdout nDCG@5 and Recall@3, but regressed MRR and Precision@1
and added roughly 3.19 seconds of mean CPU reranking time per query. The reranker
is not in the serving path. Lexical retrieval remains the configured serving
default; Azure hybrid retrieval exists as an optional runtime mode.

## Verified Architecture

```text
Financial filing PDF
-> pymupdf4llm Markdown conversion
-> embedding-assisted semantic chunking
-> deterministic byte-safe child splitting
-> Azure OpenAI embeddings (text-embedding-3-small)
-> Azure AI Search index (lexical fields + 1,536-dimension vectors)
-> targeted KPI retrieval and structured extraction
-> PostgreSQL financial_metrics persistence

Question
-> deterministic local router
-> fixed allowlisted PostgreSQL query, filing retrieval, or both
-> schema-constrained Azure OpenAI generation where required
-> current-request evidence-ID validation
-> structured sources and/or filing citations

Thesis request
-> six allowlisted PostgreSQL KPIs
-> six targeted filing-retrieval groups
-> structured bull/bear/catalyst/risk/outlook generation
-> server-side citation-ID validation and unsupported-claim omission
```

Primary evidence:

- Ingestion: `ingestion/pdf_to_markdown.py`, `ingestion/semantic_chunker.py`,
  `ingestion/chunk_safety.py`, `ingestion/ingest_documents.py`
- Search schema/indexing: `vectorstore/create_index.py`,
  `vectorstore/azure_ai_search.py`
- Retrieval: `rag/chat_retrieval.py`, `rag/kpi_extractor_rag.py`
- Routing/chat: `services/query_router.py`, `services/chat_service.py`
- Thesis engine: `services/thesis_service.py`, `routes/thesis.py`
- Persistence: `database/create_table.py`, `database/save_metrics.py`,
  `database/chat_metrics_repository.py`
- Operations: `app.py`, `routes/health.py`, `observability/`, `Dockerfile`,
  `.github/workflows/ci.yml`

## Retrieval Findings

- Stored and query embeddings use Azure OpenAI `text-embedding-3-small`; the
  configured index vector width is 1,536.
- Semantic chunking uses LangChain's `SemanticChunker` with percentile
  breakpoints. A deterministic second stage splits only chunks above 24,000
  UTF-8 bytes without cutting a character.
- Serving defaults to Azure AI Search lexical retrieval. Chat lexical retrieval
  returns five report-filtered results.
- Optional Azure-native hybrid retrieval performs one 1,536-dimension query
  embedding, asks Search for vector `k=10` with lexical text in the same request,
  considers ten fused results, and returns five. Fusion is Azure-managed; the
  repository does not implement its own score weighting.
- The thesis workflow runs six targeted queries and retains at most three results
  per group before merging duplicate document IDs.
- The KPI workflow runs five targeted lexical queries with top three per group.
- Retrieval filters by company and fiscal year, removes duplicate IDs, and
  excludes mismatched result metadata.
- Runtime hybrid mode is explicit configuration, not heuristic switching. A
  hybrid embedding failure fails closed; it does not silently fall back.
- The local cross-encoder experiment is separate from serving. It generates
  local BM25 top-10 candidates over the 23 same-company/year snapshot chunks,
  scores 220-word windows with 110-word stride, and orders each passage by its
  maximum window score.

## Benchmark Dataset and Methodology

Checked-in sources:

- `evals/relevance_dataset.json`
- `evals/relevance/models.py`
- `evals/relevance/statistics.py`
- `evals/retrieval_metrics.py`
- `rag/PHASE_10_RELEVANCE_DATASET.md`
- `rag/PHASE_11_RERANKER_DATA_GATE.md`

Verified dataset version `1.2.0`:

- 44 exhaustive queries: 32 Apple and 12 Tesla;
- 46 production chunks: 23 per company, all FY2024;
- 1,012 judged query/chunk pairs (`44 x 23`);
- 58 grade-2 direct pairs, 61 grade-1 contextual pairs, and 893 grade-0 pairs;
- 118 hard negatives and 775 easy negatives;
- 25 train, 5 validation, 6 legacy-exposed evaluation, and 8 final-holdout
  queries;
- relevance grades 1 and 2 count as relevant for binary metrics;
- labels are `content_adjudicated`, meaning passage content was inspected, but
  none is independently human-verified.

The split seed is `10`. Query groups cannot cross splits. The final holdout was
frozen before valid training, contains four Apple and four Tesla questions, and
is marked evaluation-only with no tuning. Dataset and split digests are checked
by schema validation. The reported deltas use only the eight-query frozen final
holdout—not all 44 queries.

## Metric Implementation and Results

`evals/retrieval_metrics.py` verifies:

- Recall@K is the fraction of grade-1/2 judged chunks recovered by rank K.
- Precision@K uses K as the denominator, so missing ranks remain visible.
- MRR is the reciprocal rank of the first grade-1/2 result.
- nDCG uses graded gain `2^grade - 1`, log-base-2 rank discount, and the ideal
  grade ordering at K.
- Aggregation is an unweighted macro-average across scorable queries.

`evals/results/phase11_final_holdout.json` verifies this comparison over the
same local BM25 top-10 candidate pools:

| Metric                   | Lexical BM25 | Fine-tuned cross-encoder |
| ------------------------ | -----------: | -----------------------: |
| MRR                      |       1.0000 |                   0.9375 |
| nDCG@5                   |       0.7041 |                   0.8108 |
| Recall@3                 |       0.4479 |                   0.6042 |
| Precision@1              |       1.0000 |                   0.8750 |
| Mean measured time/query |       5.1 ms |               3,188.0 ms |

The cross-encoder timing measures reranking only and excludes shared BM25
candidate generation. It is the mean over eight final-holdout queries on an
arm64 Mac CPU. The artifact also records p50 `3,343.0 ms` and p95 `3,857.7 ms`.
Warm/cold state is not separately recorded, and no concurrency or production-
load test was performed.

## Cross-Encoder Training

Sources: `training/reranker/config.py`, `training/reranker/data.py`,
`training/reranker/train.py`, `training/reranker/scoring.py`, and the Phase 11
result/lock artifacts.

- Base model: `cross-encoder/ms-marco-MiniLM-L6-v2`, six-layer MiniLM.
- Training data: 575 exhaustive train query/chunk pairs from 25 queries.
- Validation: 115 pairs from 5 queries; used to select the fine-tuned checkpoint.
- Objective: pointwise BCE-with-logits.
- Grade targets: `0 -> 0.0`, `1 -> 0.5`, `2 -> 1.0`.
- Seed `10`, batch size `8`, one epoch, learning rate `2e-5`, weight decay
  `0.01`, 10% linear warmup, max gradient norm `1.0`, max length `512`.
- Training completed locally on CPU in `169.07` seconds.
- The locked checkpoint was evaluated once against the frozen final holdout.

Safe wording: “Fine-tuned a local MiniLM cross-encoder on content-adjudicated
Apple/Tesla filing pairs.” It must remain explicitly experimental and offline.

## Evidence, Routing, and Thesis Semantics

The router is deterministic regex/allowlist logic with three routes:

- `structured`: one fixed, parameterized PostgreSQL query and deterministic
  answer formatting;
- `qualitative`: fresh filing retrieval and schema-constrained generation;
- `combined`: both allowlisted KPI data and fresh filing evidence.

No LLM generates SQL. User text never becomes SQL, and unsupported structured
fields are rejected before opening a database connection.

Citation validation is structural, current-request provenance validation—not a
semantic entailment classifier. Each retrieved passage receives a fresh `E#`
identifier. The server removes unknown, duplicate, cross-report, and stale IDs.
A chat response claiming support with no surviving ID becomes an insufficient-
evidence response. In the thesis workflow, claims without surviving current-
request IDs, or claims containing prohibited recommendation/valuation language,
are omitted and reported through generic uncertainty. The implementation does
not independently prove that every cited passage semantically entails the full
claim.

The thesis output schema includes summary, bull case, bear case, catalysts,
risks, management outlook, uncertainties, structured KPIs, supporting sources,
and claim coverage. Management statements and ThesisLens interpretation are
separate fields. The prompt prohibits stock prices, valuation, price targets,
expected returns, recommendations, analyst ratings, external knowledge, and
post-filing events.

## KPI Pipeline

KPI extraction runs targeted lexical searches for income statement, balance
sheet, cash flow, risk, and growth evidence. Azure OpenAI returns a strict
Pydantic `FinancialMetrics` shape. Missing/ambiguous evidence is normalized to
null, and fields whose targeted evidence group returned no chunk are nulled.

PostgreSQL stores revenue, net income, operating income, operating cash flow,
total assets, total liabilities, risks, and growth drivers. Persistence uses a
company/year update-or-insert transaction; ingestion performs a preflight
duplicate check, and deterministic Azure Search UUIDs keep repeated chunk
identities stable. This is guarded persistence, not a measured extraction-
accuracy claim across a broad corpus.

The README records a bounded validation of 12/12 KPI fields across Apple and
Tesla FY2024. It must be described only as a two-filing check.

## Operations and Tests

- FastAPI exposes report ingestion, chat, thesis, dashboard, health, readiness,
  and opt-in local metrics routes.
- Request-scoped UUID traces record dependency calls, latency, retries, safe
  failure categories, and available token usage. Aggregates are bounded and
  process-local.
- `/health` is dependency-free liveness. `/ready` performs bounded PostgreSQL
  and Azure AI Search checks and returns safe 200/503 status without calling an
  LLM or embedding endpoint.
- The Docker image runs as a non-root user with one Uvicorn worker and excludes
  the optional reranker dependencies/model from serving.
- GitHub Actions installs runtime and reranker-test dependencies, runs the
  zero-cloud test suite, compiles Python, checks dashboard JavaScript syntax,
  and builds—but does not publish—the Docker image.
- The audited suite contains 221 tests across ingestion, chunk safety, index
  schema/migration, retrieval, routing, citation behavior, KPI extraction,
  thesis generation, observability, database resilience, evaluation, reranker,
  health/readiness, and container configuration. All passed locally.
- No deployment configuration or evidence of continuous production traffic is
  present. In-memory conversations, ingestion jobs, and telemetry are process-
  local; the single-worker container is deployment-ready, not proven deployed.

## Claim Matrix

| Claim                                      | Evidence location                                  | Status               | Safe public wording                                                                                                          |
| ------------------------------------------ | -------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| PDF to Markdown ingestion                  | `ingestion/pdf_to_markdown.py`                     | VERIFIED IMPLEMENTED | Converts uploaded filing PDFs to Markdown with `pymupdf4llm`.                                                                |
| Semantic chunking                          | `ingestion/semantic_chunker.py`, `chunk_safety.py` | VERIFIED IMPLEMENTED | Uses embedding-assisted semantic chunking followed by deterministic byte-safe splitting.                                     |
| Azure OpenAI embeddings                    | ingestion and `llm/azure_embeddings.py`            | VERIFIED IMPLEMENTED | Uses configured Azure OpenAI `text-embedding-3-small` embeddings.                                                            |
| Azure AI Search vector retrieval           | `rag/chat_retrieval.py`                            | VERIFIED IMPLEMENTED | Implements optional Azure-native hybrid lexical/vector retrieval; lexical remains default.                                   |
| PostgreSQL KPI persistence                 | `database/create_table.py`, `save_metrics.py`      | VERIFIED IMPLEMENTED | Persists an allowlisted financial-metric schema with transactional update-or-insert behavior.                                |
| Validated KPI extraction                   | `rag/kpi_extractor_rag.py`, KPI tests              | PARTIALLY VERIFIED   | Schema-constrained, evidence-guarded extraction nulls missing fields; 12 fields matched across two FY2024 filings.           |
| Deterministic SQL/RAG/combined routing     | `services/query_router.py`, `chat_service.py`      | VERIFIED IMPLEMENTED | Local deterministic routing selects fixed SQL, filing retrieval, or both.                                                    |
| Stateful report research                   | `InMemoryConversationStore`                        | VERIFIED IMPLEMENTED | Maintains bounded report-scoped multi-turn state in process memory.                                                          |
| Claim-level citation validation            | chat/thesis validation functions                   | PARTIALLY VERIFIED   | Validates current-request citation IDs and omits claims with no valid ID; does not independently verify semantic entailment. |
| Bull/bear/catalyst/risk/outlook generation | `services/thesis_service.py`                       | VERIFIED IMPLEMENTED | Generates structured filing-grounded research sections without investment recommendations.                                   |
| Unsupported-claim rejection                | thesis/chat validators                             | PARTIALLY VERIFIED   | Rejects invalid/absent citation IDs and prohibited market language; semantic support remains model-mediated.                 |
| Request observability                      | `observability/`                                   | VERIFIED IMPLEMENTED | Records request IDs and bounded process-local dependency timing/counts.                                                      |
| Docker, probes, CI                         | Dockerfile, health route, CI workflow              | VERIFIED IMPLEMENTED | Provides a non-root single-worker image, liveness/readiness probes, and zero-cloud CI; no production deployment claim.       |
| 44-query / 1,012-pair benchmark            | dataset and statistics artifacts                   | VERIFIED MEASURED    | Evaluated a 44-query, 1,012-pair content-adjudicated Apple/Tesla FY2024 benchmark.                                           |
| nDCG@5 0.704 to 0.811                      | frozen holdout artifact                            | VERIFIED MEASURED    | On eight frozen holdout queries, local BM25 nDCG@5 was 0.7041 and the fine-tuned reranker reached 0.8108.                    |
| Recall@3 0.448 to 0.604                    | frozen holdout artifact                            | VERIFIED MEASURED    | On the same holdout, Recall@3 moved from 0.4479 to 0.6042.                                                                   |
| About 3.19 s/query CPU latency             | frozen holdout artifact                            | VERIFIED MEASURED    | Mean cross-encoder reranking time was 3,188 ms/query on local arm64 Mac CPU, excluding BM25.                                 |
| Reduced top-rank MRR                       | frozen holdout artifact                            | VERIFIED MEASURED    | MRR declined from 1.0000 to 0.9375; Precision@1 declined from 1.0000 to 0.8750.                                              |
| Lexical retained after trade-off           | Phase 11 report, serving config                    | VERIFIED IMPLEMENTED | Lexical remains the serving default; the measured reranker remains offline and experimental.                                 |
| Production adoption/scale/traffic          | no evidence                                        | UNVERIFIED           | Do not publish.                                                                                                              |

## Required Public Corrections

- Replace broad “claim-level citation validation” language with the precise
  current-request citation-ID contract where the distinction matters.
- State that the 0.704-to-0.811 and 0.448-to-0.604 deltas use eight frozen
  holdout queries, not all 44 benchmark questions.
- State that 3.19 seconds is mean reranking-only CPU time over that holdout,
  excluding BM25 candidate generation.
- State that MRR changed from 1.0000 to 0.9375 and Precision@1 from 1.0000 to
  0.8750.
- Separate optional Azure hybrid retrieval from the offline local BM25 plus
  cross-encoder experiment.
- Describe Docker/CI/probes as deployment readiness, not proof of a live,
  continuously operated production service.
- Do not describe labels as human-labeled or human-verified.
