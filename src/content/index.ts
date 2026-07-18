import type { Locale, LocaleContent } from './types';
import { profile as profileEn } from './en/profile';
import { experiences as experiencesEn } from './en/experience';
import { projects as projectsEn } from './en/projects';
import { awards as awardsEn, communityRoles as communityRolesEn, talks as talksEn } from './en/talks';
import { posts as postsEn } from './en/posts';

const en: LocaleContent = {
  profile: profileEn,
  experiences: experiencesEn,
  projects: projectsEn,
  talks: talksEn,
  awards: awardsEn,
  communityRoles: communityRolesEn,
  posts: postsEn,
};

const contentByLocale: Record<Locale, LocaleContent> = {
  en,
  // Indonesian content lands in the next commit; fall back to EN until then.
  id: en,
};

export function getContent(locale: Locale): LocaleContent {
  return contentByLocale[locale];
}

export * from './types';
