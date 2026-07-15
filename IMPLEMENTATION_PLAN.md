# IMPLEMENTATION_PLAN.md

## Implementation Plan

This document defines the recommended development sequence for RITWIK OS.

Do not interpret this plan as permission to start implementation. Implementation should begin only when explicitly requested.

## Project Direction

RITWIK OS is a static-first engineering platform and personal engineering brand.

Tagline:

**Engineering Intelligence into Production.**

It will be implemented with:

- Next.js
- TypeScript
- Tailwind CSS
- MDX
- Framer Motion
- Vercel

It will not include authentication, databases, users, CRUD flows, or SaaS dashboard features.

## Phase 0: Planning Foundation

Status: Complete when the root documentation files exist.

Deliverables:

- `AGENTS.md`
- `PROJECT_MEMORY.md`
- `PRODUCT_SPEC.md`
- `DESIGN_SYSTEM.md`
- `CONTENT_MODEL.md`
- `IMPLEMENTATION_PLAN.md`
- `README.md`

Purpose:

- Preserve product intent.
- Prevent incorrect SaaS assumptions.
- Guide future implementation.
- Establish quality standards.

## Phase 1: Project Initialization

Goal:

Create the technical foundation without building the full site.

Tasks:

- Initialize Next.js with TypeScript.
- Add Tailwind CSS.
- Configure ESLint.
- Configure formatting.
- Add basic `app/` structure.
- Add global styles.
- Add initial metadata.
- Confirm local development command.

Acceptance criteria:

- App runs locally.
- Production build succeeds.
- Type checking succeeds.
- No product routes beyond initial shell unless explicitly included.

## Phase 2: Repository Structure

Goal:

Create durable project boundaries.

Expected directories:

```text
app/
components/
content/
data/
lib/
public/
styles/
tests/
docs/
```

Tasks:

- Establish layout component boundaries.
- Create initial design token files.
- Create content directory structure.
- Create utility boundaries.
- Add documentation for architectural decisions when needed.

Acceptance criteria:

- Directory structure matches the approved architecture.
- No unused complex abstractions.
- Documentation reflects any deviations.

## Phase 3: Design System Foundation

Goal:

Implement the visual and component primitives needed for the platform.

Tasks:

- Define semantic CSS variables.
- Configure Tailwind token mapping.
- Implement typography defaults.
- Implement layout containers.
- Implement base components.
- Implement focus styles.
- Implement responsive rules.

Initial components:

- Button
- IconButton
- Badge
- Tag
- Card
- SectionHeader
- LinkCard
- ProjectCard
- ArticleCard
- Callout
- CodeBlock

Acceptance criteria:

- Components are accessible.
- Components use semantic tokens.
- Components work across mobile and desktop.
- No visual system depends on placeholder marketing content.

## Phase 4: Content Pipeline

Goal:

Make the platform content-driven.

Tasks:

- Add MDX support.
- Define content collections.
- Validate frontmatter at build time.
- Add slug generation or slug validation.
- Add reading-time calculation for writing.
- Add content sorting and filtering utilities.
- Add MDX component mapping.

Acceptance criteria:

- Invalid content fails the build.
- Content pages can be generated statically.
- Content utilities are tested.
- MDX rendering supports code, callouts, links, tables, and images.

Current implementation note:

In the active product sequence, this work was delivered as Phase 5 after the Phase 4 homepage freeze. The implemented scope is intentionally narrow: official Next.js MDX integration, typed TypeScript metadata, Zod validation, an explicit Work registry, `/work`, `/work/[slug]`, and the first TraceForge case study. Writing, Builds, Architecture, and additional content collections remain deferred until real content exists.

## Phase 5: Core Routes

Goal:

Build the first production-quality version of the site.

Routes:

- `/`
- `/work`
- `/work/[slug]`
- `/writing`
- `/writing/[slug]`
- `/builds`
- `/builds/[slug]`
- `/architecture`
- `/about`
- `/resume`
- `/contact`

Acceptance criteria:

- Navigation is clear.
- Recruiter journey is obvious.
- Engineering depth is reachable quickly.
- Pages are statically generated where possible.
- Metadata exists for major routes.

Current route note:

Only the real routes required by the content-pipeline milestone are implemented:

- `/`
- `/work`
- `/work/traceforge`

Do not add Writing, Builds, Architecture, About, Contact, or placeholder project routes until their first real content and route requirements are approved.

## Phase 6: Motion And Interaction

Goal:

Add restrained, useful motion.

