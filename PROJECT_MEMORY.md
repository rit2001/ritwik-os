# PROJECT_MEMORY.md

## Long-Term Source of Truth

This file is the long-term memory for future AI sessions and contributors working on RITWIK OS.

Read this file before making architectural, implementation, design, or content decisions.

## Project Identity

Project name:

**RITWIK OS**

Approved tagline:

**Engineering Intelligence into Production.**

RITWIK OS is a production-grade engineering platform and personal engineering brand. It is designed to present Ritwik's engineering work, architecture thinking, technical writing, ongoing builds, and professional signal in a memorable, credible, and recruiter-friendly way.

## Correct Product Interpretation

RITWIK OS is best understood as an **Engineering Control Plane**.

It is not an operating system product. It is not a SaaS application. It is not a dashboard application. It is not a CRUD tool.

The "OS" language should communicate structured engineering intelligence, production taste, systems thinking, and a curated technical surface.

## Explicitly Rejected Assumptions

Do not reintroduce the following assumptions:

- No users
- No authentication
- No database
- No PostgreSQL
- No Prisma
- No CRUD application
- No task manager
- No notes app
- No file manager
- No SaaS dashboard
- No admin panel
- No multi-user system
- No plugin marketplace
- No payment system

If a future feature appears to need one of these concepts, pause and confirm the product reason before implementing it.

## Approved Technical Direction

The approved implementation stack is:

- Next.js
- TypeScript
- Tailwind CSS
- MDX
- Motion (`motion/react`)
- Vercel

The architecture should be static-first.

Content should be stored in the repository as MDX and structured TypeScript metadata. Build-time validation should enforce content correctness.

## Primary Goals

RITWIK OS exists to:

1. Showcase engineering work.
2. Present flagship projects with depth and clarity.
3. Document ongoing engineering builds.
4. Publish engineering articles.
5. Demonstrate architecture thinking.
6. Create a memorable recruiter experience.
7. Prove production-grade frontend engineering quality.

## Primary Audience

The platform should serve:

- Recruiters evaluating professional fit quickly
- Engineering managers looking for depth and judgment
- Senior engineers reviewing technical quality
- Collaborators evaluating taste and execution
- Readers interested in architecture and implementation writing

Recruiters should be able to understand the professional story quickly. Engineers should be able to inspect deeper technical content.

## Experience Direction

The site should feel like:

- A control plane for engineering work
- A curated technical archive
- A production-quality personal platform
- A system of record for projects, writing, builds, and architecture notes

It should not feel like:

- A generic portfolio template
- A marketing landing page
- A SaaS dashboard
- A fake desktop environment
- A visual gimmick

## Information Architecture

Expected primary routes:

- `/` - home and control-plane entry
- `/work` - flagship projects and selected engineering work
- `/work/[slug]` - project case studies
- `/builds` - ongoing engineering builds and build logs
- `/builds/[slug]` - individual build entries or build series
- `/writing` - technical articles
- `/writing/[slug]` - article detail pages
- `/architecture` - architecture notes and systems thinking
- `/about` - professional background and engineering principles
- `/resume` - recruiter-friendly resume page
- `/contact` - contact and professional links

Optional future routes:

- `/lab` - interactive technical experiments
- `/uses` - tools and engineering environment
- `/now` - current focus
- `/colophon` - how RITWIK OS is built

## Content Types

Core content types:

- Work
- Builds
- Writing
- Architecture notes
- Resume/profile metadata
- Professional links

Each content type should have a clear schema and validation.

## Design Direction

The design should be:

- Technical
- Precise
- High-signal
- Calm
- Distinctive
- Accessible
- Fast
- Content-forward

Use motion sparingly and intentionally. The `motion` package should clarify hierarchy and transitions, not become the experience itself.

## Engineering Quality Bar

Future implementation should include:

- Type-safe content loading
- Validated frontmatter
- Semantic page structure
- Strong metadata and SEO
- Open Graph support
- Responsive design
- Accessibility checks
- Performance budgets
- Tests for core behavior
- Clear documentation

## Content Quality Bar

No placeholder marketing filler.

Project and article content should be specific, technical, and credible. Case studies should explain:

