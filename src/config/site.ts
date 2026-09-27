import { profile } from "@/data/profile";
import { getSocialLink } from "@/data/social-links";

const github = getSocialLink("github");
const linkedIn = getSocialLink("linkedin");
const leetCode = getSocialLink("leetcode");
const codeforces = getSocialLink("codeforces");

if (!github || !linkedIn || !leetCode || !codeforces) {
  throw new Error("Required canonical social links are missing.");
}

export const launchSiteConfig = {
  brand: "RITWIK OS",
  owner: profile.editorialName,
  tagline: profile.tagline,
  headline: profile.headline,
  compactTitle: profile.professionalTitle,
  location: profile.location,
  email: profile.email,
  resumePath: profile.resumePath,
  links: {
    linkedIn: linkedIn.href,
    github: github.href,
    leetCode: leetCode.href,
    codeforces: codeforces.href,
  },
  metadata: {
    defaultTitle: "RITWIK OS — Ritwik Biswas",
    titleTemplate: "%s | Ritwik Biswas",
    description: profile.seoDescription,
    keywords: [
      "Ritwik Biswas",
      "RITWIK OS",
      "Software Engineer",
      "Backend Engineering",
      "Distributed Systems",
      "Applied AI",
      "Engineering Portfolio",
    ],
  },
} as const;

export type LaunchSiteConfig = typeof launchSiteConfig;
