import type { MetadataRoute } from "next";

import { getSitemapSiteUrl } from "@/lib/site-url";
import { getAllWorkEntries } from "@/lib/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSitemapSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/work", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const workRoutes = getAllWorkEntries().map(({ meta }) => ({
    url: new URL(meta.caseStudyPath, siteUrl).toString(),
    lastModified: meta.updatedDate ?? meta.publishedDate,
    changeFrequency: "monthly" as const,
    priority: meta.ongoing ? 0.7 : 0.75,
  }));

  return [...staticRoutes, ...workRoutes];
}
