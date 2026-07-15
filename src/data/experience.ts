export type ExperienceRole = {
  company: string;
  role: string;
  location: string;
  dates: string;
  summary: string;
  evidence: readonly string[];
};

export const experience = [
  {
    company: "TASKLY TECHNOLOGIES INC.",
    role: "Software Engineering Intern",
    location: "Remote, Canada",
    dates: "Mar 2025 – Jul 2025",
    summary:
      "Built core modules for JobSense using Next.js, FastAPI, and PostgreSQL, delivering AI-assisted workflows for job-description analysis, resume scoring, ATS checks, interview preparation, and company research.",
    evidence: [
      "Integrated Groq, Firebase Authentication, JWT-secured sessions, and protected AI endpoints.",
      "Resolved JavaScript-rendered scraping failures, API payload bottlenecks, environment misconfigurations, and Docker conflicts.",
      "Supported Dockerized services and production deployment workflows involving Vercel and cloud infrastructure.",
    ],
  },
  {
    company: "SEARCH-IN",
    role: "Full-Stack Developer Intern",
    location: "Remote, Bengaluru",
    dates: "Jun 2024 – Jul 2024",
    summary:
      "Built a React administration platform and Node.js/Express backend supporting operational analytics, order workflows, and data management.",
    evidence: [
      "Developed APIs serving 10K+ users, 1K+ orders, and 500+ managed records.",
      "Improved database performance with MongoDB indexing, Redis caching, and query tuning.",
      "Redesigned operational workflows that reduced order-processing time by 30%.",
      "Deployed frontend assets to AWS S3 and cloud-hosted services.",
    ],
  },
  {
    company: "PEPCORNS",
    role: "Full-Stack Developer Intern",
    location: "Remote, Pune",
    dates: "Mar 2024 – Apr 2024",
    summary:
      "Built a referral and rewards platform using Node.js, SQL, React, backend APIs, and reusable frontend components.",
    evidence: [
      "Implemented referral attribution, reward issuance, and social-sharing workflows.",
      "Integrated frontend journeys with backend services and database operations.",
      "Reduced duplication through reusable React components.",
    ],
  },
] as const satisfies readonly ExperienceRole[];
