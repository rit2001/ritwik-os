import type { ReactNode } from "react";

import {
  EvidenceTable,
  FailureModeMatrix,
  InvariantCallout,
  SystemFlow,
  TradeoffDecision,
} from "./EvidencePrimitives";

export function CaseStudyCopy({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mt-5 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary first:mt-0 [&>ol]:mt-5 [&>p:first-child]:mt-0 [&>p]:mt-5 [&>ul]:mt-5">
      {children}
    </div>
  );
}

const replaySteps = [
  {
    label: "Capture",
    name: "Sanitized execution",
    description: "Invocation, observations, and recorded dependency outcomes.",
  },
  {
    label: "Seal",
    name: "Replay Capsule",
    description:
      "Versioned JSON with request fingerprints and content integrity.",
  },
  {
    label: "Replay",
    name: "Recorded boundaries",
    description: "Sequential model/HTTP playback with no live fallback.",
  },
  {
    label: "Compare",
    name: "Normalized observation",
    description:
      "Structural equality after named diagnostic fields are removed.",
  },
  {
    label: "Regress",
    name: "Approved assertions",
    description: "Separate specifications and optional offline pytest export.",
  },
] as const;

const deliverySteps = [
  {
    label: "Validate",
    name: "Go gateway",
    description: "Bounded HTTP and Capture Event 0.2.0 checks.",
  },
  {
    label: "Accept",
    name: "Bounded queue",
    description: "A 202 confirms local enqueue, not broker delivery.",
  },
  {
    label: "Deliver",
    name: "Kafka",
    description: "At-least-once transport keyed by capture ID.",
  },
  {
    label: "Assemble",
    name: "Python + SQLite",
    description: "Ordered processing and durable event-ID deduplication.",
  },
  {
    label: "Evidence",
    name: "Sealed capsule",
    description: "Completed streams enter the replay core as immutable JSON.",
  },
] as const;

export function TraceForgeReplayFlow() {
  return (
    <SystemFlow
      label="Implemented replay-first flow"
      note="Kafka is optional transport around this core. Exact replay depends on the sealed capsule, not a running broker or telemetry service."
      steps={replaySteps}
    />
  );
}

export function TraceForgeDeliveryFlow() {
  return (
    <SystemFlow
      label="Optional distributed capture flow"
      note="Mutable capture events are transport data. They become evidence only after ordered assembly, validation, sanitization checks, and sealing."
      steps={deliverySteps}
    />
  );
}

export function CaptureContractEvidence() {
  return (
    <EvidenceTable
      caption="Versioned evidence boundaries"
      rows={[
        {
          label: "Capture Event 0.2.0",
          value:
            "Strict event envelope with event/capture IDs, positive sequence, five event types, timestamp, producer, and JSON payload.",
        },
        {
          label: "Replay Capsule 0.1.0",
          value:
            "Invocation, subject provenance, ordered model/HTTP dependencies, original observation, redaction record, and integrity metadata.",
        },
        {
          label: "Request identity",
          value:
            "SHA-256 over RFC 8785 canonical JSON for each sanitized dependency request.",
        },
        {
          label: "Evidence integrity",
          value:
            "SHA-256 over the canonical capsule with only integrity.digest omitted.",
        },
        {
          label: "Compatibility behavior",
          value:
            "Exact schema versions are required; unsupported versions and unknown owned fields fail instead of being reinterpreted.",
        },
      ]}
    />
  );
}

export function GatewayAcceptanceDecision() {
  return (
    <TradeoffDecision
      constraint="Clients must treat 202 as local queue acceptance and use downstream evidence/metrics to establish delivery or sealing."
      decision="Acknowledge after strict request validation and bounded in-memory enqueue, before Kafka delivery completes."
      downside="The request still waits for validation and a broker readiness ping; an asynchronous delivery failure can occur after 202."
      why="This moves broker publication off the HTTP response path while retaining bounded backpressure and explicit 429/503 outcomes."
    />
  );
}

export function DeliverySemanticsEvidence() {
  return (
    <EvidenceTable
      caption="Delivery and idempotency contract"
      rows={[
        {
          label: "Partition key",
          value:
            "capture_id scopes Kafka partition ordering for one capture stream.",
        },
        {
          label: "Consumer commits",
          value:
            "Auto commit is disabled; a synchronous commit follows durable processing or confirmed DLQ publication.",
        },
        {
          label: "Duplicate handling",
          value:
            "SQLite event_id primary keys accept equivalent redelivery and reject conflicting content.",
        },
        {
          label: "Sequence handling",
          value:
            "A unique capture_id/sequence pair must remain contiguous; gaps and completed-stream reopening fail.",
        },
        {
          label: "Guarantee",
          value:
            "At-least-once delivery with durable single-writer application idempotency—not exactly-once Kafka processing.",
        },
      ]}
    />
  );
}

