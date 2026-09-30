"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HeaderSectionNav } from "@/components/motion/HeaderSectionNav";
import type { SocialLink } from "@/data/social-links";

type HeaderNavigationProps = {
  github?: SocialLink;
  linkedIn?: SocialLink;
  resumePath: string;
  sectionLinks: readonly {
    label: string;
    href: string;
  }[];
};

const internalNavClassName =
  "relative inline-flex min-h-11 items-center rounded-sm px-2.5 py-2 pl-5 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] uppercase transition-colors duration-[var(--duration-base)] sm:px-3 sm:pl-5";

function InternalLink({
  active,
  href,
  label,
}: Readonly<{ active?: boolean; href: string; label: string }>) {
  return (
    <li>
      <a
        className={[
          internalNavClassName,
          active
            ? "text-accent"
            : "text-foreground-muted hover:text-foreground",
        ].join(" ")}
        href={href}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={[
            "absolute left-2 h-1.5 w-1.5 rounded-xs bg-accent transition-opacity duration-[var(--duration-base)]",
            active ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden="true"
        />
        <span
          className={[
            "absolute bottom-1 left-5 h-0.5 w-6 origin-left bg-accent transition-transform duration-[var(--duration-base)]",
            active ? "scale-x-100" : "scale-x-0",
          ].join(" ")}
          aria-hidden="true"
        />
        {label}
      </a>
    </li>
  );
}

export function HeaderNavigation({
  github,
  linkedIn,
  resumePath,
  sectionLinks,
}: Readonly<HeaderNavigationProps>) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        <HeaderSectionNav links={sectionLinks} />

        <nav
          className="order-2 hidden sm:block lg:order-3"
          aria-label="Primary external links"
        >
          <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <li>
              <Link
                className="inline-flex min-h-11 items-center rounded-sm px-2.5 py-2 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground-secondary uppercase transition-colors duration-[var(--duration-base)] hover:text-foreground sm:px-3"
                href="/work"
              >
                Work
              </Link>
            </li>
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
                href={resumePath}
                aria-label="View Ritwik Biswas resume PDF"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  const workActive = pathname === "/work" || pathname.startsWith("/work/");

  return (
    <nav className="order-3 w-full lg:order-2 lg:w-auto" aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-x-2">
        <InternalLink href="/" label="Home" active={pathname === "/"} />
        <InternalLink href="/work" label="Work" active={workActive} />
        <li>
          <a
            className="inline-flex min-h-11 items-center rounded-sm border border-border-strong px-3 py-2 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] text-foreground uppercase transition-colors duration-[var(--duration-base)] hover:border-accent hover:text-accent"
            href={resumePath}
            aria-label="View Ritwik Biswas resume PDF"
          >
            Resume
          </a>
        </li>
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
      </ul>
    </nav>
  );
}
