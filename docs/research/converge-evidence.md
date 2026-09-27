# Converge Evidence Audit

## Audit Metadata

- Repository: `https://github.com/rit2001/converge`
- Local source: `/Users/ritwikbiswas/Desktop/full_stack_project/converge`
- Audited branch: `main`
- Audited commit: `966525daa9f9bea479c7f9d28d2cf3dcd9f735f2`
- Release tag inspected: annotated `v1.0.0` at the audited commit
- Audit date: 2026-09-27
- Repository state: clean and synchronized with `origin/main`

The audit inspected the protocol and canvas packages, PostgreSQL migrations and
repositories, API and worker services, web synchronization code, unit,
integration, failure-injection, Playwright, and k6 evidence, architecture and
decision records, CI, release records, and deployment documentation. It did not
inspect environment-secret files, mutate the repository, deploy the system, or
rerun the release gate. Test and performance counts below are the repository's
committed release evidence at the audited commit.

Some release prose still says that a tag had not been created. Git history is
the stronger repository fact: the audited commit is the annotated `v1.0.0` tag.
The public portfolio nevertheless retains **In Development** because Converge
continues to evolve and the evidence does not establish commercial production
use, horizontal production scale, or operational disaster recovery.

## Executive Assessment

Converge is a PostgreSQL-authoritative collaborative canvas. A client persists
a stable command identity in IndexedDB before applying an optimistic overlay.
The API reauthorizes the actor inside a PostgreSQL transaction, serializes one
board with an advisory transaction lock, applies a shared reducer, and commits
the operation, projection changes, receipt, board heads, undo evidence, and
outbox record together. A worker then publishes the outbox event to a Redis
Stream. Every API replica reads the stream independently, suppresses duplicate
evidence, detects gaps, and can recover missing durable operations from
PostgreSQL.

The strongest public story is therefore not a list of drawing features. It is
the relationship between board-local order, atomic authority, retry-safe
commands, persist-before-optimism, fixed-watermark synchronization, verified
snapshot/tail recovery, and failure-tested at-least-once delivery.

## Verified Architecture

```text
React / Konva client
-> board-scoped IndexedDB pending-command queue
-> Fastify + Socket.IO API
-> PostgreSQL board lock, reducer, transaction, receipt, and outbox
-> worker claims the board-local outbox head
-> Redis Stream retained event delivery
-> every API replica consumes and emits to its local sockets
-> clients apply contiguous operations or recover from PostgreSQL
```

PostgreSQL is authoritative for boards and membership, ordered operations and
projections, receipts, undo/redo history evidence, canvas and delivery heads,
the transactional outbox, verified snapshots, and compaction floors. Redis is
an accelerant for operation delivery and a separate ephemeral presence
transport. It is not the durable board store.

Primary evidence locations:

- Protocol and reducer: `packages/protocol/src/index.ts` and
  `packages/canvas-engine/src/index.ts`
- Authority and transactions: `packages/database/src/`, especially the board
  operation, outbox, snapshot, recovery, compaction, and undo repositories
- Durable schema: `packages/database/migrations/0001` through `0020`
- API synchronization: `apps/api/src/app.ts`,
  `apps/api/src/board-recovery-service.ts`, and
  `apps/api/src/redis-delivery-transport.ts`
- Worker: `apps/worker/src/redis-stream.ts`, `snapshot-coordinator.ts`, and
  `compaction-coordinator.ts`
- Client synchronization: `apps/web/src/` synchronization, transport, board,
  pending-command, and reconciliation modules
- Design records: ADR-001, ADR-002, ADR-003, ADR-005, ADR-006, and ADR-009
- Executed evidence: `docs/releases/v1.0.0.md`,
  `docs/releases/v1-production-acceptance-audit.md`, and
  `docs/failure-recovery/milestone-2-matrix.md`

## Authority, Ordering, and Atomic Commit

The API obtains `pg_advisory_xact_lock(hashtextextended(boardId, 0))` inside the
same transaction that locks the board row, rechecks membership, allocates
`last_seq + 1` and `last_delivery_seq + 1`, applies the reducer, and writes the
result. The supported guarantee is a strict monotonic total order **per board**.
It is not a global order across boards. The transaction lock releases
automatically on commit or rollback, allowing unrelated boards to progress but
making one hot board a deliberate serialization point.

