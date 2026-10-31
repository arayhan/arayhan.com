import { StubPage } from "@/components/StubPage";
import { sectionIntros, usesAreas } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Uses", path: "/uses", description: sectionIntros["/uses"] });

export default function Page() {
  return (
    <StubPage path="/uses" title="Uses" intro={sectionIntros["/uses"]}>
      {usesAreas.map((area) => (
        <section key={area.id} id={area.id} aria-labelledby={`${area.id}-title`} className="scroll-mt-24 border-t border-line pt-6">
          <h2 id={`${area.id}-title`} className="text-xl font-bold tracking-tight">{area.label}</h2>
        </section>
      ))}
    </StubPage>
  );
}
