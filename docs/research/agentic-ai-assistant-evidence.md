# Stateful Agentic AI Assistant Evidence Audit

## Audit Metadata

- Repository: `https://github.com/rit2001/Agentic-Chatbot-AWS`
- Audited commit: `b1b19d0a68894a2392a32566df255c76776a2fc7`
- Audit date: 2026-07-15
- RITWIK OS branch: `feat/agentic-ai-case-study`
- Audit scope: Static read-only inspection of public source, workflow, Dockerfile, dependency manifest, README files, and repository hygiene. The external application was not started, dependencies were not installed, APIs were not called, and deployment was not executed.

## Executive Assessment

The public repository verifies a Streamlit application backed by a LangGraph state machine, Groq chat model, six bound tools, SQLite checkpointing, PDF-to-FAISS retrieval, HITL approval for a simulated stock-purchase tool, Docker containerization, and a GitHub Actions workflow that builds/pushes a Docker image and replaces a container on a self-hosted EC2 runner.

The implementation is credible as a stateful tool-using agent workflow. It should not be described as a multi-agent system, real trading system, production-grade tested service, highly available deployment, or permanently durable cloud memory layer. The strongest future case-study framing is: a LangGraph-controlled assistant that coordinates Streamlit UI state, thread-scoped checkpoints, tool execution, RAG ingestion, and an interrupt/resume approval flow.

## Verified System Summary

- Python application with Streamlit UI: `app.py:19`, `app.py:311-317`, `Dockerfile:34-38`.
- LangGraph backend: `backend.py:1`, `backend.py:292-354`.
- Groq model: `ChatGroq(model="llama-3.3-70b-versatile")` in `backend.py:21`, `backend.py:29-32`.
- Local HuggingFace embedding model: `HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")` in `backend.py:22`, `backend.py:34-35`.
- SQLite checkpointing through `SqliteSaver`: `backend.py:5`, `backend.py:337-339`.
- FAISS vector store for uploaded PDFs: `backend.py:13-15`, `backend.py:38-59`.
- Six bound tools: `backend.py:98-286`.
- Streamlit streaming and tool-status UI: `app.py:603-709`.
- HITL approval for `purchase_stock` only: `backend.py:148-174`, `app.py:73-307`, `app.py:441-490`.
- Docker build target: `Dockerfile:1-38`.
- GitHub Actions Docker build, Docker Hub push, EC2 deployment, and health verification: `.github/workflows/cicd.yaml:45-241`.

## Repository Structure

```text
.
├── .github/workflows/cicd.yaml
├── .dockerignore
├── .gitignore
├── Dockerfile
├── LLM
├── LICENSE
├── README .md
├── README.md
├── app.py
├── backend.py
└── requirements.txt
```

Repository inventory:

- `backend.py`: LangGraph state, model binding, RAG ingestion/retrieval, tools, SQLite checkpointer, compiled graph, thread listing helper.
- `app.py`: Streamlit UI, session state, thread switching, file upload, streaming display, HITL approval and resume controls.
- `Dockerfile`: Python 3.11 slim image, system packages, dependency installation, HuggingFace embedding model pre-download, Streamlit command.
- `requirements.txt`: pinned Python dependency list.
- `.github/workflows/cicd.yaml`: CI placeholder steps, Docker Hub build/push, self-hosted EC2 deployment, health check.
- `README.md`: deployment instructions but generic/template project text.
- `README .md`: duplicate oddly named README with overlapping deployment notes.
- `LLM`: empty file.
- `.gitignore`: broad Python template with `.env` and Streamlit secrets ignored.
- `.dockerignore`: only virtual environments ignored; does not exclude `.git`, caches, local DBs, or generated FAISS indexes.

Repository hygiene findings:

- Commit count in the shallow audit clone is `1`; the fetched commit is `b1b19d0`.
- The README starts with template text and is primarily deployment notes rather than architecture documentation: `README.md:2-6`.
- There is a duplicate file named `README .md`, including a space before `.md`: `README .md:1-81`.
- `LLM` exists but contains no content.
- `.dockerignore` is minimal and would not exclude generated local artifacts if present: `.dockerignore:1-7`.

