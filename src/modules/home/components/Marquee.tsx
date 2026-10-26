"use client";

import { MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import type { CommunityStat, Product, Project, Talk } from "@/domain/portfolio";
import { useFrameLoop } from "./motion/loop";

type Props = { projects: Project[]; products: readonly Product[]; community: CommunityStat[]; talks: Talk[] };

const COPIES = 3;
const SPEED = 0.3;
const chip = "w-max rounded-control bg-soft px-2 py-0.5 text-xs text-mute";

function Tile({ children }: { children: ReactNode }) {
  return <Card className="flex h-[200px] w-[300px] flex-none flex-col justify-between rounded-2xl p-5 sm:h-[270px] sm:w-[420px] sm:p-7">{children}</Card>;
}

function ProjectTile({ project }: { project: Project }) {
  const { metric } = project;
  return (
    <Tile>
      <div className="grid gap-1">
        <span className={chip}>{project.tag}</span>
        <p className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</p>
        <p className="truncate text-sm text-mute">{project.client}</p>
      </div>
      {metric ? (
        <p className="flex items-baseline gap-3">
          <span className="font-display text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
            {metric.prefix}
            {metric.value}
            {metric.suffix}
          </span>
          <span className="text-sm text-mute">{metric.label}</span>
        </p>
      ) : (
        <p className="text-sm text-mute">
          {project.role} · {project.years}
        </p>
      )}
    </Tile>
  );
}

function ProductTile({ product }: { product: Product }) {
  return (
    <Tile>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVG logos; the image optimizer adds nothing. */}
      <img src={product.logo} alt="" width={56} height={56} className="size-12 rounded-full sm:size-14" />
      <div className="grid gap-1">
        <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{product.name}</p>
        <p className="text-sm text-mute">{product.pitch}</p>
      </div>
    </Tile>
  );
}

function StatTile({ stat }: { stat: CommunityStat }) {
  return (
    <Tile>
      <span className={chip}>Community</span>
      <div className="grid gap-1">
        <p className="font-display text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">{stat.value}</p>
        <p className="text-sm text-mute">{stat.label}</p>
      </div>
    </Tile>
  );
}

function TalkTile({ talk }: { talk: Talk }) {
  return (
    <Tile>
      <div className="flex items-start justify-between gap-3">
        <IconBadge icon={MicrophoneStageIcon} hue="violet" size="sm" />
        <span className={chip}>{talk.topic}</span>
      </div>
      <div className="grid gap-1">
        <p className="font-display text-xl font-semibold tracking-tight text-pretty sm:text-2xl">{talk.title}</p>
        <p className="text-sm text-mute">
          {talk.event} · {talk.year}
        </p>
      </div>
    </Tile>
  );
}

/**
 * Two rows of tactile tiles built from real content (projects, products, community, talks)
 * that slide in opposite directions as the page scrolls past. Each row holds its set three
 * times, so an edge never shows. Decorative movement only; the tiles are ordinary content.
 */
export function Marquee({ projects, products, community, talks }: Props) {
  const root = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  useFrameLoop(root, () => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const offset = (window.scrollY - top + window.innerHeight) * SPEED;
    rows.current.forEach((row, i) => {
      if (!row) return;
      const set = row.scrollWidth / COPIES;
      const x = i === 0 ? -set + (offset - 200) : -set - (offset - 200);
      row.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    });
  });

  const lines: ReactNode[][] = [
    [
      ...projects.map((p) => <ProjectTile key={p.id} project={p} />),
      ...products.map((p) => <ProductTile key={p.slug} product={p} />),
      ...community.slice(0, 3).map((s) => <StatTile key={s.label} stat={s} />),
    ],
    talks.map((t) => <TalkTile key={t.title} talk={t} />),
  ];

  return (
    <section ref={root} aria-label="Highlights" className="grid gap-3 overflow-hidden pt-24 pb-10 sm:pt-32 md:pt-40">
      {lines.map((tiles, i) => (
        <div
          key={i}
          ref={(node) => {
            rows.current[i] = node;
          }}
          className="flex w-max gap-3 will-change-transform"
        >
          {Array.from({ length: COPIES }, (_, copy) => (
            // Only the first copy is read by assistive tech; the repeats exist for the loop.
            <div key={copy} aria-hidden={copy > 0 || undefined} className="flex gap-3">
              {tiles}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
