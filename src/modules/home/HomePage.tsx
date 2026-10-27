import { JsonLd } from "@/components/JsonLd";
import { products } from "@/content/products";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { homeStructuredData } from "@/content/structured-data";
import { talks } from "@/content/talks";
import { ActiveTermProvider } from "./components/ActiveTerm";
import { Hero } from "./components/Hero";
import { TermShelf } from "./components/TermShelf";

// How many items the shelf shows for each hero term, in the terms' order.
const counts = profile.terms.map((t) => (t.icon === "talk" ? talks.length : t.icon === "product" ? products.length : projects.length));

export function HomePage() {
  return (
    <main id="main">
      <JsonLd data={homeStructuredData} />
      <ActiveTermProvider count={profile.terms.length}>
        <Hero profile={profile} counts={counts} />
        <TermShelf terms={profile.terms} projects={projects} talks={talks} products={products} />
      </ActiveTermProvider>
    </main>
  );
}
