import type { Locale, LocaleContent } from './types';
import { profile as profileEn } from './en/profile';
import { experiences as experiencesEn } from './en/experience';
import { projects as projectsEn } from './en/projects';
import { awards as awardsEn, communityRoles as communityRolesEn, talks as talksEn } from './en/talks';
import { posts as postsEn } from './en/posts';
import { profile as profileId } from './id/profile';
import { experiences as experiencesId } from './id/experience';
import { projects as projectsId } from './id/projects';
import { awards as awardsId, communityRoles as communityRolesId, talks as talksId } from './id/talks';
import { posts as postsId } from './id/posts';

const en: LocaleContent = {
  profile: profileEn,
  experiences: experiencesEn,
  projects: projectsEn,
  talks: talksEn,
  awards: awardsEn,
  communityRoles: communityRolesEn,
  posts: postsEn,
};

const id: LocaleContent = {
  profile: profileId,
  experiences: experiencesId,
  projects: projectsId,
  talks: talksId,
  awards: awardsId,
  communityRoles: communityRolesId,
  posts: postsId,
};

const contentByLocale: Record<Locale, LocaleContent> = { en, id };

export function getContent(locale: Locale): LocaleContent {
  return contentByLocale[locale];
}

export * from './types';
