"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "./loop";

type Props = { text: string; className?: string; style?: CSSProperties };

/**
 * A paragraph whose characters brighten from 20% to full as it scrolls through the viewport
 * (top at 80% to bottom at 20%). Screen readers get the sentence once from an sr-only copy;
 * the per-character spans are aria-hidden. Without JS or under reduced motion it is plain text.
 */
export function ScrollText({ text, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const chars = ref.current?.querySelectorAll("[data-char]");
      if (!chars?.length) return;
      gsap.fromTo(chars, { opacity: 0.2 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 20%", scrub: true } });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text, (c, i) =>
          c === " " ? (
            " "
          ) : (
            <span key={i} data-char="">
              {c}
            </span>
          ),
        )}
      </span>
    </p>
  );
}