Tasks:

- Add Framer Motion where it clarifies transitions.
- Add active navigation states.
- Add subtle section reveals.
- Add interaction feedback for project and article cards.
- Respect reduced motion preferences.

Acceptance criteria:

- Motion does not block reading.
- Motion does not hurt performance.
- Site works with reduced motion enabled.

## Phase 7: SEO, Accessibility, And Performance

Goal:

Harden the site for production.

Tasks:

- Add full metadata.
- Add Open Graph images.
- Add sitemap.
- Add robots configuration.
- Add structured data.
- Audit heading structure.
- Audit keyboard navigation.
- Optimize images.
- Review bundle size.
- Check Core Web Vitals.

Acceptance criteria:

- Lighthouse scores are strong.
- Accessibility issues are resolved.
- SEO metadata is accurate.
- No significant layout shift.

## Phase 8: Testing

Goal:

Protect the site from regressions.

Tasks:

- Add unit tests for content utilities.
- Add tests for metadata helpers.
- Add Playwright route smoke tests.
- Add mobile navigation tests.
- Add visual regression tests for key pages.
- Add accessibility checks where practical.

Acceptance criteria:

- Typecheck passes.
- Lint passes.
- Unit tests pass.
- E2E smoke tests pass.
- Production build passes.

## Phase 9: Deployment

Goal:

Deploy the site on Vercel.

Tasks:

- Connect repository to Vercel.
- Configure production domain.
- Configure preview deployments.
- Configure environment assumptions if needed.
- Add deployment documentation.
- Validate production pages.

Acceptance criteria:

- Production deployment succeeds.
- Preview deployments work.
- Sitemap and metadata are correct.
- Core routes are verified after deployment.

## Phase 10: Content Expansion

Goal:

Grow the platform with high-quality engineering content.

Tasks:

- Add flagship case studies.
- Add architecture notes.
- Add technical articles.
- Add build logs.
- Add diagrams and screenshots.
- Improve internal linking.

Acceptance criteria:

- Content remains specific and technical.
- Recruiter path remains clear.
- Site does not become cluttered.
- Content schema continues to validate.

## Phase 6.0: Agentic AI Evidence Audit

Goal:

Audit the public Stateful Agentic AI Assistant repository before creating a public case study.

Deliverables:

- `docs/research/agentic-ai-assistant-evidence.md`
- Phase status update in `PROJECT_MEMORY.md`
- Phase 6.0/6.1 sequencing in this implementation plan

Acceptance criteria:

- External repository commit is recorded.
- Claims are classified as verified, inference, historical/conflicting, unverified, or planned improvement.
- Architecture, memory, RAG, tools, HITL, streaming, observability, Docker, CI/CD, security, and limitations are documented from source evidence.
- Known factual conflicts are documented before publication.
- No public case-study route is created in this phase.

## Phase 6.1: Agentic AI Case Study Implementation

Goal:

Create the public Stateful Agentic AI Assistant Work entry and case-study route using the Phase 6.0 evidence report.

Tasks:

- Correct current project metadata where the audit found conflicts.
- Add typed Work metadata and MDX content for the case study.
- Reuse or extend case-study components only where the evidence requires it.
- Add repository link to the real public GitHub repository.
- Qualify deployment, memory durability, CI/test coverage, and observability claims accurately.
- Run content validation and the full quality gate.

Acceptance criteria:

- Public copy is evidence-backed.
- Unsupported claims from the audit are avoided.
- The page is statically generated through the existing Work registry.
- Homepage changes are limited to truthful metadata/link updates for this real case study.
- No screenshots are added unless they are reviewed and redacted.

Status:

Completed as the second Work case study at `/work/stateful-agentic-ai-assistant`.

Implementation notes:

- Public wording uses HuggingFace `all-MiniLM-L6-v2` embeddings with FAISS, not Google Embeddings.
- The project is presented as completed but not continuously hosted.
- GitHub remains a secondary external action alongside the internal case-study route.
- The page uses implemented-system flow components for LangGraph control flow, memory/threading, RAG, HITL, deployment, reliability review, and improvement priorities.
- Deployment and CI wording remains qualified because lint and unit-test workflow steps are placeholders.

## Quality Gates

Future implementation should not be considered complete unless:

- TypeScript passes.
- Linting passes.
- Build passes.
- Content validation passes.
- Core routes render.
- Mobile layout is checked.
- Keyboard navigation is checked.
- Reduced motion behavior is checked.
- Important pages have metadata.
