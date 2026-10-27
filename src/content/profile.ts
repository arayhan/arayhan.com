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
    { key: "instagram", label: "Instagram", url: "https://instagram.com/arayhan_" },
    // TODO(content): confirm these accounts; they stay hidden while url is null.
    { key: "medium", label: "Medium", url: null },
    { key: "youtube", label: "YouTube", url: null },
    { key: "threads", label: "Threads", url: null },
  ],
  // TODO(content): add the CV PDF to public/cv once it is confirmed free of phone number and home address.
  cvPath: null,
  status: { prompt: "whoami", role: "Solution Fullstack Engineer", org: "Badr Interactive" },
  intro: {
    name: "I’m Rayhan",
    lead: "Fullstack engineer who makes complicated products feel simple.",
    invite: "Wander through my",
  },
  // Same numbers as projects.ts and roles.ts; change them together.
  terms: [
    {
      term: "/works",
      label: "Works",
      icon: "work",
      hue: "blue",
      title: "Anify, SMILE 5.0, Founderplus",
      href: "/work",
      lead: { value: "−71%", label: "Anify’s monthly hosting cost", detail: "$84 → $24 a month" },
      more: [
        { value: "40+", label: "engineers building on the SMILE 5.0 frontend", icon: "team", hue: "rose" },
        { value: "50+", label: "startup applications through Founderplus", icon: "startup", hue: "amber" },
      ],
    },
    {
      term: "/talks",
      label: "Talks",
      icon: "talk",
      hue: "violet",
      title: "GDG Depok and beyond",
      href: "/talks",
      lead: { value: "1,800+", label: "members in GDG Depok, which I organize" },
      more: [
        { value: "10+", label: "talks on frontend and Firebase", icon: "talk" },
        { value: "1 of 45", label: "GDSC Leads in Indonesia", icon: "award", hue: "amber" },
      ],
    },
    {
      term: "/products",
      label: "Products",
      icon: "product",
      hue: "teal",
      title: "Baiti, Selfwire, SendTrack",
      href: "/products/baiti",
      lead: { value: "3", label: "products of my own" },
      // Pitches condensed from each product's own docs (personal-products); logos copied from their repos.
      more: [
        { value: "Baiti", label: "Family super app for young Muslim couples", logo: "/products/baiti.svg" },
        { value: "Selfwire", label: "A daily pause for adults with ADHD", logo: "/products/selfwire.svg" },
        { value: "SendTrack", label: "WhatsApp CRM with Meta ad tracking", logo: "/products/sendtrack.svg" },
      ],
    },
  ],
  bio: "Seven years of React and Next.js. I cut a startup’s hosting bill by 71% and help keep Indonesia’s medicine logistics running. After hours, I run GDG Depok for 1,800+ developers.",
  // TODO(content): album photos with event and year; the marquee appears once this has entries.
  album: [],
  portrait: { src: "/portrait.webp", alt: "A Rayhan P at a laptop on stage, wearing a Firebase T-shirt", width: 891, height: 1489 },
  // Head crop of the same cut-out.
  avatar: { src: "/avatar.webp", alt: "A Rayhan P" },
};
