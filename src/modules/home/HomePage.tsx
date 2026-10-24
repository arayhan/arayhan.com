import { profile } from "@/content/profile";
import { Hero } from "./components/Hero";

export function HomePage() {
  return (
    <main id="main">
      <Hero profile={profile} />
    </main>
  );
}
