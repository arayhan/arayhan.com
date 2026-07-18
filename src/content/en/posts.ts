import type { Post } from '../types';

/* Dummy posts — realistic shape, placeholder substance. Replaced by a real
   content source later; only the blog use-cases read this file. */
export const posts: Post[] = [
  {
    slug: 'design-systems-inline-styles',
    title: 'Why My Design System Uses Inline Styles (On Purpose)',
    excerpt:
      'CSS-in-JS is out, utility classes are everywhere — and Prima UI uses inline style objects reading CSS variables. Here is the reasoning.',
    date: '2026-06-12',
    tags: ['Design systems', 'React', 'CSS'],
    readingTimeMin: 7,
    body: 'When I rebuilt Prima UI, I made a choice that raises eyebrows: every component styles itself with inline style objects that read CSS custom properties. No CSS modules, no CSS-in-JS runtime, no utility classes inside the library.\n\nThe trade is deliberate. Inline styles win specificity against any consumer stylesheet, which means the design language cannot be accidentally overridden — but className still works for everything the component does not set: margins, grid placement, animation hooks.\n\nTokens live in CSS variables, so theming stays in CSS where it belongs, and the components stay portable across Tailwind and non-Tailwind hosts alike.\n\nThis post is placeholder content — the real article is coming soon.',
  },
  {
    slug: 'cutting-hosting-costs-71-percent',
    title: 'How We Cut Hosting Costs 71% Without Losing Sleep',
    excerpt:
      'From $84 to $24 a month at a pre-seed startup: Docker, CI/CD, and knowing which cloud does what best.',
    date: '2026-04-28',
    tags: ['DevOps', 'Docker', 'Startups'],
    readingTimeMin: 9,
    body: 'At a pre-seed startup, $60 a month is not a rounding error — it is runway. When I led frontend at Anify, we took monthly hosting from $84 to $24 by treating infrastructure as an engineering problem instead of a billing surprise.\n\nThe short version: containerize everything with Docker so workloads are portable, let CI/CD do deployments so nothing depends on a laptop, and place each workload on the cloud that prices it best — Vercel for the edge, Digital Ocean for steady compute, AWS for the pieces that genuinely need it.\n\nThis post is placeholder content — the real article is coming soon.',
  },
  {
    slug: 'rewriting-national-scale-frontend',
    title: 'Rewriting a National-Scale Frontend Without Stopping the Ship',
    excerpt:
      'SMILE tracks medicine distribution for health facilities across Indonesia. Rewriting it while it runs taught me more than any greenfield ever did.',
    date: '2026-02-15',
    tags: ['React', 'TypeScript', 'Architecture'],
    readingTimeMin: 11,
    body: 'A rewrite is easy when nobody is using the system. SMILE is used to track critical medicine distribution across Indonesian health facilities nationwide, which means the rewrite had to happen next to a live system that could not stop.\n\nThe legacy codebase had components over a thousand lines long. The new one is React with TypeScript and a feature-driven architecture built for a 40+ person team. The migration ran incrementally — module by module, with both systems alive at once.\n\nThis post is placeholder content — the real article is coming soon.',
  },
  {
    slug: 'community-is-a-career-multiplier',
    title: 'Community Work Is a Career Multiplier, Not a Side Quest',
    excerpt:
      'Six years of GDG Depok, a DSC lead year, and 10+ talks later: the compounding returns of showing up for your local dev community.',
    date: '2025-12-03',
    tags: ['Community', 'Career', 'Speaking'],
    readingTimeMin: 6,
    body: 'Every technical talk I have given started as a problem I could not stop thinking about at work. Every mentoring cohort sharpened how I explain architecture to my own team. Community work looks like giving time away; it is actually compounding interest on everything else you do.\n\nGDG Depok grew to 1,800+ members with 350–600 people showing up per event. None of that happened because of one person — but being in the room, consistently, for six years, changes what you get asked to do next.\n\nThis post is placeholder content — the real article is coming soon.',
  },
];
