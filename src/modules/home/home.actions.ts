import { cx } from "@/utils/cx";

export type ActionVariant = "primary" | "secondary";
export type ActionSize = "md" | "sm";

const base =
  "inline-flex shrink-0 items-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,color,border-color] duration-200 ease-out-soft hover:-translate-y-px active:scale-[0.98]";

const sizes: Record<ActionSize, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-sm",
};

const variants: Record<ActionVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent/90",
  secondary: "border border-line text-ink hover:border-ink",
};

export function actionClass(variant: ActionVariant, size: ActionSize = "md"): string {
  return cx(base, sizes[size], variants[variant]);
}