For an accepted command, one PostgreSQL transaction writes:

- the ordered board operation;
- every affected projection row in the reducer write set;
- applicable actor-scoped undo/redo history evidence;
- the board canvas and delivery heads;
- one transactional outbox event; and
- one immutable operation receipt.

A failure rolls those writes back together. Atomic change sets extend this to a
bounded group of object mutations represented by one operation and sequence.
The safe invariant is: **a successful accepted command cannot exist without its
authoritative projection, receipt, head updates, and outbox evidence.**

## Idempotency and Reducer Determinism

The application idempotency key is `(board_id, operation_id)`. A duplicate is
accepted only when the actor and normalized JSON command match the immutable
receipt; it returns the stored result without allocating another sequence or
outbox event. Reuse for different intent or another actor fails with an
idempotency conflict. Receipts survive operation and outbox compaction. This is
retry-safe application behavior, not exactly-once distributed delivery.

The shared canvas reducer consumes a versioned command and the next authoritative
sequence. Identical ordered operation streams produce identical state. Canonical
state serialization filters the authoritative visible projection, preserves its
defined order, recursively sorts object keys, removes undefined values, and
normalizes negative zero before SHA-256. The digest is a consistency and
recovery check, not an authentication or cryptographic-trust mechanism.

## Redis Delivery and Multiple API Replicas

The worker publishes committed outbox evidence with `XADD` to a retained Redis
Stream. Each API replica uses plain `XREAD`, not a consumer group, so every
replica receives the entries it needs for its own local Socket.IO rooms. Stable
event IDs and board delivery sequences make duplicate suppression and gap
detection explicit.

Delivery is at least once. Duplicate entries are expected; Redis may be
temporarily unavailable; the stream is bounded and trimmable; and returning
from a local socket emit is not a client acknowledgement. A per-board cursor
applies only the next delivery sequence. A duplicate is ignored, while a gap
fails closed for that board and triggers PostgreSQL-backed catch-up. Redis does
not establish authority or durable exactly-once delivery.

The design and failure suite exercise two independent API replicas, Redis
delivery to both replicas, a stopped/restarted API, duplicate evidence, gaps,
and revocation propagation. The production record starts one API and one worker.
Horizontal production scale, high availability, and a capacity ceiling are not
established; additional Socket.IO replicas also require session affinity or a
compatible WebSocket policy.

## Offline Persistence, Reconnect, and Catch-Up

The web client writes each board-scoped command—with its stable operation
identity—to IndexedDB before adding the optimistic overlay. The ordered queue
survives a browser reload in the same browser profile and device. It retries
with backoff after reconnect, and the server receipt makes resubmission safe.
The client removes pending evidence only after commitment is established.

This is durable offline intent, not offline commit or cross-device queue sync.
The server may still reject a command after reconnection because authority,
membership, and current state are checked at commit time.

Every board session and synchronization attempt carries a monotonically
increasing generation and nonce. Reconnect invalidates the prior generation;
late callbacks, responses, sockets, and retry timers from an older attempt
cannot mutate the replacement session. This fence prevents stale asynchronous
work from corrupting the current board state.

Join captures a fixed authoritative board watermark. Range catch-up requests
are bounded by that watermark while newer live operations buffer separately.
The client applies a contiguous prefix through the watermark, then drains the
sorted, deduplicated live buffer and becomes ready. This prevents the join
target from moving forever and closes the catch-up/live-event race.

## Snapshot, Operation Tail, and Compaction

Recovery runs under the board lock, captures a fixed head, loads a verified
snapshot at or above retained-history floors, loads a contiguous operation tail
through that head, applies the shared reducer, and compares the rebuilt
canonical state with the authoritative projection. The client verifies the
material, atomically rebases committed state, and reapplies still-pending local
commands under the current session fence. Incomplete or inconsistent material
returns a recovery-blocked result rather than an unverified fallback.

This supports state reconstruction and failure recovery. It is not a user-facing
version-history browser or arbitrary historical restore mechanism.

Compaction is implemented and tested around a verified snapshot, published
outbox evidence, immutable receipts, and coupled operation/delivery floors.
Covered operation and outbox history is deleted only after safety conditions;
receipts remain. Production configuration records compaction as disabled until
backup/restore operations satisfy the required gate, so it must not be presented
as active production maintenance.

## Presence, Authorization, and Revocation

