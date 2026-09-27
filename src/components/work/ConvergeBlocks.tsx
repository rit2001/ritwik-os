import {
  EvidenceTable,
  FailureModeMatrix,
  InvariantCallout,
  SystemFlow,
  TradeoffDecision,
} from "./EvidencePrimitives";

const authoritySteps = [
  {
    label: "Persist",
    name: "IndexedDB command",
    description: "Stable operation identity is durable before optimism.",
  },
  {
    label: "Authorize",
    name: "Fastify + Socket.IO",
    description: "The server derives the actor and validates the command.",
  },
  {
    label: "Order",
    name: "PostgreSQL transaction",
    description: "One board lock allocates its next authoritative sequence.",
  },
  {
    label: "Publish",
    name: "Outbox + Redis Stream",
    description: "A worker delivers committed evidence at least once.",
  },
  {
    label: "Converge",
    name: "Replicas and clients",
    description: "Contiguous events apply; gaps recover from PostgreSQL.",
  },
] as const;

const recoverySteps = [
  {
    label: "Fence",
    name: "New session generation",
    description: "Late work from an older connection loses authority.",
  },
  {
    label: "Bound",
    name: "Fixed board watermark",
    description: "Catch-up targets one captured authoritative head.",
  },
  {
    label: "Rebuild",
    name: "Snapshot + operation tail",
    description: "Verified material reconstructs committed state.",
  },
  {
    label: "Verify",
    name: "Canonical SHA-256",
    description: "Rebuilt state must match the authoritative projection.",
  },
  {
    label: "Resume",
    name: "Pending overlay",
    description: "Durable uncommitted commands are reapplied and retried.",
  },
] as const;

export function ConvergeAuthorityFlow() {
  return (
    <SystemFlow
      label="Authoritative command path"
      note="PostgreSQL acknowledgement establishes commitment. Redis and Socket.IO accelerate delivery but do not replace database authority."
      steps={authoritySteps}
    />
  );
}

export function ConvergeRecoveryFlow() {
  return (
    <SystemFlow
      label="Bounded reconnect and recovery"
      note="Recovery fails closed when the snapshot, operation tail, sequence continuity, or canonical state check cannot be verified."
      steps={recoverySteps}
    />
  );
}

export function AuthorityInvariant() {
  return (
    <InvariantCallout title="Commit is one authority transition">
      A successful accepted command cannot exist without its ordered operation,
      authoritative projection, immutable receipt, board-head updates,
      applicable undo evidence, and transactional outbox record. PostgreSQL
      commits or rolls them back together.
    </InvariantCallout>
  );
}

export function ConsistencyEvidence() {
  return (
    <EvidenceTable
      caption="Consistency model"
      rows={[
        {
          label: "Authority",
          value:
            "PostgreSQL owns membership, ordered operations, projections, receipts, board heads, outbox evidence, snapshots, and recovery floors.",
        },
        {
          label: "Ordering scope",
          value:
            "A transaction-scoped advisory lock and locked board row allocate one strict monotonic total order per board—not globally.",
        },
        {
          label: "Client state",
          value:
            "Committed state is separate from a local optimistic overlay; a server acknowledgement establishes authority.",
        },
        {
          label: "Reducer contract",
          value:
            "The shared versioned reducer requires a contiguous sequence, so an identical ordered operation stream yields identical implemented state.",
        },
        {
          label: "Failure boundary",
          value:
            "One hot board is deliberately serialized. Unrelated boards can proceed independently.",
        },
      ]}
    />
  );
}

export function CommandEvidence() {
  return (
    <EvidenceTable
      caption="Command and transaction contract"
      rows={[
        {
          label: "Operation identity",
          value:
            "The client creates a stable operation ID before submission and preserves it across retry and reconnect.",
        },
        {
          label: "Idempotency key",
          value:
            "(board_id, operation_id) resolves to an immutable receipt containing the normalized command, actor, and original result.",
        },
        {
          label: "Equivalent retry",
          value:
            "The server returns the stored result without allocating a sequence or publishing another outbox event.",
        },
        {
          label: "Conflicting reuse",
          value:
            "A different actor or normalized command under the same operation ID fails with an idempotency conflict.",
        },
        {
          label: "Atomic change set",
          value:
            "A bounded multi-object command shares one authoritative sequence; every projection write commits or every write rolls back.",
        },
      ]}
    />
  );
}

