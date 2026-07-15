type FlowStep = {
  label: string;
  detail: string;
};

type Layer = {
  title: string;
  items: readonly string[];
};

type ToolRow = {
  name: string;
  purpose: string;
  dependency: string;
  behavior: string;
  limitation: string;
};

type ReviewGroup = {
  title: string;
  items: readonly string[];
};

const runtimeFlow = [
  {
    label: "User",
    detail: "Submits a message or PDF through the Streamlit interface.",
  },
  {
    label: "Streamlit Interface",
    detail: "Manages chat input, thread selection, file upload, and status UI.",
  },
  {
    label: "LangGraph State Machine",
    detail:
      "Coordinates the chat node, tool routing, checkpointed state, and resume flow.",
  },
  {
    label: "Groq Chat Model",
    detail:
      "Produces a direct response or tool call through the tool-bound model.",
  },
  {
    label: "ToolNode",
    detail: "Executes the selected tool and returns the result to the graph.",
  },
  {
    label: "Streamed Response",
    detail:
      "Assistant output is filtered and rendered through Streamlit streaming.",
  },
] as const satisfies readonly FlowStep[];

const supportLayers = [
  {
    title: "Persistence and retrieval",
    items: [
      "SqliteSaver writes thread checkpoints to chatbot.db.",
      "FAISS stores the local PDF retrieval index.",
      "Uploaded PDFs are written to a temporary file and deleted after indexing.",
    ],
  },
  {
    title: "Observability",
    items: [
      "Chat and HITL resume runs include run names.",
      "Thread IDs are passed as run metadata.",
      "LangSmith is configured through environment variables.",
    ],
  },
  {
    title: "Deployment",
    items: [
      "GitHub Actions builds and pushes a Docker image.",
      "A self-hosted EC2 runner replaces the running Streamlit container.",
      "The workflow checks container state and the Streamlit health endpoint.",
    ],
  },
] as const satisfies readonly Layer[];

const graphFlow = [
  "START",
  "chat_node",
  "tools_condition",
  "Direct response or tools",
  "ToolNode",
  "chat_node loop",
] as const;

const memoryLayers = [
  {
    title: "LangGraph graph state",
    items: [
      "Accumulated messages live in ChatState.",
      "add_messages appends graph messages across turns.",
      "Tool execution and interrupt state are part of graph execution.",
    ],
  },
  {
    title: "Persistent checkpoint state",
    items: [
      "SqliteSaver stores checkpoints by thread_id.",
      "chatbot.db enables conversation restoration while the file remains available.",
      "The same thread_id is required to resume interrupted execution.",
    ],
  },
  {
    title: "Streamlit session state",
    items: [
      "Tracks selected thread, rendered message history, and pending approval UI.",
      "Synchronizes pending HITL state after reruns and thread switching.",
      "Represents the interface layer, not the source of graph truth.",
    ],
  },
] as const satisfies readonly Layer[];

const threadFlow = [
  "New conversation",
  "Generated UUID",
  "LangGraph thread_id config",
  "SQLite checkpoint",
  "Sidebar thread selection",
  "Conversation restoration",
] as const;

const ragFlow = [
  {
    label: "PDF Upload",
    detail: "Streamlit accepts PDF attachments from chat input.",
  },
  {
    label: "Temporary file",
    detail: "The uploaded PDF is written locally for PyPDFLoader.",
  },
  {
    label: "Chunking",
    detail: "Recursive splitting uses chunk size 1000 and overlap 200.",
  },
  {
    label: "Embeddings",
    detail: "HuggingFace all-MiniLM-L6-v2 generates local embeddings.",
  },
  {
    label: "FAISS",
    detail: "The vector index is saved to the local faiss_db path.",
  },
  {
    label: "Retrieval",
    detail: "Similarity retrieval uses k=4 and returns source/page context.",
  },
  {
    label: "RAG tool",
    detail:
      "Retrieved context is made available to the model as a tool result.",
  },
] as const satisfies readonly FlowStep[];

const tools = [
  {
    name: "Tavily web search",
    purpose: "Current or external information lookup.",
    dependency: "Tavily API key",
    behavior: "Reads information",
    limitation: "Tool selection is prompt-directed and model-dependent.",
  },
  {
    name: "Calculator",
    purpose: "Simple math expressions.",
    dependency: "None",
    behavior: "Local computation",
    limitation:
      "Uses restricted eval and should be replaced with a safe parser.",
  },
  {
    name: "Alpha Vantage stock lookup",
    purpose: "Fetches latest quote data for a stock symbol.",
    dependency: "Alpha Vantage API key",
    behavior: "Reads information",
    limitation: "No timeout or response-shape validation is implemented.",
  },
  {
    name: "OpenWeather lookup",
    purpose: "Fetches current weather for a location.",
    dependency: "OpenWeather API key",
    behavior: "Reads information",
    limitation:
      "More defensive than other tools, but still depends on external API availability.",
  },
  {
    name: "FAISS document retrieval",
    purpose: "Retrieves PDF chunks from the local vector index.",
    dependency: "Local FAISS index",
    behavior: "Reads local retrieval state",
    limitation:
      "The index is global and container-local in the audited deployment.",
  },
  {
    name: "Simulated stock purchase",
    purpose: "Demonstrates an approval-gated action.",
    dependency: "None",
    behavior: "Simulates an action",
    limitation: "Does not execute a real financial transaction.",
  },
] as const satisfies readonly ToolRow[];

