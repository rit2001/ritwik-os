import { ActionLink } from "@/components/ui/ActionLink";
import { Container } from "@/components/ui/Container";
import { capabilityGroups } from "@/data/capabilities";
import {
  algorithmProfiles,
  achievementSignals,
} from "@/data/competitive-programming";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { selectedProjects } from "@/data/projects";
import { recruiterBrief } from "@/data/recruiter-brief";
import { getSocialLink } from "@/data/social-links";

function SectionIntro({
  eyebrow,
  title,
}: Readonly<{
  eyebrow: string;
  title: string;
}>) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground">
        {title}
      </h2>
    </header>
  );
}

function TagList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          className="border border-border bg-surface-muted px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.04em] text-foreground-secondary"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");
  const leetCode = getSocialLink("leetcode");
  const codeforces = getSocialLink("codeforces");
  const stackDirection = profile.currentBuild.stackDirection.join(" / ");

  return (
    <>
      <Container
        className="grid min-h-[calc(100dvh-var(--layout-header-height))] scroll-mt-32 items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14"
        id="overview"
        width="wide"
      >
        <section aria-labelledby="hero-title" className="max-w-4xl">
          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
            <span className="text-foreground-muted">Engineering</span>{" "}
            <span>Control Plane</span>
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
            {profile.currentBuild.category}
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
                Current Milestone
              </dt>
              <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                <span className="font-semibold text-foreground">
                  {profile.currentBuild.currentMilestone}.
                </span>{" "}
                {profile.currentBuild.milestoneExplanation}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                Next Step
              </dt>
              <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {profile.currentBuild.nextStep}
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
            <div>
              <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                Repository
              </dt>
              <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                {profile.currentBuild.repository}
              </dd>
            </div>
          </dl>
        </aside>
      </Container>

      <section
        className="border-t border-border py-20 scroll-mt-32"
        id="systems"
      >
        <Container width="wide">
          <SectionIntro
            eyebrow="Selected Systems"
            title="Production-focused engineering work across AI, backend systems, and real-time applications."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {selectedProjects.map((project) => (
              <article
                className="flex min-h-full flex-col border border-border bg-surface/55 p-5 transition-colors duration-[var(--duration-base)] hover:border-border-strong sm:p-6"
                key={project.title}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                    {project.category}
                  </p>
                  <span className="border border-border bg-background px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-5 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-4 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                  {project.summary}
                </p>
                <div className="mt-6">
                  <TagList items={project.stack} />
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
                    {project.use ? <p>{project.use}</p> : null}
                    {project.deploymentNote ? (
                      <p>{project.deploymentNote}</p>
                    ) : null}
                    {project.repositoryNote ? (
                      <p>{project.repositoryNote}</p>
                    ) : null}
                    {!project.githubUrl ? (
                      <p>Repository: Not published yet</p>
                    ) : null}
                  </div>
                  {project.githubUrl ? (
                    <a
                      className="inline-flex min-h-11 items-center self-start rounded-sm font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-accent uppercase underline decoration-transparent underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground hover:decoration-current sm:self-auto"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} repository on GitHub`}
                    >
                      GitHub
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 scroll-mt-32" id="experience">
        <Container width="wide">
          <SectionIntro
            eyebrow="Experience"
            title="Engineering ownership across AI products, backend services, full-stack systems, and cloud delivery."
          />

          <div className="mt-10 border-l border-border">
            {experience.map((role) => (
              <article
                className="relative pb-10 pl-6 last:pb-0 sm:pl-8"
                key={role.company}
              >
                <span
                  className="absolute top-2 -left-[5px] h-2.5 w-2.5 bg-accent"
                  aria-hidden="true"
                />
                <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
                  <div>
                    <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                      {role.company}
                    </p>
                    <h3 className="mt-3 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
                      {role.role}
                    </h3>
                    <p className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
                      {role.location}
                    </p>
                    <p className="mt-1 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                      {role.dates}
                    </p>
                  </div>
                  <div>
                    <p className="text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                      {role.summary}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {role.evidence.map((item) => (
                        <li
                          className="border-l border-border-strong pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="border-y border-border bg-background-elevated/45 py-20 scroll-mt-32"
        id="capabilities"
      >
        <Container width="wide">
          <SectionIntro
            eyebrow="Engineering Capabilities"
            title="A practical capability map across AI systems, backend platforms, product surfaces, and currently building observability infrastructure."
          />

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {capabilityGroups.map((group) => (
              <article className="bg-background p-5 sm:p-6" key={group.title}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground">
                    {group.title}
                  </h3>
                  <span className="border border-border bg-surface px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                    {group.status}
                  </span>
                </div>
                <div className="mt-5">
                  <TagList items={group.items} />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 scroll-mt-32" id="algorithms">
        <Container width="wide">
          <SectionIntro
            eyebrow="Algorithm Engine"
            title="Competitive programming evidence and algorithmic depth without live scraping or gamified counters."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="grid gap-5 md:grid-cols-2">
              {algorithmProfiles.map((platform) => (
                <article
                  className="border border-border bg-surface/55 p-5 sm:p-6"
                  key={platform.platform}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                        {platform.platform}
                      </p>
                      <h3 className="mt-3 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
                        {platform.status}
                      </h3>
                    </div>
                    <a
                      className="inline-flex min-h-11 items-center rounded-sm font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-accent uppercase underline decoration-transparent underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground hover:decoration-current"
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open Ritwik Biswas ${platform.platform} profile`}
                    >
                      Profile
                    </a>
                  </div>
                  <dl className="mt-6 grid gap-4">
                    {platform.stats.map((stat) => (
                      <div
                        className="border-t border-border pt-4"
                        key={stat.label}
                      >
                        <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] font-semibold text-foreground">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>

            <aside
              className="border border-border-strong p-5 sm:p-6"
              aria-label="Additional achievement signals"
            >
              <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                Additional Signals
              </p>
              <ul className="mt-5 space-y-4">
                {achievementSignals.map((signal) => (
                  <li
                    className="border-l border-border-strong pl-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                    key={signal}
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section
        className="border-y border-border py-20 scroll-mt-32"
        aria-labelledby="recruiter-brief-title"
      >
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div>
              <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
                Recruiter Brief
              </p>
              <h2
                id="recruiter-brief-title"
                className="mt-4 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground"
              >
                {recruiterBrief.summary}
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {recruiterBrief.evidence.map((item) => (
                  <li
                    className="border-t border-border pt-4 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href={profile.resumePath} variant="primary">
                  View Resume
                </ActionLink>
                {linkedIn ? (
                  <ActionLink
                    href={linkedIn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Ritwik Biswas on LinkedIn"
                  >
                    LinkedIn
                  </ActionLink>
                ) : null}
                <ActionLink href={`mailto:${profile.email}`} variant="text">
                  Email
                </ActionLink>
              </div>
            </div>

            <aside
              className="border border-border bg-surface/55 p-5 sm:p-6"
              aria-label="Education"
            >
              <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                Education
              </p>
              <h3 className="mt-4 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
                {recruiterBrief.education.institution}
              </h3>
              <p className="mt-4 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                {recruiterBrief.education.degree}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                <div>
                  <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                    Years
                  </dt>
                  <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                    {recruiterBrief.education.dates}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                    CGPA
                  </dt>
                  <dd className="mt-1 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                    {recruiterBrief.education.cgpa}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-20 scroll-mt-32" id="contact">
        <Container width="content">
          <div className="max-w-4xl">
            <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
              Contact
            </p>
            <h2 className="mt-4 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground">
              LET’S BUILD SOMETHING THAT SHIPS.
            </h2>
            <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
              {profile.availability.summary} {profile.availability.immediate}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={`mailto:${profile.email}`} variant="primary">
                Email Ritwik
              </ActionLink>
              <ActionLink href={profile.resumePath}>View Resume</ActionLink>
              {linkedIn ? (
                <ActionLink
                  href={linkedIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Ritwik Biswas on LinkedIn"
                >
                  LinkedIn
                </ActionLink>
              ) : null}
              {github ? (
                <ActionLink
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Ritwik Biswas on GitHub"
                >
                  GitHub
                </ActionLink>
              ) : null}
            </div>
            <p className="mt-6 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-muted">
              Algorithm profiles:{" "}
              {leetCode ? (
                <a
                  className="text-foreground-secondary underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground"
                  href={leetCode.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
              ) : null}
              {leetCode && codeforces ? " / " : null}
              {codeforces ? (
                <a
                  className="text-foreground-secondary underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-base)] hover:text-foreground"
                  href={codeforces.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codeforces
                </a>
              ) : null}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
