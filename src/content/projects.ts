import type { Project } from "@/domain/portfolio";

// Every number must come from the CV or from Rayhan directly (docs/PRODUCT.md).
// TODO(content): a `cover` screenshot per project; until then the shelf draws a placeholder.
export const projects: Project[] = [
  {
    id: "anify",
    name: "Anify",
    client: "Anify LLC · Honolulu, remote",
    role: "Frontend Engineer Lead",
    tag: "Lead",
    years: "2025-2026",
    metric: { value: 71, prefix: "−", suffix: "%", label: "monthly hosting cost", detail: "$84 → $24 a month", ratio: 24 / 84, improvement: true },
    impactPending: false,
    lines: [
      "Led 2 frontend engineers across US and Indonesia time zones.",
      "Moved hosting to Docker and CI/CD across Vercel, AWS and DigitalOcean.",
      "Joined roadmap, sprint planning and hiring decisions with the CEO.",
    ],
    stack: ["Next.js", "TypeScript", "Radix UI", "Docker"],
  },
  {
    id: "smile",
    name: "SMILE 5.0",
    client: "Indonesia Ministry of Health, UNDP and UNICC",
    role: "Frontend Developer",
    tag: "Part-time",
    years: "2022-now",
    metric: { value: 40, suffix: "+", label: "engineers building on one frontend architecture" },
    // TODO(content): phase 0 impact number (facilities covered, users, velocity, performance).
    impactPending: true,
    lines: [
      "Co-initiated the rewrite from legacy JavaScript to React and TypeScript.",
      "Tracks medicine distribution for health facilities across Indonesia.",
      "Used by the Ministry of Health, UNDP Indonesia, UNICC and UNDP Global.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "founderplus",
    name: "Founderplus",
    client: "Pre-seed accelerator · Depok",
    role: "Solo fullstack developer",
    tag: "Solo",
    years: "2020-2024",
    metric: { value: 50, suffix: "+", label: "startup applications handled by the platform" },
    impactPending: false,
    lines: [
      "Built the landing page, startup registration and admin dashboard alone.",
      "Set up its first production infrastructure: Docker, Nginx, environments.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    id: "astra",
    name: "Astra SAM Advance",
    client: "PT Astra International",
    role: "React Native developer",
    tag: "Mobile",
    years: "2023",
    metric: { value: 1, label: "codebase shipping to Android and iOS" },
    // TODO(content): phase 0 impact number (sales team size, adoption, time saved).
    impactPending: true,
    lines: ["Customer data, task tracking and incentive programs for a nationwide sales team."],
    stack: ["React Native", "TypeScript"],
  },
  {
    id: "unit-cost-rs",
    name: "Unit Cost RS",
    client: "Universitas Indonesia",
    role: "Fullstack developer",
    tag: "Fullstack",
    years: "2023",
    metric: null,
    // TODO(content): phase 0 scale and impact number.
    impactPending: true,
    lines: ["Moved hospital service costing out of spreadsheets into one Remix app."],
    stack: ["Remix", "Prisma", "MySQL"],
  },
];
