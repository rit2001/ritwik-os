# Resume Reconciliation

## Source Status

The repository contains one public resume artifact:

```text
public/resume/ritwik-biswas-resume.pdf
```

Phase 8.11R added the maintainable source at
`resume/ritwik-biswas-resume.tex` and regenerated the one-page public PDF from
the exact replacement copy below. Future updates must change the source,
rebuild to a temporary path, inspect the rendered page, and verify extracted
text and links before replacing the public PDF.

## Phase 8.11 Reconciliation Audit

| Resume claim                                                    | Audited public record                                                                                          | Class                                  | Required action                                  |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| Software Engineer \| Backend & AI Systems                       | Software Engineer \| Backend, Distributed Systems & AI                                                         | D — wording too weak                   | Use canonical role                               |
| Bengaluru, India                                                | Kolkata, India                                                                                                 | E — location mismatch                  | Replace; Bengaluru may only be a work preference |
| `biswas.ritwik2001@gmail.com`                                   | `thisisritwikbiswas@gmail.com`                                                                                 | E — contact mismatch                   | Replace                                          |
| Public phone number                                             | The portfolio deliberately publishes no phone number                                                           | E — contact mismatch                   | Remove from the public resume                    |
| `ritwik-os-forge.lovable.app`                                   | `https://ritwik-os.vercel.app/`                                                                                | E — link mismatch                      | Replace                                          |
| Existing LinkedIn and GitHub URLs                               | Match `src/data/social-links.ts`                                                                               | G — acceptable                         | Retain                                           |
| LeetCode 1,500+ solved and 550+ POTD                            | 1,550+ solved and 600+ POTD                                                                                    | B — stale numbers                      | Update                                           |
| Codeforces Specialist, peak 1415, Global Rank 818               | Same result in Round 952                                                                                       | G/D — acceptable but incomplete        | Retain and name Round 952                        |
| Search-in engagement improved 20%                               | Not present in the audited portfolio evidence                                                                  | C — wording too strong                 | Remove                                           |
| TraceForge generic OpenTelemetry span ingestion                 | Capture-event API plus OpenTelemetry-compatible context/instrumentation; generic OTLP ingestion is unsupported | F/C — technology and strength mismatch | Replace                                          |
| TraceForge scalable Kubernetes/Terraform processing and storage | One bounded local kind deployment and narrow local Terraform foundation                                        | C — wording too strong                 | Qualify as local evidence or omit                |
| TraceForge throughput, consumer-lag, and trace-latency metrics  | No supported measurements                                                                                      | A/C — factual and strength mismatch    | Remove                                           |
| TraceForge platform/production implications                     | Local-first replay plus optional at-least-once Go/Kafka capture and SQLite operational state                   | C/F — wording and status mismatch      | Use implemented scope only                       |
| Stateful assistant has four tools and Google Embeddings         | Six tools and HuggingFace `all-MiniLM-L6-v2` embeddings                                                        | A/F — factual and technology mismatch  | Correct if included                              |
| Generic HITL and cloud deployment                               | HITL is verified for the simulated purchase flow; EC2 is on demand                                             | C — wording too strong                 | Scope and qualify                                |
| Earlier Whiteboard has 100+ concurrent users and latency deltas | Historical collaboration scope only; progression toward Converge is not direct code lineage                    | C — unsupported scale wording          | Remove from one-page resume                      |
| AI Mock Interview endpoint-count detail                         | Selected project with no audited public case-study route                                                       | C — evidence strength mismatch         | Omit from one-page resume                        |
| ThesisLens and Converge absent                                  | Current audited flagships with measured evidence                                                               | D — wording too weak                   | Add both                                         |
| Blanket CI/CD capability                                        | CI unless a project separately proves deployment automation                                                    | C — wording too strong                 | Use precise CI/deployment wording                |
| Education, CGPA, employers, internship dates                    | Match canonical records                                                                                        | G — acceptable                         | Retain                                           |

## Exact Replacement Copy

The following is the approved content source for a one-page technical resume.
Layout may change during regeneration, but claims and numbers must not be
strengthened.

### RITWIK BISWAS

**Software Engineer | Backend, Distributed Systems & AI**

