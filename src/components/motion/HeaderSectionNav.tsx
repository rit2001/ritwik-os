"use client";

import { useEffect, useState } from "react";

type HeaderSectionLink = {
  label: string;
  href: string;
};

export function HeaderSectionNav({
  links,
}: Readonly<{ links: readonly HeaderSectionLink[] }>) {
  const [activeHref, setActiveHref] = useState<string | null>(
    links[0]?.href ?? null,
  );

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            const viewportCenter = window.innerHeight / 2;
            const aDistance = Math.abs(
              aRect.top + aRect.height / 2 - viewportCenter,
            );
            const bDistance = Math.abs(
              bRect.top + bRect.height / 2 - viewportCenter,
            );

            return aDistance - bDistance;
          })[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-38% 0px -42% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [links]);

  return (
    <nav
      className="order-3 w-full lg:order-2 lg:w-auto"
      aria-label="Homepage sections"
    >
      <ul className="flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-x-2">
        {links.map((link) => {
          const isActive = activeHref === link.href;

          return (
            <li key={link.href}>
              <a
                className={[
                  "relative inline-flex min-h-11 items-center rounded-sm px-2.5 py-2 pl-5 font-mono text-[length:var(--text-label-size)] leading-none font-semibold tracking-[0.08em] uppercase transition-colors duration-[var(--duration-base)] sm:px-3 sm:pl-5",
                  isActive
                    ? "text-accent"
                    : "text-foreground-muted hover:text-foreground",
                ].join(" ")}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
              >
                <span
                  className={[
                    "absolute left-2 h-1.5 w-1.5 rounded-xs bg-accent transition-opacity duration-[var(--duration-base)]",
                    isActive ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span
                  className={[
                    "absolute bottom-1 left-5 h-0.5 w-6 origin-left bg-accent transition-transform duration-[var(--duration-base)] sm:left-5",
                    isActive ? "scale-x-100" : "scale-x-0",
                  ].join(" ")}
                  aria-hidden="true"
                />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
