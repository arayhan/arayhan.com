import { JsonLd } from "@/components/JsonLd";
import type { Product, Project, Talk } from "@/domain/portfolio";
import { hueAt } from "@/components/ui/hue";
import { profile } from "@/content/profile";
import { homeStructuredData } from "@/content/structured-data";
import { ActiveTermProvider } from "./components/ActiveTerm";
import { Hero } from "./components/Hero";
import type { Showcase, ShowItem } from "./components/HeroShowcase";

type Props = {
  /** The content lists with `cover` resolved from public/covers/ (app/page.tsx). */
  projects: Project[];
  products: Product[];
  talks: Talk[];
};

// What each /term shows in the hero, in the same hues as everywhere else. The featured item is
// first; the bento takes the next five.
function showcases({ projects, products, talks }: Props): Showcase[] {
  const items: Record<Showcase["icon"], { noun: string; list: ShowItem[] }> = {
    work: {
      noun: "projects",
      list: projects.map((p, i) => ({ key: p.id, name: p.name, sub: p.metric ? p.metric.label : p.client, cover: p.cover, hue: hueAt(i), href: "/work" })),
    },
    talk: {
      noun: "talks",
      list: talks.map((t, i) => ({ key: t.title, name: t.title, sub: `${t.event} · ${t.year}`, cover: t.cover, hue: hueAt(i, 1), href: "/talks" })),
    },
    product: {
      noun: "products",
      list: products.map((p, i) => ({ key: p.slug, name: p.name, sub: p.pitch, cover: p.cover, hue: hueAt(i, 2), href: `/products/${p.slug}` })),
    },
  };
  return profile.terms.map((t) => {
    const icon = t.icon === "talk" || t.icon === "product" ? t.icon : "work";
    const { noun, list } = items[icon];
    return { term: t.term, label: t.label, icon, hue: t.hue, href: t.href, total: list.length, noun, items: list.slice(0, 6) };
  });
}

export function HomePage(props: Props) {
  return (
    <main id="main">
      <JsonLd data={homeStructuredData} />
      <ActiveTermProvider count={profile.terms.length}>
        <Hero profile={profile} showcases={showcases(props)} />
      </ActiveTermProvider>
    </main>
  );
}
