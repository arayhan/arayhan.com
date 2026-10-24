import type { Profile } from "@/domain/portfolio";

export const profile: Profile = {
  name: "Ahmed Rayhan Primadedas",
  role: "Senior Frontend Engineer",
  city: "Depok, Indonesia",
  timezone: "GMT+7",
  yearsBadge: "7+ yrs",
  email: "rayhanprima99@gmail.com",
  linkedin: "https://linkedin.com/in/arayhan",
  github: "https://github.com/arayhan",
  // TODO(content): the PDF is not in public/ yet; confirm the v1 CV is safe to publish (no phone/home address) first.
  cvPath: "/cv/CV-Ahmed-Rayhan-Primadedas.pdf",
  // TODO(content): headline and lede drafted from v1 facts; settle them with the phase 0 outcomes.
  headline: { lead: "I build frontends that", emphasis: "move a business number." },
  lede: "Seven years of React and Next.js. Most recently I led frontend at a US edtech startup and cut its hosting bill by 71%. Since 2022 I have worked on SMILE 5.0, the medicine logistics platform Indonesia’s Ministry of Health and UNDP run nationwide.",
  proof: [
    { value: 71, prefix: "−", suffix: "%", label: "hosting cost at Anify", improvement: true },
    { value: 40, suffix: "+", label: "engineers on the SMILE 5.0 architecture" },
    { value: 50, suffix: "+", label: "startups through Founderplus" },
    { value: 1800, suffix: "+", label: "GDG Depok members" },
  ],
};
