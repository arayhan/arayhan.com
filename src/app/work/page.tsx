import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Work", path: "/work", description: sectionIntros["/work"] });

export default function Page() {
  return <StubPage path="/work" title="Work" intro={sectionIntros["/work"]} />;
}
