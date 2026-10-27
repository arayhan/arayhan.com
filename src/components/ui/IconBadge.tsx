import type { Icon } from "@phosphor-icons/react";
import { cx } from "@/utils/cx";

const SIZES = { sm: { box: "size-7", glyph: 15 }, md: { box: "size-10", glyph: 20 } };
const TONES = { ink: "bg-ink text-canvas", accent: "bg-accent text-on-accent" };

type Props = { icon: Icon; tone?: keyof typeof TONES; size?: keyof typeof SIZES; className?: string };

/** A flat filled circle with a glyph: ink by default, accent for the one thing in focus. Decorative: the label beside it carries the meaning. */
export function IconBadge({ icon: Glyph, tone = "ink", size = "md", className }: Props) {
  const { box, glyph } = SIZES[size];
  return (
    <span aria-hidden="true" className={cx("grid flex-none place-items-center rounded-full", TONES[tone], box, className)}>
      <Glyph size={glyph} weight="fill" />
    </span>
  );
}
