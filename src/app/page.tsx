import { ActionLink } from "@/components/ui/ActionLink";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { AlgorithmProfileCard } from "@/components/motion/AlgorithmProfileCard";
import { CapabilityMatrix } from "@/components/motion/CapabilityMatrix";
import {
  CurrentBuildItem,
  CurrentBuildPanel,
  CurrentBuildStatus,
} from "@/components/motion/CurrentBuildPanel";
import { EducationReveal } from "@/components/motion/EducationReveal";
import { ExperienceTimeline } from "@/components/motion/ExperienceTimeline";
import { HeroScroll } from "@/components/motion/HeroScroll";
import { ProjectCard } from "@/components/motion/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
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
import { getHomeStructuredData } from "@/lib/structured-data";

function SectionIntro({
  eyebrow,
  title,
}: Readonly<{
  eyebrow: string;
  title: string;
}>) {
  return (
    <header className="max-w-3xl">
      <StaggerGroup>
        <StaggerItem>
          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
            {eyebrow}
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-4 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground">
            {title}
          </h2>
        </StaggerItem>
      </StaggerGroup>
    </header>
  );
}

function TagList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          className="rounded-xs border border-border bg-surface-muted px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.04em] text-foreground-secondary"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const projectInternalActionClassName =
  "inline-flex min-h-11 items-center self-start rounded-sm font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-accent uppercase underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color,transform] duration-[var(--duration-base)] hover:text-accent hover:decoration-current focus-visible:text-accent focus-visible:decoration-current sm:self-auto";

const projectExternalActionClassName =
  "inline-flex min-h-11 items-center self-start rounded-sm font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-secondary uppercase underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color,transform] duration-[var(--duration-base)] hover:text-foreground focus-visible:text-foreground sm:self-auto";