export function ReplayInvariant() {
  return (
    <InvariantCallout title="No live fallback">
      Every recorded dependency must be consumed once, in order, with the same
      kind, operation, and sanitized-request fingerprint. Missing, unexpected,
      reordered, mismatched, or unused fixtures terminate exact replay.
    </InvariantCallout>
  );
}

export function ReplayScopeEvidence() {
  return (
    <EvidenceTable
      caption="Exact replay: guarantee and boundary"
      rows={[
        {
          label: "Validated before execution",
          value:
            "Capsule structure, semantics, request fingerprints, and whole-document integrity.",
        },
        {
          label: "Frozen today",
          value:
            "Recorded model outcomes and recorded HTTP outcomes, including returned and errored cases.",
        },
        {
          label: "Network boundary",
          value:
            "Common Python socket connect and DNS entry points are blocked process-wide during replay.",
        },
        {
          label: "Trusted execution",
          value:
            "A local MODULE:FUNCTION runner executes with the current process's authority; it is not sandboxed.",
        },
        {
          label: "Not guaranteed",
          value:
            "Capture completeness, arbitrary framework support, native-code isolation, time/random/environment freezing, or fresh-model determinism.",
        },
      ]}
    />
  );
}

export function FrozenBoundaryEvidence() {
  return (
    <EvidenceTable
      caption="Recorded nondeterministic boundaries"
      rows={[
        {
          label: "Model",
          value:
            "Model name and sanitized request payload are fingerprinted; the recorded response or error is returned sequentially.",
        },
        {
          label: "HTTP / tool-like call",
          value:
            "Method, URL, content-type, body, and recorded response/error are matched; changed consequential arguments fail closed.",
        },
        {
          label: "Internal observation",
          value:
            "Ordered application events and terminal output/error are evidence for comparison, not dependency fixtures.",
        },
        {
          label: "Generic tools",
          value:
            "No generic tool dependency contract or side-effect policy exists yet; HTTP is the implemented external-call boundary.",
        },
      ]}
    />
  );
}

export function FixtureAndLangGraphEvidence() {
  return (
    <EvidenceTable
      caption="Fixture and framework scope"
      rows={[
        {
          label: "Explicit capture",
          value:
            "CaptureSession records controlled invocation, model/HTTP outcomes, events, output, errors, and redaction actions before sealing.",
        },
        {
          label: "Distributed assembly",
          value:
            "A completed ordered Capture Event stream can be assembled into the same capsule contract.",
        },
        {
          label: "Controlled fixtures",
          value:
            "Reviewed weather, RAG citation, and tool-argument-safety capsules ship with separate regression specifications.",
        },
        {
          label: "LangGraph",
          value:
            "One controlled single-node weather adapter is implemented; generic callbacks, graph-state capture, and framework-wide support are not.",
        },
      ]}
    />
  );
}

export function ComparisonEvidence() {
  return (
    <EvidenceTable
      caption="Comparison and regression semantics"
      rows={[
        {
          label: "Replay comparison",
          value:
            "Deep structural equality after recursively removing duration_ms, recorded_at, timestamp, started_at, and finished_at.",
        },
        {
          label: "Result surface",
          value:
            "Returns both observations, a deterministic_match boolean, and the exact ignored-field list.",
        },
        {
          label: "Regression evaluator",
          value:
            "Synchronous developer-authored equals/contains assertions over dotted observation paths.",
        },
        {
          label: "Test export",
          value:
            "Generates an executable offline pytest from a reviewed capsule, trusted runner, and separate regression specification.",
        },
        {
          label: "Not implemented",
          value:
            "Semantic scoring, asynchronous evaluators, automatic assertion approval, and rich graph/message/tool diffs.",
        },
      ]}
    />
  );
}

export function StorageObservabilityEvidence() {
  return (
    <EvidenceTable
      caption="Operational state and diagnostics"
      rows={[
        {
          label: "Assembly state",
          value:
            "SQLite events and captures tables retain ordering, completion, capsule paths, and optional trace correlation.",
        },
        {
          label: "Evidence store",
          value:
            "Sealed UTF-8 JSON capsules; exact replay does not load traces or spans from PostgreSQL.",
        },
        {
          label: "Tracing",
          value:
            "Optional native OpenTelemetry spans propagate W3C context across HTTP/Kafka/Python; replay starts a linked separate trace.",
        },
        {
          label: "Metrics",
          value:
            "Bounded gateway, worker, sealing, and replay counters/histograms with no payload identifiers in labels.",
        },
        {
          label: "Absent",
          value:
            "Consumer lag, measured throughput/end-to-end latency, trace search, dashboards, alerts, and SLOs.",
        },
      ]}
    />
  );
}

