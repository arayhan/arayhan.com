import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";

export const metadata: Metadata = { title: "Work" };

export default function Page() {
  return <StubPage path="/work" title="Work" intro={sectionIntros["/work"]} />;
}
