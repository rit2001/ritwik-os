import { launchSiteConfig } from "@/config/site";
import type { WorkMeta } from "@/types/content";

import { createSiteUrl } from "./site-url";

export function getHomeStructuredData() {
  const siteUrl = createSiteUrl("/");
  const sameAs = [
    launchSiteConfig.links.github,
    launchSiteConfig.links.linkedIn,
    launchSiteConfig.links.leetCode,
    launchSiteConfig.links.codeforces,
  ];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: launchSiteConfig.owner,
    ...(siteUrl ? { url: siteUrl } : {}),
    email: `mailto:${launchSiteConfig.email}`,
    jobTitle: launchSiteConfig.compactTitle,
    description: launchSiteConfig.headline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology Kharagpur",
      description:
        "Dual Degree (B.Tech + M.Tech) in Mechanical Engineering, 2021–2026.",
    },
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: launchSiteConfig.brand,
    description: launchSiteConfig.metadata.description,
    ...(siteUrl ? { url: siteUrl } : {}),
    publisher: {
      "@type": "Person",
      name: launchSiteConfig.owner,
    },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: launchSiteConfig.metadata.defaultTitle,
    description: launchSiteConfig.metadata.description,
    ...(siteUrl ? { url: siteUrl } : {}),
    about: {
      "@type": "Person",
      name: launchSiteConfig.owner,
    },
  };

  return [person, website, profilePage] as const;
}

export function getWorkStructuredData(meta: WorkMeta) {
  const workUrl = createSiteUrl(meta.caseStudyPath);
  const base = {
    "@context": "https://schema.org",
    "@type": meta.repositoryUrl ? "SoftwareSourceCode" : "CreativeWork",
    name: meta.title,
    headline: meta.seoTitle,
    description: meta.seoDescription,
    genre: meta.category,
    datePublished: meta.publishedDate,
    dateModified: meta.updatedDate ?? meta.publishedDate,
    creator: {
      "@type": "Person",
      name: launchSiteConfig.owner,
    },
    keywords: meta.stack,
    ...(workUrl ? { url: workUrl } : {}),
    ...(meta.repositoryUrl ? { codeRepository: meta.repositoryUrl } : {}),
    about: meta.summary,
    ...(meta.status === "in-development"
      ? { creativeWorkStatus: "InDevelopment" }
      : {}),
  };

  return base;
}
