import { profile } from "./profile";

export type RecruiterBrief = {
  summary: string;
  evidence: readonly string[];
  education: typeof profile.education;
};

export const recruiterBrief = {
  summary:
    "Ritwik Biswas is a Software Engineer building backend systems, distributed systems, applied AI, and real-time applications.",
  evidence: [
    "Delivered production-oriented work across three software engineering internships.",
    "Built systems involving stateful AI agents, RAG, backend APIs, authentication, payments, real-time communication, Docker, AWS, CI, and qualified deployment workflows.",
    "Combines applied engineering experience with strong algorithmic fundamentals.",
  ],
  education: profile.education,
} as const satisfies RecruiterBrief;