export function TraceForgeFailureEvidence() {
  return (
    <FailureModeMatrix
      caption="Verified failure-path behavior"
      rows={[
        {
          trigger: "Malformed or unsafe capture",
          expected:
            "Reject before queue acceptance without logging payload secrets.",
          evidence:
            "Go schema, media/body, secret, and payload-free logging tests.",
        },
        {
          trigger: "Queue full / broker unready",
          expected:
            "Return 429 or 503; never reinterpret the event as accepted.",
          evidence: "Gateway HTTP tests and publisher outage/recovery tests.",
        },
        {
          trigger: "Duplicate or conflicting event",
          expected:
            "Equivalent event IDs are no-ops; changed content or sequence gaps fail.",
          evidence:
            "SQLite reopen, duplicate, conflict, gap, and completion tests.",
        },
        {
          trigger: "Poison Kafka record",
          expected:
            "Commit only after confirmed DLQ publication; otherwise leave offset uncommitted.",
          evidence: "Worker confirmed-DLQ and failed-DLQ unit tests.",
        },
        {
          trigger: "Replay fixture mismatch",
          expected: "Fail before live fallback or false deterministic success.",
          evidence: "Missing, extra, reordered, fingerprint, and tamper tests.",
        },
        {
          trigger: "Runner attempts network",
          expected:
            "Block common socket connection/DNS entry points during exact replay.",
          evidence: "Offline replay network-guard test.",
        },
      ]}
    />
  );
}

export function LocalInfrastructureEvidence() {
  return (
    <EvidenceTable
      caption="Locally verified infrastructure boundaries"
      rows={[
        {
          label: "Docker / Compose",
          value:
            "Non-root Python and Go images; one local Kafka broker, worker, API, gateway, and optional Collector on loopback ports.",
        },
        {
          label: "Kubernetes",
          value:
            "Native Kustomize deployment of five workloads to one ARM64 kind cluster with probes, resource bounds, security contexts, and one RWO PVC.",
        },
        {
          label: "Terraform",
          value:
            "Pinned Kubernetes provider manages only the local namespace, quota, limit range, five token-less ServiceAccounts, labels, and outputs.",
        },
        {
          label: "Executed gate",
          value:
            "One local capture/replay smoke, duplicate handling, malformed input, pod replacement, PVC capsule persistence, drift reconciliation, and controlled cleanup.",
        },
        {
          label: "Claim boundary",
          value:
            "No cloud, multi-node, high-availability, durable Kafka, remote Terraform state, load, scale, or production evidence.",
        },
      ]}
    />
  );
}

export function SecurityEvidence() {
  return (
    <EvidenceTable
      caption="Security controls and trust boundaries"
      rows={[
        {
          label: "Implemented controls",
          value:
            "Best-effort redaction, known-secret rejection, safe HTTP-header allowlisting, payload-free telemetry, loopback access, non-root containers, and disabled service-account tokens.",
        },
        {
          label: "Sensitive evidence",
          value:
            "Prompts, model responses, tool arguments/results, errors, and user text can enter a capsule and require human review before sharing.",
        },
        {
          label: "Trusted code",
          value:
            "Local replay runners execute with process authority; dynamic runner registration is startup-only and not sandboxing.",
        },
        {
          label: "No isolation claim",
          value:
            "No authentication, API-key store, authorization, tenant/project scope, TLS, network policy, or production threat model.",
        },
      ]}
    />
  );
}

export function TraceForgeLimitations() {
  return (
    <EvidenceTable
      caption="Current limitations"
      rows={[
        {
          label: "Capture breadth",
          value:
            "Controlled Python capture and one bounded LangGraph adapter; no generic real-agent or arbitrary-framework capture.",
        },
        {
          label: "Replay fidelity",
          value:
            "Only recorded model and HTTP boundaries are frozen; environment, time, randomness, native code, and arbitrary side effects are outside the guarantee.",
        },
        {
          label: "Pipeline recovery",
          value:
            "No sustained outage, rebalance, multi-partition, concurrent duplicate, shutdown-drain, or DLQ-redrive evidence.",
        },
        {
          label: "State and security",
          value:
            "Single-writer local SQLite, best-effort redaction, unauthenticated dashboard/OTLP, and no tenant boundary.",
        },
        {
          label: "Measurement",
          value:
            "No repeatable throughput, latency, capacity, soak, or reliability benchmark exists.",
        },
        {
          label: "Deployment",
          value:
            "Compose, kind, and Terraform evidence is local development only; no hosted or production deployment is claimed.",
        },
      ]}
    />
  );
}

export function CurrentStatusEvidence() {
  return (
    <EvidenceTable
      caption="Experimental Beta v0.4.1 status"
      rows={[
        {
          label: "Implemented now",
          value:
            "Capsule capture/sealing/validation, exact offline replay, structural comparison, regression evaluation/export, CLI, and local workbench.",
        },
        {
          label: "Tested optional path",
          value:
            "Go gateway, Kafka transport, Python/SQLite assembly, DLQ safety, OpenTelemetry/Prometheus, Docker, local kind, and narrow local Terraform foundation.",
        },
        {
          label: "Expanding next",
          value:
            "One real sanitized LangGraph application, a generic dependency boundary, and a richer reviewable execution diff.",
        },
        {
          label: "Planned later",
          value:
            "Fork replay, fresh-model experiments, pipeline recovery operations, consumer lag, and repeatable performance measurement.",
        },
      ]}
    />
  );
}
