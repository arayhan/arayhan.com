import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Talks", path: "/talks", description: sectionIntros["/talks"] });

export default function Page() {
  return <StubPage path="/talks" title="Talks" intro={sectionIntros["/talks"]} />;
}
