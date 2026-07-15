import { existsSync } from "node:fs";
import { ZodError } from "zod";

import { workMetaSchema } from "../src/lib/content/schemas";
import { workMetaEntries } from "../src/lib/content/work-manifest";

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
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}

try {
  validateContent();
  console.log(
    `Validated ${workMetaEntries.length} work entr${
      workMetaEntries.length === 1 ? "y" : "ies"
    }.`,
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
