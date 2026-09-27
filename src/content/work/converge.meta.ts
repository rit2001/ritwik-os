import { getProject } from "../../data/projects";
import type { WorkMeta } from "../../types/content";

const project = getProject("converge");

export const convergeMeta = {
  projectId: project.id,
  slug: "converge",
  title: project.title,
  shortTitle: "Converge",
  category: project.category,
  summary: project.summary,
  status: "in-development",
  statusLabel: "In Development",
  year: project.period,
  featured: true,
  ongoing: true,
  stack: project.stack,
  roles: [
    "Authoritative collaboration protocol",
    "Offline and reconnect synchronization",
    "Transactional ordering and recovery",
    "Multi-replica delivery and failure testing",
    "Collaborative canvas product engineering",
  ],
  repositoryUrl: project.repositoryUrl,
  caseStudyPath: "/work/converge",
  seoTitle: "Converge — Distributed Collaboration Case Study | Ritwik Biswas",
  seoDescription:
    "An evidence-audited case study of Converge board-local PostgreSQL ordering, atomic commits, persist-before-optimism, multi-replica Redis delivery, and verified recovery.",
  publishedDate: "2026-09-27",
  updatedDate: "2026-09-27",
  readingTime: "20 min read",
  draft: false,
  relatedProjectSlugs: ["traceforge"],
  currentMilestone:
    "Board-local authority, offline command persistence, verified recovery, and multi-replica failure behavior are implemented and tested; production horizontal scale, restore operations, and active compaction remain unproven or disabled.",
  headerFacts: [
    {
      label: "Ordering",
      value: "Strict monotonic total order per board",
    },
    {
      label: "Release evidence",
      value: "245 PostgreSQL tests · 59 failure scenarios",
    },
    {
      label: "Delivery",
      value: "PostgreSQL authority · at-least-once Redis Stream",
    },
  ],
  toc: [
    { href: "#overview", label: "Overview" },
    {
      href: "#consistency-model",
      label: "Consistency Model",
    },
    { href: "#system-architecture", label: "System Architecture" },
    { href: "#command-protocol", label: "Command Protocol" },
    {
      href: "#ordering-and-atomic-commit",
      label: "Ordering and Atomic Commit",
    },
    { href: "#idempotency", label: "Idempotency" },
    {
      href: "#redis-and-multiple-replicas",
      label: "Redis and Multiple Replicas",
    },
    { href: "#offline-first-client", label: "Offline-First Client" },
    {
      href: "#reconnect-and-catch-up",
      label: "Reconnect and Catch-Up",
    },
    {
      href: "#recovery-and-canonical-state",
      label: "Recovery and Canonical State",
    },
    { href: "#compaction", label: "Compaction" },
    {
      href: "#presence-and-authorization",
      label: "Presence and Authorization",
    },
    {
      href: "#conflicts-and-undo",
      label: "Conflicts and Undo",
    },
    { href: "#product-surface", label: "Product Surface" },
    {
      href: "#testing-and-failure-evidence",
      label: "Testing and Failure Evidence",
    },
    {
      href: "#controlled-performance-evidence",
      label: "Controlled Performance Evidence",
    },
    {
      href: "#operations-and-deployment",
      label: "Operations and Deployment",
    },
    { href: "#limitations", label: "Limitations" },
    { href: "#current-status", label: "Current Status" },
    { href: "#lessons", label: "Lessons" },
  ],
} satisfies WorkMeta;
