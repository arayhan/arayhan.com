import type { Profile } from "@/domain/portfolio";

export const profile: Profile = {
  name: "Ahmed Rayhan Primadedas",
  shortName: "A Rayhan P",
  role: "Senior Frontend Engineer",
  email: "rayhanprima99@gmail.com",
  socials: [
    { key: "github", label: "GitHub", url: "https://github.com/arayhan" },
    { key: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/arayhan" },
    { key: "email", label: "Email", url: "mailto:rayhanprima99@gmail.com" },
    // TODO(content): confirm these accounts; they stay hidden while url is null.
    { key: "instagram", label: "Instagram", url: null },
    { key: "medium", label: "Medium", url: null },
    { key: "youtube", label: "YouTube", url: null },
    { key: "threads", label: "Threads", url: null },
  ],
  // TODO(content): add the CV PDF to public/cv once it is confirmed free of phone number and home address.
  cvPath: null,
  status: { label: "Now shipping", highlight: "SMILE 5.0", rest: "for Indonesia’s Ministry of Health" },
  intro: {
    lead: "I’m A Rayhan P. I make complicated products feel simple,",
    aside: "from a pre-seed startup to a national health platform.",
    invite: "Wander through my",
  },
  terms: [
    {
      term: "/works",
      title: "Anify, SMILE 5.0, Founderplus",
      fact: "Cut Anify’s hosting bill by 71%. Built the frontend architecture that 40+ engineers ship SMILE 5.0 on.",
      href: "/work",
      visual: "Work screenshots",
    },
    {
      term: "/talks",
      title: "GDG Depok and beyond",
      fact: "10+ talks on frontend and Firebase. One of 45 GDSC Leads in Indonesia. Organizer of a 1,800+ member community.",
      href: "/talks",
      visual: "Stage photo",
    },
    {
      term: "/products",
      title: "Baiti, Selfwire, SendTrack",
      // TODO(content): one-line pitch for each product.
      fact: "[One-line pitch for each product]",
      href: "/products/baiti",
      visual: "Product shots",
    },
  ],
  bio: "Seven years of React and Next.js. I cut a startup’s hosting bill by 71% and help keep Indonesia’s medicine logistics running. After hours, I run GDG Depok for 1,800+ developers.",
};
