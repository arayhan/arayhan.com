'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Input,
  MagneticButton,
  SocialLinks,
  Spotlight,
  Textarea,
  useToast,
} from '@arayhan/prima-ui';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/components/section-shell';
import { getContent, type Locale } from '@/content';
import { contactSchema, type ContactInput } from '../schema';

type SendState = 'idle' | 'sending' | 'error';

export function ContactSection() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { profile } = getContent(locale);
  const { toast } = useToast();

  const [configured, setConfigured] = useState<boolean | null>(null);
  const [sendState, setSendState] = useState<SendState>('idle');

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data: { configured: boolean }) => setConfigured(data.configured))
      .catch(() => setConfigured(false));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setSendState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSendState('idle');
      reset();
      toast({ title: t('contact.success'), variant: 'success' });
    } catch {
      setSendState('error');
    }
  });

  return (
    <SectionShell
      id="contact"
      number="09"
      eyebrow={t('sections.contact.eyebrow')}
      title={t('sections.contact.title')}
    >
      {/* Spotlight IS the card — no nested second card. */}
      <Spotlight style={{ padding: 'clamp(var(--space-5), 4vw, var(--space-7))' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(var(--space-5), 4vw, var(--space-7))',
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>{t('contact.heading')}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-4) 0 0' }}>
              {t('contact.body')}
            </p>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <SocialLinks
                links={profile.socials.map((s) => ({ name: s.name, label: s.name, href: s.url }))}
              />
            </div>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <MagneticButton variant="secondary" href={profile.cvPath}>
                {t('nav.downloadCv')}
              </MagneticButton>
            </div>
          </div>

          {configured === false ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <span className="eyebrow">{`// ${profile.email}`}</span>
              <MagneticButton href={`mailto:${profile.email}`}>{t('contact.mailtoCta')}</MagneticButton>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Input
                label={t('contact.name')}
                placeholder={t('contact.namePlaceholder')}
                error={errors.name && t('contact.validation.nameRequired')}
                {...register('name')}
              />
              <Input
                label={t('contact.email')}
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                error={errors.email && t('contact.validation.emailInvalid')}
                {...register('email')}
              />
              <Textarea
                label={t('contact.message')}
                placeholder={t('contact.messagePlaceholder')}
                error={errors.message && t('contact.validation.messageTooShort')}
                {...register('message')}
              />
              {/* honeypot — hidden from humans, tempting to bots */}
              <div style={{ position: 'absolute', left: -9999, top: 'auto' }} aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" {...register('company')} />
              </div>
              {sendState === 'error' && (
                <Alert variant="error" title={t('contact.error')} onClose={() => setSendState('idle')} />
              )}
              <div>
                <MagneticButton type="submit" disabled={sendState === 'sending'}>
                  {sendState === 'sending' ? t('contact.sending') : t('contact.send')}
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </Spotlight>
    </SectionShell>
  );
}
