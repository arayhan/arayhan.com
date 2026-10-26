import type { Hue } from "@/domain/portfolio";

/** What every hero shape gets: the active /term's index and the hue of each term, in order. */
export type ShapeProps = { index: number; hues: Hue[] };

export const hueVar = (h: Hue) => `var(--hue-${h})`;

/** The tactile lip under a shape: its own hue, darkened, so dark mode follows the token. */
export const lipVar = (h: Hue) => `color-mix(in srgb, var(--hue-${h}) 70%, #000)`;
