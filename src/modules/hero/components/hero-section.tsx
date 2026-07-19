'use client';

import { useEffect, useRef, useState } from 'react';
import { MagneticButton, TextScramble } from '@arayhan/prima-ui';
import { useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/libs/gsap';
import { IsometricScene } from './isometric-scene';

const ROLE_CYCLE_MS = 3400;

export function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const roles = t('roles').split('|');
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, ROLE_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [roles.length]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entrance: eyebrow, headline lines, intro, CTAs stagger up once.
        gsap.from('[data-hero-reveal]', {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
          delay: 0.15,
        });
        // Scroll cue line breathes.
        gsap.to('[data-cue-line]', {
          scaleY: 0.25,
          transformOrigin: 'top',
          duration: 1.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: sectionRef },
  );

  const scrollTo = (id: string) => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: 'calc(100svh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: 'var(--space-8) var(--container-pad)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          alignItems: 'center',
          gap: 'var(--space-7)',
          width: '100%',
        }}
      >
        <div>
          <p className="eyebrow" data-hero-reveal style={{ margin: 0 }}>
            {`// ${t('eyebrow')}`}
          </p>
          <h1
            data-hero-reveal
            style={{
              fontSize: 'clamp(44px, 7vw, 84px)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: 'var(--tracking-display)',
              margin: 'var(--space-4) 0 0',
            }}
          >
            {t('headlineTop')}
            <br />
            {t('headlineBottom')}
          </h1>
          <div
            data-hero-reveal
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-h3)',
              color: 'var(--primary)',
              margin: 'var(--space-5) 0 0',
              minHeight: '1.6em',
            }}
          >
            <TextScramble key={roleIndex} text={roles[roleIndex]} duration={700} />
          </div>
          <p
            data-hero-reveal
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-body-lg)',
              lineHeight: 'var(--leading-body-lg)',
              maxWidth: '46ch',
              margin: 'var(--space-5) 0 0',
            }}
          >
            {t('intro')}
          </p>
          <div
            data-hero-reveal
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}
          >
            <MagneticButton onClick={() => scrollTo('work')}>{t('ctaWork')}</MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollTo('contact')}>
              {t('ctaContact')}
            </MagneticButton>
          </div>
        </div>

        <div data-hero-reveal style={{ display: 'flex', justifyContent: 'center' }}>
          <IsometricScene />
        </div>
      </div>

      <div
        ref={cueRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'var(--space-5)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)',
            color: 'var(--text-secondary)',
          }}
        >
          {t('scroll')}
        </span>
        <span data-cue-line style={{ width: 2, height: 40, background: 'var(--primary)', display: 'block' }} />
      </div>
    </section>
  );
}
