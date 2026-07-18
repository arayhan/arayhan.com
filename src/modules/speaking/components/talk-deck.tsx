'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/libs/gsap';
import type { Talk } from '@/content';

export const DECK_SIZE = 6;
const CYCLE_MS = 2800;

function fanTransform(i: number, count: number) {
  const c = (count - 1) / 2;
  return { rotation: (i - c) * 5, x: (i - c) * 10, y: Math.abs(i - c) * 6 };
}

/** Polaroid-style card: photo (or Prima-patterned placeholder) + mono caption. */
function TalkCard({ talk, index }: { talk: Talk; index: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--surface)',
        border: 'var(--border-width-emphasis) solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        boxShadow: 'var(--shadow-floating)',
      }}
      data-deck-card
    >
      <div
        style={{
          flex: 1,
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          background: 'var(--background)',
        }}
      >
        {talk.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={talk.image}
            alt={talk.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              backgroundImage:
                'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--primary)',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="eyebrow">{`// ${talk.topic.toUpperCase()}`}</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-label)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--on-surface)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {talk.title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-label)',
            color: 'var(--text-secondary)',
            flexShrink: 0,
          }}
        >
          {talk.year}
        </span>
      </div>
    </div>
  );
}

/**
 * The deck: talk photo cards fanned like a hand of cards. They deal in when
 * scrolled into view, idle-cycle the front card, and `activeIndex` (hovered
 * talk row) springs that card to the top. Static fan under reduced motion.
 */
export function TalkDeck({ talks, activeIndex }: { talks: Talk[]; activeIndex: number | null }) {
  const deck = talks.slice(0, DECK_SIZE);
  const rootRef = useRef<HTMLDivElement>(null);
  const [idleIndex, setIdleIndex] = useState(0);
  const frontIndex = activeIndex ?? idleIndex;

  useEffect(() => {
    if (activeIndex !== null) return;
    const id = window.setInterval(() => setIdleIndex((i) => (i + 1) % deck.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [activeIndex, deck.length]);

  // Deal-in once on scroll into view.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-deck-slot]', root);
        gsap.from(cards, {
          y: 140,
          rotation: 18,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          stagger: 0.09,
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        });
      });
    },
    { scope: rootRef },
  );

  // Bring the front card forward whenever it changes.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-deck-slot]', root);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      cards.forEach((card, i) => {
        const base = fanTransform(i, cards.length);
        const front = i === frontIndex;
        const target = front
          ? { rotation: 0, x: base.x, y: -18, scale: 1.06 }
          : { rotation: base.rotation, x: base.x, y: base.y, scale: 1 };
        card.style.zIndex = front ? '40' : String(10 + i);
        if (reduced) {
          gsap.set(card, target);
        } else {
          gsap.to(card, { ...target, duration: 0.55, ease: 'back.out(1.7)', overwrite: 'auto' });
        }
      });
    },
    { scope: rootRef, dependencies: [frontIndex] },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: 'min(280px, 100%)',
        aspectRatio: '3 / 4',
        margin: '0 auto',
      }}
    >
      {deck.map((talk, i) => {
        const base = fanTransform(i, deck.length);
        return (
          <div
            key={talk.title}
            data-deck-slot
            style={{
              position: 'absolute',
              inset: 0,
              transform: `rotate(${base.rotation}deg) translate(${base.x}px, ${base.y}px)`,
              transformOrigin: '50% 85%',
              willChange: 'transform',
            }}
          >
            <TalkCard talk={talk} index={i} />
          </div>
        );
      })}
    </div>
  );
}
