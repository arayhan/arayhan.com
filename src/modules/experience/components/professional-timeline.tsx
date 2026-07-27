'use client';

import { useRef } from 'react';
import { Chip, TimelineItem } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { gsap, useGSAP } from '@/libs/gsap';
import { SectionShell } from '@/components/section-shell';
import { getContent, type ExperienceEntry, type Locale } from '@/content';
import { formatPeriod } from '../utils';
import { useMediaQuery } from '@/libs/use-media-query';

// Was 620 — a recruiter skimming fast shouldn't need 3000px of scroll to
// reach Freelance/Academic/Speaking. Shorter distance keeps the pinned-scrub
// craft moment without turning it into scan friction.
const SCROLL_PER_ENTRY = 380;

function PinnedTimeline({ entries, nowWord }: { entries: ExperienceEntry[]; nowWord: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const items = gsap.utils.toArray<HTMLElement>('[data-entry]', wrap);
      gsap.set(items.slice(1), { autoAlpha: 0, y: 48 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${entries.length * SCROLL_PER_ENTRY}`,
          pin: true,
          scrub: 0.6,
        },
      });

      items.forEach((item, i) => {
        if (i === 0) return;
        tl.to(items[i - 1], { autoAlpha: 0, y: -48, duration: 0.4, ease: 'power2.in' }, i)
          .fromTo(
            item,
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            i + 0.35,
          );
      });
      // Hold the last entry for a beat so the pin doesn't release mid-read.
      tl.to({}, { duration: 0.6 });

      gsap.to('[data-rail-fill]', {
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${entries.length * SCROLL_PER_ENTRY}`,
          scrub: true,
        },
      });
    },
    { scope: wrapRef, dependencies: [entries.length] },
  );

  return (
    <div
      ref={wrapRef}
      style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}
    >
      {/* progress rail */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: '15%',
          bottom: '15%',
          width: 2,
          background: 'var(--border)',
        }}
      >
        <div
          data-rail-fill
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--primary)',
            transform: 'scaleY(0)',
          }}
        />
      </div>

      <div style={{ position: 'relative', width: '100%', minHeight: 380 }}>
        {entries.map((entry, i) => (
          <article
            key={entry.id}
            data-entry
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              inset: i === 0 ? undefined : 0,
              display: 'grid',
              gridTemplateColumns: 'minmax(180px, 1fr) 2fr',
              gap: 'var(--space-7)',
              alignItems: 'start',
              paddingLeft: 'var(--space-6)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 'var(--weight-semibold)',
                  lineHeight: 1,
                  letterSpacing: 'var(--tracking-display)',
                }}
              >
                {formatPeriod(entry, nowWord)}
              </div>
              <div
                className="eyebrow"
                style={{ marginTop: 'var(--space-3)' }}
              >{`// ${String(i + 1).padStart(2, '0')} / ${String(entries.length).padStart(2, '0')}`}</div>
            </div>
            <div>
              <h3 style={{ textTransform: 'uppercase', fontFamily: 'var(--font-display)', margin: 0 }}>
                {entry.role}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-code)',
                  color: 'var(--text-secondary)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {entry.company} · {entry.location}
              </div>
              <ul
                style={{
                  margin: 'var(--space-4) 0 0',
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  color: 'var(--text-secondary)',
                }}
              >
                {entry.highlights.slice(0, 3).map((h) => (
                  <li key={h} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                  marginTop: 'var(--space-4)',
                }}
              >
                {entry.technologies.slice(0, 6).map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function StaticTimeline({ entries, nowWord }: { entries: ExperienceEntry[]; nowWord: string }) {
  return (
    <div>
      {entries.map((entry, i) => (
        <TimelineItem
          key={entry.id}
          period={formatPeriod(entry, nowWord).toUpperCase()}
          title={entry.role}
          org={entry.company}
          description={entry.highlights[0]}
          tags={entry.technologies.slice(0, 5)}
          last={i === entries.length - 1}
        />
      ))}
    </div>
  );
}

export function ProfessionalTimeline() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { experiences } = getContent(locale);
  const professional = experiences.filter((e) => e.type === 'professional');
  const nowWord = t('experience.now');
  const pinned = useMediaQuery('(min-width: 768px) and (prefers-reduced-motion: no-preference)');

  return (
    <SectionShell
      id="experience"
      number="04"
      eyebrow={t('sections.professional.eyebrow')}
      title={t('sections.professional.title')}
    >
      {pinned ? (
        <PinnedTimeline entries={professional} nowWord={nowWord} />
      ) : (
        <StaticTimeline entries={professional} nowWord={nowWord} />
      )}
    </SectionShell>
  );
}
