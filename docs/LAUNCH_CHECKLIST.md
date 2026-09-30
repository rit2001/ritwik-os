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
- [ ] Vercel preview runtime inspected.
- [ ] Browser console verified without extension-injected hydration noise.

## Performance

- [x] No database, authentication, analytics, or runtime API dependency is added.
- [x] Motion remains isolated in existing client components.
- [x] Social image generation uses built-in Next.js support.
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
- [ ] Resume PDF regenerated from `docs/RESUME_RECONCILIATION.md` and visually verified.

## Recruiter Review

- [ ] Homepage first viewport reviewed.
- [ ] Resume download checked.
- [ ] GitHub and LinkedIn links checked.
- [ ] TraceForge truthfulness reviewed.
- [ ] Converge exactly-once, scale, and CI boundaries reviewed.
- [ ] Agentic AI deployment and reliability caveats reviewed.
