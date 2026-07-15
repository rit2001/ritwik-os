# AGENTS.md

## Purpose

This file defines how AI coding agents and human contributors should work inside the RITWIK OS repository.

RITWIK OS is a production-grade engineering platform and personal engineering brand with the tagline:

**Engineering Intelligence into Production.**

The project exists to demonstrate software engineering excellence through flagship project case studies, architecture thinking, technical writing, build logs, and a memorable recruiter experience.

## Non-Negotiable Product Constraints

RITWIK OS is not a SaaS product.

Do not introduce:

- Authentication
- User accounts
- Databases
- CRUD product flows
- Admin dashboards
- Multi-tenant architecture
- Payment systems
- Role-based permissions
- Backend services unless a static-first implementation cannot satisfy a specific approved requirement

The approved implementation direction is a static-first Next.js application using TypeScript, Tailwind CSS, MDX, Framer Motion, and Vercel.

## Engineering Operating Principles

1. Preserve the product intent.
   Every change should support the platform's purpose: showcasing engineering work, architecture judgment, writing quality, and production taste.

2. Prefer static-first architecture.
   Content should come from local source-controlled files, primarily MDX and TypeScript metadata. Runtime services are not part of the default architecture.

3. Optimize for credibility.
   Avoid gimmicks, fake operating-system interactions, and decorative complexity that weakens usability or technical clarity.

4. Build with durable boundaries.
   Keep content, presentation components, layout components, design tokens, and utility logic separated.

5. Make correctness visible.
   Validate content metadata, enforce TypeScript safety, test critical paths, and keep documentation current.

6. Keep performance and accessibility architectural.
   Do not treat performance or accessibility as final cleanup tasks.

## Expected Stack

Future implementation should use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX
- Framer Motion
- Vercel

Supporting libraries may be added only when they solve a clear problem and fit the static-first architecture.

Likely supporting tools:

- Zod for content/frontmatter validation
- Shiki for syntax highlighting
- Playwright for end-to-end and visual checks
- Vitest for unit tests
- ESLint and Prettier for code quality

## Coding Standards

Use TypeScript for all application code.

Prefer:

- Server components by default
- Client components only for interactivity, motion, or browser APIs
- Semantic HTML
- Accessible primitives
- Small focused components
- Explicit content schemas
- Named exports for reusable components and utilities

Avoid:

- Large generic abstractions before patterns exist
- Overly clever animation systems
- Global mutable state
- Hardcoded repeated content in page files
- Unvalidated frontmatter
- Layout shifts caused by unstable dimensions
- Components that mix content loading, layout, styling, and business logic

## Documentation Standards

Every meaningful feature should be understandable from the repository.

Update documentation when changing:

- Product direction
- Content model
- Design system tokens or component rules
- Routing structure
- Testing strategy
- Deployment process
- Major architectural decisions

Architecture decisions should be documented in `docs/decisions/` once the implementation exists.

## Design Standards

RITWIK OS should feel like an engineering control plane, not a SaaS dashboard and not a fake desktop.

Design characteristics:

- Precise
- High-signal
- Calm
- Technical
- Recruiter-readable
- Content-forward
- Fast
- Accessible

Avoid:

- Generic portfolio templates
- Decorative dashboards
- Fake OS window chrome unless explicitly approved
- Overuse of gradients
- Excessive animation
- Low-contrast dark themes
- Marketing filler

## Accessibility Requirements

All implementation should support:

- Keyboard navigation
- Visible focus states
- Semantic headings and landmarks
- Reduced motion preferences
- Descriptive links and button labels
- Sufficient color contrast
- Screen-reader-friendly structure
- Responsive layouts without overlapping text

Icon-only controls must have accessible names.

## Testing Expectations

Testing should scale with risk.

Minimum future quality gates:

- Type checking
- Linting
- Production build
- Content validation
- Critical route smoke tests
- Accessibility checks for core pages

Use Playwright for important user paths such as:

- Home page renders
- Work index opens project case studies
- Writing index opens articles
- Resume page is reachable
- Navigation works on desktop and mobile

## Agent Workflow

Before implementing:

1. Read `PROJECT_MEMORY.md`.
2. Read the relevant specification documents.
3. Inspect the current repository state.
4. Preserve the static-first, no-SaaS architecture.
5. Keep changes narrowly scoped.

When editing:

- Do not introduce dependencies without a clear reason.
- Do not initialize frameworks unless explicitly asked.
- Do not add authentication, databases, users, dashboards, or CRUD flows.
- Do not overwrite user work.
- Keep documentation aligned with implementation.

When responding:

- Be concise.
- State what changed.
- State what was verified.
- Call out any uncertainty or deferred work.
