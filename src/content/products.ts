import type { Product } from "@/domain/portfolio";

// Pitches condensed from each product's own docs (personal-products); logos copied from their
// repos. The hero's /products card repeats these; change them together.
// TODO(content): a cover screenshot per product, dropped in as public/covers/<slug>.webp (e.g.
// baiti.webp); until then the hero and shelf draw a placeholder.
export const products = [
  { slug: "baiti", name: "Baiti", pitch: "Family super app for young Muslim couples", logo: "/products/baiti.svg" },
  { slug: "selfwire", name: "Selfwire", pitch: "A daily pause for adults with ADHD", logo: "/products/selfwire.svg" },
  { slug: "sendtrack", name: "SendTrack", pitch: "WhatsApp CRM with Meta ad tracking", logo: "/products/sendtrack.svg" },
] as const satisfies readonly Product[];