const hitlFlow = [
  "Model selects purchase_stock",
  "Tool calls interrupt()",
  "LangGraph checkpoints pending execution",
  "Streamlit detects pending interrupt",
  "Chat input is disabled",
  "User approves or rejects",
  "Command(resume=...) uses the same thread ID",
  "Graph resumes",
  "Simulated action completes or is cancelled",
] as const;

const deploymentFlow = [
  "Code push",
  "GitHub Actions",
  "Docker Buildx",
  "Docker Hub image",
  "Self-hosted EC2 runner",
  "Pull image",
  "Replace container",
  "Run Streamlit container",
  "Container and health checks",
] as const;

const challenges = [
  {
    title: "Preserving conversation state across Streamlit reruns",
    solution: "Thread IDs plus SQLite LangGraph checkpoints.",
    tradeoff:
      "Durability is container-local unless persistent storage is mounted.",
  },
  {
    title: "Resuming interrupted execution safely",
    solution: "interrupt() and Command(resume=...) using the same thread ID.",
    tradeoff: "Approval applies only to the simulated purchase tool.",
  },
  {
    title: "Separating assistant output from tool activity",
    solution:
      "Stream messages, filter assistant content, and expose ToolMessage statuses separately.",
    tradeoff: "UI and graph state must remain synchronized.",
  },
  {
    title: "Packaging local embeddings",
    solution: "Pre-download the embedding model during image build.",
    tradeoff: "The image can become larger and builds can take longer.",
  },
  {
    title: "Verifying EC2 deployments",
    solution:
      "Check container state and the Streamlit health endpoint after replacement.",
    tradeoff:
      "The deployment is not zero-downtime and depends on a self-hosted runner.",
  },
] as const;

const reliabilityGroups = [
  {
    title: "Implemented safeguards",
    items: [
      "Environment-secret injection through GitHub Actions.",
      "Deployment secret checks before container replacement.",
      "Container restart policy.",
      "Streamlit health endpoint verification.",
      "Deployment concurrency control.",
      "Explicit HITL approval before the simulated purchase action.",
    ],
  },
  {
    title: "Current limitations",
    items: [
      "Calculator uses eval.",
      "FAISS load enables dangerous deserialization.",
      "SQLite and FAISS are container-local under the audited deployment.",
      "No authentication, rate limiting, or multi-user isolation appears in source.",
      "FAISS index is global rather than user/thread scoped.",
      "Container runs as root.",
      "Lint and unit-test workflow steps are placeholders.",
    ],
  },
] as const satisfies readonly ReviewGroup[];

const improvements = [
  {
    title: "Priority 1 - Correctness and safety",
    items: [
      "Replace eval-based calculator with a safe expression parser.",
      "Remove dangerous FAISS deserialization.",
      "Validate uploads and enforce size limits.",
      "Add consistent external API timeouts and error handling.",
    ],
  },
  {
    title: "Priority 2 - Persistence and isolation",
    items: [
      "Mount durable storage or use managed persistence.",
      "Scope vector indexes per user or thread.",
      "Separate document metadata from application memory.",
      "Add authentication and authorization before multi-user use.",
    ],
  },
  {
    title: "Priority 3 - Testing and delivery",
    items: [
      "Replace placeholder lint/test steps with real checks.",
      "Add tests for tool routing and interrupt/resume.",
      "Add integration tests for checkpoints and RAG.",
      "Run a non-root container and add a Docker healthcheck.",
    ],
  },
  {
    title: "Priority 4 - Scale and operations",
    items: [
      "Move beyond single-container state.",
      "Establish traceable deployment versions.",
      "Add structured application metrics.",
      "Measure latency and retrieval quality before claiming performance.",
    ],
  },
] as const satisfies readonly ReviewGroup[];

const currentStatus = [
  [
    "Implementation",
    "Completed project implementation in the audited repository.",
  ],
  ["Repository", "Public GitHub repository."],
  [
    "Deployment",
    "Configured and previously deployed through an AWS EC2 workflow.",
  ],
  [
    "Public availability",
    "Not continuously hosted to avoid unnecessary cloud cost.",
  ],
  [
    "Automated deployment",
    "Docker image publishing, EC2 container replacement, and health verification are implemented.",
  ],
  [
    "Automated testing",
    "Current workflow lint and unit-test steps are placeholders.",
  ],
  [
    "Persistence",
    "Thread checkpoints and FAISS are local to the container filesystem under the audited deployment configuration.",
  ],
] as const;

