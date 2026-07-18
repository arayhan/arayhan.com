import type { Product } from '../types';

/* Digital products built and owned by Rayhan. Prima UI is the flagship;
   the placeholder entries are swapped for real products as they ship. */
export const products: Product[] = [
  {
    id: 'prima-ui',
    name: 'Prima UI',
    kind: 'Design system',
    description:
      'My personal design system — engineered minimalism: an ice-blue base, exactly one electric cobalt accent, Clash Display caps, and mono // labels. 59 React components with inline-style tokens, a Tailwind v4 bridge, and Storybook docs. This site is built with it.',
    status: 'live',
    technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    link: 'https://github.com/arayhan',
  },
  {
    id: 'product-slot-1',
    name: 'Next product',
    kind: 'Coming soon',
    description: 'The next digital product is in the workshop. Details land here when it ships.',
    status: 'building',
    technologies: [],
  },
  {
    id: 'product-slot-2',
    name: 'And another',
    kind: 'Planned',
    description: 'Reserved for what comes after that. Watch this space.',
    status: 'planned',
    technologies: [],
  },
];
