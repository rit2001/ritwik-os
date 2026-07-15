# RITWIK OS

**Engineering Intelligence into Production.**

RITWIK OS is a production-grade engineering platform and personal engineering brand. It is designed to showcase engineering work, present flagship projects, document ongoing builds, publish technical writing, demonstrate architecture thinking, and create a memorable recruiter experience.

This repository contains the planning foundation, the Phase 1 Next.js project foundation, the Phase 2 repository/design-system foundation, the Phase 3 identity/brand shell prototype, the Phase 4 full homepage control plane, the final Phase 4 motion/interaction polish, and the Phase 5 static content pipeline with the first TraceForge case study.

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
- Motion (`motion/react`)
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
- The app currently renders a complete single-page RITWIK OS homepage control plane.
- A restrained Motion-powered interaction, scroll rhythm, and final homepage polish layer is implemented.
- The official Next.js MDX pipeline is implemented for local Work content.
- `/work` and `/work/traceforge` are implemented as static-first App Router routes.
- TraceForge is the first validated Work case study and remains documented as an in-development build with no public repository or demo.
- Screenshots, Writing, Builds, Architecture, and additional case studies have not been implemented yet.

## Source Structure

Current implemented structure:

```text
src/
  app/
  components/
    layout/
    motion/
    ui/
    work/
  content/
    work/
  data/
  lib/
    content/
  styles/
  types/
scripts/
```

Additional directories such as `docs/` and `tests/` should be added only when they contain real implementation files for an approved phase.

## Canonical Identity Data

Personal identity, availability, resume path, and current build metadata are centralized in `src/data/profile.ts`.

External professional links are centralized in `src/data/social-links.ts`. GitHub and LinkedIn are primary public links. LeetCode and Codeforces appear as algorithm evidence; X remains stored for later placement and is not shown in the homepage header, hero, or primary footer.

Homepage project, experience, capability, algorithm, and recruiter-brief content is centralized in:

```text
src/data/projects.ts
src/data/experience.ts
src/data/capabilities.ts
src/data/competitive-programming.ts
src/data/recruiter-brief.ts
```

The current public email is `biswas.ritwik2001@gmail.com`. Do not display a phone number or secondary email unless the product direction changes.

The resume PDF is expected at:

```text
public/resume/ritwik-biswas-resume.pdf
```

## Navigation Principle

Keep navigation immediately understandable to recruiters. Use RITWIK OS terminology for identity and atmosphere, but do not replace clear labels with cryptic file extensions, fake commands, or operating-system jargon.

The Phase 3 prototype intentionally does not use a profile photograph. The brand remains typography-led until a stronger visual asset strategy is approved.

The Phase 4 homepage uses recruiter-friendly internal anchor navigation:

- `overview`
- `systems`
- `experience`
- `capabilities`
- `algorithms`
- `contact`

TraceForge is the current flagship build, but its repository is not published yet. Do not add a TraceForge GitHub or demo link until a real project-specific destination exists.

Project presentation is currently text-first. Screenshots are deferred until polished recaptures or case-study assets are available.

## Content Pipeline

Phase 5 uses the official Next.js App Router MDX integration.

Work entries use separated metadata and body content:

```text
src/content/work/
  traceforge.meta.ts
  traceforge.mdx

src/lib/content/
  schemas.ts
  work.ts

scripts/
  validate-content.ts
```

Metadata is written in TypeScript, validated with Zod, and imported through an explicit registry. MDX files contain the long-form case-study body.

Routes are generated from registered Work slugs:

- `/work` lists registered, non-draft Work entries.
- `/work/[slug]` is statically generated from known slugs.
- Unknown slugs return not found.

Work routes use route-aware global navigation. The homepage keeps its anchor navigation, while `/work` and `/work/[slug]` show Home, Work, Resume, GitHub, and LinkedIn with Work marked active.

Case-study pages may use structured MDX components for table-of-contents navigation, milestone callouts, architecture flows, decision grids, open questions, planned metrics, load-testing stages, and status-based roadmaps. These components must preserve semantic HTML, responsive layout, and planned-versus-implemented language.

Case-study layout standards:

- Keep the main article column dominant at laptop and desktop widths.
- Use a compact "On This Page" rail on wide screens and an inline disclosure on smaller screens.
- Use vertical architecture pipelines when stage labels are long enough to make multi-column diagrams cramped.
- Prefer editorial rows, definition matrices, and staged sequences over repeating small cards for every technical section.
- Do not wrap arbitrary MDX block children in paragraph elements; run `npm run mdx:check` before build validation.

To add a Work entry:

1. Add `src/content/work/<slug>.meta.ts`.
2. Add `src/content/work/<slug>.mdx`.
3. Register both modules in `src/lib/content/work.ts`.
4. Run `npm run content:check`.
5. Run the full validation sequence before committing.

Ongoing projects must use `status: "in-development"` and `ongoing: true`. Do not add repository URLs, demo URLs, metrics, benchmark figures, completion claims, or production claims unless they are real and project-specific.

Ongoing-project copy should use one prominent scope/status note near the beginning, then speak clearly in public engineering language. Avoid repeated defensive disclaimers or internal prompt language.

The homepage is frozen after Phase 4. Homepage updates during content phases should be limited to truthful links to real content, such as the TraceForge case-study link.

## Motion System

The project uses the `motion` package with React imports from `motion/react`.

Motion primitives live in:

```text
src/components/motion/
```

Motion rules:

- Section reveals are one-time and use opacity plus small vertical transforms.
- Scroll-linked motion is limited to the top progress line, restrained desktop hero response, and Experience timeline progress.
- Reduced-motion users receive immediately visible content without vertical movement, parallax, or stagger delays.
- The site does not use scroll hijacking, decorative ripple effects, custom cursors, magnetic buttons, animated backgrounds, or continuous animation.
- Content remains visible before and without JavaScript; motion progressively enhances visible content.
- Interactive surfaces are only used for real actions. Static surfaces such as education and non-linked information panels do not lift or pretend to be links.
- Project and algorithm cards with real destinations use card-level accessible anchors.
- Capabilities are presented as one unified matrix instead of separate floating cards.
- The Recruiter Brief, Education, Contact, and Footer sequence remains in the dark graphite RITWIK OS visual system; the previous warm-light transition bridge has been removed.
- Primary buttons rest in neutral/accent-muted states and transition into stronger accent treatment on hover or focus.
- Recruiter evidence uses structured proof blocks, Education uses a dark evidence block, and Phase 4 is visually complete before Phase 5.

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

Validate registered content:

```bash
npm run content:check
```

Validate MDX wrapper semantics:

```bash
npm run mdx:check
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
npm run mdx:check
npm run content:check
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run validate
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
