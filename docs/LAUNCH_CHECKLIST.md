# RITWIK OS Launch Checklist

## Repository

- [x] Working application is static-first.
- [x] Content metadata is source-controlled and validated.
- [x] `npm run verify` exists as the launch quality gate.
- [ ] Production branch merge completed.
- [ ] Preview deployment created.

## Content

- [x] Homepage is complete and frozen at H1.9 for launch preview.
- [x] Work Registry contains only real entries.
- [x] TraceForge is marked as in development with its real repository and no fake demo.
- [x] Stateful Agentic AI Assistant uses HuggingFace Embeddings in public project data.
- [ ] Screenshots are captured and approved for future case-study enhancement.

## Metadata and SEO

- [x] Root metadata is centralized and production-ready.
- [x] Open Graph image route exists.
- [x] Structured data is conservative and source-backed.
- [x] Robots and sitemap routes exist.
- [x] Canonical production URL is `https://ritwik-os.vercel.app/`; explicit production environment variables may override it.
- [ ] Open Graph preview inspected after deployment.
- [ ] Custom domain configured later, if approved.

## Accessibility

- [x] Skip-to-content link is present globally.
- [x] Public routes use semantic landmarks through the global shell.
- [x] Work detail pages use semantic articles and heading anchors.
- [ ] Keyboard-only navigation manually verified in browser.
- [ ] Reduced-motion behavior manually verified in browser.
- [ ] Clean-browser console inspected with DOM-modifying extensions disabled.

## Responsive QA

- [ ] 320px mobile viewport inspected.
- [ ] Tablet viewport inspected.
- [ ] 13-inch laptop viewport inspected.
- [ ] 1280px desktop viewport inspected.
- [ ] Wide desktop viewport inspected.

## Runtime

- [x] Production build succeeds.
- [x] Static route generation includes homepage, Work, and known Work details.
- [x] Unknown Work slugs return 404.
- [x] Fresh local development route and public-asset smoke passes.
- [x] Fresh local production-server route and public-asset smoke passes.
- [x] Generated Open Graph image returns `200` with `image/png`.
- [ ] Vercel preview runtime inspected.
- [ ] Browser console verified without extension-injected hydration noise.

## Performance

- [x] No database, authentication, analytics, or runtime API dependency is added.
- [x] Motion remains isolated in existing client components.
- [x] Social image generation uses built-in Next.js support.
- [x] Globe remains code-split with capped DPR, offscreen/page-hidden RAF suspension, and unmount disposal.
- [x] Recurring ambient timers stop offscreen, on hidden documents, or for reduced-motion users.
- [ ] Preview deployment performance checked.

## Deployment

- [ ] Vercel project configured.
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real preview or production URL.
- [ ] Preview deployment smoke-tested.
- [ ] Production deployment approved.

## Post-deployment

- [ ] `/` verified.
- [ ] `/work` verified.
- [ ] `/work/thesislens` verified.
- [ ] `/work/traceforge` verified.
- [ ] `/work/converge` verified.
- [ ] `/work/stateful-agentic-ai-assistant` verified.
- [ ] `/work/ai-mock-interview-platform` verified as intentionally not found.
- [ ] `/robots.txt` verified.
- [ ] `/sitemap.xml` verified.
- [ ] `/opengraph-image` verified.
- [ ] Approved resume endpoint and checksum verified on the deployed preview.

Do not auto-regenerate or replace
`public/resume/ritwik-biswas-resume.pdf`. Any future replacement requires
explicit human approval.

## Phase 8.12 Local Hardening

- [x] `npm run start` production command exists and serves the built app.
- [x] Rendered canonical URLs and JSON-LD parse against `https://ritwik-os.vercel.app/`.
- [x] Case-study titles contain one owner suffix.
- [x] All rendered `aria-controls` references resolve to existing IDs.
- [x] Meaningful diagram labels use approved readable foreground, cyan, or amber tokens.
- [x] Tracked-file secret-pattern scan found no credential material.
- [x] Machine-local audit paths were removed from tracked public documentation.
- [x] Approved resume checksum is unchanged after hardening.
- [x] Resume endpoint returns `200` with `application/pdf` in local development and production smoke checks.
- [ ] Final keyboard-only and reduced-motion pass in a human-controlled browser.
- [ ] Final visual overflow/layout pass at 1440, 1280, 1024, 768, 390, and 320 pixels.
- [ ] Vercel production preview, social-card preview, and CWV inspection.

## Recruiter Review

- [ ] Homepage first viewport reviewed.
- [ ] Resume download checked.
- [ ] GitHub and LinkedIn links checked.
- [ ] TraceForge truthfulness reviewed.
- [ ] Converge exactly-once, scale, and CI boundaries reviewed.
- [ ] Agentic AI deployment and reliability caveats reviewed.