export function RedisEvidence() {
  return (
    <EvidenceTable
      caption="Redis delivery semantics"
      rows={[
        {
          label: "Mechanism",
          value:
            "The worker XADDs committed outbox events to a retained Redis Stream; each API replica independently reads it with XREAD.",
        },
        {
          label: "Delivery",
          value:
            "At least once. Stable event IDs and per-board delivery sequences make duplicates and gaps explicit.",
        },
        {
          label: "Duplicate",
          value:
            "An event at or behind the replica's board cursor is ignored rather than applied twice.",
        },
        {
          label: "Gap",
          value:
            "The replica fails closed for that board and uses PostgreSQL-backed range catch-up before continuing.",
        },
        {
          label: "Non-guarantee",
          value:
            "Redis is not the source of truth, an XREAD consumer is not a client acknowledgement, and no exactly-once contract is claimed.",
        },
      ]}
    />
  );
}

export function DeliveryTradeoff() {
  return (
    <TradeoffDecision
      constraint="Clients and replicas must tolerate duplicates, detect sequence gaps, and recover durable evidence from PostgreSQL."
      decision="Commit authority to PostgreSQL first, then publish through a transactional outbox and an at-least-once Redis Stream."
      downside="Realtime delivery may be delayed, duplicated, interrupted, or trimmed independently of the database commit."
      why="The edit remains durable even when the worker, Redis, an API replica, or a socket delivery path fails after commit."
    />
  );
}

export function OfflineEvidence() {
  return (
    <EvidenceTable
      caption="Offline and reconnect boundary"
      rows={[
        {
          label: "Persistence before optimism",
          value:
            "A board-scoped command is written to IndexedDB before it enters the optimistic projection.",
        },
        {
          label: "Survival scope",
          value:
            "Pending intent survives reload and reconnect in the same browser profile and device; it is not cross-device state.",
        },
        {
          label: "Retry",
          value:
            "The ordered queue keeps the same operation ID, retries with backoff, and relies on server receipts to prevent logical reapplication.",
        },
        {
          label: "Generation fence",
          value:
            "A new monotonically increasing session generation invalidates late callbacks, sockets, responses, and retry timers from older attempts.",
        },
        {
          label: "Authority boundary",
          value:
            "Offline persistence does not commit a change; the server may reject it after reconnect when membership or state has changed.",
        },
      ]}
    />
  );
}

export function CatchUpEvidence() {
  return (
    <EvidenceTable
      caption="Catch-up and recovery checks"
      rows={[
        {
          label: "Fixed watermark",
          value:
            "Join captures one authoritative board head; range retrieval remains bounded by it while newer live events buffer.",
        },
        {
          label: "Readiness",
          value:
            "The client becomes ready only after a contiguous prefix reaches the watermark and the sorted, deduplicated live buffer drains.",
        },
        {
          label: "Recovery material",
          value:
            "A verified versioned snapshot and contiguous operation tail rebuild state through a head captured under the board lock.",
        },
        {
          label: "State verification",
          value:
            "The rebuilt canonical projection must match the authoritative SHA-256 digest before the client rebases.",
        },
        {
          label: "Failure",
          value:
            "Missing, corrupt, gapped, or divergent evidence returns recovery blocked rather than an unverified fallback.",
        },
      ]}
    />
  );
}

export function CompactionEvidence() {
  return (
    <EvidenceTable
      caption="Compaction safety boundary"
      rows={[
        {
          label: "Prerequisite",
          value:
            "A verified snapshot, published outbox coverage, coupled operation/delivery floors, and a safety delay bound deletion.",
        },
        {
          label: "Removed evidence",
          value:
            "Covered operation and outbox history can be deleted only after the safety checks pass.",
        },
        {
          label: "Retained evidence",
          value:
            "Immutable operation receipts remain for the board lifetime so a compacted command can still be retried idempotently.",
        },
        {
          label: "Current deployment",
          value:
            "The mechanism is implemented and tested, but the recorded production configuration keeps it disabled pending backup/restore operations.",
        },
      ]}
    />
  );
}

