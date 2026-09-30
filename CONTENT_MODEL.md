# CONTENT_MODEL.md

## Content Model Purpose

RITWIK OS is a content-driven engineering platform. The content model defines how projects, writing, builds, architecture notes, and professional metadata should be structured.

The content model must support the tagline:

**Engineering Intelligence into Production.**

Content should be specific, technical, and credible. Avoid placeholder marketing text.

## Content Architecture

Approved content sources:

- MDX files for long-form content
- TypeScript data files for structured site metadata
- Static assets in `public/`

Do not use a database or CMS unless a future approved requirement justifies it.

## Content Collections

### Work

The `work` collection contains flagship projects and selected engineering work.

Purpose:

- Demonstrate engineering capability.
- Show architecture and implementation depth.
- Provide proof of execution.

Recommended fields:

- `title`
- `slug`
- `summary`
- `year`
- `status`
- `role`
- `stack`
- `domains`
- `featured`
- `priority`
- `githubUrl`
- `liveUrl`
- `coverImage`
- `ogImage`
- `metrics`

Required case study sections:

- Executive summary
- Problem
- Context
- Constraints
- Architecture
- Technical decisions
- Tradeoffs
- Implementation details
- Quality strategy
- Outcome
- Lessons learned

Implemented Phase 5 model:

- Long-form body content lives in `src/content/work/*.mdx`.
- Structured metadata lives beside the body in `src/content/work/*.meta.ts`.
- Metadata is validated with Zod in `src/lib/content/schemas.ts`.
- The metadata manifest in `src/lib/content/work-manifest.ts` identifies registered entries for validation.
- The explicit app registry in `src/lib/content/work.ts` imports known metadata and MDX modules so static generation is bundler-visible.
- `/work` lists only registered, non-draft Work entries.
- `/work/[slug]` is generated from known slugs and unknown slugs must return not found.

Current required Work metadata includes:

- `slug`
- `title`
- `shortTitle` when useful
- `category`
- `summary`
- `status`
- `statusLabel`
- `year`
- `featured`
- `ongoing`
- `stack`
- `roles`
- optional `repositoryUrl`
- optional `demoUrl`
- `caseStudyPath`
- `seoTitle`
- `seoDescription`
- optional `publishedDate`
- optional `updatedDate`
- optional truthful `readingTime`
- `draft`
- optional `relatedProjectSlugs`
- optional `currentMilestone`
- `toc` entries whose anchors must match rendered case-study section IDs
- optional `headerFacts` for evidence-oriented case-study facts

Allowed Work status values are:

- `in-development`
- `completed`
- `maintained`
- `archived`

Ongoing entries must use `in-development`. Repository and demo URLs must be omitted when no real project-specific destination exists.

Portfolio projects and published case studies are separate registries. A project
may appear in the V2 Work index without a case-study route; only entries in
`src/lib/content/work-manifest.ts` with real MDX bodies are published. Published
case studies use their metadata-defined TOC and participate in previous/next
navigation. Unpublished portfolio projects must never receive placeholder links.

#### V2 Portfolio Registry

`src/data/projects.ts` is the canonical portfolio registry. Every project has a stable `id`, a `tier` (`flagship`, `selected`, or `archive`), `displayOrder`, evidence highlights, and optional real case-study or repository destinations. A missing `caseStudyPath` means no route is published yet; it is not a placeholder.

Evidence highlights are `delta`, `count`, or `proof`. Delta evidence must include before, after, and context. The flagship order is ThesisLens, TraceForge, Converge. Archive entries may reference their successor through `supersededBy` without being described as failed or obsolete.

`src/data/professional-signals.ts` stores approved public geography signals separately from identity. Public signals are limited to approved relationship labels and must not imply residence or relocation for remote work. Withheld signals must not render.

H1.2 adds the `country-marker` relationship for the public USA marker. It may
render only the approved country-level Scale AI freelance/part-time LLM
evaluation relationship. It must not imply residence, relocation, full-time
employment, or a stronger employment status.

`src/data/capabilities.ts` expresses techniques/tools plus demonstrated project or experience references; it does not use proficiency labels.

TraceForge is an ongoing case study backed by the verified public repository
`https://github.com/rit2001/traceforge`. Its public claims are constrained by
`docs/research/traceforge-evidence.md`: exact replay is fixture-scoped to recorded
model and HTTP outcomes; comparison is structural; Kafka is at least once;
SQLite supplies single-writer event idempotency; and Docker, kind/Kustomize, and
Terraform evidence is local development only. PostgreSQL trace/span persistence,
API-key isolation, asynchronous evaluators, generic OTLP ingestion, consumer
lag, throughput benchmarks, exactly-once semantics, hosted operation, cloud,
and production-scale Kubernetes claims are not supported.

