import { CapabilityEvidenceMap } from "@/components/home/CapabilityEvidenceMap";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { FlagshipSystems } from "@/components/home/FlagshipSystems";
import { FoundationsSection } from "@/components/home/FoundationsSection";
import { JourneyTimeline } from "@/components/home/JourneyTimeline";
import { ProfessionalTopology } from "@/components/home/ProfessionalTopology";
import { Reveal } from "@/components/motion/Reveal";
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
        <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.03em] text-balance text-foreground">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="self-end text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-muted">
          {description}
        </p>
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
          className="grid min-h-[calc(100dvh-var(--layout-header-height))] items-center gap-8 py-14 sm:py-18 lg:grid-cols-[minmax(0,0.43fr)_minmax(30rem,0.57fr)] lg:gap-8 lg:py-16"
          width="wide"
        >
          <div className="relative z-10">
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.18em] text-signal-cyan uppercase">
              {profile.displayName}
            </p>
            <h1 className="mt-6 max-w-[13ch] text-[clamp(3.05rem,7.1vw,6.8rem)] leading-[0.84] font-semibold tracking-[-0.065em] text-foreground uppercase">
              <span className="block">Engineering</span>
              <span className="block text-transparent [-webkit-text-stroke:1px_var(--ritwik-color-foreground-secondary)]">
                Intelligence
              </span>
              <span className="block">Into Production.</span>
            </h1>
            <p className="mt-7 whitespace-pre-line font-mono text-[length:var(--text-technical-size)] leading-[1.8] font-semibold tracking-[0.08em] text-signal-cyan uppercase">
              {profile.shortRoleLine}
            </p>
            <p className="mt-5 max-w-xl text-[length:var(--text-body-size)] leading-[var(--text-body-line-height)] text-foreground-secondary">
              Building AI products, distributed systems, and full-stack
              platforms that solve real engineering problems.
            </p>

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

          <ProfessionalTopology />
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
        className="relative overflow-hidden border-b border-border py-20 lg:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(47_127_255_/_0.1),transparent_54%)]"
          aria-hidden="true"
        />
        <Container className="relative" width="wide">
          <Reveal>
            <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.16em] text-signal-cyan uppercase">
              My Journey
            </p>
            <h2
              className="mt-4 max-w-5xl text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.035em] text-foreground uppercase"
              id="journey-title"
            >
              From algorithms to real-world systems.
            </h2>
          </Reveal>
          <JourneyTimeline />
        </Container>
      </section>

      <section id="systems" className="scroll-mt-32 py-20 lg:py-28">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Systems / Flagship Portfolio"
              title="Three current systems. One engineering thesis: make complex behavior inspectable, deterministic, and credible."
              description="Applied AI, AI infrastructure, and distributed collaboration—presented through architecture decisions and verifiable evidence."
            />
          </Reveal>
          <FlagshipSystems />
        </Container>
      </section>

      <section
        id="experience"
        className="scroll-mt-32 border-y border-border bg-background-elevated/25 py-20 lg:py-24"
      >
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Experience"
              title="Engineering delivery across AI products, operational systems, and full-stack platforms."
              description="Three concise role records. Each keeps the system context and the strongest implementation evidence."
            />
          </Reveal>
          <ExperienceSection />
        </Container>
      </section>

      <section id="capabilities" className="scroll-mt-32 py-20 lg:py-24">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Capability Evidence Map"
              title="Techniques are useful only when their application is visible."
              description="Every capability area maps tools and engineering methods to the systems or experience where they were demonstrated."
            />
          </Reveal>
          <CapabilityEvidenceMap />
        </Container>
      </section>

      <section
        id="foundations"
        className="scroll-mt-32 border-y border-border bg-background-elevated/25 py-20 lg:py-24"
      >
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Foundations"
              title="Algorithmic depth and engineering education—supporting signals, not the main identity."
            />
          </Reveal>
          <FoundationsSection />
        </Container>
      </section>

      <section id="contact" className="scroll-mt-32 py-20 lg:py-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16">
            <Reveal>
              <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.14em] text-accent uppercase">
                Contact
              </p>
              <h2 className="mt-4 max-w-4xl text-[length:var(--text-heading-2-size)] leading-[var(--text-heading-2-line-height)] font-semibold tracking-[-0.03em] text-balance text-foreground">
                Build systems that survive contact with production.
              </h2>
              <p className="mt-6 max-w-3xl text-[length:var(--text-body-large-size)] leading-[var(--text-body-large-line-height)] text-foreground-secondary">
                {profile.availability.summary} {profile.availability.immediate}
              </p>
            </Reveal>

            <div className="border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.1em] text-foreground-muted uppercase">
                {profile.location}
              </p>
              <a
                className="mt-3 block break-all text-[length:var(--text-body-size)] font-semibold text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
              <div className="mt-7 flex flex-wrap gap-3">
                <ActionLink href={`mailto:${profile.email}`} variant="primary">
                  Email Ritwik
                </ActionLink>
                <ActionLink href={profile.resumePath}>Résumé</ActionLink>
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
          </div>
        </Container>
      </section>
    </SignalProvider>
  );
}
