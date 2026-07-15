# RITWIK OS

**Engineering Intelligence into Production.**

RITWIK OS is a production-grade engineering platform and personal engineering brand. It is designed to showcase engineering work, present flagship projects, document ongoing builds, publish technical writing, demonstrate architecture thinking, and create a memorable recruiter experience.

This repository contains the planning foundation, the Phase 1 Next.js project foundation, the Phase 2 repository/design-system foundation, and the Phase 3 identity/brand shell prototype.

## What This Project Is

RITWIK OS is a static-first web platform for:

- Engineering project case studies
- Architecture notes
- Technical writing
- Ongoing build logs
- Recruiter-facing professional information
- Personal engineering brand presentation

The intended implementation stack is:

- Next.js
- TypeScript
- Tailwind CSS
- MDX
- Framer Motion
- Vercel

## What This Project Is Not

RITWIK OS is not:

- A SaaS application
- A dashboard product
- A CRUD app
- A multi-user system
- An authenticated platform
- A database-backed product
- A fake desktop operating system

Do not add authentication, databases, user models, admin dashboards, payment systems, or CRUD product flows unless the product direction is explicitly changed and documented.

## Repository Status

Current status:

- Documentation foundation exists.
- Next.js has been initialized with App Router and TypeScript.
- Tailwind CSS, ESLint, and Prettier are configured.
- Semantic CSS design tokens and base global styles are implemented.
- Minimal layout primitives and the global application shell are implemented.
- Typed canonical identity and external link data are implemented.
- The app currently renders the first real RITWIK OS brand shell prototype.
- The final website, content system, navigation, MDX pipeline, motion system, and project pages have not been implemented yet.

## Source Structure

Current implemented structure:

```text
src/
  app/
  components/
    layout/
    ui/
  content/
  data/
  lib/
  styles/
  types/
```

The `content/`, `lib/`, and `types/` directories are reserved boundaries from the initial structure and currently contain no implementation logic. Additional directories such as `docs/` and `tests/` should be added only when they contain real implementation files for an approved phase.

## Canonical Identity Data

Personal identity, availability, resume path, and current build metadata are centralized in `src/data/profile.ts`.

External professional links are centralized in `src/data/social-links.ts`. GitHub and LinkedIn are primary public links; LeetCode, Codeforces, and X are stored for later sections but are not shown in the first viewport or primary footer yet.

The current public email is `biswas.ritwik2001@gmail.com`. Do not display a phone number or secondary email unless the product direction changes.

The resume PDF is expected at:

```text
public/resume/ritwik-biswas-resume.pdf
```

## Navigation Principle

Keep navigation immediately understandable to recruiters. Use RITWIK OS terminology for identity and atmosphere, but do not replace clear labels with cryptic file extensions, fake commands, or operating-system jargon.

The Phase 3 prototype intentionally does not use a profile photograph. The brand remains typography-led until a stronger visual asset strategy is approved.

## Documentation Map

Read these files before contributing:

- `PROJECT_MEMORY.md` - long-term source of truth for future AI and human contributors.
- `PRODUCT_SPEC.md` - product goals, audience, routes, and success criteria.
- `DESIGN_SYSTEM.md` - visual design philosophy, tokens, components, motion, and accessibility standards.
- `CONTENT_MODEL.md` - content collections, metadata standards, MDX expectations, and editorial rules.
- `IMPLEMENTATION_PLAN.md` - recommended development roadmap.
- `AGENTS.md` - operating rules for AI coding agents and contributors.
- `README.md` - repository overview and contributor entry point.

## How To Understand The Project

Start with:

1. `PROJECT_MEMORY.md`
2. `PRODUCT_SPEC.md`
3. `IMPLEMENTATION_PLAN.md`
4. `DESIGN_SYSTEM.md`
5. `CONTENT_MODEL.md`

These documents define the approved project direction and prevent incorrect assumptions about SaaS architecture.

## How To Run The Project

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Run TypeScript checking:

```bash
npm run typecheck
```

Format files:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run format
npm run format:check
```

There is no test script yet. Testing tools will be introduced in a later milestone.

## Contribution Guidelines

Before making changes:

1. Read `PROJECT_MEMORY.md`.
2. Confirm the change supports the approved product vision.
3. Keep the architecture static-first.
4. Avoid introducing runtime services unless explicitly approved.
5. Update documentation when product, design, content, or architecture decisions change.

## Engineering Standards

Future implementation should prioritize:

- Type safety
- Static generation
- Content validation
- Semantic HTML
- Accessibility
- Performance
- Responsive design
- Clear component boundaries
- Production-ready documentation

## Design Standards

The site should feel like an Engineering Control Plane:

- Precise
- Technical
- Calm
- High-signal
- Recruiter-readable
- Engineer-credible

It should not feel like a generic portfolio template, SaaS dashboard, or decorative fake operating system.

## Testing Philosophy

Testing should protect the most important qualities of the platform:

- Content correctness
- Route stability
- Accessibility
- Responsive layout
- Metadata and SEO
- Core navigation
- Production build health

Expected future tools:

- TypeScript
- ESLint
- Vitest
- Playwright
- Build-time content validation

## Deployment Direction

The intended deployment target is Vercel.

The site should be static-first and CDN-friendly. Preview deployments should be used to review changes before production releases.

## Roadmap Summary

1. Complete planning foundation.
2. Initialize Next.js and tooling.
3. Build design system foundation.
4. Add MDX content pipeline.
5. Implement core routes.
6. Add motion and interaction.
7. Harden SEO, accessibility, and performance.
8. Add tests.
9. Deploy on Vercel.
10. Expand flagship content.
