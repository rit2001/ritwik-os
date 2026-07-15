import type { ComponentType } from "react";

export type WorkStatus =
  "in-development" | "completed" | "maintained" | "archived";

export type WorkMeta = {
  slug: string;
  title: string;
  shortTitle?: string;
  category: string;
  summary: string;
  status: WorkStatus;
  statusLabel: string;
  year: string;
  featured: boolean;
  ongoing: boolean;
  stack: readonly string[];
  roles: readonly string[];
  repositoryUrl?: string;
  demoUrl?: string;
  caseStudyPath: string;
  seoTitle: string;
  seoDescription: string;
  publishedDate?: string;
  updatedDate?: string;
  readingTime?: string;
  draft: boolean;
  relatedProjectSlugs?: readonly string[];
  currentMilestone?: string;
};

export type WorkEntry = {
  meta: WorkMeta;
  Content: ComponentType;
};
