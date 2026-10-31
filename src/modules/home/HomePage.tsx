import { BriefcaseIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/JsonLd";
import type { Product } from "@/domain/portfolio";
import { hueAt } from "@/components/ui/hue";
import { products } from "@/content/products";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { homeStructuredData } from "@/content/structured-data";
import { talks } from "@/content/talks";
import { ActiveTermProvider } from "./components/ActiveTerm";
import { Hero } from "./components/Hero";
import type { CollageTile } from "./components/HeroCollage";
import { TermShelf } from "./components/TermShelf";

// Works and products interleaved for the hero collage, each in the same hue as its shelf card.
const workTiles: CollageTile[] = projects.map((p, i) => ({ key: p.id, name: p.name, hue: hueAt(i), icon: BriefcaseIcon, cover: p.cover }));
const productTiles: CollageTile[] = products.map((p: Product, i) => ({ key: p.slug, name: p.name, hue: hueAt(i, 2), icon: CubeIcon, cover: p.cover }));
const [w0, w1, w2, w3, w4] = workTiles;
const [p0, p1, p2] = productTiles;
const tiles = [w0, p0, w1, p1, w2, w3, p2, w4].filter(Boolean);

export function HomePage() {
  return (
    <main id="main">
      <JsonLd data={homeStructuredData} />
      <ActiveTermProvider count={profile.terms.length}>
        <Hero profile={profile} tiles={tiles} />
        <TermShelf terms={profile.terms} projects={projects} talks={talks} products={products} />
      </ActiveTermProvider>
    </main>
  );
}
