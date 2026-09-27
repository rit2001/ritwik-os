export type PublicProfile = {
  displayName: string;
  editorialName: string;
  headline: string;
  professionalTitle: string;
  shortRoleLine: string;
  seoDescription: string;
  tagline: string;
  location: string;
  email: string;
  resumePath: string;
  availability: {
    summary: string;
    immediate: string;
  };
  education: {
    institution: string;
    degree: string;
    dates: string;
    cgpa: string;
  };
};

/** The authoritative public identity record for RITWIK OS. */
export const profile = {
  displayName: "RITWIK BISWAS",
  editorialName: "Ritwik Biswas",
  professionalTitle: "Software Engineer | Backend, Distributed Systems & AI",
  shortRoleLine: "Software Engineer\nBackend · Distributed Systems · AI",
  headline:
    "Software Engineer focused on backend systems, distributed systems, and applied AI.",
  seoDescription:
    "Software Engineer portfolio for Ritwik Biswas, covering backend systems, distributed systems, applied AI, and evidence-backed engineering case studies.",
  tagline: "Engineering Intelligence into Production.",
  location: "Kolkata, India",
  email: "thisisritwikbiswas@gmail.com",
  resumePath: "/resume/ritwik-biswas-resume.pdf",
  availability: {
    summary:
      "Open to relevant full-time Software Engineering, Backend Engineering, Distributed Systems and AI Engineering roles.",
    immediate: "Immediate joiner.",
  },
  education: {
    institution: "Indian Institute of Technology Kharagpur",
    degree: "Dual Degree (B.Tech + M.Tech) in Mechanical Engineering",
    dates: "2021–2026",
    cgpa: "7.84/10",
  },
} as const satisfies PublicProfile;
