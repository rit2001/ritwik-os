import { existsSync } from "node:fs";
import { ZodError } from "zod";

import { workMetaSchema } from "../src/lib/content/schemas";
import { workMetaEntries } from "../src/lib/content/work-manifest";
import { projects } from "../src/data/projects";
import { professionalSignals } from "../src/data/professional-signals";

function formatZodError(slug: string, error: ZodError) {
  return error.issues.map((issue) => {
    const field = issue.path.length > 0 ? issue.path.join(".") : "metadata";

    return `[${slug}] ${field}: ${issue.message}`;
  });
}

function validateContent() {
  const seen = new Set<string>();
  const errors: string[] = [];

  for (const entry of workMetaEntries) {
    const slug = entry.meta.slug || "unknown";
    const parsed = workMetaSchema.safeParse(entry.meta);

    if (!parsed.success) {
      errors.push(...formatZodError(slug, parsed.error));
      continue;
    }

    if (seen.has(parsed.data.slug)) {
      errors.push(`[${parsed.data.slug}] slug: duplicate work slug`);
    }

    seen.add(parsed.data.slug);

    if (!existsSync(entry.mdxPath)) {
      errors.push(
        `[${parsed.data.slug}] mdx: missing MDX module at ${entry.mdxPath}`,
      );
    }

    const project = projects.find((item) => item.id === parsed.data.projectId);
    if (!project) {
      errors.push(
        `[${parsed.data.slug}] projectId must reference a real project`,
      );
    } else if (project.caseStudyPath !== parsed.data.caseStudyPath) {
      errors.push(
        `[${parsed.data.slug}] project caseStudyPath must match registered Work entry`,
      );
    }
  }

  const projectIds = new Set<string>();
  const orders = new Set<number>();
  const projectById = new Map(projects.map((project) => [project.id, project]));
  const flagshipIds = projects
    .filter((project) => project.tier === "flagship")
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((project) => project.id);

  if (flagshipIds.length !== 3) {
    errors.push("Portfolio must contain exactly 3 flagship projects");
  }

  if (flagshipIds.join(",") !== "thesislens,traceforge,converge") {
    errors.push("Flagship order must be ThesisLens, TraceForge, Converge");
  }

  for (const project of projects) {
    if (projectIds.has(project.id))
      errors.push(`[${project.id}] duplicate project id`);
    projectIds.add(project.id);
    if (orders.has(project.displayOrder))
      errors.push(`[${project.id}] duplicate displayOrder`);
    orders.add(project.displayOrder);
    if (project.tier === "archive" && project.displayOrder < 4) {
      errors.push(
        `[${project.id}] archive cannot rank before flagship projects`,
      );
    }
    if (project.supersededBy && !projectById.has(project.supersededBy)) {
      errors.push(`[${project.id}] supersededBy must reference a real project`);
    }
    for (const evidence of project.evidence) {
      if (
        evidence.kind === "delta" &&
        (!evidence.before || !evidence.after || !evidence.context)
      ) {
        errors.push(
          `[${project.id}] delta evidence requires before, after, and context`,
        );
      }
    }
    if (
      project.caseStudyPath &&
      !workMetaEntries.some(
        (entry) => entry.meta.caseStudyPath === project.caseStudyPath,
      )
    ) {
      errors.push(
        `[${project.id}] caseStudyPath must reference a registered real Work entry`,
      );
    }
  }

  const allowedRelationships = new Set([
    "current-base",
    "engineering-experience",
  ]);
  for (const signal of professionalSignals) {
    if (
      signal.visibility === "public" &&
      !allowedRelationships.has(signal.relationship)
    ) {
      errors.push(
        `[${signal.id}] public professional signal has an unapproved relationship`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

try {
  validateContent();
  const entryCount = Number(workMetaEntries.length);
  console.log(
    `Validated ${entryCount} work entr${entryCount === 1 ? "y" : "ies"}.`,
  );
} catch (error) {
  console.error("Content validation failed.");
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  process.exit(1);
}
