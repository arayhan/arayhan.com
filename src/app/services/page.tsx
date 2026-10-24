import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";

export const metadata: Metadata = { title: "Services & Rates" };

export default function Page() {
  return <StubPage path="/services" title="Services & Rates" intro={sectionIntros["/services"]} />;
}
