import type { Award, CommunityRole, Talk } from '../types';

/* Representative talks — 10+ delivered at GDG Depok and partner events on
   Firebase, React, and frontend topics. Titles to be confirmed against the
   real talk archive by the site owner. */
export const talks: Talk[] = [
  { title: 'Firebase for Frontend Engineers', event: 'GDG Depok DevFest', year: '2025', topic: 'Firebase' },
  { title: 'Scaling React Codebases with Clean Architecture', event: 'GDG Depok Meetup', year: '2025', topic: 'React' },
  { title: 'Design Systems That Survive the Team', event: 'GDG Depok Meetup', year: '2024', topic: 'Design systems' },
  { title: 'From Legacy to TypeScript: Rewriting in Production', event: 'GDG Depok DevFest', year: '2024', topic: 'TypeScript' },
  { title: 'Firebase Authentication Deep Dive', event: 'Cloud Study Jam', year: '2023', topic: 'Firebase' },
  { title: 'React State Management in 2023', event: 'GDG Depok Meetup', year: '2023', topic: 'React' },
  { title: 'Frontend Career Paths in Indonesia', event: 'Generasi Gigih', year: '2023', topic: 'Career' },
  { title: 'Building Realtime Apps with Firebase', event: 'GDSC Workshop', year: '2021', topic: 'Firebase' },
  { title: 'React Fundamentals Codelab', event: 'GDSC Workshop', year: '2020', topic: 'React' },
  { title: 'UI Engineering: From Mockup to Component', event: 'GDSC Workshop', year: '2020', topic: 'Frontend' },
];

export const awards: Award[] = [
  { title: '1st Place, Web Design Competition (React.js)', issuer: 'STT Nurul Fikri', year: '2018' },
  { title: '3rd Place, National Informatics Competition', issuer: 'RISTEKDIKTI / PENS', year: '2018' },
  { title: 'Top 10 Applications, Indosat Wireless Innovation Contest', issuer: 'IWIC', year: '2017' },
];

export const communityRoles: CommunityRole[] = [
  {
    organization: 'Google Developer Groups Depok',
    role: 'Organizer (2025 — now) · Co-Organizer (2019 — 2025)',
    period: '2019 — now',
    highlights: [
      'Leading a community of 1,800+ members with 350–600 participants per event.',
      'Organizing technical workshops, conferences, and knowledge-sharing sessions on Google technologies and modern web development.',
      'Maintaining direct relationships with Google Community Managers.',
    ],
  },
  {
    organization: 'Google Developer Student Clubs',
    role: 'Lead',
    period: '2020 — 2021',
    highlights: [
      'Selected as one of 45 DSC Leads in Indonesia by Google Developers.',
      'Led a campus tech community of 300+ active members; membership grew 50%.',
      'Organized 8+ workshops on frontend development, Firebase, UI/UX, and Cloud Study Jams.',
    ],
  },
];
