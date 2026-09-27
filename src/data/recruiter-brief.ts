import { profile } from "./profile";

export type RecruiterBrief = {
  summary: string;
  evidence: readonly string[];
  education: typeof profile.education;
};

export const recruiterBrief = {
  summary:
    "Ritwik Biswas is a Software Engineer and IIT Kharagpur Dual Degree graduate building AI systems, backend platforms, real-time applications, and cloud-deployed products.",
  evidence: [
    "Delivered production-oriented work across three software engineering internships.",
    "Built systems involving stateful AI agents, RAG, backend APIs, authentication, payments, real-time communication, Docker, AWS, and CI/CD.",
    "Combines applied engineering experience with strong algorithmic fundamentals.",
  ],
  education: profile.education,
} as const satisfies RecruiterBrief;