export default function Home() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");
  const leetCode = getSocialLink("leetcode");
  const codeforces = getSocialLink("codeforces");
  const stackDirection = profile.currentBuild.stackDirection.join(" / ");

  return (
    <>
      <JsonLd data={getHomeStructuredData()} />
      <Container
        className="grid min-h-[calc(100dvh-var(--layout-header-height))] scroll-mt-32 items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14"
        id="overview"
        width="wide"
      >
        <HeroScroll className="max-w-4xl" variant="content">
          <section aria-labelledby="hero-title">
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
        </HeroScroll>

        <HeroScroll variant="panel">
          <CurrentBuildPanel>
            <CurrentBuildItem>
              <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
                Current Build
              </p>
            </CurrentBuildItem>
            <CurrentBuildItem>
              <h2
                id="current-build-title"
                className="mt-5 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground uppercase"
              >
                {profile.currentBuild.project}
              </h2>
            </CurrentBuildItem>
            <CurrentBuildItem>
              <p className="mt-3 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                {profile.currentBuild.category}
              </p>
            </CurrentBuildItem>

            <dl className="mt-7 space-y-5 border-t border-border pt-6">
              <CurrentBuildItem>
                <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  Status
                </dt>
                <CurrentBuildStatus>
                  {profile.currentBuild.status}
                </CurrentBuildStatus>
              </CurrentBuildItem>
              <CurrentBuildItem>
                <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  Current Milestone
                </dt>
                <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                  <span className="font-semibold text-foreground">
                    {profile.currentBuild.currentMilestone}.
                  </span>{" "}
                  {profile.currentBuild.milestoneExplanation}
                </dd>
              </CurrentBuildItem>
              <CurrentBuildItem>
                <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  Next Step
                </dt>
                <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                  {profile.currentBuild.nextStep}
                </dd>
              </CurrentBuildItem>
              <CurrentBuildItem>
                <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  Stack Direction
                </dt>
                <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                  {stackDirection}
                </dd>
              </CurrentBuildItem>
              <CurrentBuildItem>
                <dt className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  Repository
                </dt>
                <dd className="mt-2 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                  {profile.currentBuild.repository}
                </dd>
              </CurrentBuildItem>
            </dl>

            <CurrentBuildItem className="mt-7 border-t border-border pt-6">
              <ActionLink href="/work/traceforge" variant="primary">
                View Build Case Study
              </ActionLink>
            </CurrentBuildItem>
          </CurrentBuildPanel>
        </HeroScroll>
      </Container>

      <section
        className="border-t border-border py-20 scroll-mt-32"
        id="systems"
      >
        <Container width="wide">
          <Reveal>
            <SectionIntro
              eyebrow="Selected Systems"
              title="Production-focused engineering work across AI, backend systems, and real-time applications."
            />
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-5 lg:grid-cols-2">
            {selectedProjects.map((project) => (
              <StaggerItem key={project.title}>
                <ProjectCard
                  ariaLabel={
                    project.caseStudyPath && !project.githubUrl
                      ? `Open ${project.title} build case study`
                      : project.githubUrl && !project.caseStudyPath
                        ? `Open ${project.title} repository on GitHub`
                        : undefined
                  }
                  href={
                    project.caseStudyPath && !project.githubUrl
                      ? project.caseStudyPath
                      : project.githubUrl && !project.caseStudyPath
                        ? project.githubUrl
                        : null
                  }
                  interactive={Boolean(
                    project.caseStudyPath || project.githubUrl,
                  )}
                >
                  <StaggerGroup>
                    <StaggerItem y={12}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                          {project.category}
                        </p>
                        <span className="rounded-xs border border-border bg-background px-2.5 py-1 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                          {project.status}
                        </span>
                      </div>
                    </StaggerItem>
                    <StaggerItem y={12}>
                      <h3 className="mt-5 text-[length:var(--text-heading-3-size)] leading-[var(--text-heading-3-line-height)] font-semibold text-foreground">
                        {project.title}
                      </h3>
                    </StaggerItem>
                    <StaggerItem y={12}>
                      <p className="mt-4 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                        {project.summary}
                      </p>
                    </StaggerItem>
                    <StaggerItem y={12}>
                      <div className="mt-6">
                        <TagList items={project.stack} />
                      </div>
                    </StaggerItem>
                    <StaggerItem y={12}>
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
                        {project.caseStudyPath && project.githubUrl ? (
                          <div className="flex shrink-0 flex-wrap gap-3">
                            <a
                              className={projectInternalActionClassName}
                              href={project.caseStudyPath}
                            >
                              View Case Study{" "}
                              <span
                                className="ml-1 inline-block transition-transform duration-[var(--duration-base)] group-hover:translate-x-1.5 group-focus-within:translate-x-1.5"
                                aria-hidden="true"
                              >
                                →
                              </span>
                            </a>
                            <a
                              className={projectExternalActionClassName}
                              href={project.githubUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              GitHub{" "}
                              <span
                                className="ml-1 inline-block transition-transform duration-[var(--duration-base)] hover:translate-x-1.5 focus-visible:translate-x-1.5"
                                aria-hidden="true"
                              >
                                →
                              </span>
                            </a>
                          </div>
                        ) : project.caseStudyPath ? (
                          <span className={projectInternalActionClassName}>
                            View Build Case Study{" "}
                            <span
                              className="ml-1 inline-block transition-transform duration-[var(--duration-base)] group-hover:translate-x-1.5 group-focus-within:translate-x-1.5 group-focus-visible:translate-x-1.5"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </span>
                        ) : project.githubUrl ? (
                          <span className={projectExternalActionClassName}>
                            GitHub{" "}
                            <span
                              className="ml-1 inline-block transition-transform duration-[var(--duration-base)] group-hover:translate-x-1.5 group-focus-within:translate-x-1.5 group-focus-visible:translate-x-1.5"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </span>
                        ) : null}
                      </div>
                    </StaggerItem>
                  </StaggerGroup>
                </ProjectCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="py-20 scroll-mt-32" id="experience">
        <Container width="wide">
          <Reveal>
            <SectionIntro
              eyebrow="Experience"
              title="Engineering ownership across AI products, backend services, full-stack systems, and cloud delivery."
            />
          </Reveal>

          <ExperienceTimeline roles={experience} />
        </Container>
      </section>

      <section
        className="border-y border-border bg-background-elevated/45 py-20 scroll-mt-32"
        id="capabilities"
      >
        <Container width="wide">
          <Reveal>
            <SectionIntro
              eyebrow="Engineering Capabilities"
              title="A practical capability map across AI systems, backend platforms, product surfaces, and currently building observability infrastructure."
            />
          </Reveal>

          <CapabilityMatrix groups={capabilityGroups} />
        </Container>
      </section>

      <section className="py-20 scroll-mt-32" id="algorithms">
        <Container width="wide">
          <Reveal>
            <SectionIntro
              eyebrow="Algorithm Engine"
              title="Competitive programming evidence and algorithmic depth without live scraping or gamified counters."
            />
          </Reveal>

          <StaggerGroup className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="grid gap-5 md:grid-cols-2">
              {algorithmProfiles.map((platform) => (
                <StaggerItem key={platform.platform}>
                  <AlgorithmProfileCard profile={platform} />
                </StaggerItem>
              ))}
            </div>

            <StaggerItem>
              <aside
                className="rounded-md border border-border-strong bg-surface/35 p-5 sm:p-6"
                aria-label="Additional achievement signals"
              >
                <StaggerGroup>
                  <StaggerItem y={10}>
                    <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                      Additional Signals
                    </p>
                  </StaggerItem>
                  <StaggerGroup className="mt-5 space-y-0 divide-y divide-border">
                    {achievementSignals.map((signal) => (
                      <StaggerItem key={signal} y={10}>
                        <div className="group/signal py-4 transition-[background-color] duration-[var(--duration-base)] first:pt-0 last:pb-0 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-surface/45">
                          <span
                            aria-hidden="true"
                            className="mb-3 block h-px w-8 bg-border-strong transition-[background-color,width] duration-[var(--duration-base)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/signal:w-12 [@media(hover:hover)_and_(pointer:fine)]:group-hover/signal:bg-accent"
                          />
                          <p className="text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] font-medium text-foreground-secondary transition-colors duration-[var(--duration-base)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/signal:text-foreground">
                            {signal}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </StaggerGroup>
              </aside>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      <section
        className="border-y border-border bg-background-elevated/35 py-20 scroll-mt-32"
        aria-labelledby="recruiter-brief-title"
      >
        <Container width="wide">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12">
              <div>
                <StaggerGroup>
                  <StaggerItem y={12}>
                    <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
                      Recruiter Brief
                    </p>
                  </StaggerItem>
                  <StaggerItem y={12}>
                    <h2
                      id="recruiter-brief-title"
                      className="mt-4 max-w-4xl text-[clamp(1.65rem,3.2vw,3rem)] leading-[1.08] font-semibold text-balance text-foreground"
                    >
                      {recruiterBrief.summary}
                    </h2>
                  </StaggerItem>
                  <StaggerItem y={12}>
                    <StaggerGroup className="mt-9 grid overflow-hidden rounded-md border border-border bg-border md:grid-cols-3 md:gap-px">
                      <StaggerItem y={10}>
                        <article className="h-full bg-surface/65 p-5 transition-colors duration-[var(--duration-base)] hover:bg-surface">
                          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                            Proof 01 / Production Delivery
                          </p>
                          <h3 className="mt-4 text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground uppercase">
                            3 Software Engineering Internships
                          </h3>
                          <p className="mt-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                            Delivered production-oriented engineering work
                            across AI products, backend services, operational
                            platforms, and cloud deployment workflows.
                          </p>
                        </article>
                      </StaggerItem>
                      <StaggerItem y={10}>
                        <article className="h-full bg-surface/55 p-5 transition-colors duration-[var(--duration-base)] hover:bg-surface">
                          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                            Proof 02 / Systems Breadth
                          </p>
                          <h3 className="mt-4 text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground uppercase">
                            AI + Backend + Real-Time + Cloud
                          </h3>
                          <p className="mt-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                            Built systems involving stateful AI agents, RAG,
                            backend APIs, authentication, payments, real-time
                            communication, Docker, AWS, and CI/CD.
                          </p>
                        </article>
                      </StaggerItem>
                      <StaggerItem y={10}>
                        <article className="h-full bg-surface/65 p-5 transition-colors duration-[var(--duration-base)] hover:bg-surface">
                          <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.12em] text-accent uppercase">
                            Proof 03 / Algorithmic Depth
                          </p>
                          <h3 className="mt-4 text-[length:var(--text-body-large-size)] leading-tight font-semibold text-foreground uppercase">
                            LeetCode Knight · Codeforces Specialist
                          </h3>
                          <p className="mt-3 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] text-foreground-secondary">
                            Combines applied engineering experience with 1,500+
                            solved problems, a LeetCode peak rating of 1923, and
                            a Codeforces peak rating of 1415.
                          </p>
                        </article>
                      </StaggerItem>
                    </StaggerGroup>
                  </StaggerItem>
                  <StaggerItem y={12}>
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
                      <ActionLink
                        href={`mailto:${profile.email}`}
                        variant="text"
                      >
                        Email
                      </ActionLink>
                    </div>
                  </StaggerItem>
                </StaggerGroup>
              </div>

              <EducationReveal education={recruiterBrief.education} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pt-16 pb-20 scroll-mt-32" id="contact">
        <Container width="wide">
          <Reveal y={18}>
            <StaggerGroup className="max-w-4xl">
              <StaggerItem y={12}>
                <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
                  Contact
                </p>
              </StaggerItem>
              <StaggerItem y={12}>
                <h2 className="mt-4 text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold text-balance text-foreground">
                  LET’S BUILD SOMETHING THAT SHIPS.
                </h2>
              </StaggerItem>
              <StaggerItem y={12}>
                <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
                  {profile.availability.summary}{" "}
                  {profile.availability.immediate}
                </p>
              </StaggerItem>
              <StaggerItem y={12}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ActionLink
                    href={`mailto:${profile.email}`}
                    variant="primary"
                  >
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
              </StaggerItem>
              <StaggerItem y={12}>
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
                  <p className="font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                    Algorithm profiles
                  </p>
                  {leetCode ? (
                    <ActionLink
                      href={leetCode.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Ritwik Biswas on LeetCode"
                    >
                      LeetCode
                    </ActionLink>
                  ) : null}
                  {codeforces ? (
                    <ActionLink
                      href={codeforces.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Ritwik Biswas on Codeforces"
                    >
                      Codeforces
                    </ActionLink>
                  ) : null}
                </div>
              </StaggerItem>
            </StaggerGroup>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