Kolkata, India ·
[thisisritwikbiswas@gmail.com](mailto:thisisritwikbiswas@gmail.com) ·
[LinkedIn](https://www.linkedin.com/in/ritwik-biswas-958318234/) ·
[GitHub](https://github.com/rit2001) ·
[Portfolio](https://ritwik-os.vercel.app/)

### Experience

**Taskly Technologies Inc. — Software Engineering Intern**<br />
Remote, Canada · Mar–Jul 2025

- Built core JobSense modules with Next.js, FastAPI, and PostgreSQL for
  job-description analysis, resume scoring, ATS checks, interview preparation,
  and company research.
- Integrated Groq, Firebase Authentication, JWT-secured sessions, and protected
  AI endpoints; resolved scraping, payload, environment, and Docker failures
  while supporting Vercel and cloud deployment workflows.

**Search-in — Full-Stack Developer Intern**<br />
Remote, Bengaluru · Jun–Jul 2024

- Built a React administration platform and Node.js/Express APIs supporting
  operational analytics, order workflows, 10K+ users, 1K+ orders, and 500+
  managed records.
- Improved data paths with MongoDB indexing, Redis caching, and query tuning;
  redesigned workflows that reduced order-processing time by 30% and deployed
  frontend assets to AWS S3.

**Pepcorns — Full-Stack Developer Intern**<br />
Remote, Pune · Mar–Apr 2024

- Built a Node.js/SQL referral and rewards platform with referral attribution,
  reward issuance, social sharing, backend integrations, and reusable React
  components.

### Flagship Engineering Systems

**ThesisLens — Applied AI / Retrieval / Evaluation**<br />
Python · FastAPI · Azure OpenAI · Azure AI Search · PostgreSQL · Docker

- Built evidence-grounded financial research foundations spanning filing
  ingestion, evidence-guarded KPI extraction, deterministic SQL/RAG routing,
  and current-request citation validation.
- Evaluated 44 queries and 1,012 judged query-document pairs. On an eight-query
  frozen holdout, a fine-tuned MiniLM reranker moved nDCG@5 from 0.704 to 0.811
  and Recall@3 from 0.448 to 0.604; lexical retrieval remained the serving
  default after a top-rank MRR tradeoff and approximately 3.19 s/query local CPU
  reranking latency.

**TraceForge — AI Reliability / Deterministic Replay**<br />
Python · Go · Kafka · SQLite · LangGraph · OpenTelemetry · Docker

- Sealed sanitized execution evidence into versioned Replay Capsules and
  replayed recorded model and HTTP boundaries offline using ordered request
  fingerprints that fail closed on mismatch.
- Added normalized structural comparison, developer-authored regression
  specifications, and pytest export; the optional capture path uses a Go
  gateway, Kafka at-least-once delivery, and SQLite event-ID deduplication.

**Converge — Distributed Real-Time Collaboration**<br />
TypeScript · React · Konva · Fastify · Socket.IO · PostgreSQL · Redis · IndexedDB

- Built board-authoritative state with a strict monotonic total order per board
  and atomic PostgreSQL operation, projection, receipt, heads, undo-evidence,
  and outbox updates; Redis Streams provide retained at-least-once fanout with
  application-level idempotency.
- Implemented persistence-before-optimism, fixed-watermark catch-up,
  generation-fenced reconnect, and verified snapshot-plus-tail recovery.
  Release evidence records 245 PostgreSQL integration tests across 29 files, 59
  failure scenarios, 93 Playwright scenarios, and bounded local k6 runs.

### Education

**Indian Institute of Technology Kharagpur** · 2021–2026<br />
Dual Degree — B.Tech + M.Tech, Mechanical Engineering · CGPA 7.84 / 10<br />
Shyamal Ghosh & Sunanda Ghosh Endowment Honour

### Algorithmic Proof

- **LeetCode:** Knight · peak 1923 · Top 5.6% · 1,550+ solved · 600+
  Problem-of-the-Day streak
- **Codeforces:** Specialist · peak 1415 · Global Rank 818 in Round 952

### Additional Achievements

- Amazon ML Summer School 2024
- Top 3 in GCOS 2024 at IIT Kharagpur
- Top 5 in Overnite at Kshitij, IIT Kharagpur

### Technical Skills

**Languages:** TypeScript, Go, Python, SQL, JavaScript<br />
**Systems:** PostgreSQL, Redis, Kafka, Fastify, FastAPI, Socket.IO, IndexedDB<br />
**AI / Retrieval:** LangGraph, Azure OpenAI, Azure AI Search, RAG, BM25,
SentenceTransformers, FAISS<br />
**Quality / Infrastructure:** Docker, GitHub Actions, Playwright, k6,
OpenTelemetry, Prometheus