## Architecture

Verified control flow:

```text
User Input
-> Streamlit Interface
-> LangGraph Chat Node
-> Groq Model
-> Direct Response or Tool Selection
-> Tool Node
-> Chat Node
-> Streamed Response
```

Verified memory path:

```text
thread_id
-> LangGraph config.configurable.thread_id
-> SqliteSaver
-> chatbot.db
-> restored conversation state
```

LangGraph evidence:

- `ChatState` stores `messages` with `add_messages`: `backend.py:292-294`.
- `chat_node` builds a system prompt plus prior state messages and invokes the tool-bound Groq model: `backend.py:297-331`.
- `ToolNode(tools)` is used for tool execution: `backend.py:333-334`.
- Graph starts at `chat_node`: `backend.py:342-350`.
- Conditional routing uses `tools_condition`: `backend.py:351`.
- Tool execution loops back to `chat_node`: `backend.py:352`.
- Graph is compiled with `SqliteSaver`: `backend.py:337-354`.

Architecture classification:

- VERIFIED: Stateful LangGraph tool-using agent workflow.
- INFERENCE: The system separates UI orchestration (`app.py`) from agent/tool orchestration (`backend.py`).
- HISTORICAL OR CONFLICTING: Describing this as a multi-agent architecture would overstate the code; only one graph state machine and one chat node are implemented.

## Memory and Threading

Verified thread model:

- New thread IDs are UUIDs: `app.py:25-27`.
- `reset_chat()` creates a new thread, clears UI messages, clears pending HITL state, and adds the thread to the sidebar list: `app.py:38-53`.
- Existing threads are loaded from checkpoint metadata with `get_all_threads()`: `backend.py:357-363`.
- Previous conversation messages are restored through `chatbot.get_state(config={"configurable": {"thread_id": thread_id}})`: `app.py:56-70`.
- Main chat execution passes the same thread ID to LangGraph config and metadata: `app.py:591-601`.

What survives:

- Streamlit reruns: Streamlit `st.session_state` preserves current UI state during reruns; LangGraph checkpoints preserve graph state by thread.
- Browser refreshes: pending HITL can be recovered by reading LangGraph interrupt state for the current thread: `app.py:141-170`, `app.py:350-353`.
- Conversation switching: sidebar button loads checkpoint messages and syncs pending interrupts for the selected thread: `app.py:374-426`.
- Application-process restart: likely survives only if `chatbot.db` remains in the local filesystem, because `SqliteSaver` writes to `chatbot.db`: `backend.py:337-339`.
- Container replacement: UNVERIFIED durability. The workflow runs `docker rm -f stapp` and starts a new container without a volume mount: `.github/workflows/cicd.yaml:167-195`.
- EC2 restart: may survive if Docker keeps the same container filesystem and restart policy works, but not across container replacement.

Safe public wording:

> Implements thread-scoped LangGraph checkpointing with SQLite for conversation switching and HITL recovery inside the running application environment.

Caveat:

> SQLite and FAISS persistence are local to the running container filesystem and may be lost when the container is replaced because the deployment command does not mount persistent storage.

## RAG Pipeline

Verified RAG flow:

```text
PDF upload
-> temporary local file
-> PyPDFLoader
-> RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
-> HuggingFaceEmbeddings(all-MiniLM-L6-v2)
-> FAISS.from_documents
-> save_local("faiss_db")
-> FAISS.load_local(..., allow_dangerous_deserialization=True)
-> similarity retriever k=4
-> rag_tool
-> formatted source/page/content response
-> LLM response
```

Evidence:

- PDF upload accepted through Streamlit chat input with `file_type=["pdf"]`: `app.py:493-507`.
- Uploaded PDF is written to a temporary `.pdf` file: `app.py:524-545`.
- Temporary file is passed to `ingest_rag_document()`: `app.py:546-553`.
- Temporary PDF is deleted after indexing: `app.py:568-575`.
- PDF loader: `PyPDFLoader(file_path)` in `backend.py:38-41`.
- Chunking: `RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)` in `backend.py:42`.
- Embeddings: `HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")` in `backend.py:34-35`.
- FAISS storage path: `DB_PATH = "faiss_db"` in `backend.py:38-45` and `backend.py:48-54`.
- Retriever: similarity search with `k=4`: `backend.py:56-59`.
- `rag_tool` returns source, page, and page content for each retrieved document: `backend.py:64-95`.