- Problem
- Context
- Constraints
- Architecture
- Decisions
- Tradeoffs
- Implementation highlights
- Testing and quality approach
- Outcomes
- Lessons learned

## Current Repository State

Phase 0 planning documentation has been completed.

Phase 1 project initialization has been completed with a minimal Next.js foundation:

- Next.js App Router
- TypeScript with strict mode
- Tailwind CSS
- ESLint
- Prettier
- `src/` directory
- npm
- `@/*` import alias

The initial app contains only a restrained temporary foundation shell. It is not the final homepage.

No authentication, database, API routes, MDX pipeline, motion package, analytics, testing framework, final navigation, project cards, personal links, or invented content has been added.

Phase 2 repository structure and design-system foundation has been completed:

- Semantic CSS tokens in `src/styles/tokens.css`
- Global base styling in `src/styles/base.css`
- `src/app/globals.css` as the Tailwind and global style entry point
- Minimal layout primitives in `src/components/layout/`
- Minimal UI primitives in `src/components/ui/`
- Shared brand constants in `src/data/site.ts`
- Root application shell with header, main landmark, footer, skip link, focus styles, reduced-motion handling, and responsive gutters

The home page remains a temporary foundation screen and is not the final homepage.

Phase 3 real identity, brand shell, and first visual prototype has been completed:

- Canonical identity data lives in `src/data/profile.ts`.
- Canonical external link data lives in `src/data/social-links.ts`.
- Site metadata and brand constants live in `src/data/site.ts`.
- Display name is `RITWIK BISWAS`; editorial metadata name is `Ritwik Biswas`.
- Public email is `biswas.ritwik2001@gmail.com`; no secondary email or phone number is displayed.
- Primary professional positioning is Software Engineer work across AI systems, scalable backend platforms, and cloud-native infrastructure.
- Header and footer expose only recruiter-readable actions: GitHub, LinkedIn, Resume, and Email where appropriate.
- LeetCode, Codeforces, and X are stored in canonical data for later placement, but are not part of the first viewport or primary footer.
- The resume PDF is served from `/resume/ritwik-biswas-resume.pdf`.
- The first visual prototype is typography-led and does not use a profile photograph, generated imagery, fake terminal, fake OS chrome, invented metrics, or decorative dashboards.
- TraceForge is represented truthfully as an in-development current build with no invented GitHub URL, demo URL, users, adoption, throughput, or production status.

Phase 4 full homepage control plane has been completed:

- The homepage is a complete single-page recruiter-ready control plane with stable anchors: `overview`, `systems`, `experience`, `capabilities`, `algorithms`, and `contact`.
- Header navigation uses understandable anchor labels: Systems, Experience, Capabilities, Algorithms, and Contact.
- Homepage content is driven by typed data modules: `src/data/projects.ts`, `src/data/experience.ts`, `src/data/capabilities.ts`, `src/data/competitive-programming.ts`, and `src/data/recruiter-brief.ts`.
- The selected systems are TraceForge, Stateful Agentic AI Assistant, AI Mock Interview Platform, and Real-Time Collaborative Whiteboard.
- TraceForge remains the canonical flagship current build. Its repository is not published yet, and the homepage must not link GitHub as if it were the TraceForge repository.
- Project presentation is text-first. Screenshots and image assets are intentionally deferred until polished recaptures exist.
- LeetCode and Codeforces are shown as algorithmic evidence. X remains stored in canonical links but is not shown in the homepage header, hero, or primary footer.
- No MDX, additional routes, screenshots, live fetching, fake metrics, charts, new dependencies, or decorative terminal/OS gimmicks were added.

Phase 4.5 motion, interaction, and scroll rhythm has been completed:

- The current stable `motion` package is used with React imports from `motion/react`; the deprecated `framer-motion` package name was not installed.
- Motion is isolated in small client components under `src/components/motion/`; the homepage remains primarily server-rendered.
- Major homepage sections use restrained one-time reveal/stagger behavior with opacity and small vertical transforms.
- Header anchor navigation tracks visible sections without continuously mutating the URL.
- A transform-based scroll progress line appears at the top edge when reduced motion is not requested.
- The hero uses subtle desktop-only scroll response with no blur, scale, 3D transform, or scroll hijacking.
- The Experience timeline has a scroll-linked progress line and active markers while preserving the exact role order and content.
- The homepage remains visually continuous in the dark RITWIK OS engineering identity through the footer.
- Reduced-motion mode removes movement, parallax, stagger delays, and the scroll progress indicator while keeping all content immediately visible.
- Scroll hijacking, decorative ripple effects, magnetic buttons, custom cursors, continuous animation, and animated backgrounds remain rejected.

Phase 4.6 final interaction, motion, and narrative polish has been completed:

- Phase 4 homepage experience is now considered complete enough to proceed to the content pipeline and project case-study architecture.
- Shared motion values are centralized for section reveal travel, internal stagger, duration, easing, and viewport behavior.
- Motion is progressive enhancement: reveal states begin from visible content rather than fully hidden content, so content is not dependent on animation startup.
- Interactive surfaces and static surfaces have different rules. Real links can lift, brighten, show accent borders, and use pressed states; static information surfaces cannot use pointer-like lift or fake actions.
- TraceForge's current-build panel uses one-time internal sequencing, accent-line reveal, and a finite status pulse without fake progress or repository links.
- Selected project cards with real destinations are card-level accessible anchors; at Phase 4 completion this meant GitHub destinations only, and Phase 5 later added the internal TraceForge case-study destination.
- Capabilities are presented as one cohesive capability matrix with internal divisions instead of six independent floating cards.
- LeetCode and Codeforces profile surfaces are single-destination interactive anchors with visible hover, focus, pressed, and sequential stat reveal behavior.
- Recruiter Brief, education, Contact, and footer now remain in the dark graphite visual system; the previous warm-light zone and large transition bridge were removed.
- Primary actions now rest in neutral/accent-muted states and move to stronger accent treatment on hover or keyboard focus.

Phase 4.7 final visual acceptance and homepage consistency has been completed:

- Phase 4 is visually complete; no further homepage redesign is recommended before Phase 5.
- The page remains dark from hero through footer using deep black, graphite surfaces, soft white text, controlled gray hierarchy, and restrained blue accents.
- The large dark-to-light bridge, warm recruiter zone, and light footer treatment were removed.
- Recruiter Brief uses dark editorial proof blocks for production delivery, systems breadth, and algorithmic depth instead of plain paragraphs.
- Education is a dark evidence block with internal dividers and sequenced reveal.
- Experience timeline markers are circular with muted inactive and accented active states.
- Header active-section observation is tuned so Contact activates only when the Contact section is dominant.
- Action links use one bounded dark action system across hero, recruiter brief, contact, and footer-adjacent surfaces.

Phase 5 static content pipeline and TraceForge case study has been completed:

- Phase 4 homepage remains frozen except for truthful TraceForge links to the new case study.
- Local MDX support is configured through the official Next.js App Router MDX integration.
- Long-form Work content lives in `src/content/work/`; structured metadata remains in adjacent typed TypeScript files.
- Work metadata is validated with Zod through an explicit module registry in `src/lib/content/work.ts`.
- `npm run content:check` validates registered Work entries and must fail on invalid metadata, duplicate slugs, malformed internal paths, invalid URLs, missing MDX modules, empty critical fields, or ongoing projects incorrectly marked completed.
- `/work` lists only real registered Work entries. It must not contain placeholders for future projects.
- `/work/[slug]` is statically generated from known slugs and returns not found for unknown entries.
- TraceForge is the first complete Work case study at `/work/traceforge`.
- TraceForge is documented truthfully as an ongoing build in architecture and repository-bootstrap phase. It has no public repository, demo, production deployment, verified performance result, throughput claim, adoption claim, or fake benchmark.
- Proposed architecture, roadmap, service boundaries, and engineering decisions must be labelled as planned or proposed until implementation evidence exists.
- Future case studies must use validated metadata, local MDX bodies, real links only, and evidence-backed claims.

Phase 5.1 TraceForge editorial and case-study presentation refinement has been completed:

- Global header navigation is route-aware. The homepage keeps its anchor navigation, while `/work` and `/work/[slug]` use Home, Work, Resume, GitHub, and LinkedIn.
- Work is the active global navigation item on Work index and Work detail routes; homepage anchor labels must not appear on case-study routes.
- TraceForge uses a structured article layout with an accessible "On This Page" navigation rail and stable heading anchors.
- Case-study content should use public engineering language, not internal prompt language or repeated defensive disclaimers.
- Ongoing-build pages should use one prominent scope/status note near the beginning, then maintain planned-versus-implemented language throughout.
- TraceForge now uses structured case-study blocks for goals/current scope, current milestone, proposed architecture, service boundaries, decisions, open questions, planned signals, load-testing method, roadmap, and status summary.
- Architecture flow must remain semantic HTML, readable without animation, and labelled as proposed when implementation is not complete.
- Roadmaps for ongoing work use Current, Next, and Planned groups without percentages, fake completion dates, or completed-state indicators.

Phase 5.2 TraceForge hydration repair and final case-study acceptance has been completed:

- MDX wrapper components that accept arbitrary block children must use block-safe structural elements, not paragraph wrappers. `CaseStudyCopy` uses a `<div>` wrapper so MDX paragraphs remain valid and hydration-safe.
- `npm run mdx:check` validates representative MDX wrapper output for nested paragraph and nested anchor regressions.
- Case-study detail pages use a laptop-first article layout: the main reading column remains dominant, while the "On This Page" navigation is a compact rail on wide screens and an inline disclosure on smaller screens.
- TraceForge uses a vertical proposed-architecture pipeline instead of a cramped multi-column node layout.
- Case-study sections should prefer narrative copy, editorial rows, definition matrices, and vertical sequences over excessive small bordered tiles.
- The homepage remains frozen during Phase 5.2; changes are limited to Work detail presentation, shared case-study components, and documentation.

Phase 6.0 Stateful Agentic AI Assistant repository evidence audit has been completed:

- The public repository `https://github.com/rit2001/Agentic-Chatbot-AWS` was audited at commit `b1b19d0a68894a2392a32566df255c76776a2fc7`.
- The audit is documentation-only and does not add a public case-study route.
- Evidence is recorded in `docs/research/agentic-ai-assistant-evidence.md`.
- The future case study must distinguish verified code evidence, inference, historical/conflicting claims, unverifiable claims, and planned improvements.
- Current public repository evidence supports a Streamlit + LangGraph + Groq + SQLite checkpointing + HuggingFace embeddings + FAISS + Docker/GitHub Actions/EC2 deployment story.
- The existing RITWIK OS project data currently says `Google Embeddings`, but the audited repository uses `HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")`; Phase 6.1 should correct public wording unless historical evidence proves both.
- Do not claim multi-agent architecture, real stock trading, permanent cross-container cloud memory, zero-downtime deployment, automated lint/test coverage, high availability, or continuously available demo for this project unless new evidence is provided.

Phase 6.1 Stateful Agentic AI Assistant public case study has been completed:

- `/work/stateful-agentic-ai-assistant` is the second real Work case study.
- The homepage and Work Registry now link the Stateful Agentic AI Assistant project to its internal case study and preserve GitHub as a secondary external action.
- Public project data was corrected from `Google Embeddings` to `HuggingFace Embeddings` to match the audited repository.
- The case study presents the project as a completed implementation with qualified deployment status, not a continuously hosted SaaS product.
- The page documents LangGraph control flow, thread-scoped SQLite checkpointing, HuggingFace/FAISS RAG, six verified tools, simulated stock-purchase HITL, Streamlit streaming, LangSmith tracing configuration, Docker packaging, GitHub Actions, Docker Hub, and EC2 container replacement.
- Deployment wording must remain qualified: Docker image publishing, EC2 container replacement, and health verification are implemented, while lint/unit-test steps are placeholders and no zero-downtime or high-availability claim is supported.
- Memory wording must remain qualified: SQLite checkpoints and FAISS are container-local under the audited deployment because no persistent volume is mounted.
- Completed-system case studies may use implemented execution-flow diagrams, state-transition diagrams, and reliability reviews rather than TraceForge-style proposed architecture/open-question patterns.

