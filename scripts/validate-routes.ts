import { existsSync } from "node:fs";

import { launchSiteConfig } from "../src/config/site";
import { projects } from "../src/data/projects";
import { workMetaEntries } from "../src/lib/content/work-manifest";

function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

const errors: string[] = [];
const paths = new Set<string>();

function addPath(path: string) {
  if (paths.has(path)) {
    errors.push(`Duplicate route path: ${path}`);
  }
  paths.add(path);
}

if (!existsSync("src/app/page.tsx")) {
  errors.push("Missing homepage route at src/app/page.tsx");
}

if (!existsSync("src/app/work/page.tsx")) {
  errors.push("Missing Work index route at src/app/work/page.tsx");
}

addPath("/");
addPath("/work");

for (const entry of workMetaEntries) {
  const { meta, mdxPath } = entry;

  if (!meta.caseStudyPath) {
    errors.push(`[${meta.slug}] missing caseStudyPath`);
    continue;
  }

  addPath(meta.caseStudyPath);

  if (meta.caseStudyPath !== `/work/${meta.slug}`) {
    errors.push(`[${meta.slug}] caseStudyPath must match /work/${meta.slug}`);
  }

  if (!existsSync(mdxPath)) {
    errors.push(`[${meta.slug}] missing MDX module at ${mdxPath}`);
  }

  const repositoryUrl =
    "repositoryUrl" in meta ? meta.repositoryUrl : undefined;
  const demoUrl = "demoUrl" in meta ? meta.demoUrl : undefined;

  if (typeof repositoryUrl === "string" && !isHttpsUrl(repositoryUrl)) {
    errors.push(`[${meta.slug}] repositoryUrl must be a valid HTTPS URL`);
  }

  if (typeof demoUrl === "string" && !isHttpsUrl(demoUrl)) {
    errors.push(`[${meta.slug}] demoUrl must be a valid HTTPS URL`);
  }
}

if (!existsSync(`public${launchSiteConfig.resumePath}`)) {
  errors.push(`Missing resume asset at public${launchSiteConfig.resumePath}`);
}

for (const [key, href] of Object.entries(launchSiteConfig.links)) {
  if (!isHttpsUrl(href)) {
    errors.push(`Canonical social link ${key} must be a valid HTTPS URL`);
  }
}

for (const project of projects) {
  if (project.stack.includes("Google Embeddings")) {
    errors.push(`${project.title} still contains Google Embeddings`);
  }

  if (project.caseStudyPath && !paths.has(project.caseStudyPath)) {
    errors.push(
      `${project.title} links to unregistered case study path ${project.caseStudyPath}`,
    );
  }
}

for (const unfinishedRoute of [
  "/writing",
  "/architecture",
  "/builds",
  "/about",
]) {
  if (paths.has(unfinishedRoute)) {
    errors.push(
      `Placeholder route should not be registered: ${unfinishedRoute}`,
    );
  }
}

if (errors.length > 0) {
  console.error("Route integrity validation failed.");
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${paths.size} route paths and launch links.`);