Limitations:

- Each upload appears to overwrite the previous `faiss_db` index through `FAISS.from_documents(...).save_local(DB_PATH)`: `backend.py:44-45`.
- The FAISS index is global, not scoped per thread or user, because `DB_PATH` is constant: `backend.py:38-49`.
- Multiple uploaded PDFs are not accumulated in one submission; the code processes only `uploaded_files[0]`: `app.py:520-527`.
- FAISS persistence is local to the container filesystem and not mounted externally in deployment: `.github/workflows/cicd.yaml:183-195`.
- `allow_dangerous_deserialization=True` permits loading pickled FAISS metadata and should only be used with trusted local indexes: `backend.py:50-54`.

## Tool Inventory

| Tool                     | Classification | Source               | External dependency                         | HITL | Notes                                                                              |
| ------------------------ | -------------- | -------------------- | ------------------------------------------- | ---- | ---------------------------------------------------------------------------------- |
| Tavily search            | VERIFIED       | `backend.py:98-103`  | `TAVILY_API_KEY` implied by package/runtime | No   | Configured with `max_results=5`, topic `general`, depth `advanced`.                |
| Calculator               | VERIFIED       | `backend.py:106-127` | None                                        | No   | Uses restricted `eval`; still a verified risk because user expression is executed. |
| Stock price lookup       | VERIFIED       | `backend.py:130-145` | `ALPHA_VANTAGE_API_KEY`                     | No   | Calls Alpha Vantage without timeout or explicit response validation.               |
| Weather lookup           | VERIFIED       | `backend.py:177-282` | `OPENWEATHER_API_KEY`                       | No   | Includes missing-key checks, request timeouts, and several error handlers.         |
| RAG document retrieval   | VERIFIED       | `backend.py:64-95`   | Local FAISS index                           | No   | Requires a previously ingested FAISS index.                                        |
| Simulated stock purchase | VERIFIED       | `backend.py:148-174` | None                                        | Yes  | Simulates a purchase; no real trading integration exists.                          |

Tool routing:

- Tools are bound as `[search_tool, calculator, get_stock_price, get_current_weather, rag_tool, purchase_stock]`: `backend.py:285-289`.
- The system prompt instructs tool selection by task: `backend.py:301-321`.
- Strength: explicit prompt routes PDF questions to RAG and stock/weather/math/current-event questions to tools.
- Limitation: tool selection is prompt-directed and model-dependent; no deterministic router validates intent before the model chooses a tool.

## Human-in-the-Loop

Verified lifecycle:

```text
purchase_stock
-> interrupt()
-> checkpointed pending interrupt
-> Streamlit detects pending state
-> approval/rejection controls
-> Command(resume="yes" | "no")
-> graph resumes with same thread_id
-> purchase success/cancel response
-> UI rerun restores normal chat order
```

Evidence:

- `purchase_stock()` calls `interrupt(...)`: `backend.py:148-158`.
- Approval decision controls return success or cancelled responses: `backend.py:160-174`.
- Pending interrupt detection reads `chatbot.get_state(config)` and checks direct `interrupts` or task interrupts: `app.py:75-127`.
- Pending interrupt is stored with `thread_id` and prompt in `st.session_state["pending_hitl"]`: `app.py:130-138`.
- Streamlit syncs pending state after rerun, refresh, or conversation switching: `app.py:141-170`, `app.py:350-353`, `app.py:418-421`.
- Resume uses `Command(resume=decision)` and the original interrupted thread ID: `app.py:173-228`.
- Chat input is disabled while the current thread has pending approval: `app.py:448-507`.
- UI reruns after resume to restore normal chat order: `app.py:291-300`.

Safe public wording:

> Adds Human-in-the-Loop approval for a simulated stock-purchase tool using LangGraph interrupts and resume commands.