export function PresenceAuthorizationEvidence() {
  return (
    <EvidenceTable
      caption="Ephemeral presence and durable authority"
      rows={[
        {
          label: "Presence",
          value:
            "Redis Pub/Sub plus expiring session keys carries cursor, selection, activity, and revisioned leave/expiry tombstones.",
        },
        {
          label: "Expiry",
          value:
            "Sessions heartbeat every 15 seconds, expire after 45 seconds, and are capped at 100 entries per snapshot.",
        },
        {
          label: "Membership",
          value:
            "Clerk identifies the user; PostgreSQL owner/editor/viewer membership authorizes board access and mutations.",
        },
        {
          label: "Revocation",
          value:
            "Membership removal is ordered through the board transaction and emits a content-free event that evicts matching sockets on each replica.",
        },
        {
          label: "Isolation scope",
          value:
            "Writes reauthorize in-transaction, but this is board membership enforcement—not a general claim of multi-tenant platform isolation.",
        },
      ]}
    />
  );
}

export function ConflictUndoEvidence() {
  return (
    <EvidenceTable
      caption="Conflict and history semantics"
      rows={[
        {
          label: "Direct stale edit",
          value:
            "Text updates can carry expectedTextSeq; a stale text write is rejected while independent transforms need not overwrite text.",
        },
        {
          label: "Deletion",
          value: "Delete wins over later stale updates for the same object.",
        },
        {
          label: "Undo/redo",
          value:
            "Supported actor-scoped inverses become new authoritative operations after object and field preconditions pass under the lock.",
        },
        {
          label: "Concurrent invalidation",
          value:
            "A stale inverse fails atomically; multi-object undo/redo does not partially apply.",
        },
        {
          label: "Version-history limit",
          value:
            "Operation logs, recovery snapshots, and bounded undo evidence exist, but there is no complete user-facing version browser or arbitrary restore.",
        },
      ]}
    />
  );
}

export function ProductEvidence() {
  return (
    <EvidenceTable
      caption="Supporting product surface"
      rows={[
        {
          label: "Architecture library",
          value:
            "39 vendor-neutral architecture presets are composed from 12 visual primitives and retain immutable preset identity.",
        },
        {
          label: "Canvas interactions",
          value:
            "Bound connectors, freehand strokes, multi-select, copy/paste, frames, styling, snapping, and keyboard manipulation exercise the operation model.",
        },
        {
          label: "Sharing",
          value:
            "Owner, editor, and viewer roles are enforced server-side; viewer mutation attempts fail.",
        },
        {
          label: "Role in the case study",
          value:
            "These features supply realistic concurrent state transitions; they are supporting evidence rather than the primary systems claim.",
        },
      ]}
    />
  );
}

export function ConvergeTestEvidence() {
  return (
    <EvidenceTable
      caption="Recorded v1 verification evidence"
      rows={[
        {
          label: "PostgreSQL",
          value:
            "245 integration tests across 29 files against real PostgreSQL for authority, ordering, recovery, authorization, revocation, undo, and migrations.",
        },
        {
          label: "Failure injection",
          value:
            "59 scenarios exercise two API replicas, publication interruption, duplicate delivery, gaps, restart, revocation, Redis reconnect, compaction, and presence.",
        },
        {
          label: "Browser",
          value:
            "93 production-build Chromium scenarios cover product flows, collaboration, roles, reconnect, accessibility, responsive states, and visual comparisons.",
        },
        {
          label: "Scope",
          value:
            "These are committed release results, not test counts re-executed by the portfolio audit; browser evidence is Chromium-specific.",
        },
      ]}
    />
  );
}

export function ConvergeFailureEvidence() {
  return (
    <FailureModeMatrix
      caption="Named failure-path evidence"
      rows={[
        {
          trigger: "Worker publication pauses after database commit",
          expected:
            "The edit remains authoritative and the board-local outbox head can be reclaimed without overtaking.",
          evidence:
            "Outbox publisher tests cover leases, crash windows, republish, and per-board ordering.",
        },
        {
          trigger: "Redis duplicates or omits the next observed sequence",
          expected:
            "Duplicates are suppressed; a gap blocks live application and starts PostgreSQL catch-up.",
          evidence:
            "Two-replica delivery tests cover duplicate evidence, gap recovery, and handler isolation.",
        },
        {
          trigger: "An API replica restarts",
          expected:
            "The replica establishes a current cursor and recovers missing durable operations before resuming live delivery.",
          evidence:
            "Failure scenarios cover restart from the current tail and PostgreSQL range catch-up.",
        },
        {
          trigger: "Membership is revoked while sockets are active",
          expected:
            "Future authorization fails and every running replica evicts the revoked user's local sockets.",
          evidence:
            "Multi-instance revocation tests include a stopped API and later recovery.",
        },
        {
          trigger: "Snapshot or tail evidence cannot prove state",
          expected:
            "Recovery fails closed instead of serving an unchecked projection.",
          evidence:
            "Snapshot, tail continuity, canonical-hash, floor, and recovery-blocked paths are tested.",
        },
      ]}
    />
  );
}

