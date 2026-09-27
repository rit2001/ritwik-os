import { SystemFlow } from "./EvidencePrimitives";

const traceforgeFlow = [
  {
    name: "Instrumented services",
    label: "Instrumentation",
    description: "Emit trace context and spans.",
  },
  {
    name: "OpenTelemetry collection",
    label: "Collection",
    description: "Forward telemetry through a standard boundary.",
  },
  {
    name: "Go ingestion service",
    label: "Ingestion",
    description: "Validate required trace data and preserve context.",
  },
  {
    name: "Kafka trace topics",
    label: "Transport",
    description: "Decouple ingestion from downstream processing.",
  },
  {
    name: "Processing and storage",
    label: "Processing",
    description: "Prepare trace data for diagnostics and persistence.",
  },
] as const;

export function ArchitectureFlow() {
  return (
    <SystemFlow
      label="Proposed architecture"
      note="Proposed directional flow. Connectors are visual only; the ordered stages preserve the semantic reading sequence."
      steps={traceforgeFlow}
    />
  );
}
