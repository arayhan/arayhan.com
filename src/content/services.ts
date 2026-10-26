import type { Service } from "@/domain/portfolio";

// TODO(content): drafted from the CV for the home Services band; the owner to edit the wording.
// Any figure here must also be in projects.ts (Anify's -71% is).
export const services: Service[] = [
  { name: "Frontend architecture", line: "React and Next.js codebases a whole team can grow on, like the SMILE 5.0 rewrite." },
  { name: "Fullstack product builds", line: "From landing page to admin dashboard, shipped solo or with a small team." },
  { name: "Design systems", line: "Component libraries and tokens that keep a product consistent as it grows." },
  { name: "Performance & infrastructure", line: "Docker, CI/CD and hosting that cut costs, like Anify's -71% monthly hosting bill." },
  { name: "Talks & workshops", line: "Frontend and Firebase sessions for engineering teams and communities." },
];
