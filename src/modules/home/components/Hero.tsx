import { ArrowRightIcon, ArrowUpRightIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Profile } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { HeroWall, type WallCard } from "./HeroWall";

type Props = {
  intro: Profile["intro"];
  email: string;
  counts: { n: number; noun: string }[];
  cards: WallCard[];
};

const TERMS = [
  { term: "/works", href: "/work" },
  { term: "/talks", href: "/talks" },
  { term: "/products", href: "/products" },
];

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/** A pill with the label and a circled glyph; hovering grows it a touch and pads the label out from the glyph. */
function Action({ href, outline, children, icon }: { href: string; outline?: boolean; children: ReactNode; icon: ReactNode }) {
  const Tag = href.startsWith("/") ? Link : "a";
  return (
    <Tag
      href={href}
      className={cx(
        "inline-flex h-[54px] items-center gap-3 rounded-full border-2 border-ink py-1 pr-1 pl-6 text-[15.5px] font-bold whitespace-nowrap transition-[transform,gap,padding] duration-400 ease-out-soft hover:scale-[1.03] hover:gap-4 hover:pl-7 focus-visible:scale-[1.03] focus-visible:gap-4 focus-visible:pl-7 active:scale-[0.99]",
        outline ? "bg-surface/60 text-ink backdrop-blur-sm" : "bg-ink text-surface",
      )}
    >
      {children}
      <span aria-hidden="true" className={cx("grid size-10 place-items-center rounded-full", outline ? "bg-ink text-surface" : "bg-surface text-ink")}>
        {icon}
      </span>
    </Tag>
  );
}

/**
 * The whole home page in one screen: the copy on 3/5 over a faint, slowly panning photo, and the
 * wall of cards (HeroWall) on 2/5, spilling over the copy. The blocks rise in once (`.fade-rise`).
 */
export function Hero({ intro, email, counts, cards }: Props) {
  return (
    <section aria-labelledby="hero-title" className="relative grid min-h-[calc(100svh-var(--header-h))] overflow-hidden xl:h-[calc(100svh-var(--header-h))] xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* TODO(content): hero.jpg is an Unsplash stand-in (docs/cover-credits.md); replace it with a real photo at the same path. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-pan absolute -inset-x-[8%] -inset-y-[6%]">
          <Image src="/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-90 grayscale" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--wash)/0.85),rgb(var(--wash)/0.6)_50%,rgb(var(--wash)/0.85))] xl:bg-[linear-gradient(90deg,rgb(var(--wash)/0.92),rgb(var(--wash)/0.8)_40%,rgb(var(--wash)/0.45)_70%,rgb(var(--wash)/0.3))]" />
      </div>

      <div className="relative z-[2] grid min-w-0 grid-rows-[1fr_auto] gap-6 px-4 pt-10 pb-7 sm:px-8 lg:px-14 xl:pr-[calc(14vw+24px)]">
        <div className="grid gap-9 self-center">
          <h1 id="hero-title" className="fade-rise font-serif text-[clamp(2.6rem,1rem+7.4vw,9.5rem)] leading-none font-normal tracking-[-0.025em] whitespace-nowrap xl:text-[min(9.5rem,6.6vw,19vh)]" style={step(0)}>
            {intro.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="fade-rise max-w-[31ch] text-[clamp(1.05rem,0.9rem+0.6vw,1.4rem)] leading-[1.6] tracking-[-0.012em] text-pretty text-mute" style={step(2)}>
            <b className="font-semibold text-ink">{intro.lead.split(" ").slice(0, 2).join(" ")}</b> {intro.lead.split(" ").slice(2).join(" ")} {intro.invite}{" "}
            {TERMS.map((t, i) => (
              <span key={t.term}>
                {i > 0 && (i === TERMS.length - 1 ? " and " : ", ")}
                <Link href={t.href} className="text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-text">
                  {t.term}
                </Link>
              </span>
            ))}
            .
          </p>
          <div className="fade-rise mt-1 flex flex-wrap gap-3.5" style={step(3)}>
            <Action href={`mailto:${email}`} icon={<PaperPlaneTiltIcon size={18} />}>
              Email me
            </Action>
            <Action href="/work" outline icon={<ArrowRightIcon size={18} />}>
              See my work
            </Action>
          </div>
        </div>

        <div className="fade-rise flex flex-wrap items-end justify-between gap-6 text-[13px] text-mute" style={step(4)}>
          <span className="flex gap-4">
            {counts.map(({ n, noun }) => (
              <span key={noun}>
                <b className="font-semibold text-ink">{n}</b> {noun}
              </span>
            ))}
          </span>
          <Link href="/work" aria-label="Hover the wall to explore" className="relative grid size-[84px] place-items-center text-ink">
            <svg aria-hidden="true" viewBox="0 0 100 100" className="spin absolute inset-0 size-full">
              <defs>
                <path id="hero-ring" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" />
              </defs>
              <text className="fill-ink text-[9.5px] font-bold tracking-[0.18em] uppercase">
                <textPath href="#hero-ring">Hover the wall · Explore ·&#160;</textPath>
              </text>
            </svg>
            <ArrowUpRightIcon size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <HeroWall cards={cards} />
    </section>
  );
}
