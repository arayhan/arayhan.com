import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";

export const metadata: Metadata = { title: "Talks" };

export default function Page() {
  return <StubPage path="/talks" title="Talks" intro={sectionIntros["/talks"]} />;
}
