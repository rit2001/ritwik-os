# TraceForge Evidence Audit

## Audit Metadata

- Repository: `https://github.com/rit2001/traceforge`
- Local source: `/Users/ritwikbiswas/Desktop/full_stack_project/traceforge`
- Audited branch: `main`
- Audited commit: `660506fe07f0fb99d8829340121b9c537ec5616d`
- Release tag inspected: `v0.4.1` at `31aa3c7ebf90677812535ea1546fc0521a34ed28`
- Audit date: 2026-09-27
- Repository state: clean and synchronized with `origin/main`

The audit inspected contracts, schemas, Python and Go source, tests, controlled
fixtures, Docker and Compose assets, Kubernetes/Kustomize manifests, Terraform,
CI, ADRs, operations guides, and the repository's append-only verification
ledger. It did not inspect `.env`, start Kafka or Docker, create a kind cluster,
apply Terraform, call an external model/tool, or modify TraceForge.

`go test ./...` passed across the five tested gateway packages during this
audit. The Desktop-local Python virtual environment stalled while importing
pytest, so its suite was not re-executed. The audited release ledger records a
passing final offline gate with 103 Python tests, Go tests/vet/race, Terraform
mock tests, Kustomize renders, Compose parsing, and documentation checks.

## Executive Assessment

TraceForge is an experimental local-first replay and regression system for
controlled Python AI-agent runs. Its product center is a sealed Replay Capsule:
a sanitized, versioned JSON artifact containing invocation facts, ordered model
and HTTP dependency outcomes, original observations, redaction metadata, and
content integrity. Exact replay invokes trusted local runner code while serving
recorded dependency outcomes in sequence, blocking common socket entry points,
and failing closed on missing, extra, reordered, or request-mismatched fixtures.

An optional distributed development path moves mutable capture events through a
Go HTTP gateway, a bounded in-memory publisher queue, Kafka, and a Python
assembly worker. SQLite provides durable per-event deduplication and ordering;
completed streams are sealed to JSON capsules. This path is at least once and
locally verified. It is not exactly once, hosted, high availability, or
performance evidence.

## Verified System Boundaries

```text
Controlled Python / bounded LangGraph execution
-> CaptureSession and best-effort redaction
-> Replay Capsule 0.1.0 sealing and validation
-> exact offline replay with recorded model/HTTP outcomes
-> normalized structural comparison
-> developer-authored regression evaluation
-> optional pytest export

Optional distributed capture path
-> Capture Event 0.2.0
-> Go HTTP validation and bounded queue acceptance
-> Kafka keyed by capture_id
-> Python worker with manual offset commits
-> SQLite ordering, deduplication, and trace correlation
-> sealed JSON Replay Capsule
-> the same replay/regression core
```

Primary evidence:

- Contracts: `schemas/replay-capsule-v0.schema.json`,
  `schemas/capture-event-v0.schema.json`, and
  `docs/contracts/replay-capsule-v0.md`
- Capture and sealing: `capture.py`, `canonical.py`, `sealing.py`,
  `validation.py`, and `capture_events.py`
- Replay and regression: `dependencies.py`, `network.py`, `replay.py`,
  `regression.py`, and `export.py`
- Distributed delivery: Go `httpapi`, `events`, and `publisher` packages plus
  `kafka_worker.py`, `assembly.py`, and `kafka_runtime.py`
- Observability: Go/Python telemetry code, `metrics.py`, Collector config, and
  `docs/observability.md`
- Infrastructure: Dockerfiles, `compose.kafka.yml`, Kustomize manifests,
  Terraform modules/environment, ADR-0005, and ADR-0006
- Executed evidence: `docs/verification-ledger.md`

## Capture Contracts

Capture Event `0.2.0` is a strict Draft 2020-12 JSON envelope with:

- `event_id`, `capture_id`, and a positive per-capture `sequence`;
- one of `capture_started`, `dependency_recorded`, `observation_recorded`,
  `capture_completed`, or `capture_failed`;
- `occurred_at`, producer name/version, and arbitrary JSON payload;
- unknown top-level fields rejected by the schema.

Replay Capsule `0.1.0` is a separate immutable evidence contract. It records
capture provenance, subject revision/framework/language, invocation input,
ordered model or HTTP dependencies, original events/output/error, redaction
actions, request fingerprints, and a capsule digest. Exact version constants are
enforced; unsupported versions fail. There is no compatibility migration layer
that silently reinterprets either contract.

The capsule is sealed with RFC 8785 canonical JSON and SHA-256. Each dependency
request receives its own SHA-256 fingerprint. Validation checks structure,
contiguous ordering, unique identifiers, observation consistency, fingerprints,
and whole-capsule integrity without repairing the supplied evidence.

