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
- Framer Motion
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

Use motion sparingly and intentionally. Framer Motion should clarify hierarchy and transitions, not become the experience itself.

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

No authentication, database, API routes, MDX pipeline, Framer Motion, analytics, testing framework, final navigation, project cards, personal links, or invented content has been added.

Phase 2 repository structure and design-system foundation has been completed:

- Semantic CSS tokens in `src/styles/tokens.css`
- Global base styling in `src/styles/base.css`
- `src/app/globals.css` as the Tailwind and global style entry point
- Minimal layout primitives in `src/components/layout/`
- Minimal UI primitives in `src/components/ui/`
- Shared brand constants in `src/data/site.ts`
- Root application shell with header, main landmark, footer, skip link, focus styles, reduced-motion handling, and responsive gutters

The home page remains a temporary foundation screen and is not the final homepage.

## Next Expected Phase

The next implementation phase should be content-model preparation and static content pipeline work only when explicitly requested:

1. Add MDX support only when approved for that phase.
2. Define validated content schemas.
3. Prepare content collections without placeholder personal content.
4. Add build-time content validation.
5. Keep routes and navigation limited until real content exists.

Do not start implementation until the user explicitly asks for it.
