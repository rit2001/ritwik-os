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

Phase 4 expands the homepage into a complete control-plane surface:

- Sections use stable anchors and recruiter-readable labels rather than OS-style jargon.
- Project cards are compact text-first case-study entry points with honest repository and deployment notes.
- Screenshots are deferred until polished recaptures exist; no empty image placeholders are used.
- The visual rhythm varies by section: hero split layout, text-first project grid, vertical experience evidence, capability matrix, algorithm evidence panels, recruiter brief, and final contact section.
- TraceForge is visually prominent but remains clearly marked as in development with no fake metrics, progress bars, charts, public repository link, or demo link.

Phase 4.5 establishes the motion system:

- Use `motion` with imports from `motion/react`.
- Prefer scroll-triggered one-time reveals for hierarchy and narrative progression.
- Use scroll-linked motion only for the top progress indicator, the restrained hero response, and the Experience timeline progress line.
- Motion uses opacity and transform; layout-heavy properties, dramatic scale, excessive spring bounce, and continuous animation are avoided.
- Reduced-motion mode must remove vertical movement, parallax, and stagger delays while preserving content visibility and simple interaction feedback.
- Project-card hover uses small upward movement, border brightening, accent-line reveal, and directional-link movement only for genuinely interactive cards.
- Large surfaces use restrained radius tokens around 6px; buttons use around 8px; badges and tags remain 2-4px.
- The homepage should remain visually continuous in the dark engineering identity through the footer.
- Scroll hijacking, decorative ripple effects, custom cursors, magnetic buttons, sound, and animated backgrounds are not part of the RITWIK OS motion language.

Phase 4.6 completes the homepage interaction polish:

- Use shared motion values for easing, reveal duration, stagger, travel, and viewport timing.
- Reveal motion must be visible but restrained, and must never make content availability depend on JavaScript, hydration, or IntersectionObserver.
- Interactive surfaces are reserved for real actions. Linked cards may lift about 5px, brighten, and show accent borders; static panels may only receive restrained emphasis.
- TraceForge may use finite status motion and one-time sequencing, but it must not look clickable or imply a repository/demo exists.
- Capability groups live inside one capability matrix with internal separators, clear status labels, and no navigation-like lift.
- Algorithm profiles use full-surface accessible anchors because each has one real external destination.
- Recruiter Brief, Education, Contact, and Footer remain in the dark graphite visual system; do not reintroduce a warm-light zone or large transition bridge.
- Primary actions rest neutral or accent-muted; strong blue fill is reserved for hover and focus states.

Phase 4.7 establishes final visual acceptance:

- The dark RITWIK OS identity is permanent for the completed homepage.
- Recruiter evidence is presented as structured dark proof blocks, not plain paragraphs or SaaS cards.
- Education is a dark evidence block with internal dividers and no click-like behavior.
- Experience markers are circular, with muted inactive and blue active states.
- Action links must remain bounded and consistent wherever Email, Resume, LinkedIn, or GitHub appear together.
- Header active navigation must not activate Contact while Recruiter Brief is dominant.

Specialized content components:

- ArchitectureDiagram
- DecisionRecord
- TradeoffMatrix
- SystemMap
- ProjectTimeline
- TechStackGrid
- RecruiterBrief

Phase 5.1 case-study presentation patterns:

- Work and case-study routes use route-aware global navigation instead of homepage anchor navigation.
- Long-form case studies may use a compact "On This Page" rail with stable heading anchors on wide screens and an inline nav on smaller screens.
- Case-study pages should vary composition with structured editorial blocks, matrices, and timelines rather than rendering as one uninterrupted Markdown document.
- Proposed architecture flows should communicate direction through semantic ordered HTML with decorative connectors, not canvas or images.
- Informational case-study panels must not lift, show pointer cursors, or behave like links unless they contain a real action.
- Ongoing-build status, scope, roadmap, and open-question components must distinguish planned work from implemented evidence through text labels, not color alone.

Phase 5.2 case-study acceptance patterns:

- Work detail pages should keep the article dominant at laptop widths. Use a compact supporting TOC rail rather than a large bordered dashboard-like panel.
- On smaller screens, case-study TOC navigation should collapse into an inline semantic disclosure before the article body.
- Current-milestone callouts should be wide enough for one- or two-line titles and should not use oversized all-caps text inside narrow panels.
- Proposed architecture should use a readable vertical pipeline when labels are long. Decorative connectors may clarify direction, but the semantic ordered list carries the meaning.
- Service boundaries, open questions, planned signals, load testing, roadmap, and status summaries should use editorial rows, definition matrices, or vertical timelines before defaulting to many small independent cards.
- MDX wrapper components must preserve valid HTML. Do not wrap arbitrary MDX block children in `<p>`.

## Motion Guidelines

Use the current `motion` package with React imports from `motion/react` for purposeful interaction and transitions.

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
