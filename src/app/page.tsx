import { ActionLink } from "@/components/ui/ActionLink";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { getSocialLink } from "@/data/social-links";
import { siteConfig } from "@/data/site";

export default function Home() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");
  const stackDirection = profile.currentBuild.stackDirection.join(" / ");

  return (
    <Container
      className="grid min-h-[calc(100dvh-var(--layout-header-height))] items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14"
      width="wide"
    >
      <section aria-labelledby="hero-title" className="max-w-4xl">
        <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
          {siteConfig.systemLabel}
        </p>

        <h1
          id="hero-title"
          className="mt-6 max-w-4xl text-[length:var(--text-heading-1-size)] leading-[var(--text-heading-1-line-height)] font-semibold text-balance text-foreground"
        >
          {profile.tagline}
        </h1>

        <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
          {profile.headline}
        </p>

        <dl className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              Identity
            </dt>
            <dd className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] font-semibold text-foreground">
              {profile.displayName}
            </dd>
            <dd className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
              {profile.location}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              Availability
            </dt>
            <dd className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] font-semibold text-foreground">
              Open to full-time roles.
            </dd>
            <dd className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
              {profile.availability.immediate}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionLink href={profile.resumePath} variant="primary">
            View Resume
          </ActionLink>
          {github ? (
            <ActionLink
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Ritwik Biswas on GitHub"
            >
              {github.label}
            </ActionLink>
          ) : null}
          {linkedIn ? (
            <ActionLink
              href={linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Ritwik Biswas on LinkedIn"
            >
              {linkedIn.label}
            </ActionLink>
          ) : null}
          <ActionLink href={`mailto:${profile.email}`} variant="text">
            Email
          </ActionLink>
        </div>
      </section>

      <aside
        className="border border-border-strong bg-surface/70 p-5 shadow-elevation-1 sm:p-6"
        aria-labelledby="current-build-title"
      >
        <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
          Current Build
        </p>
        <h2
          id="current-build-title"
          className="mt-5 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground uppercase"
        >
          {profile.currentBuild.project}
        </h2>
        <p className="mt-3 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
          {profile.currentBuild.description}
        </p>

        <dl className="mt-7 space-y-5 border-t border-border pt-6">
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              Status
            </dt>
            <dd className="mt-2 inline-flex min-h-8 items-center border border-warning/60 bg-surface-muted px-3 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-warning uppercase">
              {profile.currentBuild.status}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
              Stack Direction
            </dt>
            <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
              {stackDirection}
            </dd>
          </div>
        </dl>
      </aside>
    </Container>
  );
}