Caveat:

> HITL approval is implemented for the simulated stock-purchase tool only, not for every tool.

## Streaming UI

Verified UI behavior:

- Streamlit page setup and title: `app.py:309-317`.
- Conversation history lives in `st.session_state["message_history"]`: `app.py:320-322`, `app.py:431-438`.
- Sidebar lists thread IDs and supports switching: `app.py:358-426`.
- `st.chat_input` accepts text plus PDF attachment: `app.py:493-507`.
- Chat execution streams `chatbot.stream(..., stream_mode="messages")`: `app.py:611-621`.
- `st.write_stream()` displays assistant output: `app.py:684-686`.
- Tool status appears through `st.status` when a `ToolMessage` is observed: `app.py:623-649`, `app.py:688-708`.
- Assistant-token filtering yields only `AIMessage` content: `app.py:651-656`.
- Resume streaming follows the same AI-only pattern: `app.py:221-260`.

Classification:

- VERIFIED: Streamlit-level streamed display over LangGraph message streaming.
- UNVERIFIED: WebSocket streaming. Streamlit may use browser communication internally, but the application code does not implement a WebSocket protocol.

## Observability

Verified:

- Main chat config includes metadata `thread_id` and `run_name: "chat_trace"`: `app.py:591-601`.
- HITL resume config includes metadata `thread_id` and `run_name: "hitl_resume_trace"`: `app.py:195-207`.
- Workflow validates and passes LangSmith environment variables: `.github/workflows/cicd.yaml:108-159`, `.github/workflows/cicd.yaml:171-195`.
- README documents `LANGSMITH_TRACING`, endpoint, API key, and project variables: `README.md:68-74`.

Inference:

- LangSmith tracing is configured through environment variables and LangChain/LangGraph runtime behavior, not through custom tracing instrumentation in the source.

Do not claim:

- Custom dashboards.
- Measured observability improvements.
- Trace screenshots.
- Production incident visibility.

## Docker

Verified Docker setup:

- Base image: `python:3.11-slim`: `Dockerfile:1`.
- Workdir: `/app`: `Dockerfile:8`.
- Environment: disables bytecode, unbuffered logs, no pip cache: `Dockerfile:3-6`.
- System packages: `build-essential`, `libgomp1`: `Dockerfile:10-15`.
- Dependency install from `requirements.txt`: `Dockerfile:17-22`.
- Pre-downloads `all-MiniLM-L6-v2`: `Dockerfile:24-26`.
- Copies project code: `Dockerfile:28-29`.
- Exposes Streamlit port `8501`: `Dockerfile:31`.
- Runs `streamlit run app.py` on `0.0.0.0:8501` with headless and usage stats disabled: `Dockerfile:33-38`.

Limitations:

- No non-root `USER` is defined; the container runs as root by default.
- No Dockerfile `HEALTHCHECK`; health verification is performed in GitHub Actions after deployment.
- No mounted volume in deployment for `chatbot.db` or `faiss_db`.
- The dependency set is large, including packages that appear unused by current imports.

## CI/CD and AWS

Verified pipeline:

- Trigger: push to `main` excluding `README.md`, plus `workflow_dispatch`: `.github/workflows/cicd.yaml:3-11`.
- Concurrency group cancels in-progress deployments: `.github/workflows/cicd.yaml:13-16`.
- Permissions are limited to `contents: read`: `.github/workflows/cicd.yaml:18-20`.
- CI job checks out the repo: `.github/workflows/cicd.yaml:25-31`.
- Lint and unit-test steps are placeholders that only echo text: `.github/workflows/cicd.yaml:33-40`.
- Docker image settings are validated: `.github/workflows/cicd.yaml:54-70`.
- Buildx configured: `.github/workflows/cicd.yaml:71-72`.
- Docker Hub login: `.github/workflows/cicd.yaml:74-79`.
- Docker image built and pushed with `main` and SHA tags plus GitHub Actions cache: `.github/workflows/cicd.yaml:80-90`.
- Deployment job runs on a self-hosted runner: `.github/workflows/cicd.yaml:96-100`.
- Application secrets are validated: `.github/workflows/cicd.yaml:108-159`.
- Latest image is pulled: `.github/workflows/cicd.yaml:161-165`.
- Existing container `stapp` is removed: `.github/workflows/cicd.yaml:167-169`.
- New container is started with restart policy and environment variables: `.github/workflows/cicd.yaml:171-195`.
- Container running state is checked: `.github/workflows/cicd.yaml:197-212`.
- Streamlit health endpoint is checked with retries: `.github/workflows/cicd.yaml:214-231`.
- Logs and image pruning run always: `.github/workflows/cicd.yaml:233-241`.

