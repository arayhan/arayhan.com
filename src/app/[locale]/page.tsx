'use client';

import { ScrollProgress } from '@arayhan/prima-ui';
import { HeroSection } from '@/modules/hero/components/hero-section';
import { AboutSection } from '@/modules/about/components/about-section';

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
    </main>
  );
}
