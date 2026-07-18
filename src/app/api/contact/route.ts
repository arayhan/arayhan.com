import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/modules/contact/schema';

const TO_ADDRESS = 'rayhanprima99@gmail.com';
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

/* Best-effort per-IP throttle. In-memory, so it resets per serverless
   instance — good enough as a speed bump on a personal site. */
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function GET() {
  return NextResponse.json({ configured: Boolean(process.env.RESEND_API_KEY) });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (throttled(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  // Honeypot tripped: pretend success, send nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: 'rayhan.dev <onboarding@resend.dev>',
    to: TO_ADDRESS,
    replyTo: email,
    subject: `[rayhan.dev] Message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
