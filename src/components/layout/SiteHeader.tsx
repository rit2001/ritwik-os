import Link from "next/link";

import { HeaderNavigation } from "@/components/layout/HeaderNavigation";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { getSocialLink } from "@/data/social-links";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");
  const sectionLinks = [
    { label: "Systems", href: "#systems" },
    { label: "Experience", href: "#experience" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Foundations", href: "#foundations" },
    { label: "Contact", href: "#contact" },
  ] as const;

  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-border bg-background-elevated/95 backdrop-blur-sm">
      <Container
        className="flex min-h-header-height flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3"
        width="wide"
      >
        <Link
          className="group inline-flex min-h-11 items-center gap-3 rounded-sm font-mono text-[length:var(--text-technical-size)] leading-[var(--text-technical-line-height)] font-semibold tracking-[0.16em] text-foreground uppercase"
          href="/"
          aria-label="RITWIK OS home"
        >
          <span
            className="h-2.5 w-2.5 border border-accent bg-accent-muted transition-colors duration-[var(--duration-base)] group-hover:bg-accent"
            aria-hidden="true"
          />
          {siteConfig.name}
        </Link>

        <Link
          className="inline-flex min-h-11 items-center rounded-sm px-3 py-2 font-mono text-[length:var(--text-label-size)] font-semibold tracking-[0.08em] text-foreground-secondary uppercase transition-colors hover:text-foreground sm:hidden"
          href="/work"
        >
          Work
        </Link>

        <HeaderNavigation
          github={github}
          linkedIn={linkedIn}
          resumePath={profile.resumePath}
          sectionLinks={sectionLinks}
        />
      </Container>
    </header>
  );
}
