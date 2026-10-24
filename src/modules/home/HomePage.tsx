import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import { Hero } from "./components/Hero";
import { actionClass } from "./home.actions";

export function HomePage() {
  return (
    <>
      <SiteHeader
        name={profile.name}
        email={profile.email}
        github={profile.github}
        linkedin={profile.linkedin}
        primaryAction="Email me"
        primaryActionClass={actionClass("primary", "sm")}
      />
      <main id="main">
        <Hero profile={profile} />
      </main>
    </>
  );
}