Safe public wording:

> GitHub Actions automates Docker image build, Docker Hub publishing, EC2 container replacement, and post-deployment Streamlit health verification.

Caveat:

> Lint and unit-test stages are placeholders, so the workflow should not be presented as a complete automated quality gate.

## Security and Reliability

| Finding                                    | Classification                | Evidence                                               | Public wording                                                                      | Caveat                                                                                                   |
| ------------------------------------------ | ----------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Calculator uses `eval`                     | Verified risk                 | `backend.py:106-127`                                   | Calculator is implemented with a restricted eval environment.                       | Still executes user-provided expressions and should be replaced with a parser.                           |
| FAISS dangerous deserialization            | Verified risk                 | `backend.py:50-54`                                     | FAISS reload uses `allow_dangerous_deserialization=True`.                           | Acceptable only for trusted local indexes; unsafe for untrusted persisted data.                          |
| API keys use environment variables/secrets | Verified                      | `backend.py:136`, `backend.py:182`, workflow `108-195` | Secrets are supplied through environment variables and GitHub Actions secrets.      | Runtime secret exposure through container environment is standard but should be protected operationally. |
| Missing Alpha Vantage timeout              | Design limitation             | `backend.py:144-145`                                   | Stock lookup calls Alpha Vantage directly.                                          | No timeout or response-shape handling is implemented.                                                    |
| Weather request timeouts and errors        | Verified reliability behavior | `backend.py:190-282`                                   | Weather tool handles missing key, timeouts, HTTP errors, and malformed responses.   | Other external tools are less defensive.                                                                 |
| SQLite local checkpointing                 | Operational trade-off         | `backend.py:337-339`                                   | SQLite is a simple local persistence layer for checkpoints.                         | Concurrent multi-user/container behavior is not proven.                                                  |
| No persistent deployment volume            | Operational trade-off         | `.github/workflows/cicd.yaml:183-195`                  | Deployment replaces the container without mounting checkpoint/vector-store storage. | Memory and RAG indexes may be lost on container replacement.                                             |
| Temporary PDF cleanup                      | Verified                      | `app.py:568-575`                                       | Uploaded temporary PDFs are deleted after ingestion.                                | The FAISS index remains local after ingestion.                                                           |
| File type restricted to PDF                | Verified                      | `app.py:500-503`                                       | Upload input restricts files to PDF.                                                | Upload size controls are not configured in app code.                                                     |
| Docker root user                           | Future hardening              | `Dockerfile:1-38`                                      | Container does not define a non-root runtime user.                                  | Not automatically exploitable, but hardening remains open.                                               |
| Restart policy                             | Verified                      | `.github/workflows/cicd.yaml:183-185`                  | Container starts with `--restart unless-stopped`.                                   | Does not provide high availability.                                                                      |
| Public exposed port                        | Verified                      | `.github/workflows/cicd.yaml:183-187`, `Dockerfile:31` | Streamlit runs on port 8501.                                                        | Network exposure depends on EC2/security-group setup outside the repo.                                   |
| Authentication/authorization               | Unverified/not implemented    | no auth code found                                     | Do not claim user accounts or access control.                                       | Streamlit app appears unauthenticated in source.                                                         |
| Global FAISS index                         | Design limitation             | `backend.py:38-59`                                     | RAG index is stored at a fixed `faiss_db` path.                                     | Not scoped per user/thread.                                                                              |

## Verified Challenges

