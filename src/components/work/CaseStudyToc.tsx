"use client";

import { useEffect, useMemo, useState } from "react";

import type { CaseStudyTocItem } from "@/types/content";

export function CaseStudyToc({
  items,
}: Readonly<{ items: readonly CaseStudyTocItem[] }>) {
  const sectionIds = useMemo(
    () => items.map((item) => item.href.replace(/^#/, "")),
    [items],
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.08, 0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  const tocLinks = (
    <ol className="grid gap-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <a
            className={[
              "block rounded-sm border-l px-3 py-1.5 text-[length:var(--text-body-small-size)] leading-[var(--text-body-small-line-height)] transition-[border-color,background-color,color,font-weight] duration-[var(--duration-base)] hover:border-accent hover:bg-surface-muted/55 hover:text-foreground focus-visible:border-accent focus-visible:bg-accent-muted/25 focus-visible:text-foreground",
              activeId === item.href.slice(1)
                ? "border-accent bg-accent-muted/20 font-semibold text-accent"
                : "border-transparent text-foreground-muted",
            ].join(" ")}
            href={item.href}
            aria-current={
              activeId === item.href.slice(1) ? "location" : undefined
            }
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav
      className="lg:sticky lg:top-[calc(var(--layout-header-height)+var(--space-6))] lg:max-h-[calc(100vh-var(--layout-header-height)-var(--space-10))]"
      aria-label="On this page"
    >
      <details className="rounded-md border border-border bg-surface/45 p-4 lg:hidden">
        <summary className="cursor-pointer font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
          On This Page
        </summary>
        <div className="mt-4">{tocLinks}</div>
      </details>

      <div className="hidden max-h-[calc(100vh-var(--layout-header-height)-var(--space-10))] overflow-y-auto overflow-x-hidden border-l border-border pl-3 lg:block">
        <p className="px-3 font-mono text-[length:var(--text-label-size)] leading-[var(--text-label-line-height)] font-semibold tracking-[0.14em] text-accent uppercase">
          On This Page
        </p>
        <div className="mt-4">{tocLinks}</div>
      </div>
    </nav>
  );
}
