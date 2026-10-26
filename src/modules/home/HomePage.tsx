import { JsonLd } from "@/components/JsonLd";
import { products } from "@/content/products";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { community } from "@/content/roles";
import { services } from "@/content/services";
import { homeStructuredData } from "@/content/structured-data";
import { talks } from "@/content/talks";
import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";

// The three projects with measured numbers lead; the rest live on /work.
const TOP_PROJECTS = 3;

export function HomePage() {
  return (
    <main id="main" className="overflow-x-clip">
      <JsonLd data={homeStructuredData} />
      <Hero profile={profile} />
      <Marquee projects={projects} products={products} community={community} talks={talks} />
      <About bio={profile.bio} email={profile.email} />
      <Services services={services} />
      <Projects projects={projects.slice(0, TOP_PROJECTS)} />
    </main>
  );
}
