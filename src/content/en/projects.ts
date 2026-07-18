import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'smile-5',
    title: 'SMILE 5.0 Platform',
    client: 'Indonesia Ministry of Health · UNDP · UNICC',
    role: 'Frontend Developer',
    period: '2022 — now',
    summary:
      'National-scale healthcare logistics platform tracking critical medicine distribution across Indonesian health facilities nationwide.',
    highlights: [
      'Complete rewrite from an unmaintainable legacy JavaScript codebase (1000+ line components) to React and TypeScript.',
      'Scalable architecture serving a 40+ person engineering team.',
      'Used by Indonesia’s Ministry of Health, UNDP Indonesia, UNICC, and UNDP Global.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    sections: [
      {
        heading: 'The problem',
        body: 'SMILE 3.0 had grown into an unmaintainable JavaScript codebase — components over a thousand lines long, no types, and a development velocity that could not keep up with a national health program. The platform tracks critical medicine distribution for health facilities across the entire country, so a failed rewrite was not an option.',
      },
      {
        heading: 'The approach',
        body: 'I co-initiated the rewrite to SMILE 5.0: React with TypeScript, a scalable feature-driven architecture, and conventions designed so a 40+ person engineering team could work in parallel without stepping on each other. Migration ran incrementally alongside the live system.',
      },
      {
        heading: 'The impact',
        body: 'Code maintainability and development velocity improved significantly, and the platform now serves Indonesia’s Ministry of Health, UNDP Indonesia, UNICC, and UNDP Global — covering Indonesian health facilities nationwide.',
      },
    ],
  },
  {
    slug: 'anify',
    title: 'Anify Platform',
    client: 'Anify LLC — Honolulu, USA',
    role: 'Frontend Engineer Lead',
    period: '2025 — 2026',
    summary:
      'SaaS edtech platform where I led frontend architecture, built the design system, and cut hosting costs by 71%.',
    highlights: [
      'Led a team of 2 frontend engineers across US–Indonesia timezones.',
      'Reduced monthly hosting costs from $84 to $24 through Docker, CI/CD, and multi-cloud management.',
      'Company-wide Clean Architecture and DDD patterns; design system on Radix UI primitives.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Radix UI', 'Zustand', 'Docker', 'GitHub Actions'],
    sections: [
      {
        heading: 'The problem',
        body: 'An early-stage edtech startup needed frontend architecture that could outlive rapid pivots, a UI that stayed consistent as features shipped weekly, and infrastructure costs that respected a pre-seed runway.',
      },
      {
        heading: 'The approach',
        body: 'I designed company-wide Clean Architecture and Domain-Driven Design patterns and onboarded the engineering team onto them, built a comprehensive design system on Radix UI primitives, and containerized the stack with Docker across Vercel, AWS, and Digital Ocean with CI/CD on GitHub Actions.',
      },
      {
        heading: 'The impact',
        body: 'Monthly hosting costs dropped 71% — from $84 to $24 — directly extending runway. Sprint velocity and feature delivery speed improved on the new architecture, and I contributed to sprint planning, technical hiring, and product roadmap decisions with the CEO.',
      },
    ],
  },
  {
    slug: 'founderplus',
    title: 'Founderplus Accelerator',
    client: 'Founderplus — Depok, Indonesia',
    role: 'Solo Fullstack Developer',
    period: '2020 — 2024',
    summary:
      'Pre-seed accelerator platform — landing, admin dashboard, and startup registration — built and operated end to end by one developer.',
    highlights: [
      'Served 50+ startup applications with pitch deck management and investor materials.',
      'First DevOps infrastructure: server configuration, Docker, Nginx, production environments.',
      'Led the Skydu e-learning rewrite from React 14/15 to 16/17 with Tailwind CSS and Storybook.',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Docker', 'Nginx', 'PostgreSQL'],
    sections: [
      {
        heading: 'The problem',
        body: 'A pre-seed accelerator needed a complete platform — public landing, startup registration with pitch deck management, and an admin dashboard — with a team of exactly one developer.',
      },
      {
        heading: 'The approach',
        body: 'I architected and built the entire platform, then established the DevOps story from scratch: server configuration, Docker containerization, Nginx deployment, and production environment setup. Those foundations later carried directly into my infrastructure work at Anify.',
      },
      {
        heading: 'The impact',
        body: 'The platform served 50+ startup applications and built a comprehensive database of startup profiles and investment materials for the accelerator’s pre-seed program.',
      },
    ],
  },
  {
    slug: 'astra-sam',
    title: 'Astra SAM Advance',
    client: 'PT Astra International Tbk',
    role: 'React Native Developer',
    period: '2023',
    summary:
      'Nationwide mobile app for Astra’s sales teams — customer database, task tracking, and incentive programs on Android and iOS.',
    highlights: [
      'Single React Native codebase shipping to both Android and iOS.',
      'Customer database, task tracking, and incentive program management for a nationwide sales force.',
    ],
    technologies: ['React Native', 'TypeScript', 'REST API'],
    sections: [
      {
        heading: 'The problem',
        body: 'Astra International’s nationwide sales team needed one mobile tool for customer data, daily task tracking, and incentive programs — on both Android and iOS, without doubling the engineering effort.',
      },
      {
        heading: 'The approach',
        body: 'A single React Native codebase delivered through Badr Interactive, shaped around the field workflows of a distributed sales force.',
      },
      {
        heading: 'The impact',
        body: 'The app shipped to Astra’s sales teams nationwide, managing the customer database, task tracking, and incentive programs across both platforms.',
      },
    ],
  },
  {
    slug: 'unit-cost-rs',
    title: 'Unit Cost RS',
    client: 'Universitas Indonesia',
    role: 'Fullstack Developer',
    period: '2023',
    summary:
      'Hospital costing system built fullstack with Remix, Prisma, and MySQL in collaboration with Universitas Indonesia.',
    highlights: [
      'End-to-end delivery: data model, API, and UI in one Remix codebase.',
      'Costing workflows designed with academic partners at Universitas Indonesia.',
    ],
    technologies: ['Remix', 'Prisma', 'MySQL'],
    sections: [
      {
        heading: 'The problem',
        body: 'Hospitals need defensible unit-cost calculations for services, but the workflows lived in spreadsheets — slow, error-prone, and hard to audit.',
      },
      {
        heading: 'The approach',
        body: 'Working with Universitas Indonesia, I built the system fullstack in Remix: Prisma over MySQL for the data model, server-rendered forms for the costing workflows, one codebase end to end.',
      },
      {
        heading: 'The impact',
        body: 'A working hospital costing system delivered in collaboration with one of Indonesia’s leading universities, moving unit-cost analysis out of spreadsheets.',
      },
    ],
  },
];
