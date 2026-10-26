import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "@/utils/cx";

type Props<T extends ElementType> = { as?: T; dotted?: boolean } & ComponentPropsWithoutRef<T>;

/** The system's one surface: hairline border, 16px radius, soft lift; `dotted` adds the corner texture. */
export function Card<T extends ElementType = "div">({ as, dotted, className, ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cx("relative rounded-card border border-line bg-surface shadow-card", dotted && "card-dots", className)} {...rest} />;
}
