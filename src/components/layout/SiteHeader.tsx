import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { getSocialLink } from "@/data/social-links";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  const github = getSocialLink("github");
  const linkedIn = getSocialLink("linkedin");

  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-border bg-background-elevated/95 backdrop-blur-sm">
      <Container
        className="flex min-h-header-height flex-wrap items-center justify-between gap-3 py-3"
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

        <nav aria-label="Primary external links">
          <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {github ? (
              <li>
                <a
                  className="inline-flex min-h-11 items-center rounded-sm px-2.5 py-2 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-secondary uppercase transition-colors duration-[var(--duration-base)] hover:text-foreground sm:px-3"
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Ritwik Biswas on GitHub"
                >
                  {github.label}
                </a>
              </li>
            ) : null}
            {linkedIn ? (
              <li>
                <a
                  className="inline-flex min-h-11 items-center rounded-sm px-2.5 py-2 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-secondary uppercase transition-colors duration-[var(--duration-base)] hover:text-foreground sm:px-3"
                  href={linkedIn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Ritwik Biswas on LinkedIn"
                >
                  {linkedIn.label}
                </a>
              </li>
            ) : null}
            <li>
              <a
                className="inline-flex min-h-11 items-center rounded-sm border border-border-strong px-3 py-2 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:text-accent"
                href={profile.resumePath}
                aria-label="View Ritwik Biswas resume PDF"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
