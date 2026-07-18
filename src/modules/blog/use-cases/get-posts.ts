'use client';

import { useQuery } from '@tanstack/react-query';
import { getContent, type Locale, type Post } from '@/content';

/* The blog reads through these two hooks ONLY. Swapping the dummy data for a
   real CMS/API later means changing the two fetchers below — nothing else. */

const SIMULATED_LATENCY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

async function fetchPosts(locale: Locale): Promise<Post[]> {
  const { posts } = getContent(locale);
  return delay([...posts].sort((a, b) => b.date.localeCompare(a.date)));
}

async function fetchPost(locale: Locale, slug: string): Promise<Post | null> {
  const { posts } = getContent(locale);
  return delay(posts.find((post) => post.slug === slug) ?? null);
}

export function usePosts(locale: Locale) {
  return useQuery({ queryKey: ['posts', locale], queryFn: () => fetchPosts(locale) });
}

export function usePost(locale: Locale, slug: string) {
  return useQuery({ queryKey: ['post', locale, slug], queryFn: () => fetchPost(locale, slug) });
}
