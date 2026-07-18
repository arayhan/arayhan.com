'use client';

import { ScrollProgress } from '@arayhan/prima-ui';
import { HeroSection } from '@/modules/hero/components/hero-section';
import { AboutSection } from '@/modules/about/components/about-section';
import { WorkSection } from '@/modules/work/components/work-section';

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <WorkSection />
    </main>
  );
}
