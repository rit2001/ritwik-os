import { z } from "zod";

export const workStatusSchema = z.enum([
  "in-development",
  "completed",
  "maintained",
  "archived",
]);

const optionalUrl = z.string().url().optional();

export const workMetaSchema = z
  .object({
    projectId: z.string().trim().min(1),
    slug: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().trim().min(1),
    shortTitle: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    status: workStatusSchema,
    statusLabel: z.string().trim().min(1),
    year: z.string().trim().min(1),
    featured: z.boolean(),
    ongoing: z.boolean(),
    stack: z.array(z.string().trim().min(1)).min(1),
    roles: z.array(z.string().trim().min(1)).min(1),
    repositoryUrl: optionalUrl,
    demoUrl: optionalUrl,
    caseStudyPath: z
      .string()
      .trim()
      .regex(/^\/work\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
    seoTitle: z.string().trim().min(1),
    seoDescription: z.string().trim().min(1),
    publishedDate: z.string().date().optional(),
    updatedDate: z.string().date().optional(),
    readingTime: z.string().trim().min(1).optional(),
    draft: z.boolean(),
    relatedProjectSlugs: z.array(z.string().trim().min(1)).optional(),
    currentMilestone: z.string().trim().min(1).optional(),
    toc: z
      .array(
        z.object({
          href: z
            .string()
            .trim()
            .regex(/^#[a-z0-9]+(?:-[a-z0-9]+)*$/),
          label: z.string().trim().min(1),
        }),
      )
      .min(1),
    headerFacts: z
      .array(
        z.object({
          label: z.string().trim().min(1),
          value: z.string().trim().min(1),
        }),
      )
      .optional(),
  })
  .superRefine((meta, ctx) => {
    if (meta.ongoing && meta.status !== "in-development") {
      ctx.addIssue({
        code: "custom",
        message: "ongoing work entries must use status 'in-development'",
        path: ["status"],
      });
    }

    if (meta.slug !== meta.caseStudyPath.replace("/work/", "")) {
      ctx.addIssue({
        code: "custom",
        message: "caseStudyPath must match slug",
        path: ["caseStudyPath"],
      });
    }

    const tocHrefs = new Set<string>();
    for (const item of meta.toc) {
      if (tocHrefs.has(item.href)) {
        ctx.addIssue({
          code: "custom",
          message: "TOC hrefs must be unique",
          path: ["toc"],
        });
      }
      tocHrefs.add(item.href);
    }
  });
