import { CapabilityEvidenceMap } from "@/components/home/CapabilityEvidenceMap";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FlagshipSystems } from "@/components/home/FlagshipSystems";
import { FoundationsSection } from "@/components/home/FoundationsSection";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { ProfessionalTopology } from "@/components/home/ProfessionalTopology";
import { SelectedEarlierSystems } from "@/components/home/SelectedEarlierSystems";
import { Reveal } from "@/components/motion/Reveal";
import { ViewportActivity } from "@/components/motion/ViewportActivity";
import { JsonLd } from "@/components/seo/JsonLd";
import { ActionLink } from "@/components/ui/ActionLink";
import { Container } from "@/components/ui/Container";
import { SignalProvider } from "@/components/signal/SignalProvider";
import { profile } from "@/data/profile";
import { getSocialLink } from "@/data/social-links";
import { getHomeStructuredData } from "@/lib/structured-data";

function SectionHeader({
  eyebrow,
  title,
  description,
}: Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
}>) {
  return (
    <header className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(20rem,0.28fr)] lg:gap-12">
      <div>
        <Reveal y={18}>
          <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06} y={22}>
          <h2 className="mt-4 max-w-4xl text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.03em] text-balance text-foreground">
            {title}
          </h2>
        </Reveal>
      </div>
      {description ? (
        <Reveal className="self-end" delay={0.11} y={20}>
          <p className="text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-muted">
            {description}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}

const credibilitySignals = [
  { label: "Education", value: "IIT Kharagpur" },
  { label: "Experience", value: "3 Software Engineering Internships" },
  { label: "LeetCode", value: "Knight · Peak 1923" },
  { label: "Codeforces", value: "Specialist · Peak 1415" },
] as const;

export default function Home() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");

  return (
    <SignalProvider>
      <JsonLd data={getHomeStructuredData()} />

      <section
        id="overview"
        className="relative isolate scroll-mt-32 overflow-hidden border-b border-border"
      >
        <div
          className="signal-grid pointer-events-none absolute inset-0 -z-10 opacity-70"
          aria-hidden="true"
        />
        <Container
          className="grid min-h-[calc(100dvh-var(--layout-header-height))] items-center gap-8 py-14 sm:py-18 lg:grid-cols-[minmax(0,0.58fr)_minmax(25rem,0.42fr)] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-0 lg:py-16"
          width="wide"
        >
          <div className="relative z-10">
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.18em] text-signal-cyan uppercase">
              {profile.displayName}
            </p>
            <h1 className="mt-6 max-w-[15ch] text-[clamp(2.7rem,3.35vw,3.65rem)] leading-[0.92] font-semibold tracking-[-0.025em] text-white uppercase min-[1200px]:max-w-none">
              <span className="flex flex-wrap gap-x-[0.32em] min-[1200px]:flex-nowrap">
                <span>Engineering</span>
                <span>Intelligence</span>
              </span>
              <span className="mt-[0.08em] flex flex-wrap gap-x-[0.32em] min-[1200px]:flex-nowrap">
                <span>Into</span>
                <span>Production.</span>
              </span>
            </h1>
            <p className="mt-7 whitespace-pre-line font-mono text-[length:var(--text-technical-size)] leading-[1.8] font-semibold tracking-[0.08em] text-signal-cyan uppercase">
              {profile.shortRoleLine}
            </p>
            <p className="mt-5 max-w-xl text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              Building AI products, distributed systems, and full-stack
              platforms that solve real engineering problems.
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ProfessionalTopology />
          </div>

          <div className="relative z-10 lg:col-start-1 lg:row-start-2 lg:self-start">
            <div className="mt-7 grid max-w-2xl gap-4 border-y border-border py-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                  Current base
                </p>
                <p className="mt-2 text-[length:var(--text-body-size)] font-semibold text-foreground">
                  {profile.location}
                </p>
              </div>
              <div>
                <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                  Availability
                </p>
                <p className="mt-2 text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
                  Open to relevant full-time engineering roles.{" "}
                  {profile.availability.immediate}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="#systems" variant="primary">
                Explore My Work
              </ActionLink>
              <ActionLink href={profile.resumePath}>View Résumé</ActionLink>
              <ActionLink href={`mailto:${profile.email}`} variant="text">
                Email Me
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>

      <aside
        aria-label="Credibility highlights"
        className="border-b border-border bg-background-elevated/30"
      >
        <Container width="wide">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {credibilitySignals.map((signal) => (
              <div
                className="border-b border-border py-5 last:border-b-0 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
                key={signal.label}
              >
                <dt className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.12em] text-foreground-muted uppercase">
                  {signal.label}
                </dt>
                <dd className="mt-2 font-mono text-[length:var(--text-technical-size)] font-semibold tracking-[0.03em] text-foreground-secondary uppercase">
                  {signal.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </aside>

      <section
        aria-labelledby="journey-title"
        className="relative overflow-hidden border-b border-border py-16 lg:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(47_127_255_/_0.1),transparent_54%)]"
          aria-hidden="true"
        />
        <Container className="relative" width="wide">
          <Reveal y={18}>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.16em] text-signal-cyan uppercase">
              My Journey
            </p>
          </Reveal>
          <Reveal delay={0.06} y={22}>
            <h2
              className="mt-4 max-w-5xl text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.035em] text-foreground uppercase"
              id="journey-title"
            >
              From algorithms to real-world systems.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <JourneyTimeline />
          </Reveal>
        </Container>
      </section>

      <section id="systems" className="scroll-mt-32 py-20 lg:py-28">
        <Container width="wide">
          <SectionHeader
            eyebrow="Systems / Flagship Portfolio"
            title="Three current systems. One engineering thesis: make complex behavior inspectable, deterministic, and credible."
            description="Applied AI, AI infrastructure, and distributed collaboration—presented through architecture decisions and verifiable evidence."
          />
          <FlagshipSystems />
        </Container>
      </section>

      <section
        id="experience"
        className="scroll-mt-32 border-y border-border bg-background-elevated/25 py-20 lg:py-24"
      >
        <Container width="wide">
          <SectionHeader
            eyebrow="Experience"
            title="Engineering delivery across AI products, operational systems, and full-stack platforms."
            description="Three concise role records. Each keeps the system context and the strongest implementation evidence."
          />
          <Reveal delay={0.15}>
            <ExperienceSection />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-border py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_50%,rgb(47_127_255_/_0.09),transparent_30rem)]"
          aria-hidden="true"
        />
        <Container className="relative" width="wide">
          <SectionHeader
            eyebrow="Selected Earlier Systems"
            title="Earlier builds show the progression behind today’s flagship systems."
            description="A lower-tier evolution strip: real shipped scope, canonical actions, and explicit learning trajectories without claiming direct code lineage."
          />
          <Reveal delay={0.15}>
            <SelectedEarlierSystems />
          </Reveal>
        </Container>
      </section>

      <section id="capabilities" className="scroll-mt-32 py-20 lg:py-24">
        <Container width="wide">
          <SectionHeader
            eyebrow="Capability Evidence Map"
            title="Techniques are useful only when their application is visible."
            description="Every capability area maps tools and engineering methods to the systems or experience where they were demonstrated."
          />
          <Reveal delay={0.15}>
            <CapabilityEvidenceMap />
          </Reveal>
        </Container>
      </section>

      <section
        id="foundations"
        className="scroll-mt-32 border-y border-border bg-background-elevated/25 py-20 lg:py-24"
      >
        <Container width="wide">
          <SectionHeader
            eyebrow="Foundations"
            title="Algorithmic depth and engineering education—supporting signals, not the main identity."
          />
          <FoundationsSection />
        </Container>
      </section>

      <section
        id="contact"
        className="relative isolate scroll-mt-32 overflow-hidden py-18 lg:py-24"
      >
        <div
          className="signal-grid pointer-events-none absolute inset-0 -z-20 opacity-45"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_58%,rgb(47_127_255_/_0.18),transparent_24rem)]"
          aria-hidden="true"
        />
        <Container width="wide">
          <ViewportActivity className="contact-finale relative grid gap-10 border-y border-border py-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16 lg:py-12">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-70 lg:block"
              preserveAspectRatio="none"
              viewBox="0 0 1200 320"
            >
              <path
                className="contact-route"
                d="M30 22 H690 C835 22 842 160 1010 160"
                fill="none"
                stroke="var(--ritwik-color-signal-cyan)"
                strokeDasharray="3 9"
                strokeWidth="1.5"
              />
              <path
                className="contact-route"
                d="M646 22 C760 22 760 160 1010 160"
                fill="none"
                stroke="var(--ritwik-color-accent)"
                strokeDasharray="3 9"
                strokeWidth="1.5"
              />
              <path
                className="contact-route"
                d="M30 298 H690 C835 298 842 160 1010 160"
                fill="none"
                stroke="var(--ritwik-color-signal-amber)"
                strokeDasharray="3 9"
                strokeWidth="1.5"
              />
              <text
                fill="var(--ritwik-color-foreground-muted)"
                fontFamily="monospace"
                fontSize="10"
                x="36"
                y="16"
              >
                SYSTEMS
              </text>
              <text
                fill="var(--ritwik-color-foreground-muted)"
                fontFamily="monospace"
                fontSize="10"
                x="648"
                y="16"
              >
                EXPERIENCE
              </text>
              <text
                fill="var(--ritwik-color-foreground-muted)"
                fontFamily="monospace"
                fontSize="10"
                x="36"
                y="316"
              >
                FOUNDATIONS
              </text>
              <circle
                cx="948"
                cy="160"
                fill="var(--ritwik-color-signal-cyan)"
                opacity="0.38"
                r="3"
              />
              <path
                className="contact-photon"
                d="M30 22 H690 C835 22 842 160 1010 160"
                fill="none"
                pathLength="1"
                stroke="var(--ritwik-color-signal-cyan)"
                strokeDasharray="0.015 0.985"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <circle
                cx="978"
                cy="160"
                fill="var(--ritwik-color-signal-cyan)"
                opacity="0.66"
                r="3.5"
              />
              <circle
                className="contact-endpoint-ring"
                cx="1010"
                cy="160"
                fill="none"
                r="18"
                stroke="var(--ritwik-color-signal-amber)"
              />
              <circle
                cx="1010"
                cy="160"
                fill="var(--ritwik-color-signal-amber)"
                r="5"
              />
            </svg>
            <div>
              <Reveal y={18}>
                <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-signal-cyan uppercase">
                  Contact / Final signal destination
                </p>
              </Reveal>
              <Reveal delay={0.06} y={22}>
                <h2 className="mt-5 max-w-4xl text-[clamp(2.55rem,4.5vw,4.65rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-foreground uppercase">
                  <span className="block lg:whitespace-nowrap">
                    Build systems that survive
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    contact with production.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.11} y={20}>
                <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
                  {profile.availability.summary}{" "}
                  {profile.availability.immediate}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} y={22}>
              <div className="relative border border-border bg-background/88 px-6 py-7 shadow-[0_22px_70px_rgb(0_0_0_/.25)] backdrop-blur-sm lg:px-7">
                <span
                  className="signal-ripple absolute top-6 right-6 h-4 w-4 rounded-full border border-signal-amber"
                  aria-hidden="true"
                />
                <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-signal-cyan uppercase">
                  {profile.location}
                </p>
                <a
                  className="mt-3 block break-all text-[length:var(--text-body-size)] font-semibold text-foreground underline decoration-border-strong underline-offset-4 transition-[color,transform] hover:translate-x-1 hover:text-accent focus-visible:translate-x-1 focus-visible:text-accent"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="group relative inline-flex transition-transform hover:translate-x-1 hover:-translate-y-px focus-within:translate-x-1 focus-within:-translate-y-px">
                    <span
                      className="pointer-events-none absolute inset-[-0.45rem] rounded-lg border border-signal-cyan opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-safe:group-hover:animate-ping motion-safe:group-focus-within:animate-ping"
                      aria-hidden="true"
                    />
                    <ActionLink
                      href={`mailto:${profile.email}`}
                      variant="primary"
                    >
                      Email Me
                    </ActionLink>
                  </span>
                  <ActionLink href={profile.resumePath}>View Résumé</ActionLink>
                </div>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
                  {github ? (
                    <a
                      className="min-h-11 content-center transition-colors hover:text-foreground focus-visible:text-foreground"
                      href={github.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                  {linkedIn ? (
                    <a
                      className="min-h-11 content-center transition-colors hover:text-foreground focus-visible:text-foreground"
                      href={linkedIn.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </ViewportActivity>
        </Container>
      </section>
    </SignalProvider>
  );
}
