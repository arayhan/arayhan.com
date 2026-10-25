import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StubPage } from "@/components/StubPage";
import { blogCategories } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const found = blogCategories.find((c) => c.slug === category);
  if (!found) return { title: "Blog" };
  return pageMetadata({ title: `${found.label} writing`, path: `/blog/${found.slug}`, description: `Posts filed under ${found.label.toLowerCase()}.` });
}

export default async function Page({ params }: Params) {
  const { category } = await params;
  const found = blogCategories.find((c) => c.slug === category);
  if (!found) notFound();
  return <StubPage path={`/blog/${found.slug}`} title={found.label} intro={`Posts filed under ${found.label.toLowerCase()}.`} />;
}
