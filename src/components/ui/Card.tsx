import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "@/utils/cx";

type Props<T extends ElementType> = { as?: T; feature?: boolean } & ComponentPropsWithoutRef<T>;

/**
 * The system's one surface: hairline border, 16px radius, a flat 2px lip like the buttons.
 * `feature` makes it the navy slab, for the one cell a grid leads with.
 */
export function Card<T extends ElementType = "div">({ as, feature, className, ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cx("relative rounded-card border shadow-card", feature ? "border-feature bg-feature text-on-feature" : "border-line bg-surface", className)}
      {...rest}
    />
  );
}
