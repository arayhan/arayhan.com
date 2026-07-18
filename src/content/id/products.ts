import type { Product } from '../types';

/* Produk digital yang dibangun dan dimiliki Rayhan. Prima UI adalah produk
   utama; entri placeholder diganti produk sungguhan begitu rilis. */
export const products: Product[] = [
  {
    id: 'prima-ui',
    name: 'Prima UI',
    kind: 'Design system',
    description:
      'Design system pribadi saya — engineered minimalism: dasar ice-blue, tepat satu aksen electric cobalt, kapital Clash Display, dan label mono //. 59 komponen React dengan token inline-style, bridge Tailwind v4, dan dokumentasi Storybook. Situs ini dibangun dengannya.',
    status: 'live',
    technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    link: 'https://github.com/arayhan',
  },
  {
    id: 'product-slot-1',
    name: 'Produk berikutnya',
    kind: 'Segera hadir',
    description: 'Produk digital berikutnya sedang di bengkel. Detailnya mendarat di sini begitu rilis.',
    status: 'building',
    technologies: [],
  },
  {
    id: 'product-slot-2',
    name: 'Dan satu lagi',
    kind: 'Direncanakan',
    description: 'Disiapkan untuk yang datang setelahnya. Pantau terus.',
    status: 'planned',
    technologies: [],
  },
];