## Gateway and Kafka Semantics

`POST /v1/capture-events` synchronously performs:

- prohibited header/query checks;
- media-type and one-megabyte body bounds;
- JSON parsing, strict schema validation, and a known-secret string scan;
- a Kafka readiness `Ping` bounded to 500 ms; and
- non-blocking insertion into a configurable in-memory Go channel.

Only Kafka production happens after the request path. `202 Accepted` means that
the validated event entered the local queue; it does not mean Kafka acknowledged
the record or a capsule was sealed. Queue full returns `429`; broker unready
returns `503`. Later delivery failure is counted through a callback and cannot
revoke an already returned `202`.

The Go gateway uses `franz-go`, topic `traceforge.capture.v1`, and `capture_id`
as the record key. No explicit transactional or exactly-once producer contract
exists. The Python worker uses `confluent-kafka`, disables auto commit, starts at
the earliest offset, processes one message through durable assembly, and commits
synchronously only after persistence or confirmed DLQ delivery. A failed DLQ
publish leaves the source offset uncommitted. The supported characterization is
at-least-once transport with application-level idempotency.

## Idempotency and Storage

`SQLiteAssemblyState` owns two local tables:

- `events`: `event_id` primary key, unique `(capture_id, sequence)`, canonical
  event body;
- `captures`: last sequence, completion flag, capsule path, and optional capture
  trace/span correlation.

A repeated `event_id` with byte-equivalent canonical content returns a duplicate
result. Reusing the ID with different content fails. Sequence gaps and reopening
a completed capture fail. State survives process reopen in the tested SQLite
path. The worker remains a single writer; concurrent duplicate races and a
distributed store are not proven. This is durable idempotent event handling,
not exactly-once distributed processing.

Completed streams are assembled, validated, sealed, and written as JSON Replay
Capsules. The local dashboard has a separate SQLite replay-history store.
PostgreSQL, trace/span tables, hosted search, and database-backed replay loading
do not exist.

## Exact Replay and Frozen Boundaries

Exact replay means all of the following for tested adapters:

1. Validate capsule schema, semantics, request fingerprints, and integrity.
2. Invoke a trusted local runner with the sanitized invocation input.
3. Match every model or HTTP dependency by sequence, kind, operation, and
   fingerprint of the sanitized request.
4. Return the recorded success or error outcome without invoking that live
   dependency.
5. Block common Python socket connection and DNS entry points process-wide.
6. Fail on a missing, unexpected, reordered, or mismatched dependency, or when
   any recorded fixture remains unused.
7. Compare the original and replay observations after removing named diagnostic
   timestamp/duration fields.

Model fixtures store model name, payload, and returned/error outcome. HTTP
fixtures store method, URL, safe headers, body, and returned/error outcome. The
HTTP contract can represent tool-like external calls, and the controlled tool
safety example exercises argument matching. There is no generic tool schema,
side-effect policy, arbitrary SDK interception, environment capture, time/random
freezing, or OS sandbox.

The network guard patches common Python socket entry points. It reduces
accidental live access but is process-wide and cannot constrain arbitrary native
code or other side effects. Replay determinism is therefore fixture-scoped, not
deterministic reproduction of any arbitrary agent execution.

## LangGraph, Fixtures, Diffing, and Regression

LangGraph support is one bounded weather adapter. It constructs a single-node
graph, captures controlled model and HTTP dependencies, and replays them through
the same dependency adapter. It does not generically hook callbacks, capture
arbitrary graph state, or claim framework-wide support.

Fixtures can be created by `CaptureSession`, by assembling a capture-event
stream, or retained as reviewed controlled JSON examples. The repository ships
weather, RAG citation-grounding, and consequential tool-argument cases. Fixture
completeness and safe sharing still require human review.

Original-versus-replay comparison is deterministic structural equality after
recursively removing five diagnostic keys. The result exposes both observations
and a boolean. It is not semantic evaluation or a graph/message diff.

Regression evaluation is synchronous and supports developer-authored `equals`
or `contains` assertions over dotted observation paths. `export_pytest` emits an
executable offline test referencing a reviewed capsule, runner, and regression
specification. There is no asynchronous evaluator worker, scoring pipeline, or
automatic acceptance of AI-generated assertions.

## Failure-Path Evidence

Verified tests cover:

- malformed/multiple JSON values, schema errors, unknown fields, body/media
  bounds, known secret material, and payload-free logs;
- gateway unready, full queue, publisher recovery, asynchronous delivery-failure
  metrics, and bounded publisher shutdown;
