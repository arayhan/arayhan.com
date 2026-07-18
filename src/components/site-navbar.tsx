'use client';

import { useState } from 'react';
import { Button, TextScramble } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { TransitionLink, useTransitionRouter } from '@/components/page-transition';
import { FlagIcon } from '@/components/flag-icon';
import { useMediaQuery } from '@/libs/use-media-query';
import { getContent, type Locale } from '@/content';

const SECTION_ANCHORS = [
  { key: 'about', id: 'about' },
  { key: 'work', id: 'work' },
  { key: 'products', id: 'products' },
  { key: 'experience', id: 'experience' },
  { key: 'speaking', id: 'speaking' },
  { key: 'contact', id: 'contact' },
] as const;

/** Mono caps label that scrambles on hover — the navbar's micro-interaction. */
function ScrambleLabel({ text }: { text: string }) {
  return <TextScramble text={text} onHover duration={500} style={{ letterSpacing: 'var(--tracking-label)' }} />;
}

export function SiteNavbar() {
  const t = useTranslations('nav');
  const tSwitcher = useTranslations('localeSwitcher');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = useTransitionRouter();
  const { profile } = getContent(locale);
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery('(max-width: 767px)');

  const otherLocale: Locale = locale === 'en' ? 'id' : 'en';

  const goToSection = (id: string) => {
    setOpen(false);
    if (pathname === '/') {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    } else {
      navigate(`/#${id}`, id);
    }
  };

  const links = (
    <>
      {SECTION_ANCHORS.map(({ key, id }) => (
        <a
          key={id}
          href={`#${id}`}
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            goToSection(id);
          }}
        >
          <ScrambleLabel text={t(key)} />
        </a>
      ))}
      <TransitionLink
        href="/blog"
        transitionLabel="blog"
        className="nav-link"
        onClick={() => setOpen(false)}
      >
        <ScrambleLabel text={t('blog')} />
      </TransitionLink>
      <button
        type="button"
        className="nav-link"
        aria-label={`${tSwitcher('label')}: ${otherLocale.toUpperCase()}`}
        onClick={() => {
          setOpen(false);
          router.replace(pathname, { locale: otherLocale });
        }}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
      >
        <FlagIcon locale={otherLocale} />
        {otherLocale.toUpperCase()}
      </button>
      <Button href={profile.cvPath}>{t('downloadCv')}</Button>
    </>
  );

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 80,
        background: 'var(--surface)',
        borderBottom: 'var(--border-width-rule) solid var(--border-strong)',
        padding: 'var(--space-4) max(var(--container-pad), calc((100% - var(--container-max)) / 2))',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-5)',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          goToSection('hero');
        }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-h3)',
          fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-heading)',
          textTransform: 'uppercase',
          color: 'var(--on-surface)',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        RAYHAN.DEV
      </a>

      {mobile ? (
        <>
          <button
            type="button"
            className="nav-link"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              width: 38,
              height: 38,
              border: 'var(--border-width) solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className={open ? 'ph ph-x' : 'ph ph-list'} aria-hidden="true" style={{ fontSize: 18 }} />
          </button>
          {open && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--space-5)',
                paddingTop: 'var(--space-4)',
              }}
            >
              {links}
            </div>
          )}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {links}
        </div>
      )}
    </nav>
  );
}