function NumberedFlow({
  items,
}: Readonly<{ items: readonly (FlowStep | string)[] }>) {
  return (
    <ol className="overflow-hidden rounded-md border border-border bg-surface/45">
      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label;
        const detail = typeof item === "string" ? null : item.detail;

        return (
          <li
            className="relative grid gap-4 border-t border-border p-4 first:border-t-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:p-5"
            key={label}
          >
            {index < items.length - 1 ? (
              <span
                className="absolute top-11 bottom-[-1px] left-8 w-px bg-border-strong sm:left-11"
                aria-hidden="true"
              />
            ) : null}
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-accent/60 bg-background font-mono text-[length:var(--text-label-size)] font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] font-semibold text-foreground">
                {label}
              </span>
              {detail ? (
                <span className="mt-1 block text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                  {detail}
                </span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function LayerGrid({ layers }: Readonly<{ layers: readonly Layer[] }>) {
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
      {layers.map((layer) => (
        <section className="bg-surface/55 p-5" key={layer.title}>
          <h3 className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
            {layer.title}
          </h3>
          <ul className="mt-4 grid gap-3">
            {layer.items.map((item) => (
              <li
                className="border-l border-border-strong pl-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function AgentArchitecture() {
  return (
    <div className="grid gap-6">
      <section aria-labelledby="runtime-agent-flow">
        <h3
          className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase"
          id="runtime-agent-flow"
        >
          Request and agent flow
        </h3>
        <div className="mt-5">
          <NumberedFlow items={runtimeFlow} />
        </div>
      </section>
      <section aria-labelledby="supporting-agent-systems">
        <h3
          className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase"
          id="supporting-agent-systems"
        >
          Supporting systems
        </h3>
        <div className="mt-5">
          <LayerGrid layers={supportLayers} />
        </div>
      </section>
    </div>
  );
}

export function LangGraphFlow() {
  return <NumberedFlow items={graphFlow} />;
}

export function MemoryThreadModel() {
  return (
    <div className="grid gap-6">
      <LayerGrid layers={memoryLayers} />
      <section aria-labelledby="thread-path">
        <h3
          className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase"
          id="thread-path"
        >
          Thread path
        </h3>
        <div className="mt-5">
          <NumberedFlow items={threadFlow} />
        </div>
      </section>
    </div>
  );
}

export function RagPipeline() {
  return <NumberedFlow items={ragFlow} />;
}

export function ToolInventory() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface/45">
      {tools.map((tool) => (
        <article
          className="grid gap-4 border-t border-border p-5 first:border-t-0 md:grid-cols-[12rem_minmax(0,1fr)]"
          key={tool.name}
        >
          <div>
            <h3 className="text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] font-semibold text-foreground">
              {tool.name}
            </h3>
            <p className="mt-2 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-accent uppercase">
              {tool.behavior}
            </p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Purpose
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {tool.purpose}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Dependency
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {tool.dependency}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Limitation
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {tool.limitation}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export function HitlFlow() {
  return <NumberedFlow items={hitlFlow} />;
}

export function DeploymentPipeline() {
  return <NumberedFlow items={deploymentFlow} />;
}

export function EngineeringChallengeRows() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface/45">
      {challenges.map((challenge) => (
        <article
          className="grid gap-4 border-t border-border p-5 first:border-t-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          key={challenge.title}
        >
          <div>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
              Challenge
            </p>
            <h3 className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] font-semibold text-foreground">
              {challenge.title}
            </h3>
          </div>
          <dl className="grid gap-4">
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Solution
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {challenge.solution}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                Trade-off
              </dt>
              <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {challenge.tradeoff}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export function ReliabilityReview() {
  return <LayerGrid layers={reliabilityGroups} />;
}

export function ImprovementPriorities() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface/45">
      {improvements.map((group) => (
        <section
          className="grid gap-4 border-t border-border p-5 first:border-t-0 md:grid-cols-[12rem_minmax(0,1fr)]"
          key={group.title}
        >
          <h3 className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
            {group.title}
          </h3>
          <ul className="grid gap-3">
            {group.items.map((item) => (
              <li
                className="border-l border-border-strong pl-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function CurrentStatusSummary() {
  return (
    <aside className="rounded-md border border-border-strong bg-surface/55 p-5">
      <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
        Current Status
      </p>
      <dl className="mt-5 divide-y divide-border">
        {currentStatus.map(([label, value]) => (
          <div
            className="grid gap-2 py-3 first:pt-0 sm:grid-cols-[12rem_minmax(0,1fr)]"
            key={label}
          >
            <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
              {label}
            </dt>
            <dd className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
