import type { Talk } from "@/domain/portfolio";

// TODO(content): carried over from the old site (release/v1), whose own note says these titles
// still need confirming against the real talk archive. Confirm or correct each row.
// TODO(content): a cover photo per talk, dropped in as public/covers/<title-in-kebab-case>.webp;
// until then the shelf draws a placeholder.
export const talks: Talk[] = [
  { title: "Firebase for Frontend Engineers", event: "GDG Depok DevFest", year: "2025", topic: "Firebase" },
  { title: "Scaling React Codebases with Clean Architecture", event: "GDG Depok Meetup", year: "2025", topic: "React" },
  { title: "Design Systems That Survive the Team", event: "GDG Depok Meetup", year: "2024", topic: "Design systems" },
  { title: "From Legacy to TypeScript: Rewriting in Production", event: "GDG Depok DevFest", year: "2024", topic: "TypeScript" },
  { title: "Firebase Authentication Deep Dive", event: "Cloud Study Jam", year: "2023", topic: "Firebase" },
  { title: "React State Management in 2023", event: "GDG Depok Meetup", year: "2023", topic: "React" },
  { title: "Frontend Career Paths in Indonesia", event: "Generasi Gigih", year: "2023", topic: "Career" },
  { title: "Building Realtime Apps with Firebase", event: "GDSC Workshop", year: "2021", topic: "Firebase" },
  { title: "React Fundamentals Codelab", event: "GDSC Workshop", year: "2020", topic: "React" },
  { title: "UI Engineering: From Mockup to Component", event: "GDSC Workshop", year: "2020", topic: "Frontend" },
];
