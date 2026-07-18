'use client';

import { ScrollProgress } from '@arayhan/prima-ui';
import { HeroSection } from '@/modules/hero/components/hero-section';
import { AboutSection } from '@/modules/about/components/about-section';
import { WorkSection } from '@/modules/work/components/work-section';
import { ProductsSection } from '@/modules/products/components/products-section';
import { ProfessionalTimeline } from '@/modules/experience/components/professional-timeline';
import { FreelanceGrid } from '@/modules/experience/components/freelance-grid';
import { AcademicSection } from '@/modules/experience/components/academic-section';
import { SpeakingSection } from '@/modules/speaking/components/speaking-section';
import { BlogTeaser } from '@/modules/blog/components/blog-teaser';
import { ContactSection } from '@/modules/contact/components/contact-section';

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ProductsSection />
      <ProfessionalTimeline />
      <FreelanceGrid />
      <AcademicSection />
      <SpeakingSection />
      <BlogTeaser />
      <ContactSection />
    </main>
  );
}