- duplicate redelivery across SQLite reopen, conflicting duplicates, sequence
  gaps, completed-capture reopening, confirmed-DLQ commit, and failed-DLQ
  no-commit;
- missing, extra, reordered, and request-mismatched replay fixtures; recorded
  dependency errors; tampered requests/integrity; blocked network access;
  behavioral regression failure; and unchanged original evidence.

The repository does not prove sustained broker outage recovery, consumer
rebalance behavior, multi-partition ordering, concurrent duplicate processing,
storage-failure recovery, complete shutdown draining, or DLQ redrive. These are
roadmap items or current limitations.

## OpenTelemetry and Metrics

TraceForge uses native OpenTelemetry SDKs in Go and Python. Go's HTTP
instrumentation extracts W3C `traceparent`/`tracestate`, creates receive,
validate, and publish spans, and injects context into Kafka headers. The worker
extracts that context and creates consume/assemble/seal descendants. Replay
starts a new trace with an optional Span Link to capture correlation stored in
SQLite. Telemetry does not enter capsule integrity and can fail independently.

This is TraceForge's own optional instrumentation, not an OTLP-compatible
capture-event API. Baggage propagation and generic OTLP trace ingestion are not
implemented by the gateway.

Prometheus metrics cover gateway requests/accepted/rejected/queue-full/delivery
failures/HTTP duration and worker consumed/duplicate/DLQ/sealed/processing
duration plus replay success/failure. Kafka consumer lag, end-to-end latency,
throughput rates, dashboards, alerting, and SLOs are absent. No numeric
performance result has been established.

## Docker, Kubernetes, and Terraform

The Python dashboard/worker and Go gateway have multi-stage non-root Docker
images with health checks. Compose runs one local Kafka broker, worker, API,
gateway, and optional Collector on loopback ports. The ledger records a bounded
real HTTP-to-Kafka-to-capsule-to-replay smoke; it is not a production topology.

Native Kustomize manifests deploy those same five workloads to one local ARM64
kind cluster. Manifests include probes, requests/limits, non-root identities,
dropped capabilities, RuntimeDefault seccomp, read-only roots where supported,
dedicated token-less ServiceAccounts, and one RWO PVC. The worker is one replica
with `Recreate`; Kafka is single-node and ephemeral. The ledger records one
passing local deployment, pod replacement, capsule persistence, and cleanup.

Terraform is implemented and verified only for a narrow local kind foundation:
the Namespace, ResourceQuota, LimitRange, five ServiceAccounts, labels, and
outputs. Kustomize owns all workloads and application data. The provider is
pinned, native mock tests exist, and the ledger records local plan/apply/state,
zero drift, controlled label drift/reconciliation, and destroy. State is local,
ignored, unencrypted, unlocked, and unbacked-up. Terraform creates no cluster,
cloud resource, workload, secret, or production infrastructure.

## Security and Isolation

There is no API-key authentication, credential store, authorization middleware,
tenant/project boundary, or database access filter. The dashboard and local OTLP
endpoint are unauthenticated. “API-key isolation” is unsupported wording.

Implemented controls are narrower: best-effort redaction; rejection of known
secret-bearing headers, query keys, and payload strings; safe HTTP header
allowlisting; payload-free telemetry; loopback-only local access; non-root
containers; disabled ServiceAccount token automount; and public-history secret
scans. Captured prompts, responses, tool arguments, outputs, errors, and user
text remain sensitive. Human review is required before sharing a fixture.

## Test and CI Evidence

The final release ledger records 103 passing Python tests. Source inspection
groups them across capsule validation, capture/redaction, replay, regression and
export, three controlled cases, LangGraph, dashboard boundaries, Kafka
publisher/assembly/DLQ, observability, Kubernetes assets, and Terraform destroy
guards.

The Go tree contains tests across configuration, shared schema validation, HTTP
handling, publisher behavior, and telemetry. `go test ./...` passed during this
audit. The release ledger additionally records Go vet, race tests, and 82.1%
descriptive statement coverage.

GitHub Actions runs Python format/lint/tests/compile, Go format/vet/tests/race/
coverage, Terraform validation/mock tests, Kustomize/ownership checks, Markdown
links, package build, clean-wheel CLI validation, and replay. It does not run the
Compose stack, kind, Terraform apply, a load test, cloud deployment, or CD.

## Claim Matrix

