import type { Metadata } from "next";
import Link from "next/link";
import { StubPage } from "@/components/StubPage";
import { sectionIntros } from "@/content/navigation";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <StubPage path="/about" title="About" intro={sectionIntros["/about"]}>
      <section id="journey" aria-labelledby="journey-title" className="scroll-mt-24 border-t border-line pt-6">
        <h2 id="journey-title" className="text-xl font-semibold">Journey</h2>
      </section>
      <section id="stack" aria-labelledby="stack-title" className="scroll-mt-24 border-t border-line pt-6">
        <h2 id="stack-title" className="text-xl font-semibold">Tech stack</h2>
      </section>
      <p>
        <Link href="/uses" className="text-accent underline underline-offset-4">
          See what I use every day
        </Link>
      </p>
    </StubPage>
  );
}
