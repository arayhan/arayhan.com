import type { ReactNode } from "react";
import { cx } from "@/utils/cx";

type Props = { title: string; children: ReactNode; className?: string };

/** A tinted status strip: accent title, muted body. For states, never for decoration. */
export function Notice({ title, children, className }: Props) {
  return (
    <div className={cx("rounded-control bg-accent-soft px-4 py-3.5", className)}>
      <p className="text-sm font-semibold text-accent-text">{title}</p>
      <p className="mt-0.5 text-sm text-mute">{children}</p>
    </div>
  );
}