| Challenge                                      | Implementation                                                 | Rationale                                                                  | Trade-off                                               | Improvement                                           |
| ---------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| Persisting graph state across Streamlit reruns | LangGraph `SqliteSaver` keyed by `thread_id`                   | Keeps model/tool state independent from transient UI rendering             | Local SQLite durability depends on container filesystem | Mount a persistent volume or use managed storage      |
| Synchronizing UI state with checkpoints        | `load_conversation()` and sidebar thread switching             | Lets users switch among checkpointed conversations                         | Sidebar displays raw UUIDs                              | Add titles or summaries per thread                    |
| Resuming interrupted execution                 | Store pending thread ID and resume with `Command(resume=...)`  | LangGraph resume must target the same checkpoint/thread                    | Approval flow is specific to one tool                   | Generalize approval metadata for more sensitive tools |
| Streaming only assistant text                  | Filter chunks to `AIMessage` and show `ToolMessage` separately | Keeps tool internals out of the final answer while showing status          | Tool output visibility is limited to status labels      | Add collapsible structured tool trace summaries       |
| Temporary PDF ingestion                        | Save upload to temp file, index, then delete temp PDF          | Uses `PyPDFLoader` file-path interface while avoiding retained raw uploads | FAISS index is global and replaces prior index          | Scope vector stores by thread or document collection  |
| EC2 deployment verification                    | Docker health endpoint check after container run               | Catches failed Streamlit startup                                           | No real tests run before deployment                     | Add real lint, type/static checks, and smoke tests    |

## Factual Conflicts

| Topic             | Existing/Résumé or portfolio wording                  | Repository evidence                                                                                                                                      | Recommendation                                                                                                                                      |
| ----------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Embeddings        | RITWIK OS project data says `Google Embeddings`.      | Current source uses `HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")`: `backend.py:34-35`; Docker pre-downloads the same model: `Dockerfile:24-26`. | Future public case study should say HuggingFace `all-MiniLM-L6-v2` unless historical evidence confirms a previous Google Embeddings implementation. |
| Number of tools   | Possible outdated "four tools" claim.                 | Six tools are bound: `backend.py:285-286`.                                                                                                               | Use "six bound tools" and list them by name.                                                                                                        |
| Deployment        | Resume/portfolio may imply broad AWS deployment.      | Workflow builds/pushes Docker image and replaces one container on a self-hosted EC2 runner: `.github/workflows/cicd.yaml:45-241`.                        | Say Docker image publishing and EC2 container deployment automation; avoid high-availability claims.                                                |
| Memory durability | Could be interpreted as permanent cloud memory.       | SQLite checkpoints are local; no deployment volume is mounted: `backend.py:337-339`, `.github/workflows/cicd.yaml:183-195`.                              | Say thread-scoped SQLite checkpointing; qualify deployment durability.                                                                              |
| CI/CD quality     | Could be interpreted as automated lint/test coverage. | Lint/test steps only echo messages: `.github/workflows/cicd.yaml:33-40`.                                                                                 | Do not claim automated linting or unit tests.                                                                                                       |

## Unsupported Claims to Avoid

- Multi-agent system.
- Real stock trading.
- Production-grade testing.
- Permanent cloud memory across container replacement.
- Multi-user isolation.
- Per-user RAG isolation.
- Zero-downtime deployment.
- Horizontal scaling.
- Kubernetes deployment.
- High availability.
- Measured latency or accuracy improvements.
- Google Embeddings in the current repository.
- Continuously available public demo.
- Automated lint/unit test enforcement.
- Production-hard container security.

## Safe Public Claims

- Built a LangGraph-based tool-using assistant with thread-scoped SQLite checkpointing.
- Implemented PDF ingestion with local HuggingFace `all-MiniLM-L6-v2` embeddings and FAISS retrieval.
- Added Human-in-the-Loop approval for a simulated stock-purchase tool through LangGraph interrupts and resume commands.
- Streamed assistant output and tool-status feedback through Streamlit.
- Bound six tools: Tavily search, calculator, Alpha Vantage stock lookup, OpenWeather lookup, FAISS-backed RAG retrieval, and simulated stock purchase.
- Automated Docker image publishing and EC2 container replacement through GitHub Actions.
- Added post-deployment Streamlit health verification.
- Used LangSmith environment configuration and run metadata for tracing support.

