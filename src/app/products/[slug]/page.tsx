import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StubPage } from "@/components/StubPage";
import { products } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return product ? pageMetadata({ title: product.name, path: `/products/${product.slug}` }) : { title: "Products" };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return <StubPage path={`/products/${product.slug}`} title={product.name} intro={product.pitch} />;
}
