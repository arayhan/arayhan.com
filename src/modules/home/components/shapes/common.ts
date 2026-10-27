import type { Hue } from "@/domain/portfolio";

/** What every hero shape gets: the active /term's index and each term's hue, in order. */
export type ShapeProps = { index: number; hues: Hue[] };
