import type { Metadata } from "next";
import Link from "next/link";
import { StubPage } from "@/components/StubPage";
import { products } from "@/content/navigation";

export const metadata: Metadata = { title: "Products" };

export default function Page() {
  return (
    <StubPage path="/products" title="Products" intro="Products I am building.">
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-medium">
        {products.map((p) => (
          <li key={p.slug}>
            <Link href={`/products/${p.slug}`} className="transition-colors hover:text-accent">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </StubPage>
  );
}
