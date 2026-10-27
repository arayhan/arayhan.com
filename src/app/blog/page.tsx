import Link from "next/link";
import { StubPage } from "@/components/StubPage";
import { blogCategories, sectionIntros } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Blog", path: "/blog", description: sectionIntros["/blog"] });

export default function Page() {
  return (
    <StubPage path="/blog" title="Blog" intro={sectionIntros["/blog"]}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-medium">
        {blogCategories.map((c) => (
          <li key={c.slug}>
            <Link href={`/blog/${c.slug}`} className="transition-colors hover:text-accent-text">
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </StubPage>
  );
}
