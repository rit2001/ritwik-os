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
    const sections = links.flatMap((link) => {
      const section = document.querySelector<HTMLElement>(link.href);
      return section ? [{ href: link.href, section }] : [];
    });

    if (!sections.length) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--layout-header-height",
        ),
      );
      const activationLine =
        (Number.isFinite(headerHeight) ? headerHeight : 72) +
        Math.min(190, window.innerHeight * 0.24);

      const containing = sections.find(({ section }) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= activationLine && rect.bottom > activationLine;
      });

      if (containing) {
        setActiveHref(containing.href);
        return;
      }

      const dominant = sections
        .map((entry) => {
          const rect = entry.section.getBoundingClientRect();
          const visible = Math.max(
            0,
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
          );
          return { ...entry, visible };
        })
        .sort((a, b) => b.visible - a.visible)[0];

      if (dominant?.visible) setActiveHref(dominant.href);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
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
