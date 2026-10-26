"use client";

import Link from "next/link";
import { ArrowRightIcon, BriefcaseIcon, MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, type CSSProperties } from "react";
import { actionClass } from "@/components/ui/action";
import { Card } from "@/components/ui/Card";
import { HUE_TEXT } from "@/components/ui/hue";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Product, Profile, Project, Talk } from "@/domain/portfolio";
import { useActiveTerm } from "./ActiveTerm";

type Props = {
  terms: Profile["terms"];
  projects: Project[];
  talks: Talk[];
  products: readonly Product[];
};

const step = (i: number) => ({ "--i": Math.min(i, 8) }) as CSSProperties;
const chip = "rounded-control bg-soft px-2 py-0.5 text-xs text-mute";

function WorkCard({ project, i }: { project: Project; i: number }) {
  const { metric } = project;
  return (
    <Card dotted={i === 0} className="fade-rise grid content-start gap-4 p-5" style={step(i)}>
      <div className="flex items-center gap-3">
        <IconBadge icon={BriefcaseIcon} hue="blue" />
        <div className="min-w-0">
          <h3 className="font-semibold tracking-tight">{project.name}</h3>
          <p className="truncate text-xs text-mute">{project.client}</p>
        </div>
      </div>
      {metric ? (
        <p className="grid gap-0.5">
          <span className="text-3xl font-semibold tracking-[-0.04em] tabular-nums">
            {metric.prefix}
            {metric.value}
            {metric.suffix}
          </span>
          <span className="text-sm text-mute">{metric.label}</span>
        </p>
      ) : (
        <p className="text-sm text-mute">Impact being measured</p>
      )}
      <p className="text-sm">
        {project.role} <span className="text-mute">· {project.years}</span>
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li key={s} className={chip}>
            {s}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function TalkCard({ talk, i }: { talk: Talk; i: number }) {
  return (
    <Card dotted={i === 0} className="fade-rise grid content-start gap-3 p-5" style={step(i)}>
      <div className="flex items-start justify-between gap-3">
        <IconBadge icon={MicrophoneStageIcon} hue="violet" size="sm" />
        <span className={chip}>{talk.topic}</span>
      </div>
      <h3 className="font-semibold tracking-tight text-pretty">{talk.title}</h3>
      <p className="text-sm text-mute">
        {talk.event} · {talk.year}
      </p>
    </Card>
  );
}

function ProductCard({ product, i }: { product: Product; i: number }) {
  return (
    <Card dotted={i === 0} className="fade-rise grid content-start gap-4 p-5" style={step(i)}>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVG logos; the image optimizer adds nothing. */}
        <img src={product.logo} alt="" width={40} height={40} className="size-10 rounded-full" />
        <h3 className="font-semibold tracking-tight">{product.name}</h3>
      </div>
      <p className="text-sm text-mute">{product.pitch}</p>
      <Link href={`/products/${product.slug}`} className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Open {product.name}
        <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}

/**
 * Everything behind the active /term, right under the hero: all projects, talks or products.
 * It follows the hero's term and its own tabs switch it back; while it is on screen the term
 * stops auto-advancing, so the list never changes under a reader.
 */
export function TermShelf({ terms, projects, talks, products }: Props) {
  const { active, pick, holdShelf } = useActiveTerm();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const seen = new IntersectionObserver(([entry]) => holdShelf(entry.isIntersecting), { threshold: 0.25 });
    seen.observe(el);
    return () => seen.disconnect();
  }, [holdShelf]);

  const term = terms[active];
  const shelf =
    term.icon === "talk"
      ? { count: `${talks.length} talks`, all: "All talks", href: "/talks", cards: talks.map((t, i) => <TalkCard key={t.title} talk={t} i={i} />) }
      : term.icon === "product"
        ? { count: `${products.length} products`, all: "All products", href: "/products", cards: products.map((p, i) => <ProductCard key={p.slug} product={p} i={i} />) }
        : { count: `${projects.length} projects`, all: "All work", href: "/work", cards: projects.map((p, i) => <WorkCard key={p.id} project={p} i={i} />) };

  return (
    <section ref={root} aria-labelledby="shelf-title" className="mx-auto grid w-full max-w-page scroll-mt-24 gap-6 px-4 pt-4 pb-24 sm:px-8 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="shelf-title" aria-live="polite" className="text-2xl font-semibold tracking-tight">
          <span className={HUE_TEXT[term.hue]}>{term.term}</span> <span className="font-normal text-mute">· {shelf.count}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {terms.map((t, i) => (
            <button key={t.term} type="button" aria-pressed={i === active} aria-controls="shelf-grid" onClick={() => pick(i)} className={actionClass(i === active ? "primary" : "secondary", "sm")}>
              {t.term}
            </button>
          ))}
          <Link href={shelf.href} className="group ml-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            {shelf.all}
            <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <div key={active} id="shelf-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shelf.cards}
      </div>
    </section>
  );
}
