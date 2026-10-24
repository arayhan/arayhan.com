import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";
import { sectionIntros, usesAreas } from "@/content/navigation";

export const metadata: Metadata = { title: "Uses" };

export default function Page() {
  return (
    <StubPage path="/uses" title="Uses" intro={sectionIntros["/uses"]}>
      {usesAreas.map((area) => (
        <section key={area.id} id={area.id} aria-labelledby={`${area.id}-title`} className="scroll-mt-24 border-t border-line pt-6">
          <h2 id={`${area.id}-title`} className="text-xl font-semibold">{area.label}</h2>
        </section>
      ))}
    </StubPage>
  );
}
