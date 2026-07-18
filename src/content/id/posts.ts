import type { Post } from '../types';

/* Post dummy — bentuknya realistis, isinya placeholder. Akan diganti sumber
   konten sungguhan; hanya use-case blog yang membaca file ini. */
export const posts: Post[] = [
  {
    slug: 'design-systems-inline-styles',
    title: 'Kenapa Design System Saya Pakai Inline Style (Dengan Sengaja)',
    excerpt:
      'CSS-in-JS mulai ditinggalkan, utility class ada di mana-mana — dan Prima UI justru memakai inline style yang membaca CSS variable. Ini alasannya.',
    date: '2026-06-12',
    tags: ['Design system', 'React', 'CSS'],
    readingTimeMin: 7,
    body: 'Saat membangun ulang Prima UI, saya mengambil keputusan yang bikin orang mengangkat alis: setiap komponen menata dirinya dengan inline style object yang membaca CSS custom property. Tanpa CSS module, tanpa runtime CSS-in-JS, tanpa utility class di dalam library.\n\nTrade-off-nya disengaja. Inline style menang specificity melawan stylesheet konsumen mana pun, artinya bahasa desain tidak bisa tertimpa secara tidak sengaja — tetapi className tetap bekerja untuk semua hal yang tidak diatur komponen: margin, penempatan grid, hook animasi.\n\nToken hidup di CSS variable, jadi theming tetap di CSS tempat seharusnya, dan komponen tetap portabel di host Tailwind maupun non-Tailwind.\n\nTulisan ini masih konten placeholder — artikel aslinya segera hadir.',
  },
  {
    slug: 'cutting-hosting-costs-71-percent',
    title: 'Cara Kami Memangkas Biaya Hosting 71% Tanpa Kehilangan Tidur',
    excerpt:
      'Dari $84 ke $24 per bulan di startup pre-seed: Docker, CI/CD, dan tahu cloud mana yang paling jago untuk apa.',
    date: '2026-04-28',
    tags: ['DevOps', 'Docker', 'Startup'],
    readingTimeMin: 9,
    body: 'Di startup pre-seed, $60 per bulan bukan angka pembulatan — itu runway. Saat memimpin frontend di Anify, kami menurunkan hosting bulanan dari $84 ke $24 dengan memperlakukan infrastruktur sebagai persoalan engineering, bukan kejutan tagihan.\n\nVersi pendeknya: containerize semuanya dengan Docker supaya workload portabel, serahkan deployment ke CI/CD supaya tidak ada yang bergantung pada laptop siapa pun, dan tempatkan tiap workload di cloud yang menghargainya paling masuk akal — Vercel untuk edge, Digital Ocean untuk compute stabil, AWS untuk bagian yang benar-benar membutuhkannya.\n\nTulisan ini masih konten placeholder — artikel aslinya segera hadir.',
  },
  {
    slug: 'rewriting-national-scale-frontend',
    title: 'Menulis Ulang Frontend Skala Nasional Tanpa Menghentikan Kapal',
    excerpt:
      'SMILE melacak distribusi obat untuk fasilitas kesehatan se-Indonesia. Menulis ulang sambil sistemnya tetap berjalan mengajarkan lebih banyak daripada proyek greenfield mana pun.',
    date: '2026-02-15',
    tags: ['React', 'TypeScript', 'Arsitektur'],
    readingTimeMin: 11,
    body: 'Rewrite itu mudah kalau tidak ada yang memakai sistemnya. SMILE dipakai untuk melacak distribusi obat kritis di fasilitas kesehatan seluruh Indonesia, artinya penulisan ulang harus terjadi berdampingan dengan sistem hidup yang tidak boleh berhenti.\n\nCodebase legacy punya komponen lebih dari seribu baris. Yang baru memakai React dengan TypeScript dan arsitektur feature-driven untuk tim 40+ orang. Migrasi berjalan bertahap — modul demi modul, dengan kedua sistem hidup bersamaan.\n\nTulisan ini masih konten placeholder — artikel aslinya segera hadir.',
  },
  {
    slug: 'community-is-a-career-multiplier',
    title: 'Kerja Komunitas Itu Pengganda Karier, Bukan Side Quest',
    excerpt:
      'Enam tahun GDG Depok, setahun jadi DSC Lead, dan 10+ talk kemudian: imbal hasil majemuk dari hadir untuk komunitas developer lokalmu.',
    date: '2025-12-03',
    tags: ['Komunitas', 'Karier', 'Speaking'],
    readingTimeMin: 6,
    body: 'Setiap talk teknis yang saya bawakan berawal dari masalah kerjaan yang tidak bisa berhenti saya pikirkan. Setiap cohort mentoring mempertajam cara saya menjelaskan arsitektur ke tim sendiri. Kerja komunitas kelihatannya memberi waktu cuma-cuma; kenyataannya ia bunga majemuk atas semua hal lain yang kamu kerjakan.\n\nGDG Depok tumbuh menjadi 1.800+ anggota dengan 350–600 orang hadir per acara. Semua itu bukan karya satu orang — tetapi berada di ruangan itu, konsisten, selama enam tahun, mengubah apa yang kamu diminta lakukan berikutnya.\n\nTulisan ini masih konten placeholder — artikel aslinya segera hadir.',
  },
];
