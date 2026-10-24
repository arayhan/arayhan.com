import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";

export const metadata: Metadata = { title: "Album" };

export default function Page() {
  return <StubPage path="/album" title="Album" intro={sectionIntros["/album"]} />;
}