Presence is an explicitly lossy subsystem. Cursor, selection, activity, and
session data use Redis Pub/Sub plus expiring per-session keys and an expiry
index. Sessions heartbeat every 15 seconds and have a 45-second TTL; snapshots
are capped at 100 sessions. Leave and expiry publish revisioned tombstones so an
older update cannot resurrect stale presence. Presence failure does not remove
durable edit readiness or change board authority.

Clerk supplies the authenticated external identity. PostgreSQL membership with
owner, editor, or viewer roles is authoritative. Reads and writes derive a
server principal; every write reauthorizes inside the database transaction.
Viewer mutations are rejected. Membership removal takes the board lock,
advances delivery order, removes the membership, and emits a content-free
outbox event. API replicas consume the ordered revocation and evict matching
local sockets. The implementation supports board membership isolation; it is
not evidence for a generalized multi-tenant platform or public/invite links.

## Conflict Handling, Undo/Redo, and Product Surface

Each object records field sequence evidence. Direct stale-edit rejection is
narrow: text updates may supply `expectedTextSeq`, and transforms can continue
without overwriting newer text. Delete wins over later stale updates. Undo and
redo use field/object sequence preconditions to refuse stale inversions. This is
not a general-purpose conflict-free replicated data type or universal field
merge system.

Undo and redo create new authoritative forward operations. History is bounded
and actor-scoped. The server reauthorizes and checks current object/field state
under the board lock; an invalidated inverse fails atomically. Supported
multi-object changes remain all or none. This is collaborative-safe for the
implemented operations and preconditions, not arbitrary historical restore.

The product supports bound connectors, freehand strokes, multiple selection,
copy/paste, styling, frames, and architecture presets. The current component
registry contains **39 architecture presets** built from 12 visual primitives.
The operation log, recovery snapshots, and bounded undo history do not amount to
a complete user-visible version-history experience.

## Test, Browser, Failure, and Load Evidence

Committed release evidence records:

- **245 PostgreSQL integration tests across 29 files**, run against real
  PostgreSQL and covering authority, ordering, idempotency, transactions,
  outbox behavior, recovery, snapshots, compaction, authorization, revocation,
  undo/redo, and product migrations;
- **59 failure-injection scenarios** covering multi-replica delivery,
  publication interruption, duplicate evidence, board-local ordering,
  catch-up, API restart, handler isolation, revocation, Redis reconnect,
  snapshots, recovery, compaction, and presence;
- **93 production-build Playwright Chromium scenarios** covering the product,
  collaboration, roles, revocation, reconnect, accessibility, responsive
  states, and committed visual comparisons; and
- the broader recorded workspace release gate, including unit/component tests,
  type checking, lint, formatting, builds, and package boundaries.

The Playwright evidence is Chromium-specific. It is not broad cross-browser
certification. One empty recovery placeholder in the failure tree is skipped,
so the suite is evidence for named scenarios, not every possible failure.

The committed k6 baseline is one controlled local run on 2026-08-13 with one
API, one worker, local PostgreSQL and Redis, 10 virtual editors for two minutes,
and 1,300 acknowledged commands. It recorded about **10.058 commands/s**,
**227.03 ms p99 command acknowledgement**, and **368 ms p99 matching live
delivery**. It also observed 264 valid transport duplicates with zero logical
reapplications. These figures demonstrate the harness and one bounded baseline;
they are not a production SLA, capacity limit, horizontal-scale result, or
statistically repeated benchmark.

## Local Infrastructure, CI, and Deployment Evidence

Docker Compose provisions PostgreSQL 17.6 and Redis 8.2 with health checks and
volumes for local development and testing. No application Dockerfiles were
found. Local application services run as Node processes. The stack should say
**Docker Compose**, not imply containerized application deployment.

GitHub Actions installs dependencies, checks Prometheus rules, runs type
checking, lint, formatting, unit tests, migrations, PostgreSQL integration tests,
Playwright Chromium, production builds, and a web budget. The workflow does not
run the failure suite or k6 and contains no deployment job. The safe term is
**CI**, not blanket CI/CD.

Repository deployment evidence records Vercel for the web application and
Railway for one API, one worker, private PostgreSQL, and private Redis, followed
by a human production acceptance pass. This proves a bounded deployment, not
commercial traffic, adoption, high availability, multi-region operation, or
horizontal production scale. Point-in-time recovery was enabled, but two restore
attempts failed because of the provider's temporary-volume constraint; tested
disaster recovery, RPO, and RTO remain absent.