Stateful Agentic AI Assistant is a registered selected Work entry. It is a completed implemented-system case study with a real public GitHub repository and no continuously hosted demo. Its public metadata must use `HuggingFace Embeddings`, not `Google Embeddings`, unless future historical evidence supports both. Human-in-the-Loop claims apply only to verified flows; the implemented interrupt/resume evidence is the simulated stock-purchase action. AWS EC2 deployment is on demand.

ThesisLens is the first V2 flagship case study and the third registered MDX Work
entry. Its public claims are constrained by
`docs/research/thesislens-evidence.md`: the 44-query dataset and 1,012 judgments
describe the full two-company benchmark, while the published nDCG@5, Recall@3,
MRR, and latency comparison describes only the eight-query frozen holdout. The
MiniLM reranker is offline/experimental; lexical retrieval remains the serving
default. Citation wording must describe current-request ID/provenance validation,
not independent semantic entailment.

Converge is the third flagship case study and the fourth registered MDX Work
entry. Its public claims are constrained by
`docs/research/converge-evidence.md`: PostgreSQL establishes a strict monotonic
order per board and commits operation, projection, receipt, heads, undo evidence,
and outbox atomically; Redis Stream delivery is at least once; IndexedDB retains
pending intent before optimism; and snapshot/tail recovery verifies canonical
state before rebasing. Multi-replica evidence is locally failure-tested, while
the recorded deployment uses one API and one worker. Do not claim global order,
exactly-once delivery, production horizontal scale, complete version history,
active production compaction, or tested disaster recovery.

Converge automation must be called CI unless deployment automation is separately
implemented and evidenced. Do not collapse application idempotency and
at-least-once fanout into an exactly-once claim.

The Real-Time Collaborative Whiteboard is historical progression toward
Converge, not a direct code-lineage claim. Its earlier resume-scale statements
must not be reused without fresh repository evidence.

Case-study cover visuals are presentation components, not evidence sources.
ThesisLens, TraceForge, and Converge may share visual-stage infrastructure while
retaining distinct retrieval, replay, and distributed-state diagrams. Their
audited MDX narrative, TOCs, limitations, and canonical project metadata remain
authoritative.

#### Canonical Public Artifact Record

All public artifacts must use these identity fields:

- `RITWIK BISWAS`
- `Software Engineer | Backend, Distributed Systems & AI`
- current base `Kolkata, India`
- `thisisritwikbiswas@gmail.com`
- `https://ritwik-os.vercel.app/`
- canonical GitHub and LinkedIn URLs from `src/data/social-links.ts`

Algorithm evidence is fixed at LeetCode Knight, peak 1923, Top 5.6%, 1,550+
solved, and a 600+ Problem-of-the-Day streak; and Codeforces Specialist, peak
1415, Global Rank 818 in Round 952. Do not silently increase these values.

The public resume PDF is generated from
`resume/ritwik-biswas-resume.tex`. Exact approved replacement copy and its
mismatch audit live in `docs/RESUME_RECONCILIATION.md`. Build to a temporary
path, inspect the rendered page, and verify extracted text and hyperlinks before
replacing the public binary.

### Builds

The `builds` collection contains ongoing engineering work, progress logs, experiments, and implementation notes.

Purpose:

- Show active engineering practice.
- Document progress and decisions.
- Make the platform feel alive without becoming informal filler.

Recommended fields:

- `title`
- `slug`
- `summary`
- `date`
- `status`
- `project`
- `tags`
- `stage`
- `featured`

Recommended sections:

- Build context
- Current state
- Technical challenge
- Decision made
- Next step

### Writing

The `writing` collection contains long-form technical articles.

Purpose:

- Demonstrate communication clarity.
- Explain engineering judgment.
- Publish reusable technical thinking.

Recommended fields:

- `title`
- `slug`
- `description`
- `date`
- `updated`
- `tags`
- `category`
- `featured`
- `readingTime`
- `ogImage`

Acceptable categories:

- Architecture
- Frontend engineering
- Performance
- Testing
- Design systems
- Build notes
- Postmortems
- Technical strategy

### Architecture

The `architecture` collection contains system design notes, architecture decision records, tradeoff analyses, and diagrams.