## Evidence Table

| Claim                                     | Classification            | Source                               | Public wording                                                        | Caveat                                                             |
| ----------------------------------------- | ------------------------- | ------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| LangGraph state uses message accumulation | VERIFIED                  | `backend.py:292-294`                 | Message state accumulates through LangGraph `add_messages`.           | Only `messages` exists in graph state.                             |
| Groq model is current backend             | VERIFIED                  | `backend.py:21`, `backend.py:29-32`  | Uses Groq `llama-3.3-70b-versatile` for chat generation.              | Model availability may change outside repository.                  |
| RAG uses HuggingFace embeddings           | VERIFIED                  | `backend.py:34-35`                   | Uses local HuggingFace `all-MiniLM-L6-v2` embeddings.                 | Conflicts with existing RITWIK OS `Google Embeddings` stack label. |
| FAISS index persists locally              | VERIFIED                  | `backend.py:38-59`                   | Saves and reloads FAISS index from `faiss_db`.                        | Not mounted in deployment.                                         |
| HITL applies to stock purchase            | VERIFIED                  | `backend.py:148-174`                 | Simulated stock purchase pauses for human approval.                   | Other tools do not use HITL.                                       |
| Streamlit supports PDF upload             | VERIFIED                  | `app.py:493-507`                     | Chat input accepts PDF attachments.                                   | Only first uploaded file is processed.                             |
| Temporary PDF cleanup exists              | VERIFIED                  | `app.py:568-575`                     | Temporary uploaded PDF is removed after processing.                   | Derived FAISS index remains.                                       |
| Conversation switching exists             | VERIFIED                  | `app.py:358-426`                     | Sidebar lists and restores thread conversations.                      | Threads display as UUIDs.                                          |
| LangSmith tracing is configured           | INFERENCE                 | `app.py:591-601`, workflow `108-195` | Provides run names, thread metadata, and LangSmith env configuration. | No custom tracing code or dashboard evidence.                      |
| Docker deployment exists                  | VERIFIED                  | `.github/workflows/cicd.yaml:80-195` | Builds/pushes Docker image and runs it on a self-hosted EC2 runner.   | No zero-downtime deployment.                                       |
| Lint and tests are automated              | HISTORICAL OR CONFLICTING | `.github/workflows/cicd.yaml:33-40`  | Avoid this claim.                                                     | Steps are echo placeholders.                                       |

## Recommended Case-Study Structure

| Section                         | Evidence available                       | Missing evidence                      | Visual component      | Screenshot value                        | TOC |
| ------------------------------- | ---------------------------------------- | ------------------------------------- | --------------------- | --------------------------------------- | --- |
| Executive Summary               | Verified stack, graph, deployment        | Live demo status                      | Summary callout       | Optional                                | Yes |
| Problem                         | Code supports stateful assistant problem | Original user requirements            | Narrative             | No                                      | Yes |
| System Architecture             | `app.py`, `backend.py`, Docker/workflow  | Runtime diagrams                      | Architecture flow     | Diagram better                          | Yes |
| LangGraph Control Flow          | graph construction lines                 | None significant                      | Flow diagram          | No                                      | Yes |
| Memory and Thread Model         | thread/config/checkpoint code            | durability under real EC2 replacement | State model diagram   | Sidebar screenshot useful               | Yes |
| RAG Pipeline                    | upload, chunking, FAISS, retriever       | multi-doc requirements                | Pipeline diagram      | RAG UI screenshot useful                | Yes |
| Tool Routing                    | tool list and prompt                     | tool usage examples                   | Tool inventory matrix | No                                      | Yes |
| Human-in-the-Loop Execution     | interrupt/resume code                    | demo recording                        | Sequence diagram      | Approval prompt screenshot useful       | Yes |
| Streaming Interface             | `st.write_stream`, status UI             | browser behavior evidence             | UI behavior panel     | Stream screenshot useful                | Yes |
| Observability                   | run names/env vars                       | LangSmith screenshots                 | Evidence note         | LangSmith screenshot useful if redacted | Yes |
| Containerization                | Dockerfile                               | image size, scan results              | Docker breakdown      | No                                      | Yes |
| CI/CD and AWS Deployment        | workflow                                 | actual run status screenshot          | Deployment sequence   | GitHub Actions screenshot useful        | Yes |
| Engineering Challenges          | code-derived challenges                  | debugging history                     | Challenge table       | No                                      | Yes |
| Security and Reliability Review | risks/limits in code                     | threat model                          | Risk matrix           | No                                      | Yes |
| What I Would Improve Today      | hardening opportunities                  | prioritization                        | Improvement roadmap   | No                                      | Yes |
| Current Deployment Status       | workflow, no live URL                    | whether EC2 currently running         | Status facts          | Optional                                | Yes |
| Repository                      | GitHub URL                               | none                                  | Link/action block     | No                                      | No  |
| Lessons                         | implementation-supported lessons         | personal reflection                   | Editorial section     | No                                      | Yes |
| Future Evolution                | recommendations                          | product direction                     | Roadmap               | No                                      | Yes |

