'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/libs/gsap';

const INTERACTIVE = 'a, button, [data-cursor]';

/**
 * Cobalt cursor companion: a dot glued to the pointer and a lagging ring that
 * scales up over interactive elements. Augments the native cursor (never
 * replaces it). Skipped entirely on touch devices and under reduced motion.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        gsap.to(ring, { opacity: 0.5, duration: 0.2 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE)) {
        gsap.to(ring, { scale: 1.8, duration: 0.25, ease: 'power2.out' });
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE)) {
        gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
    };
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 95,
    pointerEvents: 'none',
    borderRadius: 'var(--radius-full)',
    // Hidden until the first pointermove — otherwise the pre-hydration paint
    // shows both shapes parked at the top-left corner.
    opacity: 0,
  };

  return (
    <div className="cursor-dot" aria-hidden="true">
      <div ref={dotRef} style={{ ...base, width: 8, height: 8, background: 'var(--primary)' }} />
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 34,
          height: 34,
          border: '1.5px solid var(--primary)',
        }}
      />
    </div>
  );
}
