import type { Icon } from "@phosphor-icons/react";
import type { CSSProperties } from "react";
import { Cover } from "@/components/ui/Cover";
import type { Hue } from "@/domain/portfolio";

export type CollageTile = { key: string; name: string; hue: Hue; icon: Icon; cover?: string };

// Fixed placements, so the pile looks tossed but never reshuffles. Big tiles span the width
// edge to edge; small ones sit over the gaps between them, lower down.
const BIG = [
  { r: -4, y: 24 },
  { r: 3, y: 0 },
  { r: -2, y: 36 },
  { r: 4, y: 8 },
  { r: -3, y: 22 },
];
const SMALL = [
  { r: 5, top: "56%", left: "17%" },
  { r: -4, top: "62%", left: "57%" },
  { r: 3, top: "54%", left: "79%" },
];

function Tile({ tile, small }: { tile: CollageTile; small?: boolean }) {
  return (
    <div className="collage-tile relative rounded-card bg-surface p-1.5 shadow-card-lift">
      <div className="overflow-hidden rounded-[18px]">
        <Cover
          seed={tile.key}
          hue={tile.hue}
          icon={tile.icon}
          src={tile.cover}
          small={small}
          sizes={small ? "(min-width: 1024px) 16vw, 30vw" : "(min-width: 1024px) 22vw, 40vw"}
          className={small ? "aspect-[4/3]" : "aspect-[4/5]"}
        />
      </div>
      <span className="absolute top-3.5 left-3.5 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink shadow-control">{tile.name}</span>
    </div>
  );
}

/**
 * The hero's ground: works and products as framed, slightly tilted tiles, a row that bleeds off
 * both edges and runs out of the hero's bottom. Decorative; the shelf lists the same items.
 * Hover straightens and lifts a tile (CSS, `.collage-tile`).
 */
export function HeroCollage({ tiles }: { tiles: CollageTile[] }) {
  const big = tiles.slice(0, BIG.length);
  const small = tiles.slice(BIG.length, BIG.length + SMALL.length);
  return (
    <div aria-hidden="true" className="relative mt-14 h-[clamp(15rem,27vw,26rem)] overflow-hidden md:mt-16">
      <div className="absolute inset-x-0 top-0 flex justify-center">
        {big.map((tile, i) => (
          <div key={tile.key} className="fade-rise -mx-[0.6vw] w-[clamp(9rem,21vw,22rem)] flex-none hover:z-10" style={{ "--i": 3 + i } as CSSProperties}>
            <div style={{ "--r": `${BIG[i].r}deg`, "--y": `${BIG[i].y}px` } as CSSProperties}>
              <Tile tile={tile} />
            </div>
          </div>
        ))}
      </div>
      {small.map((tile, i) => (
        // The offset sits on the outer box: fade-rise animates transform on the inner one.
        <div key={tile.key} className="absolute z-[5] w-[clamp(7rem,14vw,16rem)] -translate-x-1/2 hover:z-10" style={{ top: SMALL[i].top, left: SMALL[i].left }}>
          <div className="fade-rise" style={{ "--i": 6 + i, "--r": `${SMALL[i].r}deg`, "--y": "0px" } as CSSProperties}>
            <Tile tile={tile} small />
          </div>
        </div>
      ))}
    </div>
  );
}
