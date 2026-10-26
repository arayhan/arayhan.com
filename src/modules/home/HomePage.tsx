import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/content/profile";
import { homeStructuredData } from "@/content/structured-data";
import { Hero } from "./components/Hero";

export function HomePage() {
  return (
    <main id="main">
      <JsonLd data={homeStructuredData} />
      <Hero profile={profile} />
    </main>
  );
}
