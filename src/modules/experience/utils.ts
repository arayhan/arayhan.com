import type { ExperienceEntry } from '@/content';

/** "2022-08" → "2022"; null end → the localized "now" word. */
export function formatPeriod(entry: ExperienceEntry, nowWord: string): string {
  const startYear = entry.period.start.slice(0, 4);
  const endYear = entry.period.end ? entry.period.end.slice(0, 4) : nowWord;
  return startYear === endYear ? startYear : `${startYear} — ${endYear}`;
}