Purpose:

- Demonstrate senior engineering reasoning.
- Preserve important decisions.
- Show how systems are evaluated.

Recommended fields:

- `title`
- `slug`
- `summary`
- `date`
- `type`
- `status`
- `relatedProjects`
- `tags`

Recommended types:

- Architecture note
- Decision record
- System map
- Tradeoff analysis
- Technical brief

### Profile Metadata

Structured profile data should live in TypeScript files.

Recommended fields:

- Name
- Tagline
- Role summary
- Location if desired
- Contact email
- GitHub URL
- LinkedIn URL
- Resume URL
- Core skills
- Focus areas
- Selected technologies

## Metadata Standards

Every content item should have:

- A stable slug
- A clear title
- A concise summary
- A publication or project date
- Tags or domains where useful
- SEO metadata where appropriate

Avoid:

- Vague summaries
- Empty tags
- Unexplained acronyms
- Inflated claims
- Placeholder text

## Validation Requirements

Content metadata should be validated at build time.

Recommended validation:

- Required fields exist.
- Slugs are unique.
- Dates are valid.
- URLs are valid.
- Featured items have required assets.
- Project priorities do not conflict unexpectedly.

Invalid content should fail the build.

Run content validation with:

```bash
npm run content:check
```

The validator must reject duplicate slugs, malformed internal case-study paths, invalid URLs, empty title/summary/category/stack values, missing MDX modules, and ongoing projects incorrectly marked completed.

Do not downgrade validation failures to warnings.

## MDX Component Standards

MDX content may use approved components for clarity.

Recommended MDX components:

- `Callout`
- `CodeBlock`
- `Metric`
- `Timeline`
- `DecisionRecord`
- `TradeoffMatrix`
- `SystemMap`
- `TechStackGrid`

MDX components should be accessible, responsive, and visually consistent with the design system.

Block-safe wrapper rule:

- Components that accept arbitrary MDX block children must not render a wrapping `<p>`.
- Use block-safe structural elements such as `<div>`, `<section>`, or `<aside>` for wrappers around MDX children.
- Let the global MDX paragraph mapping own paragraph semantics.
- Run `npm run mdx:check` to catch nested paragraph and nested anchor regressions.

Case-study presentation rule:

- Long-form case studies should keep a comfortable technical reading column and a compact supporting TOC; the TOC must not compete with the article.
- Architecture flows with long labels should use semantic vertical pipelines before horizontal or multi-column diagrams.
- Prefer editorial rows, definition-list patterns, and staged sequences over excessive mini-card grids for planned boundaries, open questions, metrics, load testing, and roadmap content.

## Asset Standards

Project assets should be:

- Optimized
- Named clearly
- Stored by content type or project
- Given meaningful alt text when informative

Recommended structure after implementation:

```text
public/
  images/
    projects/
    writing/
    og/
    profile/
```

## Editorial Standards

Write with engineering precision.

Content should:

- Be concrete
- Explain context
- Name constraints
- Describe tradeoffs
- Avoid hype
- Avoid generic marketing phrases

Ongoing-project truthfulness rules:

- Label proposed architecture as proposed.
- Label roadmap items as future work, not completed work.
- Do not invent benchmark numbers, performance claims, users, adoption, deployments, repositories, demos, or production readiness.
- Replace assumptions with measured evidence only after implementation produces it.
- Use one prominent scope/status disclaimer near the beginning instead of repeating defensive limitations throughout the page.
- Prefer confident public engineering language over internal prompt-constraint phrasing.
- Use status-based roadmap groups such as Current, Next, and Planned for ongoing builds.
- Present planned-versus-implemented distinctions in section labels and body copy.
- Give enough technical detail for engineers
- Give enough summary clarity for recruiters

Completed-system truthfulness rules:

- Distinguish implemented behavior from operational hardening that remains future work.
- Qualify deployment claims when a project is deployed on demand or not continuously hosted.
- Do not treat placeholder CI steps as real linting or tests.
- Document persistence scope when storage is local to a container filesystem.
- Use repository links only when they point to a real project-specific repository.
- Avoid turning tool-using agent workflows into unsupported multi-agent claims.

Each flagship case study should be understandable at two levels:

1. Recruiter-level summary.
2. Engineer-level technical depth.

## SEO Standards

Each public route should support:

- Page title
- Description
- Canonical URL
- Open Graph metadata
- Useful social preview image
- Structured data where appropriate

Writing and project pages should have high-quality descriptions that accurately summarize the page.
