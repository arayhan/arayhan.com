import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Services & Rates", path: "/services", description: sectionIntros["/services"] });

export default function Page() {
  return <StubPage path="/services" title="Services & Rates" intro={sectionIntros["/services"]} />;
}
