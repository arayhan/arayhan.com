import type { Icon } from "@phosphor-icons/react";
import Image from "next/image";
import type { Hue } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { HUE_SOFT, HUE_TEXT } from "./hue";

// Squares keep one pixel size at any cover size: a repeating pattern draws the faint grid and
// only the brighter cells are their own rects, inside this many columns and rows from the top left.
const GRID = { normal: { pitch: 22, cell: 15, radius: 4 }, small: { pitch: 11, cell: 8, radius: 2 } };
const SPAN = { cols: 32, rows: 22 };

// FNV-1a over the seed, then xorshift-multiply steps: the same item always gets the same cover.
function seeded(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const id = (h >>> 0).toString(36);
  const next = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
  return { id, next };
}

type Props = {
  /** Stable id of the item; picks the placeholder's pattern. */
  seed: string;
  hue: Hue;
  icon: Icon;
  /** A real image (public path). Until one exists the placeholder is drawn: TODO(content). */
  src?: string;
  /** Hints for next/image when `src` is set. */
  sizes?: string;
  /** A thumbnail: smaller squares and glyph. */
  small?: boolean;
  className?: string;
};

/**
 * An item's cover image. Without `src` it draws a placeholder in the item's hue: the hero's
 * commit squares at three strengths and the item's glyph in the middle. Decorative either way
 * (the card's title carries the meaning), so it is hidden from screen readers.
 */
export function Cover({ seed, hue, icon: Glyph, src, sizes = "(min-width: 1024px) 33vw, 100vw", small, className }: Props) {
  if (src) {
    return (
      <div aria-hidden="true" className={cx("relative overflow-hidden rounded-control", HUE_SOFT[hue], className)}>
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  const { pitch, cell, radius } = small ? GRID.small : GRID.normal;
  const { id, next } = seeded(seed);
  const lit: { x: number; y: number; opacity: number }[] = [];
  for (let i = 0; i < SPAN.cols * SPAN.rows; i++) {
    const r = next();
    if (r < 0.24) lit.push({ x: (i % SPAN.cols) * pitch + 3, y: Math.floor(i / SPAN.cols) * pitch + 3, opacity: r < 0.08 ? 0.5 : 0.24 });
  }

  return (
    <div aria-hidden="true" className={cx("relative grid place-items-center overflow-hidden rounded-control", HUE_SOFT[hue], HUE_TEXT[hue], className)}>
      <svg className="absolute inset-0 size-full">
        <defs>
          <pattern id={`cover-${id}`} width={pitch} height={pitch} patternUnits="userSpaceOnUse">
            <rect x={3} y={3} width={cell} height={cell} rx={radius} fill="currentColor" opacity={0.08} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cover-${id})`} />
        {lit.map(({ x, y, opacity }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={cell} height={cell} rx={radius} fill="currentColor" opacity={opacity} />
        ))}
      </svg>
      <span className={cx("relative grid place-items-center rounded-full bg-surface shadow-control", small ? "size-8" : "size-12")}>
        <Glyph size={small ? 15 : 22} weight="fill" />
      </span>
    </div>
  );
}
