import type { ReactNode } from "react";
import type { Hue } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { HUE_SOFT, HUE_TEXT } from "./hue";

type Props = { hue: Hue; title: string; children: ReactNode; className?: string };

/** A tinted status strip: hue title, muted body. For states, never for decoration. */
export function Notice({ hue, title, children, className }: Props) {
  return (
    <div className={cx("rounded-control px-4 py-3.5", HUE_SOFT[hue], className)}>
      <p className={cx("text-sm font-semibold", HUE_TEXT[hue])}>{title}</p>
      <p className="mt-0.5 text-sm text-mute">{children}</p>
    </div>
  );
}
