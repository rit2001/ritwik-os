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

Allowed Work status values are:

- `in-development`
- `completed`
- `maintained`
- `archived`

Ongoing entries must use `in-development`. Repository and demo URLs must be omitted when no real project-specific destination exists.

TraceForge is the first registered Work entry. It is an ongoing build case study, not a completed-project page. Its metadata must continue to omit repository and demo URLs until real destinations exist.

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
