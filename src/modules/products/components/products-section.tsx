'use client';

import { Card, Chip, MagicBorder, RevealOnScroll } from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type Locale, type Product } from '@/content';

function StatusEyebrow({ status }: { status: Product['status'] }) {
  const t = useTranslations('products');
  const label =
    status === 'live' ? t('statusLive') : status === 'building' ? t('statusBuilding') : t('statusPlanned');
  return (
    <span
      className="eyebrow"
      style={status === 'live' ? undefined : { color: 'var(--text-secondary)' }}
    >{`// ${label}`}</span>
  );
}

function ProductBody({ product }: { product: Product }) {
  const t = useTranslations('products');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', height: '100%' }}>
      <StatusEyebrow status={product.status} />
      <h3 style={{ margin: 0, textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
        {product.name}
      </h3>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-label)',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
        }}
      >
        {product.kind}
      </div>
      <p style={{ color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{product.description}</p>
      {product.technologies.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {product.technologies.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      )}
      {product.link && (
        <a
          href={product.link}
          target="_blank"
          rel="noreferrer"
          className="eyebrow"
          style={{ width: 'fit-content' }}
        >
          {t('visit')} <i className="ph ph-arrow-up-right" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function ProductsSection() {
  const t = useTranslations('sections.products');
  const locale = useLocale() as Locale;
  const { products } = getContent(locale);
  const [flagship, ...rest] = products;

  return (
    <SectionShell id="products" number="03" eyebrow={t('eyebrow')} title={t('title')}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'var(--space-6)',
          alignItems: 'stretch',
        }}
      >
        <RevealOnScroll style={{ gridColumn: '1 / -1' }}>
          <MagicBorder>
            <div style={{ padding: 'var(--space-6)' }}>
              <ProductBody product={flagship} />
            </div>
          </MagicBorder>
        </RevealOnScroll>
        {rest.map((product, i) => (
          <RevealOnScroll key={product.id} delay={(i + 1) * 90}>
            <Card style={{ height: '100%' }}>
              <ProductBody product={product} />
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </SectionShell>
  );
}
