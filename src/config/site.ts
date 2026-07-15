export const launchSiteConfig = {
  brand: "RITWIK OS",
  owner: "Ritwik Biswas",
  tagline: "Engineering Intelligence into Production.",
  headline:
    "Software Engineer building AI systems, scalable backend platforms, and cloud-native infrastructure.",
  compactTitle: "Software Engineer | AI Systems, Backend & Cloud",
  location: "Bengaluru, India",
  email: "biswas.ritwik2001@gmail.com",
  resumePath: "/resume/ritwik-biswas-resume.pdf",
  links: {
    linkedIn: "https://www.linkedin.com/in/ritwik-biswas-958318234/",
    github: "https://github.com/rit2001",
    leetCode: "https://leetcode.com/u/Britwik2025/",
    codeforces: "https://codeforces.com/profile/Eagle2.00",
  },
  metadata: {
    defaultTitle: "RITWIK OS — Ritwik Biswas",
    titleTemplate: "%s | Ritwik Biswas",
    description:
      "RITWIK OS is the engineering portfolio of Ritwik Biswas, featuring AI systems, backend platforms, cloud deployment, distributed systems, and production-focused case studies.",
    keywords: [
      "Ritwik Biswas",
      "RITWIK OS",
      "Software Engineer",
      "AI Systems",
      "Backend Engineering",
      "Cloud Infrastructure",
      "Distributed Systems",
      "Engineering Portfolio",
    ],
  },
} as const;

export type LaunchSiteConfig = typeof launchSiteConfig;
