"use client";

import { useLayoutEffect, useRef } from "react";

/** The short name set edge to edge: font size is solved so the text fills the container width exactly. */
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
    };
    fit();
    const observer = new ResizeObserver(fit);
    if (box.current) observer.observe(box.current);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, []);

  return (
    // The name is already the h1's first words; this is the visual signature, hidden from assistive tech.
    <p ref={box} aria-hidden="true" className="m-0 overflow-hidden border-t border-line pt-[clamp(14px,2.4vw,28px)] pb-[clamp(10px,1.6vw,22px)] leading-[0.9] font-bold tracking-[-0.06em] whitespace-nowrap">
      <span ref={word} className="inline-block text-[clamp(3rem,17vw,14rem)]">
        {text}
        <span className="text-accent">.</span>
      </span>
    </p>
  );
}