Production hardening and launch-readiness has been completed:

- Launch-facing site identity is centralized in `src/config/site.ts`.
- Site URL resolution lives in `src/lib/site-url.ts`; production previews should set `NEXT_PUBLIC_SITE_URL` to the real public URL. Fake domains must not be used.
- Root metadata now includes title templates, description, authorship, robots defaults, Open Graph, and Twitter-card metadata.
- Social preview imagery is generated by the App Router at `/opengraph-image` using a dark RITWIK OS visual treatment.
- Conservative JSON-LD is emitted for the homepage and Work detail pages. Structured data must use verified public facts only.
- App Router `robots.ts` and `sitemap.ts` include only implemented routes and registered Work entries.
- A custom dark not-found experience exists for unknown routes.
- `npm run routes:check` validates route/content integrity from source registries.
- `npm run verify` is the non-mutating launch quality gate: MDX semantics, content validation, route validation, lint, typecheck, format check, and production build.
- Browser console launch QA should use a clean profile or disabled DOM-modifying extensions such as Dark Reader, because extension-injected attributes can create false hydration warnings.
- Manual launch tracking lives in `docs/LAUNCH_CHECKLIST.md`.

## V2 Content Model — Phase 8.3

Phase 8.3 is complete on branch `feat/ritwik-os-v2` in the canonical workspace
`/Users/ritwikbiswas/Developer/ritwik-os`.

- `src/data/profile.ts` is the authoritative public identity record: Ritwik Biswas, Kolkata, India, `thisisritwikbiswas@gmail.com`, approved availability, and education.
- Portfolio hierarchy is canonical: ThesisLens, TraceForge, and Converge are flagship; Stateful Agentic AI Assistant and AI Mock Interview Platform are selected; Real-Time Collaborative Whiteboard is archive and superseded by Converge.
- Public professional signals are evidence-oriented. They must not imply relocation or physical residence for remote work; no United States signal is public.
- Work case-study routes remain limited to real registered MDX entries: TraceForge and Stateful Agentic AI Assistant. ThesisLens and Converge have no placeholder route.
- The baseline resume PDF remains intentionally untouched until the later resume/SEO phase.

## Next Expected Phase

Phase 8.4 static homepage hierarchy is complete on `feat/ritwik-os-v2`:

- Homepage order is Hero, Credibility Rail, Flagship Systems, Experience, Capability Evidence Map, Foundations, Contact, and Footer.
- ThesisLens, TraceForge, and Converge are presented as distinct editorial flagship sections with static semantic architecture flows and evidence-first hierarchy.
- The hero includes a static SVG professional topology with adjacent text; it requires no client JavaScript and does not imply relocation or residence for remote work.
- Standalone Current Build, Recruiter Brief, and legacy-project homepage cards are no longer rendered.
- ThesisLens and Converge do not expose placeholder actions or routes. TraceForge retains its real case-study action.
- Existing client boundaries are limited to the established navigation, scroll progress, provider, and restrained section reveal primitives; homepage content remains present without motion.

Phase 8.5 Work index and evidence primitives are complete on `feat/ritwik-os-v2`:

- `/work` is organized from the canonical registry into Flagship Systems, Selected Earlier Work, and Archive / Superseded sections.
- Portfolio projects can remain visible without routes; only the registered TraceForge and Stateful Agentic AI Assistant MDX entries resolve as case studies.
- Case-study headers, facts, TOCs, and previous/next navigation are metadata-driven. TOC anchors are validated against the authored MDX section IDs.
- Shared evidence primitives provide metric deltas, semantic evidence tables, responsive system flows, invariant callouts, trade-off records, and case-study fact lists without introducing dependencies.
- ThesisLens and Converge have no placeholder case-study route or action. The resume PDF remains unchanged.

## Next Expected Phase

Phase 8.6 ThesisLens evidence audit and case study are complete on `feat/ritwik-os-v2`:

- The authoritative public source is `https://github.com/rit2001/thesislens`, audited at commit `a1a394c13977fc83d8cf2b80bbeec2efc7c5d902` with its 221-test zero-cloud suite passing.
- Evidence and safe wording are recorded in `docs/research/thesislens-evidence.md`.
- `/work/thesislens` is a real registered MDX case study. Published-only navigation now orders ThesisLens, TraceForge, and Stateful Agentic AI Assistant.
- The 44-query, 1,012-pair dataset is content-adjudicated across Apple and Tesla FY2024. The reported nDCG@5, Recall@3, MRR, and latency comparison uses the eight-query frozen final holdout.
- The fine-tuned MiniLM reranker remains offline and experimental after a mixed result; lexical retrieval remains the serving default.
- Citation controls validate current-request evidence IDs and report scope. They are not described as independent semantic-entailment verification.
- Converge and AI Mock Interview Platform still have no case-study routes. No dependencies, resume assets, global SEO, or interactive-topology work changed.

## Next Expected Phase

Phase 8.7 TraceForge evidence audit and case-study rewrite are complete on `feat/ritwik-os-v2`:

- The authoritative public source is `https://github.com/rit2001/traceforge`, audited at `660506fe07f0fb99d8829340121b9c537ec5616d`; evidence and safe wording are recorded in `docs/research/traceforge-evidence.md`.
- `/work/traceforge` now centers immutable Replay Capsules, exact offline recorded model/HTTP playback, normalized structural comparison, developer-authored regression specifications, and pytest export.
- The optional Go/Kafka path is described as bounded queue acceptance plus at-least-once delivery and single-writer SQLite event-ID idempotency. A gateway `202` is not broker acknowledgement or sealed evidence.
- PostgreSQL, API-key/tenant isolation, asynchronous evaluators, consumer lag, throughput/latency metrics, and production-scale implications were removed. Generic tools, real-agent capture, fork replay, richer diffs, recovery operations, and benchmarks remain planned.
- Native OpenTelemetry/Prometheus instrumentation, non-root Docker images, one verified local kind deployment, and a narrow locally verified Terraform foundation remain bounded development evidence—not cloud or production claims.
- The verified public repository action now derives from canonical project metadata. Published-only navigation remains ThesisLens, TraceForge, and Stateful Agentic AI Assistant; Converge still has no route.
- No dependencies, resume assets, global SEO, deployment, or interactive-topology work changed.

## Phase 8.8 — Converge Evidence Audit and Case Study

Phase 8.8 is complete on `feat/ritwik-os-v2`:

- The authoritative public source is `https://github.com/rit2001/converge`,
  audited at `966525daa9f9bea479c7f9d28d2cf3dcd9f735f2`; evidence and safe
  wording are recorded in `docs/research/converge-evidence.md`.
- `/work/converge` is a real registered MDX case study. Published-only
  navigation now orders ThesisLens, TraceForge, Converge, and Stateful Agentic
  AI Assistant.
- PostgreSQL establishes a strict monotonic total order per board. Operation,
  projection, receipt, board heads, undo evidence, and outbox commit or roll
  back together; stable operation receipts provide application idempotency, not
  exactly-once delivery.
- Redis Stream delivery is at least once and non-authoritative. IndexedDB
  retains pending command identity before optimism, while generation fencing,
  fixed-watermark catch-up, and verified snapshot/tail recovery bound reconnect
  and reconstruction.
- Recorded release evidence includes 245 PostgreSQL integration tests across 29
  files, 59 failure-injection scenarios, 93 production-build Chromium
  scenarios, and one explicitly bounded 10-editor local k6 baseline.
- The component-library figure is corrected to 39 architecture presets built
  from 12 primitives. Docker is limited to local Docker Compose dependencies,
  GitHub automation is described as CI, and complete version-history restore is
  not claimed.
- The recorded deployment uses one API and one worker. Production horizontal
  scale, exactly-once delivery, active compaction, tested backup restore,
  adoption, HA, and multi-region operation remain excluded.
- No dependencies, resume assets, global SEO, deployment, or interactive
  topology work changed.

## Mandatory Human Review Gate

Before any further V2 phase, review the homepage, `/work`, ThesisLens,
TraceForge, and Converge together for public claim accuracy, editorial balance,
responsive behavior, and recruiter readability.
