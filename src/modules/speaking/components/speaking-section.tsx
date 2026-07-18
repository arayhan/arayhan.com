'use client';

import { Marquee, RevealOnScroll, StatStrip } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type Locale } from '@/content';

export function SpeakingSection() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { talks, awards, communityRoles } = getContent(locale);

  const topics = Array.from(new Set(talks.map((talk) => talk.topic)));

  return (
    <SectionShell
      id="speaking"
      number="06"
      ink
      eyebrow={t('sections.speaking.eyebrow')}
      title={t('sections.speaking.title')}
    >
      {/* community roles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {communityRoles.map((role, i) => (
          <RevealOnScroll key={role.organization} delay={i * 100}>
            <div
              style={{
                border: 'var(--border-width) solid var(--inverse-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                height: '100%',
              }}
            >
              <span className="eyebrow">{`// ${role.period.toUpperCase()}`}</span>
              <h3 style={{ margin: 'var(--space-3) 0 0', textTransform: 'uppercase' }}>
                {role.organization}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-code)',
                  color: 'var(--inverse-muted)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {role.role}
              </div>
              <ul
                style={{
                  margin: 'var(--space-4) 0 0',
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  color: 'var(--inverse-muted)',
                }}
              >
                {role.highlights.map((h) => (
                  <li key={h} style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* stats */}
      <div style={{ marginTop: 'var(--space-7)' }}>
        <RevealOnScroll>
          <StatStrip
            inverse
            stats={[
              { value: '1800+', label: t('speaking.membersLabel') },
              { value: '600', label: t('speaking.perEventLabel') },
              { value: '10+', label: t('speaking.talksLabel') },
            ]}
          />
        </RevealOnScroll>
      </div>

      {/* topic marquee */}
      <div style={{ margin: 'var(--space-7) calc(-1 * var(--container-pad)) 0' }}>
        <Marquee inverse items={topics} separator="//" />
      </div>

      {/* talks + awards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-7)',
          marginTop: 'var(--space-7)',
        }}
      >
        <RevealOnScroll>
          <div>
            <h3 style={{ margin: 0 }}>{t('speaking.talksTitle')}</h3>
            <div style={{ marginTop: 'var(--space-4)' }}>
              {talks.map((talk) => (
                <div
                  key={talk.title}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-4)',
                    alignItems: 'baseline',
                    padding: 'var(--space-3) 0',
                    borderBottom: 'var(--border-width) solid var(--inverse-border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-label)',
                      color: 'var(--inverse-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {talk.year}
                  </span>
                  <span style={{ flex: 1 }}>{talk.title}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-label)',
                      letterSpacing: 'var(--tracking-label)',
                      textTransform: 'uppercase',
                      color: 'var(--inverse-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {talk.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={120}>
          <div>
            <h3 style={{ margin: 0 }}>{t('speaking.awardsTitle')}</h3>
            <div style={{ marginTop: 'var(--space-4)' }}>
              {awards.map((award) => (
                <div
                  key={award.title}
                  style={{
                    padding: 'var(--space-3) 0',
                    borderBottom: 'var(--border-width) solid var(--inverse-border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-label)',
                      color: 'var(--primary)',
                    }}
                  >
                    {award.year}
                  </span>
                  <div style={{ marginTop: 'var(--space-1)' }}>{award.title}</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-label)',
                      color: 'var(--inverse-muted)',
                      marginTop: 'var(--space-1)',
                    }}
                  >
                    {award.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}
