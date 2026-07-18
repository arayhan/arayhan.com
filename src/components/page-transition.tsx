'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
} from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { gsap } from '@/libs/gsap';

interface TransitionContextValue {
  navigate: (href: string, label?: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({ navigate: () => {} });

export function useTransitionRouter() {
  return useContext(TransitionContext);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Barba-style route transitions, native to the App Router: a cobalt panel
 * wipes up to cover the viewport with a mono `//label`, the route swaps
 * underneath, then the panel exits upward. Reduced motion navigates instantly.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const coveringRef = useRef(false);
  const [label, setLabel] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback(
    (href: string, nextLabel = '') => {
      if (href === pathname) return;
      if (prefersReducedMotion() || !overlayRef.current) {
        router.push(href);
        return;
      }
      if (coveringRef.current) return;
      coveringRef.current = true;
      setLabel(nextLabel);

      const tl = gsap.timeline();
      tl.set(overlayRef.current, { yPercent: 100 })
        .set(labelRef.current, { opacity: 0, y: 28 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.55, ease: 'power4.inOut' })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2')
        .add(() => {
          router.push(href);
        });
    },
    [pathname, router],
  );

  // Reveal once the new route has mounted (pathname flipped while covered).
  useEffect(() => {
    if (!coveringRef.current || !overlayRef.current) return;
    // A hash target means the browser is scrolling to an anchor — don't fight it.
    if (!window.location.hash) window.scrollTo(0, 0);

    const content = document.querySelector('main');
    const tl = gsap.timeline({ paused: true });
    tl.to(labelRef.current, { opacity: 0, y: -20, duration: 0.22, ease: 'power2.in' })
      .to(overlayRef.current, { yPercent: -100, duration: 0.65, ease: 'power4.inOut' }, '-=0.06');
    if (content) {
      // The incoming page rises with the panel exit instead of sitting static.
      tl.fromTo(
        content,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' },
        '-=0.45',
      );
    }
    tl.set(overlayRef.current, { yPercent: 100 }).add(() => {
      coveringRef.current = false;
    });

    // Hold the cover until the new route has actually painted (two frames),
    // plus a beat so the reveal never catches a half-rendered page.
    let raf1 = 0;
    let raf2 = 0;
    let timer = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timer = window.setTimeout(() => tl.play(), 120);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer);
      tl.kill();
    };
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={overlayRef} className="transition-overlay" aria-hidden="true">
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-h3)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--on-primary)',
          }}
        >
          {label && `// ${label}`}
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = ComponentProps<typeof Link> & {
  /** Mono label shown on the transition panel — e.g. "work" renders `//work` */
  transitionLabel?: string;
};

/**
 * Locale-aware Link that routes through the transition panel. Renders a real
 * href (SEO, prefetch, middle-click all intact); plain clicks animate.
 */
export function TransitionLink({ transitionLabel, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = useTransitionRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    // Let modified clicks (new tab, download) behave natively.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(typeof props.href === 'string' ? props.href : String(props.href), transitionLabel);
  };

  return <Link {...props} onClick={handleClick} />;
}
