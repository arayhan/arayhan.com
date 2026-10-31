import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { talks } from "@/content/talks";
import type { Product } from "@/domain/portfolio";
import { HomePage } from "@/modules/home";
import { talkKey, withCovers } from "@/server/covers";

export default function Page() {
  return (
    <HomePage
      projects={withCovers(projects, (p) => p.id)}
      products={withCovers<Product>(products, (p) => p.slug)}
      talks={withCovers(talks, (t) => talkKey(t.title))}
    />
  );
}
