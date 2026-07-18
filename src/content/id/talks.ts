import type { Award, CommunityRole, Talk } from '../types';

/* Daftar talk representatif — 10+ dibawakan di GDG Depok dan acara mitra
   seputar Firebase, React, dan frontend. Judul akan dikonfirmasi pemilik situs. */
export const talks: Talk[] = [
  { title: 'Firebase untuk Frontend Engineer', event: 'GDG Depok DevFest', year: '2025', topic: 'Firebase' },
  { title: 'Menskalakan Codebase React dengan Clean Architecture', event: 'GDG Depok Meetup', year: '2025', topic: 'React' },
  { title: 'Design System yang Bertahan Melebihi Timnya', event: 'GDG Depok Meetup', year: '2024', topic: 'Design system' },
  { title: 'Dari Legacy ke TypeScript: Rewrite di Produksi', event: 'GDG Depok DevFest', year: '2024', topic: 'TypeScript' },
  { title: 'Kupas Tuntas Firebase Authentication', event: 'Cloud Study Jam', year: '2023', topic: 'Firebase' },
  { title: 'State Management React di 2023', event: 'GDG Depok Meetup', year: '2023', topic: 'React' },
  { title: 'Jalur Karier Frontend di Indonesia', event: 'Generasi Gigih', year: '2023', topic: 'Karier' },
  { title: 'Membangun Aplikasi Realtime dengan Firebase', event: 'GDSC Workshop', year: '2021', topic: 'Firebase' },
  { title: 'Codelab Dasar-Dasar React', event: 'GDSC Workshop', year: '2020', topic: 'React' },
  { title: 'UI Engineering: Dari Mockup ke Komponen', event: 'GDSC Workshop', year: '2020', topic: 'Frontend' },
];

export const awards: Award[] = [
  { title: 'Juara 1, Kompetisi Web Design (React.js)', issuer: 'STT Nurul Fikri', year: '2018' },
  { title: 'Juara 3, Kompetisi Informatika Nasional', issuer: 'RISTEKDIKTI / PENS', year: '2018' },
  { title: 'Top 10 Aplikasi, Indosat Wireless Innovation Contest', issuer: 'IWIC', year: '2017' },
];

export const communityRoles: CommunityRole[] = [
  {
    organization: 'Google Developer Groups Depok',
    role: 'Organizer (2025 — sekarang) · Co-Organizer (2019 — 2025)',
    period: '2019 — sekarang',
    highlights: [
      'Memimpin komunitas 1.800+ anggota dengan 350–600 peserta per acara.',
      'Menyelenggarakan workshop teknis, konferensi, dan sesi berbagi seputar teknologi Google dan web modern.',
      'Menjaga relasi langsung dengan Google Community Manager.',
    ],
  },
  {
    organization: 'Google Developer Student Clubs',
    role: 'Lead',
    period: '2020 — 2021',
    highlights: [
      'Terpilih sebagai satu dari 45 DSC Lead di Indonesia oleh Google Developers.',
      'Memimpin komunitas teknologi kampus dengan 300+ anggota aktif; keanggotaan tumbuh 50%.',
      'Menyelenggarakan 8+ workshop frontend, Firebase, UI/UX, dan Cloud Study Jam.',
    ],
  },
];
