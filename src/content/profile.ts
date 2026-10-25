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
    // U+2060 (word joiner) keeps "pre-seed" from breaking at its hyphen.
    aside: "from a pre-\u2060seed startup to a national health platform.",
    invite: "Wander through my",
  },
  // Same numbers as projects.ts and roles.ts; change them together.
  terms: [
    {
      term: "/works",
      title: "Anify, SMILE 5.0, Founderplus",
      href: "/work",
      lead: { value: "−71%", label: "Anify’s monthly hosting cost", detail: "$84 → $24 a month" },
      more: [
        { value: "40+", label: "engineers building on the SMILE 5.0 frontend" },
        { value: "50+", label: "startup applications through Founderplus" },
      ],
    },
    {
      term: "/talks",
      title: "GDG Depok and beyond",
      href: "/talks",
      lead: { value: "1,800+", label: "members in GDG Depok, which I organize" },
      more: [
        { value: "10+", label: "talks on frontend and Firebase" },
        { value: "1 of 45", label: "GDSC Leads in Indonesia" },
      ],
    },
    {
      term: "/products",
      title: "Baiti, Selfwire, SendTrack",
      href: "/products/baiti",
      lead: { value: "3", label: "products of my own" },
      // TODO(content): one-line pitch for each product.
      more: [
        { value: "Baiti", label: "[One-line pitch]" },
        { value: "Selfwire", label: "[One-line pitch]" },
        { value: "SendTrack", label: "[One-line pitch]" },
      ],
    },
  ],
  bio: "Seven years of React and Next.js. I cut a startup’s hosting bill by 71% and help keep Indonesia’s medicine logistics running. After hours, I run GDG Depok for 1,800+ developers.",
  // TODO(content): album photos with event and year; the marquee appears once this has entries.
  album: [],
};
