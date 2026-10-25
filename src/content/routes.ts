import { blogCategories, products } from "./navigation";

/** Every public page, in one list, so the sitemap and llms.txt cannot drift from the menu. */
export const sitePages: { path: string; title: string }[] = [
  { path: "/", title: "Home" },
  { path: "/work", title: "Work" },
  { path: "/services", title: "Services & Rates" },
  { path: "/talks", title: "Talks" },
  { path: "/album", title: "Album" },
  { path: "/blog", title: "Blog" },
  ...blogCategories.map((c) => ({ path: `/blog/${c.slug}`, title: `${c.label} writing` })),
  { path: "/products", title: "Products" },
  ...products.map((p) => ({ path: `/products/${p.slug}`, title: p.name })),
  { path: "/about", title: "About" },
  { path: "/uses", title: "Uses" },
];
