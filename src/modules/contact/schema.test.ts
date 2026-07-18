import { describe, expect, it } from 'vitest';
import { contactSchema } from './schema';

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'I would like to talk about a project.',
  company: '',
};

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a malformed email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
  });

  it('rejects a too-short message', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'hi' }).success).toBe(false);
  });

  it('rejects a missing name', () => {
    expect(contactSchema.safeParse({ ...valid, name: '' }).success).toBe(false);
  });

  it('still parses when the honeypot is filled (route fakes success)', () => {
    const result = contactSchema.safeParse({ ...valid, company: 'bot inc' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.company).toBe('bot inc');
  });
});
