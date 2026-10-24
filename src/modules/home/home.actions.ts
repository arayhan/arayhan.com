import { cx } from "@/utils/cx";

export type ActionVariant = "primary" | "outline" | "ghost";
export type ActionTone = "paper" | "ink";

const base =
  "inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-[transform,background-color,color] duration-200 ease-soft hover:-translate-y-px";

const variants: Record<ActionTone, Record<ActionVariant, string>> = {
  paper: {
    primary: "border-ink bg-ink text-paper",
    outline: "border-ink text-ink",
    ghost: "border-rule font-mono text-xs font-medium text-ink",
  },
  ink: {
    primary: "border-paper bg-paper text-ink",
    outline: "border-mute text-paper",
    ghost: "border-mute font-mono text-xs font-medium text-paper",
  },
};

export function actionClass(variant: ActionVariant, tone: ActionTone = "paper"): string {
  return cx(base, variants[tone][variant]);
}
