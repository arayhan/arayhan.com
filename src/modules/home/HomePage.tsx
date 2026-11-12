import { JsonLd } from "@/components/JsonLd";
import type { Product, Project, Talk } from "@/domain/portfolio";
import { profile } from "@/content/profile";
import { stackMarks } from "@/content/stacks";
import { homeStructuredData } from "@/content/structured-data";
import { Hero } from "./components/Hero";
import type { WallCard } from "./components/HeroWall";

type Props = {
  /** The content lists with `cover` resolved from public/covers/ (app/page.tsx). */
  projects: Project[];
  products: Product[];
  talks: Talk[];
};

const mark = (name: string) => {
  const m = stackMarks[name];
  return m ? [{ name, logo: `/logos/${m.slug}.svg`, color: m.color }] : [];
};

// Every project, talk and product becomes one card on the wall, interleaved so each column mixes kinds.
function wallCards({ projects, talks, products }: Props): WallCard[] {
  const lists: WallCard[][] = [
    projects.map((p) => ({ key: p.id, kind: "project", name: p.name, sub: `${p.role} · ${p.years}`, cover: p.cover, href: "/work", marks: p.stack.flatMap(mark) })),
    talks.map((t) => ({ key: t.title, kind: "talk", name: t.title, sub: `${t.event} · ${t.year}`, cover: t.cover, href: "/talks", marks: mark(t.topic) })),
    products.map((p) => ({ key: p.slug, kind: "product", name: p.name, sub: p.pitch, cover: p.cover, href: `/products/${p.slug}`, marks: [{ name: p.name, logo: p.logo }] })),
  ];
  const out: WallCard[] = [];
  for (let i = 0; lists.some((l) => l[i]); i++) lists.forEach((l) => l[i] && out.push(l[i]));
  return out;
}

export function HomePage(props: Props) {
  const counts = [
    { n: props.projects.length, noun: "projects" },
    { n: props.talks.length, noun: "talks" },
    { n: props.products.length, noun: "products" },
  ];
  return (
    <main id="main">
      <JsonLd data={homeStructuredData} />
      <Hero intro={profile.intro} email={profile.email} counts={counts} cards={wallCards(props)} />
    </main>
  );
}
