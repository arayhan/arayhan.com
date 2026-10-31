"use client";

import Link from "next/link";
import { ArrowRightIcon, BriefcaseIcon, CubeIcon, MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, type CSSProperties } from "react";
import { actionClass } from "@/components/ui/action";
import { Card } from "@/components/ui/Card";
import { Cover } from "@/components/ui/Cover";
import { HUE_TEXT, hueAt } from "@/components/ui/hue";
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
const chip = "rounded-control px-2 py-0.5 text-xs";
// The featured cell is the navy slab, so its secondary text and chips take the slab's shades.
const tone = (featured: boolean) =>
  featured ? { mute: "text-feature-mute", chip: "bg-on-feature/10 text-on-feature", link: "text-feature-accent" } : { mute: "text-mute", chip: "bg-soft text-mute", link: "text-accent-text" };

function Metric({ project, featured }: { project: Project; featured: boolean }) {
  const { metric } = project;
  const t = tone(featured);
  if (!metric) return <p className={cx("text-sm", t.mute)}>Impact being measured</p>;
  return (
    <p className="grid gap-1">
      <span className={cx("font-semibold tracking-[-0.04em] tabular-nums", featured ? "text-6xl leading-none" : "text-3xl", metric.improvement && t.link)}>
        {metric.prefix}
        {metric.value}
        {metric.suffix}
      </span>
      <span className={cx("text-sm", t.mute)}>{metric.label}</span>
      {featured && metric.detail && <span className={cx("font-mono text-xs", t.mute)}>{metric.detail}</span>}
    </p>
  );
}

// Works: a bento with the first project featured across two columns on the navy slab, so five
// projects fill exactly two rows (lg: 2 + 1, then 3; sm: 2, then 2 + 2). The featured cell
// sets its cover beside the copy from md; the others put it on top.
function WorkCard({ project, i }: { project: Project; i: number }) {
  const featured = i === 0;
  const t = tone(featured);
  const cover = <Cover seed={project.id} hue={hueAt(i)} icon={BriefcaseIcon} src={project.cover} className={featured ? "aspect-video md:aspect-auto md:h-full" : "aspect-video"} />;
  return (
    <Card feature={featured} className={cx("fade-rise grid gap-5 p-5", featured ? "sm:col-span-2 sm:p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : "content-start")} style={step(i)}>
      {!featured && cover}
      <div className="grid content-between gap-5">
        <div className="min-w-0">
          <h3 className={cx("font-semibold tracking-tight", featured && "text-xl")}>{project.name}</h3>
          <p className={cx("truncate text-xs", t.mute)}>{project.client}</p>
        </div>
        <Metric project={project} featured={featured} />
        {featured && (
          <ul className={cx("grid gap-1.5 text-sm", t.mute)}>
            {project.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
        <WorkFooter project={project} featured={featured} />
      </div>
      {featured && cover}
    </Card>
  );
}

function WorkFooter({ project, featured }: { project: Project; featured: boolean }) {
  const t = tone(featured);
  return (
    <div className="grid gap-3">
      <p className="grid text-sm">
        {project.role}
        <span className={cx("text-xs", t.mute)}>{project.years}</span>
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li key={s} className={cx(chip, t.chip)}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Talks: too many for a card each, so one card of year groups in two columns; the year
// headings separate the groups (a hairline would break at the column edge).
function TalkList({ talks }: { talks: Talk[] }) {
  const years = [...new Set(talks.map((t) => t.year))];
  // Hues follow each talk's place in the whole list, so neighbours across groups differ too.
  const hueOf = (talk: Talk) => hueAt(talks.indexOf(talk), 1);
  return (
    <Card className="fade-rise col-span-full p-5 sm:p-7" style={step(0)}>
      <div className="gap-x-12 md:columns-2">
        {years.map((year) => (
          <section key={year} aria-label={`Talks in ${year}`} className="break-inside-avoid pb-7">
            <h3 className="mb-3 font-mono text-sm font-semibold text-accent-text">{year}</h3>
            <ul className="grid gap-3">
              {talks
                .filter((t) => t.year === year)
                .map((t) => (
                  <li key={t.title} className="flex items-start gap-4">
                    <Cover seed={t.title} hue={hueOf(t)} icon={MicrophoneStageIcon} src={t.cover} sizes="96px" small className="aspect-video w-24 flex-none" />
                    <span className="grid min-w-0 flex-1">
                      <span className="font-medium text-pretty">{t.title}</span>
                      <span className="text-sm text-mute">{t.event}</span>
                    </span>
                    <span className={cx(chip, "flex-none bg-soft text-mute")}>{t.topic}</span>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </Card>
  );
}

// Products: one tall feature on the navy slab beside two stacked, never three equal cards. The
// feature's cover sits on top; the stacked two put theirs on the left from sm.
function ProductCard({ product, i }: { product: Product; i: number }) {
  const featured = i === 0;
  const t = tone(featured);
  return (
    <Card feature={featured} className={cx("fade-rise grid gap-4 p-5", featured ? "content-start sm:row-span-2 sm:p-7" : "sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]")} style={step(i)}>
      <Cover seed={product.slug} hue={hueAt(i, 2)} icon={CubeIcon} src={product.cover} className={featured ? "aspect-[4/3]" : "aspect-video sm:aspect-auto sm:h-full"} />
      <div className="grid content-between gap-4">
        <div className="grid gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVG logos; the image optimizer adds nothing. */}
          <img src={product.logo} alt="" width={64} height={64} className={cx("rounded-full", featured ? "size-16" : "size-10")} />
          <div className="grid gap-1">
            <h3 className={cx("font-semibold tracking-tight", featured && "text-3xl")}>{product.name}</h3>
            <p className={cx(t.mute, featured ? "text-base" : "text-sm")}>{product.pitch}</p>
          </div>
        </div>
        <Link href={`/products/${product.slug}`} className={cx("group inline-flex items-center gap-1.5 text-sm font-medium", t.link)}>
          Open {product.name}
          <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
        </Link>
      </div>
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
        <h2 key={active} id="shelf-title" aria-live="polite" className="fade-rise text-2xl font-bold tracking-tight">
          <span className={HUE_TEXT[term.hue]}>{term.term}</span> <span className="font-normal text-mute">{shelf.count}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {terms.map((t, i) => (
            <button key={t.term} type="button" aria-pressed={i === active} aria-controls="shelf-grid" onClick={() => pick(i)} className={actionClass(i === active ? "primary" : "secondary", "sm")}>
              {t.term}
            </button>
          ))}
          <Link href={shelf.href} className="group ml-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
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
