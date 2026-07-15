import TraceForgeContent from "../../content/work/traceforge.mdx";
import type { WorkEntry, WorkMeta } from "../../types/content";

import { workMetaSchema } from "./schemas";
import { workMetaEntries } from "./work-manifest";

const workModules = [
  {
    meta: workMetaEntries[0].meta,
    Content: TraceForgeContent,
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

export function getFeaturedWorkEntries() {
  return getAllWorkEntries().filter((entry) => entry.meta.featured);
}

export function getWorkEntryBySlug(slug: string) {
  return getAllWorkEntries().find((entry) => entry.meta.slug === slug);
}

export function getWorkSlugs() {
  return getAllWorkEntries().map((entry) => entry.meta.slug);
}

export function validateAllWorkEntries() {
  validateWorkEntries(workModules);
}
