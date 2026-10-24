import type { Profile } from "@/domain/portfolio";

export const profile: Profile = {
  name: "Ahmed Rayhan Primadedas",
  shortName: "Rayhan",
  role: "Senior Frontend Engineer",
  email: "rayhanprima99@gmail.com",
  linkedin: "https://linkedin.com/in/arayhan",
  github: "https://github.com/arayhan",
  // TODO(content): add the CV PDF to public/cv once it is confirmed free of phone number and home address.
  cvPath: null,
  headline: {
    lead: "I build frontends for",
    phrases: ["pre-seed startups.", "national health systems.", "teams of 40+ engineers."],
  },
  subtext:
    "Seven years in React and Next.js. Cut a startup’s hosting bill 71% and helped rebuild Indonesia’s national medicine logistics frontend.",
};
