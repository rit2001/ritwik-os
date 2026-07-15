# DESIGN_SYSTEM.md

## Design System Purpose

The RITWIK OS design system exists to create a distinctive, production-quality engineering platform that is precise, accessible, and content-forward.

The design should support the tagline:

**Engineering Intelligence into Production.**

The system should communicate technical maturity without becoming visually noisy or gimmicky.

## Design Philosophy

RITWIK OS should feel like an Engineering Control Plane.

It should be:

- Precise
- Calm
- Technical
- High-signal
- Sophisticated
- Fast
- Recruiter-readable
- Engineer-credible

It should avoid:

- Generic portfolio aesthetics
- Decorative SaaS dashboard patterns
- Fake operating-system window chrome
- Excessive glassmorphism
- Heavy gradient dependence
- Over-animated sections
- Low-contrast dark interfaces
- Marketing filler

## Visual Principles

### Clarity First

Every visual element should help users understand the structure, priority, or meaning of content.

### Engineering Density

The interface may be information-rich, but it must remain readable. Use spacing, hierarchy, and grouping to support scanning.

### Controlled Distinction

The site should be memorable through composition, typography, motion discipline, and content quality rather than decorative overload.

### Content As Proof

The design should elevate case studies, diagrams, code, decisions, and writing. It should not compete with them.

## Token Strategy

Use semantic design tokens rather than raw color names in components.

Implemented Phase 2 token files:

- `src/styles/tokens.css` defines semantic color, typography, spacing, layout, radius, border, elevation, motion, and z-index tokens.
- `src/styles/base.css` applies global box sizing, font stacks, color defaults, focus visibility, selection styling, reduced-motion handling, and overflow protection.
- `src/app/globals.css` remains the single global style entry point and imports Tailwind CSS plus the project token/base files.

Implemented source color tokens:

- `--ritwik-color-canvas`
- `--ritwik-color-background-elevated`
- `--ritwik-color-surface`
- `--ritwik-color-surface-muted`
- `--ritwik-color-foreground-primary`
- `--ritwik-color-foreground-secondary`
- `--ritwik-color-foreground-muted`
- `--ritwik-color-border-subtle`
- `--ritwik-color-border-strong`
- `--ritwik-color-accent`
- `--ritwik-color-accent-muted`
- `--ritwik-color-success`
- `--ritwik-color-warning`
- `--ritwik-color-focus-ring`

Tailwind utility tokens are mapped in `@theme inline` with semantic names such as `background`, `background-elevated`, `surface`, `foreground-secondary`, `border-strong`, `accent`, `success`, `warning`, and `focus-ring`.

The current palette is a dark neutral foundation with graphite, charcoal, soft white, controlled gray, and one restrained blue accent. No gradients beyond a quiet page background treatment, neon effects, or glow-heavy styling are part of the foundation.

- Layout widths

## Color Direction

The palette should be restrained and professional. It should not be dominated by one hue family.

Preferred characteristics:

- Strong neutral foundation
- Clear text contrast
- One primary accent
- Small number of semantic status colors
- Light and dark theme support when implemented

Avoid:

- Purple-heavy gradients as the dominant identity
- Beige or brown editorial palettes
- Low-contrast gray-on-black text
- Color-only meaning

## Typography

Typography should feel technical, modern, and highly readable.

Recommended approach:

- Use a strong sans-serif for interface and prose.
- Use a high-quality monospace font for code, metadata, and technical labels.
- Keep line lengths comfortable for long-form writing.
- Use clear heading hierarchy.
- Avoid oversized typography inside dense UI components.

Typography should support:

- Fast scanning
- Long-form reading
- Code-heavy content
- Recruiter-friendly summaries

Phase 2 uses system font stacks only:

- `--ritwik-font-sans` for interface and prose.
- `--ritwik-font-mono` for technical labels and metadata.

Remote fonts are intentionally not loaded yet.

## Layout Principles

Use structured, responsive layouts.

Recommended patterns:

- Constrained content columns for articles
- Wider layouts for project case studies and diagrams
- Persistent top navigation or compact shell navigation
- Clear section rhythm
- Responsive grids for project and article indexes
- Side metadata rails on larger screens where useful

Avoid:

- Nested cards
- Floating decorative sections
- Layouts that collapse poorly on mobile
- Text overlapping visual media
- Interactions that require precise pointer input

## Component Strategy

Build components in layers:

1. Design tokens
2. Base UI primitives
3. Content components
4. Page sections
5. Route-level compositions

Phase 2 implements only foundation primitives:

- `SiteShell`
- `SiteHeader`
- `SiteFooter`
- `SkipLink`
- `Container`
- `Section`
- `SectionHeader`

Larger UI components such as cards, buttons, badges, project cards, article cards, callouts, code blocks, tabs, and tables are deferred until real content and route needs exist.

Phase 3 adds the first public-facing brand shell:

- Header navigation uses understandable recruiter-facing labels: GitHub, LinkedIn, Resume.
- Footer exposes GitHub, LinkedIn, Email, and Resume.
- RITWIK OS terminology is used as visual and editorial flavor, not as a replacement for clear navigation.
- The brand signature remains typography-led with a small CSS square mark next to the wordmark.
- The first hero does not use a profile photo, raster imagery, fake terminal, typewriter effect, particles, bright gradients, excessive glow, or decorative dashboard metrics.
- TraceForge appears as a compact current-build panel and is presented as an ongoing build, not a finished product.

Specialized content components:

- ArchitectureDiagram
- DecisionRecord
- TradeoffMatrix
- SystemMap
- ProjectTimeline
- TechStackGrid
- RecruiterBrief

## Motion Guidelines

Use Framer Motion for purposeful interaction and transitions.

Appropriate motion:

- Page transitions
- Section entrance
- Active navigation indicators
- Hover/focus affordances
- Timeline progression
- Small state changes

Inappropriate motion:

- Constant background animation
- Long blocking transitions
- Excessive scroll choreography
- Motion that hides content
- Motion that damages performance

Always respect `prefers-reduced-motion`.

## Accessibility Requirements

Design must support:

- Keyboard navigation
- Visible focus states
- Proper contrast
- Semantic structure
- Non-color indicators
- Reduced motion
- Readable text sizes
- Touch-friendly hit targets
- Screen-reader labels for icon-only actions

Accessibility is a design requirement, not an implementation afterthought.

## Responsive Requirements

The site must work well on:

- Mobile
- Tablet
- Laptop
- Desktop
- Wide desktop

Mobile should not be a reduced afterthought. Recruiters may open the site from a phone.

Content must reflow cleanly without text overlap, clipped controls, or horizontal scrolling.

## Design Quality Bar

A page is not complete until:

- Hierarchy is clear.
- Text is readable.
- Interactive states are visible.
- Mobile layout is coherent.
- Keyboard navigation works.
- Motion is restrained.
- Content has enough breathing room.
- The page feels specific to RITWIK OS, not template-derived.
