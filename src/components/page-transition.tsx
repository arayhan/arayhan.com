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
        .set(labelRef.current, { opacity: 0, y: 24 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.45, ease: 'power3.inOut' })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '-=0.15')
        .add(() => {
          router.push(href);
        });
    },
    [pathname, router],
  );

  // Reveal once the new route has mounted (pathname flipped while covered).
  useEffect(() => {
    if (!coveringRef.current || !overlayRef.current) return;
    window.scrollTo(0, 0);
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(labelRef.current, { opacity: 0, y: -16, duration: 0.2, ease: 'power2.in' })
      .to(overlayRef.current, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' }, '-=0.05')
      .set(overlayRef.current, { yPercent: 100 })
      .add(() => {
        coveringRef.current = false;
      });
    return () => {
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
