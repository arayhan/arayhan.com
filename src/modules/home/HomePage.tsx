import { BriefcaseIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/JsonLd";
import type { Product, Project, Talk } from "@/domain/portfolio";
import { hueAt } from "@/components/ui/hue";
import { profile } from "@/content/profile";
import { homeStructuredData } from "@/content/structured-data";
import { ActiveTermProvider } from "./components/ActiveTerm";
import { Hero } from "./components/Hero";
import type { CollageTile } from "./components/HeroCollage";
import { TermShelf } from "./components/TermShelf";

type Props = {
  /** The content lists with `cover` resolved from public/covers/ (app/page.tsx). */
  projects: Project[];
  products: Product[];
  talks: Talk[];
};

// Works and products interleaved for the hero collage, each in the same hue as its shelf card.
function collage(projects: Project[], products: Product[]): CollageTile[] {
  const [w0, w1, w2, w3, w4] = projects.map((p, i) => ({ key: p.id, name: p.name, hue: hueAt(i), icon: BriefcaseIcon, cover: p.cover }));
  const [p0, p1, p2] = products.map((p, i) => ({ key: p.slug, name: p.name, hue: hueAt(i, 2), icon: CubeIcon, cover: p.cover }));
  return [w0, p0, w1, p1, w2, w3, p2, w4].filter(Boolean);
}

export function HomePage({ projects, products, talks }: Props) {
  return (
    <main id="main">
      <JsonLd data={homeStructuredData} />
      <ActiveTermProvider count={profile.terms.length}>
        <Hero profile={profile} tiles={collage(projects, products)} />
        <TermShelf terms={profile.terms} projects={projects} talks={talks} products={products} />
      </ActiveTermProvider>
    </main>
  );
}
