"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * The short name set edge to edge: font size is solved so the text fills the container width
 * exactly. As it scrolls into view its letters rise out of the baseline one by one, scrubbed
 * to the scroll. Without JS or with reduced motion it simply sits there, fully set.
 */
export function Masthead({ text }: { text: string }) {
  const box = useRef<HTMLParagraphElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current;
      const w = word.current;
      if (!b || !w) return;
      w.style.fontSize = "100px";
      const width = w.getBoundingClientRect().width;
      if (width) w.style.fontSize = `${(100 * b.clientWidth) / width - 0.5}px`;
      ScrollTrigger.refresh();
    };
    fit();
    const observer = new ResizeObserver(fit);
    if (box.current) observer.observe(box.current);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-letter]", {
          yPercent: 85,
          opacity: 0,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: box.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        });
      });
    },
    { scope: box },
  );

  return (
    // The name is already the h1's first words; this is the visual signature, hidden from assistive tech.
    <p ref={box} aria-hidden="true" className="m-0 overflow-hidden border-t border-line pt-[clamp(14px,2.4vw,28px)] pb-[clamp(10px,1.6vw,22px)] leading-[0.9] font-bold tracking-[-0.06em] whitespace-nowrap">
      <span ref={word} className="inline-block text-[clamp(3rem,17vw,14rem)]">
        {[...text].map((ch, i) => (
          <span key={i} data-letter className="inline-block whitespace-pre">
            {ch}
          </span>
        ))}
        <span data-letter className="inline-block text-accent">
          .
        </span>
      </span>
    </p>
  );
}