## Screenshot and Diagram Plan

| Asset                          | What must be visible                              | Redact/hide                                            | Why it helps                             | Screenshot or diagram            |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------- | -------------------------------- |
| Conversation-thread sidebar    | Thread switching and chat history UI              | Full UUIDs if distracting; private prompts             | Shows memory/thread UX                   | Screenshot                       |
| Streamed assistant response    | Streaming response and status behavior            | User-private content                                   | Proves UI behavior                       | Screenshot                       |
| PDF upload and RAG answer      | PDF attachment, processing toast, grounded answer | Uploaded document content if private                   | Shows document workflow                  | Screenshot plus pipeline diagram |
| Tool execution status          | `Using <tool>` status                             | API outputs if sensitive                               | Shows tool feedback separation           | Screenshot                       |
| HITL approval prompt           | approval/rejection controls                       | Stock symbols if private                               | Proves interrupt/resume UX               | Screenshot plus sequence diagram |
| GitHub Actions workflow        | build/push/deploy/health jobs                     | secret names beyond generic labels, runner identifiers | Proves deployment automation             | Screenshot                       |
| Docker/EC2 deployment evidence | container running and health result               | AWS account IDs, IPs, hostnames                        | Supports deployment status               | Screenshot if redacted           |
| LangSmith trace view           | run name, thread metadata, model/tool spans       | API keys, private prompts, trace IDs as focal content  | Supports observability                   | Screenshot if redacted           |
| LangGraph architecture         | chat node, tool node, loop, checkpointer          | none                                                   | Communicates architecture better than UI | Diagram                          |

## Recommended Repository Improvements

1. Replace calculator `eval` with a safe expression parser.
2. Remove `allow_dangerous_deserialization=True` or guarantee indexes are generated locally and never user-supplied.
3. Scope FAISS indexes by thread, user, or document collection.
4. Mount persistent storage for `chatbot.db` and `faiss_db` in deployment.
5. Add real linting and test commands to CI.
6. Add request timeout/error handling to Alpha Vantage and Tavily paths where possible.
7. Add a non-root container user.
8. Expand `.dockerignore` to exclude `.git`, caches, local DBs, generated FAISS indexes, and temporary artifacts.
9. Replace raw UUID sidebar labels with generated conversation titles.
10. Add README architecture documentation and remove duplicate `README .md` and empty `LLM` file.
11. Document environment variables with current providers only; remove stale OpenAI/Google references unless still supported.
12. Add upload size limits and clearer PDF error states.

## Open Questions for Ritwik

1. Was there a historical Google Embeddings implementation, or should all public wording be corrected to HuggingFace `all-MiniLM-L6-v2`?
2. Was the app actually deployed to EC2 through this workflow, and is it intended to be on-demand only?
3. Are there safe screenshots available for HITL, RAG, tool status, GitHub Actions, and LangSmith?
4. Should the future case study include CI/CD as a major section despite placeholder lint/test steps?
5. Should the case study describe this as completed but not continuously hosted?
6. Are there any measured limitations or failures from the build that should be included as lessons?
