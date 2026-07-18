'use client';

import { Button, Chip, SectionHeader } from '@arayhan/prima-ui';

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-8) var(--space-5)' }}>
      <SectionHeader number="01" title="Prima smoke test" />
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
        <Chip>React</Chip>
        <Chip>Next.js</Chip>
        <Chip>TypeScript</Chip>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
        <Button>Primary action</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </main>
  );
}
