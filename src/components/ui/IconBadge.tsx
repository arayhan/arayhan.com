import type { Icon } from "@phosphor-icons/react";
import type { Hue } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { HUE_FILL } from "./hue";

const SIZES = { sm: { box: "size-7", glyph: 15 }, md: { box: "size-10", glyph: 20 } };

type Props = { icon: Icon; hue?: Hue; size?: keyof typeof SIZES; className?: string };

/** A flat filled circle with a glyph: a hue fill with a navy glyph, or ink without one. Decorative: the label beside it carries the meaning. */
export function IconBadge({ icon: Glyph, hue, size = "md", className }: Props) {
  const { box, glyph } = SIZES[size];
  return (
    <span aria-hidden="true" className={cx("grid flex-none place-items-center rounded-full", hue ? cx(HUE_FILL[hue], "text-on-accent") : "bg-ink text-canvas", box, className)}>
      <Glyph size={glyph} weight="fill" />
    </span>
  );
}
