import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { community, roles } from "@/content/roles";
import { CloseBlock } from "./components/CloseBlock";
import { Hero } from "./components/Hero";
import { HomeMotion } from "./components/HomeMotion";
import { ProofStrip } from "./components/ProofStrip";
import { ReleaseEntry } from "./components/ReleaseEntry";
import { RoleList } from "./components/RoleList";
import { SectionHead } from "./components/SectionHead";
import { SiteNav } from "./components/SiteNav";

const firstYear = Math.min(...projects.map((project) => Number.parseInt(project.years, 10)));

export function HomePage() {
  return (
    <HomeMotion>
      <main
        id="main"
        className="mx-auto grid max-w-page gap-14 px-4.5 pt-4.5 pb-16 sm:px-8 md:gap-26 lg:px-14"
      >
        <SiteNav timezone={profile.timezone} />
        <Hero profile={profile} />

        <section id="shipped" aria-labelledby="shipped-title" className="scroll-mt-6">
          <SectionHead id="shipped-title" title="Shipped" summary={`${projects.length} releases · ${firstYear}–now`} />
          <ol>
            {projects.map((project) => (
              <ReleaseEntry key={project.id} project={project} />
            ))}
          </ol>
        </section>

        <section id="roles" aria-labelledby="roles-title" className="scroll-mt-6">
          <SectionHead id="roles-title" title="Roles" summary="2017–now" />
          <RoleList roles={roles} />
        </section>

        <section id="community" aria-labelledby="community-title" className="scroll-mt-6">
          <SectionHead id="community-title" title="Community" summary="Organizer · speaker · mentor" />
          <ProofStrip items={community} />
        </section>

        <CloseBlock profile={profile} />
      </main>
    </HomeMotion>
  );
}
