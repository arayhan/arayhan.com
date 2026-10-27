import { cx } from "@/utils/cx";

export type ActionVariant = "primary" | "secondary";
export type ActionSize = "md" | "sm";

// Tactile press: the 2px lip is the button's depth; pressing sinks the face onto it.
const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out-soft active:translate-y-0.5 active:shadow-none";

const sizes: Record<ActionSize, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-sm",
};

const variants: Record<ActionVariant, string> = {
  primary: "bg-accent text-on-accent shadow-lip-accent hover:bg-accent/92",
  secondary: "border border-line bg-surface text-ink shadow-lip-slab hover:border-ink/30",
};

export function actionClass(variant: ActionVariant, size: ActionSize = "md"): string {
  return cx(base, sizes[size], variants[variant]);
}
