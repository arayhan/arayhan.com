'use client';

import { RevealOnScroll, SectionHeader } from '@arayhan/prima-ui';

interface SectionShellProps {
  /** Anchor id — navbar links target these. */
  id: string;
  eyebrow: string;
  /** Running number in the scroll narrative — "01" … "08". */
  number: string;
  title: string;
  /** Ink storytelling surface (Prima inverse). Used once per page. */
  ink?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Homepage section wrapper: consistent container, Prima section header with
 * the narrative running number, content revealed on scroll. The `ink` variant
 * renders its own header markup because Prima's SectionHeader inks its text
 * for light surfaces.
 */
export function SectionShell({ id, eyebrow, number, title, ink, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`${ink ? 'surface-ink ' : ''}${className ?? ''}`}
      style={{ padding: 'var(--section-gap) 0' }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--container-pad)',
        }}
      >
        <RevealOnScroll>
          {ink ? (
            <header>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: 'var(--border-width-rule) solid var(--on-inverse)',
                  paddingBottom: 'var(--space-3)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                <span className="eyebrow">{`// ${eyebrow}`}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-label)',
                    letterSpacing: 'var(--tracking-label)',
                    color: 'var(--inverse-muted)',
                  }}
                >
                  {number}
                </span>
              </div>
              <h2>{title}</h2>
            </header>
          ) : (
            <SectionHeader eyebrow={eyebrow} number={number} title={title} />
          )}
        </RevealOnScroll>
        <div style={{ marginTop: 'var(--space-7)' }}>{children}</div>
      </div>
    </section>
  );
}
