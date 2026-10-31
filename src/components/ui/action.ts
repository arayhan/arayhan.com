import { cx } from "@/utils/cx";

export type ActionVariant = "primary" | "secondary";
export type ActionSize = "md" | "sm";

// A hairline shadow for depth; pressing shrinks the face a touch.
const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out-soft active:scale-[0.98]";

const sizes: Record<ActionSize, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-sm",
};

const variants: Record<ActionVariant, string> = {
  primary: "bg-accent text-on-accent shadow-control hover:bg-accent/90",
  secondary: "border border-line bg-surface text-ink shadow-control hover:border-ink/25",
};

export function actionClass(variant: ActionVariant, size: ActionSize = "md"): string {
  return cx(base, sizes[size], variants[variant]);
}