## Claim Matrix

| Claim                             | Evidence location                                           | Status                                             | Safe public wording                                                                                                   |
| --------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Server-authoritative state        | Database repositories, API command path, ADR-001            | VERIFIED IMPLEMENTED / TESTED                      | PostgreSQL is the authority; clients maintain an optimistic overlay until acknowledgement.                            |
| Advisory-lock sequencing          | Database command transaction and ordering integration tests | VERIFIED IMPLEMENTED / TESTED                      | A transaction-scoped advisory lock establishes a strict monotonic total order per board.                              |
| Deterministic reducers            | Canvas engine and replay/hash tests                         | VERIFIED IMPLEMENTED / TESTED                      | Identical ordered operation streams produce identical canonical state for the implemented reducer.                    |
| Versioned protocols               | Protocol schemas and command versions                       | VERIFIED IMPLEMENTED / TESTED                      | Commands, operations, events, snapshots, and recovery material use explicit versions and strict parsing.              |
| Idempotent commands               | Receipt migrations/repository and duplicate tests           | VERIFIED IMPLEMENTED / TESTED                      | Stable operation IDs plus immutable receipts make exact command retries application-idempotent.                       |
| Transactional commits             | Database transaction and atomic-change-set tests            | VERIFIED IMPLEMENTED / TESTED                      | Operation, projection, receipt, heads, undo evidence, and outbox commit or roll back together.                        |
| Atomic change sets                | Migration 0012 and integration tests                        | VERIFIED IMPLEMENTED / TESTED                      | Bounded multi-object mutations share one board sequence and commit all or none.                                       |
| Redis multi-replica fan-out       | ADR-005, Redis transport, failure suite                     | VERIFIED IMPLEMENTED / TESTED                      | Every API replica reads an at-least-once retained Redis Stream and emits to local clients.                            |
| Offline persistence               | Web pending-command store and reload/reconnect tests        | VERIFIED IMPLEMENTED / TESTED                      | IndexedDB preserves stable pending command identities before optimistic projection in the same browser profile.       |
| Reconnect fencing                 | Client transport/session code and tests                     | VERIFIED IMPLEMENTED / TESTED                      | Monotonic session generations prevent stale asynchronous work from mutating a replacement session.                    |
| Fixed-watermark catch-up          | Synchronization protocol/client and tests                   | VERIFIED IMPLEMENTED / TESTED                      | Join catches up to one fixed head before draining buffered live events.                                               |
| Snapshot/tail replay              | Recovery service, snapshot repositories, integration tests  | VERIFIED IMPLEMENTED / TESTED                      | Verified snapshots plus contiguous operation tails rebuild and check authoritative state.                             |
| Canonical hashing                 | Canvas engine, snapshot code, hash tests                    | VERIFIED IMPLEMENTED / TESTED                      | SHA-256 over canonical state detects divergence during recovery; it is not an auth primitive.                         |
| Compaction                        | ADR-006, coordinator, repositories, tests                   | VERIFIED IMPLEMENTED / TESTED; PRODUCTION DISABLED | Safety-gated compaction is implemented and tested but disabled in production pending restore operations.              |
| Presence TTLs                     | Presence protocol/Redis transport/tests                     | VERIFIED IMPLEMENTED / TESTED                      | Redis-backed presence is ephemeral, revisioned, capped, and expires after 45 seconds.                                 |
| Role-based revocation             | Membership migration/API/failure tests                      | VERIFIED IMPLEMENTED / TESTED                      | Ordered membership removal reauthorizes writes and evicts the revoked user's active local sockets on each replica.    |
| Field-sequenced conflict handling | Protocol/reducer/undo tests                                 | PARTIALLY VERIFIED                                 | Text stale-edit checks and undo preconditions use field sequence evidence; no general merge algorithm is claimed.     |
| Collaborative undo/redo           | ADR-009, migration 0016, integration/E2E tests              | VERIFIED IMPLEMENTED / TESTED                      | Supported actor-scoped inverses become new authoritative operations and fail atomically when preconditions are stale. |
| Version history                   | Operation log, snapshots, undo history                      | PARTIALLY VERIFIED                                 | Internal recovery/history evidence exists; a user-facing version browser and arbitrary restore do not.                |
| System component count            | Architecture preset registry and tests                      | VERIFIED IMPLEMENTED                               | The component library contains 39 architecture presets built from 12 primitives.                                      |
| PostgreSQL test count             | v1 release verification                                     | VERIFIED TESTED                                    | The recorded release gate passed 245 PostgreSQL integration tests across 29 files.                                    |
| Playwright                        | Playwright tree, snapshots, release verification            | VERIFIED TESTED                                    | The recorded release gate passed 93 production-build Chromium scenarios.                                              |
| k6                                | Committed 2026-08-13 artifact and methodology               | VERIFIED MEASURED, BOUNDED                         | One 10-editor, two-minute local baseline recorded 1,300 commands and explicit p99 values.                             |
| Multi-replica failure testing     | `tests/failure/` and release verification                   | VERIFIED TESTED                                    | 59 named scenarios exercise two-API delivery, interruption, recovery, revocation, and presence boundaries.            |
| Docker                            | `compose.yaml`                                              | NARROW                                             | Docker Compose provides local PostgreSQL and Redis; application container images are not evidenced.                   |
| CI/CD                             | `.github/workflows/ci.yml`, deployment docs                 | NARROW                                             | CI validates code, PostgreSQL, browser behavior, builds, and budgets; deployment automation is not in the workflow.   |
| Horizontal scalability            | Multi-replica design/tests and production topology          | PARTIALLY VERIFIED                                 | The design supports and tests multiple API replicas locally; production currently records one API and one worker.     |

