import StatefulAgenticAiAssistantContent from "../../content/work/stateful-agentic-ai-assistant.mdx";
import TraceForgeContent from "../../content/work/traceforge.mdx";
import { projects } from "../../data/projects";
import type { WorkEntry, WorkMeta } from "../../types/content";

import { workMetaSchema } from "./schemas";
import { workMetaEntries } from "./work-manifest";

const workModules = [
  {
    meta: workMetaEntries[0].meta,
    Content: TraceForgeContent,
  },
  {
    meta: workMetaEntries[1].meta,
    Content: StatefulAgenticAiAssistantContent,
  },
] satisfies readonly WorkEntry[];

function validateWorkEntries(entries: readonly WorkEntry[]): WorkEntry[] {
  const seen = new Set<string>();

  return entries.map((entry) => {
    const parsedMeta = workMetaSchema.parse(entry.meta);

    if (seen.has(parsedMeta.slug)) {
      throw new Error(`Duplicate work slug: ${parsedMeta.slug}`);
    }

    seen.add(parsedMeta.slug);

    if (!entry.Content) {
      throw new Error(`Missing MDX module for work slug: ${parsedMeta.slug}`);
    }

    return {
      ...entry,
      meta: parsedMeta satisfies WorkMeta,
    };
  });
}

export const workEntries = validateWorkEntries(workModules);

export function getAllWorkEntries() {
  return workEntries
    .filter((entry) => !entry.meta.draft)
    .sort((a, b) => Number(b.meta.featured) - Number(a.meta.featured));
}

/** Registered MDX content only; this intentionally excludes unpublished portfolio projects. */
export function getPublishedWorkEntries() {
  const orderByProjectId = new Map(
    projects.map((project) => [project.id, project.displayOrder]),
  );

  return getAllWorkEntries().sort(
    (a, b) =>
      (orderByProjectId.get(a.meta.projectId) ?? Number.MAX_SAFE_INTEGER) -
      (orderByProjectId.get(b.meta.projectId) ?? Number.MAX_SAFE_INTEGER),
  );
}

export function getFeaturedWorkEntries() {
  return getAllWorkEntries().filter((entry) => entry.meta.featured);
}

export function getWorkEntryBySlug(slug: string) {
  return getAllWorkEntries().find((entry) => entry.meta.slug === slug);
}

export function getWorkSlugs() {
  return getAllWorkEntries().map((entry) => entry.meta.slug);
}

export function getWorkNavigation(slug: string) {
  const entries = getPublishedWorkEntries();
  const index = entries.findIndex((entry) => entry.meta.slug === slug);

  return {
    previous: index > 0 ? entries[index - 1]?.meta : undefined,
    next: index >= 0 ? entries[index + 1]?.meta : undefined,
  };
}

export function validateAllWorkEntries() {
  validateWorkEntries(workModules);
}
