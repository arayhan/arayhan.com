import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Album", path: "/album", description: sectionIntros["/album"] });

export default function Page() {
  return <StubPage path="/album" title="Album" intro={sectionIntros["/album"]} />;
}