## Reconciliation Decisions

### Keep

- server-authoritative PostgreSQL state;
- board-local advisory-lock sequencing;
- deterministic reducer and canonical hashing;
- versioned protocols and retry-safe commands;
- atomic operation/projection/receipt/outbox transactions;
- Redis-backed multi-replica delivery, qualified as at least once;
- IndexedDB persistence-before-optimism;
- generation-fenced reconnect and fixed-watermark catch-up;
- verified snapshot plus operation-tail recovery;
- ephemeral presence, role-based revocation, and supported collaborative
  undo/redo;
- Playwright, k6, and named failure-suite evidence.

### Correct

- `190+ PostgreSQL integration tests` to the recorded **245 across 29 files**;
- `25+ system-design components` to **39 architecture presets built from 12
  primitives**;
- `Docker` to **Docker Compose** for local PostgreSQL/Redis dependencies;
- `CI/CD` to **CI**, with deployment evidence described separately.

### Narrow

- `horizontally scalable` to a multi-replica-aware design tested with two local
  API replicas; production horizontal scale is not claimed;
- `field-sequenced conflict detection` to text-specific stale-edit rejection
  and field-sequence preconditions for undo/redo;
- `collaborative-safe undo/redo` to supported actor-scoped inverses with
  authoritative precondition checks;
- `compaction` to implemented/tested but production-disabled;
- `version history` to internal operation, undo, snapshot, and recovery evidence;
- performance figures to one controlled local baseline.

### Remove or Exclude

- global ordering;
- exactly-once delivery or processing;
- Redis as durable authority;
- arbitrary conflict-free merge semantics;
- complete historical version browsing or restore;
- application Docker images;
- deployment automation in GitHub Actions;
- high availability, multi-region operation, production horizontal scale,
  adoption, revenue, customer usage, or a production SLA;
- tested backup restore, RPO, or RTO.

## Current Limitations

- One active board is serialized by design, so advisory-lock contention makes a
  hot board a single-writer bottleneck.
- Redis delivery is at least once and bounded; durable recovery depends on
  PostgreSQL, not Redis.
- Offline commands can be rejected after reconnect and are durable only within
  the same browser profile/device.
- The conflict model is not a CRDT and does not automatically merge arbitrary
  concurrent field edits.
- Compaction is disabled in the recorded production configuration.
- The production record contains one API and one worker, not horizontal or
  high-availability evidence.
- The committed k6 run is a single local baseline with 10 editors, not a
  capacity study.
- Playwright evidence is Chromium-specific.
- Point-in-time recovery is enabled, but a restore has not been demonstrated;
  RPO and RTO are unknown.
- No commercial traffic, customer adoption, multi-region behavior, or broad
  operational monitoring evidence is established.
