type CurrentBuild = {
  project: string;
  description: string;
  status: "In Development";
  stackDirection: readonly string[];
};

export type Profile = {
  displayName: string;
  editorialName: string;
  headline: string;
  compactTitle: string;
  seoDescription: string;
  tagline: string;
  location: string;
  email: string;
  resumePath: string;
  availability: {
    summary: string;
    immediate: string;
  };
  rolePositioning: readonly string[];
  currentBuild: CurrentBuild;
};

export const profile = {
  displayName: "RITWIK BISWAS",
  editorialName: "Ritwik Biswas",
  headline:
    "Software Engineer building AI systems, scalable backend platforms, and cloud-native infrastructure.",
  compactTitle: "Software Engineer | AI Systems, Backend & Cloud",
  seoDescription:
    "Software Engineer building AI systems, scalable backend platforms, cloud-native infrastructure, and production-focused engineering projects.",
  tagline: "Engineering Intelligence into Production.",
  location: "Bengaluru, India",
  email: "biswas.ritwik2001@gmail.com",
  resumePath: "/resume/ritwik-biswas-resume.pdf",
  availability: {
    summary:
      "Open to full-time Software Engineering, Backend Engineering, AI Engineering, and Full-Stack opportunities.",
    immediate: "Available to join immediately.",
  },
  rolePositioning: [
    "Software Engineer — AI / LLM Systems",
    "Backend Software Engineer",
    "Full-Stack Product Engineer",
    "Platform / Cloud / DevOps Engineer",
  ],
  currentBuild: {
    project: "TraceForge",
    description: "Distributed Tracing and Event Pipeline",
    status: "In Development",
    stackDirection: ["Go", "Kafka", "OpenTelemetry", "Kubernetes", "Terraform"],
  },
} satisfies Profile;
