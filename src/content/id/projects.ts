import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'smile-5',
    title: 'Platform SMILE 5.0',
    client: 'Kementerian Kesehatan RI · UNDP · UNICC',
    role: 'Frontend Developer',
    period: '2022 — sekarang',
    summary:
      'Platform logistik kesehatan berskala nasional yang melacak distribusi obat kritis di fasilitas kesehatan seluruh Indonesia.',
    highlights: [
      'Penulisan ulang penuh dari codebase JavaScript legacy yang sulit dirawat (komponen 1000+ baris) ke React dan TypeScript.',
      'Arsitektur scalable yang melayani tim engineering 40+ orang.',
      'Digunakan Kementerian Kesehatan RI, UNDP Indonesia, UNICC, dan UNDP Global.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
    sections: [
      {
        heading: 'Masalahnya',
        body: 'SMILE 3.0 tumbuh menjadi codebase JavaScript yang tidak terawat — komponen lebih dari seribu baris, tanpa type, dan kecepatan pengembangan yang tidak sanggup mengejar kebutuhan program kesehatan nasional. Platform ini melacak distribusi obat kritis untuk fasilitas kesehatan di seluruh negeri, jadi rewrite yang gagal bukan pilihan.',
      },
      {
        heading: 'Pendekatannya',
        body: 'Saya ikut menginisiasi penulisan ulang ke SMILE 5.0: React dengan TypeScript, arsitektur feature-driven yang scalable, dan konvensi yang dirancang agar tim engineering 40+ orang bisa bekerja paralel tanpa saling bertabrakan. Migrasi berjalan bertahap berdampingan dengan sistem yang tetap hidup.',
      },
      {
        heading: 'Dampaknya',
        body: 'Maintainability kode dan kecepatan pengembangan meningkat signifikan, dan platform kini melayani Kementerian Kesehatan RI, UNDP Indonesia, UNICC, dan UNDP Global — mencakup fasilitas kesehatan di seluruh Indonesia.',
      },
    ],
  },
  {
    slug: 'anify',
    title: 'Platform Anify',
    client: 'Anify LLC — Honolulu, AS',
    role: 'Frontend Engineer Lead',
    period: '2025 — 2026',
    summary:
      'Platform SaaS edtech tempat saya memimpin arsitektur frontend, membangun design system, dan memangkas biaya hosting 71%.',
    highlights: [
      'Memimpin tim 2 frontend engineer lintas zona waktu AS–Indonesia.',
      'Menurunkan biaya hosting bulanan dari $84 ke $24 lewat Docker, CI/CD, dan manajemen multi-cloud.',
      'Pola Clean Architecture dan DDD untuk seluruh perusahaan; design system di atas primitive Radix UI.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Radix UI', 'Zustand', 'Docker', 'GitHub Actions'],
    sections: [
      {
        heading: 'Masalahnya',
        body: 'Startup edtech tahap awal butuh arsitektur frontend yang tahan terhadap pivot cepat, UI yang tetap konsisten saat fitur rilis tiap minggu, dan biaya infrastruktur yang menghormati runway pre-seed.',
      },
      {
        heading: 'Pendekatannya',
        body: 'Saya merancang pola Clean Architecture dan Domain-Driven Design untuk seluruh perusahaan dan meng-onboard tim engineering ke pola tersebut, membangun design system komprehensif di atas primitive Radix UI, serta meng-containerize stack dengan Docker di Vercel, AWS, dan Digital Ocean dengan CI/CD GitHub Actions.',
      },
      {
        heading: 'Dampaknya',
        body: 'Biaya hosting bulanan turun 71% — dari $84 ke $24 — langsung memperpanjang runway. Kecepatan sprint dan pengiriman fitur meningkat di atas arsitektur baru, dan saya ikut berkontribusi dalam sprint planning, technical hiring, serta keputusan product roadmap bersama CEO.',
      },
    ],
  },
  {
    slug: 'founderplus',
    title: 'Akselerator Founderplus',
    client: 'Founderplus — Depok, Indonesia',
    role: 'Fullstack Developer Tunggal',
    period: '2020 — 2024',
    summary:
      'Platform akselerator pre-seed — landing, dashboard admin, dan registrasi startup — dibangun dan dioperasikan end-to-end oleh satu developer.',
    highlights: [
      'Melayani 50+ pendaftaran startup dengan manajemen pitch deck dan materi investor.',
      'Infrastruktur DevOps pertama: konfigurasi server, Docker, Nginx, environment produksi.',
      'Memimpin rewrite e-learning Skydu dari React 14/15 ke 16/17 dengan Tailwind CSS dan Storybook.',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Docker', 'Nginx', 'PostgreSQL'],
    sections: [
      {
        heading: 'Masalahnya',
        body: 'Sebuah akselerator pre-seed membutuhkan platform lengkap — landing publik, registrasi startup dengan manajemen pitch deck, dan dashboard admin — dengan tim beranggotakan tepat satu developer.',
      },
      {
        heading: 'Pendekatannya',
        body: 'Saya merancang dan membangun seluruh platform, lalu membangun cerita DevOps-nya dari nol: konfigurasi server, containerization Docker, deployment Nginx, dan setup environment produksi. Fondasi itu kelak terpakai langsung di pekerjaan infrastruktur saya di Anify.',
      },
      {
        heading: 'Dampaknya',
        body: 'Platform melayani 50+ pendaftaran startup dan membangun database komprehensif profil startup serta materi investasi untuk program pre-seed akselerator.',
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
      'Aplikasi mobile nasional untuk tim sales Astra — database pelanggan, pelacakan tugas, dan program insentif di Android dan iOS.',
    highlights: [
      'Satu codebase React Native untuk Android dan iOS sekaligus.',
      'Database pelanggan, pelacakan tugas, dan manajemen program insentif untuk tim sales nasional.',
    ],
    technologies: ['React Native', 'TypeScript', 'REST API'],
    sections: [
      {
        heading: 'Masalahnya',
        body: 'Tim sales nasional Astra International membutuhkan satu alat mobile untuk data pelanggan, pelacakan tugas harian, dan program insentif — di Android sekaligus iOS, tanpa menggandakan usaha engineering.',
      },
      {
        heading: 'Pendekatannya',
        body: 'Satu codebase React Native yang dikirim melalui Badr Interactive, dibentuk mengikuti alur kerja lapangan tim sales yang tersebar.',
      },
      {
        heading: 'Dampaknya',
        body: 'Aplikasi dirilis ke tim sales Astra secara nasional, mengelola database pelanggan, pelacakan tugas, dan program insentif di kedua platform.',
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
      'Sistem penghitungan biaya rumah sakit yang dibangun fullstack dengan Remix, Prisma, dan MySQL bersama Universitas Indonesia.',
    highlights: [
      'Pengerjaan end-to-end: data model, API, dan UI dalam satu codebase Remix.',
      'Alur kerja costing dirancang bersama mitra akademik di Universitas Indonesia.',
    ],
    technologies: ['Remix', 'Prisma', 'MySQL'],
    sections: [
      {
        heading: 'Masalahnya',
        body: 'Rumah sakit membutuhkan perhitungan unit cost layanan yang dapat dipertanggungjawabkan, tetapi alur kerjanya hidup di spreadsheet — lambat, rawan salah, dan sulit diaudit.',
      },
      {
        heading: 'Pendekatannya',
        body: 'Bekerja sama dengan Universitas Indonesia, saya membangun sistem ini fullstack di Remix: Prisma di atas MySQL untuk data model, form server-rendered untuk alur kerja costing, satu codebase end-to-end.',
      },
      {
        heading: 'Dampaknya',
        body: 'Sistem costing rumah sakit yang berfungsi, dikerjakan bersama salah satu universitas terkemuka Indonesia, memindahkan analisis unit cost keluar dari spreadsheet.',
      },
    ],
  },
];
