import { describe, expect, it } from 'vitest';
import { getContent } from './index';
import type { Locale } from './types';

const LOCALES: Locale[] = ['en', 'id'];

describe('content integrity', () => {
  it('returns content for both locales', () => {
    for (const locale of LOCALES) {
      const content = getContent(locale);
      expect(content.profile.name).toBe('Ahmed Rayhan Primadedas');
      expect(content.experiences.length).toBeGreaterThan(0);
      expect(content.projects.length).toBe(5);
      expect(content.posts.length).toBeGreaterThan(0);
    }
  });

  it('keeps locales structurally in sync (same ids, slugs, counts)', () => {
    const en = getContent('en');
    const id = getContent('id');
    expect(id.experiences.map((e) => e.id)).toEqual(en.experiences.map((e) => e.id));
    expect(id.projects.map((p) => p.slug)).toEqual(en.projects.map((p) => p.slug));
    expect(id.posts.map((p) => p.slug)).toEqual(en.posts.map((p) => p.slug));
    expect(id.talks.length).toBe(en.talks.length);
    expect(id.awards.length).toBe(en.awards.length);
    expect(id.profile.stats.length).toBe(en.profile.stats.length);
  });

  it('has unique project and post slugs per locale', () => {
    for (const locale of LOCALES) {
      const { projects, posts } = getContent(locale);
      expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
      expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    }
  });

  it('covers all four experience types', () => {
    for (const locale of LOCALES) {
      const types = new Set(getContent(locale).experiences.map((e) => e.type));
      expect(types).toEqual(new Set(['professional', 'freelance', 'academic', 'mentoring']));
    }
  });

  it('every project has case-study sections and highlights', () => {
    for (const locale of LOCALES) {
      for (const project of getContent(locale).projects) {
        expect(project.sections.length).toBeGreaterThanOrEqual(3);
        expect(project.highlights.length).toBeGreaterThan(0);
      }
    }
  });
});
