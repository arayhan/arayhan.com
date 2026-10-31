import { existsSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public", "covers");
const EXTS = ["webp", "png", "jpg", "jpeg"];

/** File-name key for a talk: its title in lowercase words joined by hyphens. */
export const talkKey = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The image dropped into public/covers/ under `key`, if any. Runs at build (the site is static). */
export function coverFor(key: string): string | undefined {
  const ext = EXTS.find((e) => existsSync(path.join(DIR, `${key}.${e}`)));
  return ext && `/covers/${key}.${ext}`;
}

/** Fills each item's `cover` from public/covers/ when the content leaves it unset. */
export function withCovers<T extends { cover?: string }>(items: readonly T[], key: (item: T) => string): T[] {
  return items.map((item) => ({ ...item, cover: item.cover ?? coverFor(key(item)) }));
}
