import type { NavGroup, NavLink } from "@/domain/portfolio";

/** Always visible in the navbar; everything else lives in the Menu panel. */
export const quickLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Talks", href: "/talks" },
  { label: "About", href: "/about" },
];

export const showcaseLinks: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Services & Rates", href: "/services" },
  { label: "Talks", href: "/talks" },
  { label: "Album", href: "/album" },
];

export const blogCategories = [
  { slug: "tech", label: "Tech" },
  { slug: "books", label: "Books" },
  { slug: "journal", label: "Journal" },
] as const;

export const products = [
  { slug: "baiti", name: "Baiti" },
  { slug: "selfwire", name: "Selfwire" },
  { slug: "sendtrack", name: "SendTrack" },
] as const;

export const usesAreas = [
  { id: "devices", label: "Devices & workstation" },
  { id: "dev-tools", label: "Development tools" },
  { id: "tech-stack", label: "Tech stack" },
  { id: "ai", label: "AI subscriptions" },
  { id: "productivity", label: "Productivity" },
  { id: "finance", label: "Finance" },
] as const;

export const menuGroups: NavGroup[] = [
  { label: "Blog", links: blogCategories.map((c) => ({ label: c.label, href: `/blog/${c.slug}` })) },
  { label: "Products", links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })) },
  {
    label: "About",
    links: [
      { label: "Journey", href: "/about#journey" },
      { label: "Tech stack", href: "/about#stack" },
      { label: "Uses", href: "/uses" },
    ],
    extra: usesAreas.map((a) => ({ label: a.label, href: `/uses#${a.id}` })),
  },
];

/** One honest line per section, shown on its placeholder page. */
export const sectionIntros: Record<string, string> = {
  "/work": "Projects, and the numbers they moved.",
  "/services": "How we can work together, and what it costs.",
  "/talks": "Talks, workshops and community work.",
  "/album": "Photos from stages, meetups and the road.",
  "/blog": "Notes on tech, books and life.",
  "/about": "Where I come from, and the tools I use.",
  "/uses": "The devices, tools and subscriptions I work with every day.",
};
