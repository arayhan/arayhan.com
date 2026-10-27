"use client";

import Link from "next/link";
import { ArrowRightIcon, BriefcaseIcon, MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, type CSSProperties } from "react";
import { actionClass } from "@/components/ui/action";
import { Card } from "@/components/ui/Card";
import { HUE_TEXT } from "@/components/ui/hue";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Product, Profile, Project, Talk } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { useActiveTerm } from "./ActiveTerm";

type Props = {
  terms: Profile["terms"];
  projects: Project[];
  talks: Talk[];
  products: readonly Product[];
};

const step = (i: number) => ({ "--i": Math.min(i, 8) }) as CSSProperties;
const chip = "rounded-control bg-soft px-2 py-0.5 text-xs text-mute";

function Metric({ project, featured }: { project: Project; featured: boolean }) {
  const { metric } = project;
  if (!metric) return <p className="text-sm text-mute">Impact being measured</p>;
  return (
    <p className="grid gap-1">
      <span className={cx("font-semibold tracking-[-0.04em] tabular-nums", featured ? "text-6xl leading-none" : "text-3xl")}>
        {metric.prefix}
        {metric.value}
        {metric.suffix}
      </span>
      <span className="text-sm text-mute">{metric.label}</span>
      {featured && metric.detail && <span className="font-mono text-xs text-mute">{metric.detail}</span>}
    </p>
  );
}

// Works: a bento with the first project featured across two columns, so five projects fill
// exactly two rows (lg: 2 + 1, then 3; sm: 2, then 2 + 2).
function WorkCard({ project, i }: { project: Project; i: number }) {
  const featured = i === 0;
  return (
    <Card dotted={featured} className={cx("fade-rise grid content-between gap-5 p-5", featured && "sm:col-span-2 sm:p-7")} style={step(i)}>
      <div className="flex items-center gap-3">
        <IconBadge icon={BriefcaseIcon} hue="blue" />
        <div className="min-w-0">
          <h3 className="font-semibold tracking-tight">{project.name}</h3>
          <p className="truncate text-xs text-mute">{project.client}</p>
        </div>
      </div>
      <div className={cx("grid gap-5", featured && "md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-end")}>
        <Metric project={project} featured={featured} />
        {featured && (
          <ul className="grid gap-1.5 text-sm text-mute">
            {project.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid gap-3">
        <p className="grid text-sm">
          {project.role}
          <span className="text-xs text-mute">{project.years}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className={chip}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// Talks: too many for a card each, so one card of year groups in two columns; the year
// headings separate the groups (a hairline would break at the column edge).
function TalkList({ talks }: { talks: Talk[] }) {
  const years = [...new Set(talks.map((t) => t.year))];
  return (
    <Card dotted className="fade-rise col-span-full p-5 sm:p-7" style={step(0)}>
      <div className="gap-x-12 md:columns-2">
        {years.map((year) => (
          <section key={year} aria-label={`Talks in ${year}`} className="break-inside-avoid pb-7">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-hue-violet-text">
              <IconBadge icon={MicrophoneStageIcon} hue="violet" size="sm" />
              {year}
            </h3>
            <ul className="grid gap-3">
              {talks
                .filter((t) => t.year === year)
                .map((t) => (
                  <li key={t.title} className="flex items-start justify-between gap-4">
                    <span className="grid">
                      <span className="font-medium text-pretty">{t.title}</span>
                      <span className="text-sm text-mute">{t.event}</span>
                    </span>
                    <span className={cx(chip, "flex-none")}>{t.topic}</span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </Card>
  );
}

// Products: one tall feature beside two stacked, never three equal cards.
function ProductCard({ product, i }: { product: Product; i: number }) {
  const featured = i === 0;
  return (
    <Card dotted={featured} className={cx("fade-rise grid content-between gap-4 p-5", featured && "sm:row-span-2 sm:p-7")} style={step(i)}>
      <div className="grid gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVG logos; the image optimizer adds nothing. */}
        <img src={product.logo} alt="" width={64} height={64} className={cx("rounded-full", featured ? "size-16" : "size-10")} />
        <div className="grid gap-1">
          <h3 className={cx("font-semibold tracking-tight", featured && "text-3xl")}>{product.name}</h3>
          <p className={cx("text-mute", featured ? "text-base" : "text-sm")}>{product.pitch}</p>
        </div>
      </div>
      <Link href={`/products/${product.slug}`} className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        Open {product.name}
        <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}

/**
 * Everything behind the active /term, right under the hero: all projects, talks or products,
 * each in its own composition (a bento, a year-grouped list, a feature-plus-two). It follows
 * the hero's term and its own tabs switch it back; while it is on screen the term stops
 * auto-advancing, so the list never changes under a reader.
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
      ? { count: `${talks.length} talks`, href: "/talks", grid: "grid-cols-1", cards: <TalkList talks={talks} /> }
      : term.icon === "product"
        ? { count: `${products.length} products`, href: "/products", grid: "sm:grid-cols-2", cards: products.map((p, i) => <ProductCard key={p.slug} product={p} i={i} />) }
        : { count: `${projects.length} projects`, href: "/work", grid: "sm:grid-cols-2 lg:grid-cols-3", cards: projects.map((p, i) => <WorkCard key={p.id} project={p} i={i} />) };

  return (
    <section ref={root} id="shelf" aria-labelledby="shelf-title" className="mx-auto grid w-full max-w-page scroll-mt-24 gap-6 px-4 pt-4 pb-24 sm:px-8 lg:px-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 key={active} id="shelf-title" aria-live="polite" className="fade-rise text-2xl font-semibold tracking-tight">
          <span className={HUE_TEXT[term.hue]}>{term.term}</span> <span className="font-normal text-mute">· {shelf.count}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {terms.map((t, i) => (
            <button key={t.term} type="button" aria-pressed={i === active} aria-controls="shelf-grid" onClick={() => pick(i)} className={actionClass(i === active ? "primary" : "secondary", "sm")}>
              {t.term}
            </button>
          ))}
          <Link href={shelf.href} className="group ml-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Open {term.term}
            <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <div key={active} id="shelf-grid" className={cx("grid gap-4", shelf.grid)}>
        {shelf.cards}
      </div>
    </section>
  );
}
