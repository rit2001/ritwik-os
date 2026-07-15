type CurrentBuild = {
  project: string;
  category: string;
  description: string;
  status: "In Development";
  currentMilestone: string;
  milestoneExplanation: string;
  nextStep: string;
  stackDirection: readonly string[];
  repository: "Not published yet";
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
    category: "Distributed Tracing and Event Pipeline",
    description: "Distributed Tracing and Event Pipeline",
    status: "In Development",
    currentMilestone: "Architecture and repository bootstrap",
    milestoneExplanation:
      "Defining service boundaries, OpenTelemetry ingestion flow, Kafka event contracts, storage interfaces, and the initial observability and load-testing strategy.",
    nextStep:
      "Initialize the Go repository and implement the first trace-ingestion service with OpenTelemetry context propagation.",
    stackDirection: [
      "Go",
      "Kafka",
      "OpenTelemetry",
      "Docker",
      "Kubernetes",
      "Terraform",
    ],
    repository: "Not published yet",
  },
} satisfies Profile;