| Claim                       | Evidence                                      | Status                        | Safe public wording                                                                                                                                         |
| --------------------------- | --------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Non-blocking ingestion      | Go HTTP API and publisher                     | PARTIALLY VERIFIED            | After synchronous validation and a bounded broker readiness check, accepted events enter a non-blocking bounded queue; `202` is not broker acknowledgement. |
| Kafka delivery              | Go publisher, Python worker, smoke ledger     | VERIFIED IMPLEMENTED / TESTED | Optional local at-least-once Kafka delivery keyed by capture ID, with manual consumer commits and a DLQ commit-safety boundary.                             |
| Idempotency                 | `assembly.py`, assembly tests, smoke ledger   | VERIFIED IMPLEMENTED / TESTED | SQLite event-ID deduplication makes repeated equivalent deliveries idempotent for the single-writer assembly path; no exactly-once claim.                   |
| Capture versioning          | two schemas and validators                    | VERIFIED IMPLEMENTED          | Capture Event `0.2.0` and Replay Capsule `0.1.0` are separate strict versioned contracts; unsupported versions fail.                                        |
| OpenTelemetry compatibility | native Go/Python SDK code and smoke ledger    | VERIFIED IMPLEMENTED / TESTED | Optional native OpenTelemetry instrumentation propagates W3C context across HTTP/Kafka and links later replay as a separate trace.                          |
| PostgreSQL persistence      | no source evidence                            | UNVERIFIED                    | Remove. Storage is local SQLite operational state plus sealed JSON capsules.                                                                                |
| Deterministic replay        | replay/dependency/network code and tests      | VERIFIED IMPLEMENTED / TESTED | Exact offline replay deterministically consumes complete recorded model/HTTP fixtures for tested local runners and fails closed on mismatch.                |
| LLM freezing                | capsule schema, capture and replay tests      | VERIFIED IMPLEMENTED / TESTED | Recorded model requests and outcomes are matched and replayed sequentially without a live model call.                                                       |
| Tool freezing               | HTTP dependency contract and tool-safety case | PARTIALLY VERIFIED            | Recorded HTTP/tool-like outcomes can be replayed with argument fingerprint checks; a generic tool contract is planned.                                      |
| Replay fixtures             | controlled examples, capture/assembly code    | VERIFIED IMPLEMENTED / TESTED | Reviewed controlled capsules can be produced through explicit capture or event assembly and replayed offline.                                               |
| Replay diffing              | `replay.py`                                   | PARTIALLY VERIFIED            | Reports normalized structural equality and both observations; richer semantic/graph/tool diffing is planned.                                                |
| Regression testing          | `regression.py`, `export.py`, tests and CI    | VERIFIED IMPLEMENTED / TESTED | Developer-authored assertions run synchronously and can be exported as executable offline pytest regressions.                                               |
| Asynchronous evaluators     | no service or queue                           | UNVERIFIED                    | Remove; no asynchronous evaluator exists.                                                                                                                   |
| API-key isolation           | no auth/tenant implementation                 | UNVERIFIED                    | Remove; only best-effort secret rejection/redaction exists.                                                                                                 |
| Observability               | metrics and OTel code                         | VERIFIED IMPLEMENTED / TESTED | Bounded local gateway/worker/replay metrics and optional traces exist; lag, throughput, SLOs, and measured performance do not.                              |
| Docker                      | three Dockerfiles, Compose, ledger            | VERIFIED IMPLEMENTED / TESTED | Non-root local images and a bounded Compose path have local verification.                                                                                   |
| Kubernetes                  | Kustomize assets, ADR/runbook, ledger         | VERIFIED IMPLEMENTED / TESTED | The five-workload stack ran on one local ARM64 kind cluster; no cloud, HA, scale, or production claim.                                                      |
| Terraform                   | module/environment/tests/ledger               | VERIFIED IMPLEMENTED / TESTED | Terraform manages and locally verified a narrow kind foundation; it does not manage workloads, create a cluster, or target cloud infrastructure.            |
| Performance/scale           | no benchmark harness/results                  | UNVERIFIED                    | Publish no throughput, latency, capacity, reliability, or scale number.                                                                                     |

## Required Public Corrections

- Center the story on immutable Replay Capsules and exact offline replay, not a
  generic distributed tracing platform.
- Replace PostgreSQL with SQLite and sealed JSON evidence.
- Remove API-key isolation, asynchronous evaluators, consumer lag, throughput,
  and latency observability claims.
- Define `202`, at-least-once transport, and event-ID idempotency separately.
- Limit tool freezing to the implemented HTTP dependency contract and controlled
  tool-safety case.
- Describe comparison as normalized structural equality, not semantic diffing.
- Describe Kubernetes and Terraform as implemented, locally verified,
  deliberately bounded development infrastructure.
- Keep generic capture, generic tools, fork replay, richer diffs, pipeline
  reliability, benchmarks, authentication, cloud, and production deployment in
  explicit roadmap/limitation language.
