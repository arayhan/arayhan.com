'use client';

import { ScrollProgress } from '@arayhan/prima-ui';
import { HeroSection } from '@/modules/hero/components/hero-section';

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
    </main>
  );
}