export function PerformanceEvidence() {
  return (
    <EvidenceTable
      caption="One controlled local k6 baseline"
      rows={[
        {
          label: "Environment",
          value:
            "One local API, one worker, local PostgreSQL and Redis, k6 0.57.0, and 10 virtual editors for two minutes.",
        },
        {
          label: "Workload",
          value:
            "1,300 acknowledged commands across 130 iterations, recording about 10.058 commands per second.",
        },
        {
          label: "Latency",
          value:
            "p99 command acknowledgement was 227.03 ms; p99 matching live delivery was 368 ms.",
        },
        {
          label: "Duplicate behavior",
          value:
            "264 valid transport duplicates were suppressed with zero logical reapplications in this run.",
        },
        {
          label: "Interpretation",
          value:
            "A single-machine harness result—not a production SLA, maximum capacity, horizontal-scale result, or statistically repeated benchmark.",
        },
      ]}
    />
  );
}

export function DeploymentEvidence() {
  return (
    <EvidenceTable
      caption="Operations and deployment boundary"
      rows={[
        {
          label: "Local dependencies",
          value:
            "Docker Compose starts PostgreSQL 17.6 and Redis 8.2 with health checks and volumes; no application Dockerfiles were found.",
        },
        {
          label: "CI",
          value:
            "GitHub Actions runs static checks, unit tests, migrations, PostgreSQL integration tests, Playwright Chromium, builds, and a web budget.",
        },
        {
          label: "Deployment record",
          value:
            "Vercel serves the web application; Railway records one API, one worker, private PostgreSQL, private Redis, and a human acceptance pass.",
        },
        {
          label: "Not established",
          value:
            "No production horizontal scale, HA, multi-region operation, deployment job in GitHub Actions, customer adoption, or production SLA is claimed.",
        },
        {
          label: "Disaster recovery",
          value:
            "Point-in-time recovery is enabled, but restore attempts did not complete; tested restore, RPO, and RTO remain absent.",
        },
      ]}
    />
  );
}

export function ConvergeLimitations() {
  return (
    <EvidenceTable
      caption="Current limitations"
      rows={[
        {
          label: "Hot-board serialization",
          value:
            "One board's command path is intentionally single-writer, so advisory-lock contention can bound throughput.",
        },
        {
          label: "Offline semantics",
          value:
            "Pending commands are device-local intent and may be rejected after reconnect; arbitrary concurrent edits are not CRDT-merged.",
        },
        {
          label: "Redis",
          value:
            "Delivery is at least once and non-authoritative; loss or trimming requires PostgreSQL recovery.",
        },
        {
          label: "Production topology",
          value:
            "The recorded deployment has one API and one worker; multi-replica evidence is local and failure-oriented.",
        },
        {
          label: "Operations",
          value:
            "Compaction remains disabled, restore is unproven, and RPO/RTO, broad external monitoring, and multi-region behavior are not established.",
        },
      ]}
    />
  );
}

export function ConvergeCurrentStatus() {
  return (
    <EvidenceTable
      caption="Implemented, bounded, and next"
      rows={[
        {
          label: "Implemented and tested",
          value:
            "Board-local ordering, atomic authority, retry-safe receipts, Redis Stream delivery, IndexedDB pending intent, bounded catch-up, verified recovery, roles, and supported undo/redo.",
        },
        {
          label: "Measured",
          value:
            "One committed 10-editor local k6 baseline; it is evidence for the harness and duplicate behavior, not production scale.",
        },
        {
          label: "Deployment evidence",
          value:
            "A single API/worker Vercel-and-Railway topology passed the repository's recorded human acceptance checks.",
        },
        {
          label: "Expanding",
          value:
            "Operational restore validation, production compaction, broader monitoring, multi-browser coverage, and horizontal production topology remain future work.",
        },
      ]}
    />
  );
}
