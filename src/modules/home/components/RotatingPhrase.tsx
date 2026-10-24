"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Props = { phrases: string[]; enterIndex: number };

const DWELL_MS = 2800;

function phraseState(i: number, active: number, previous: number | null) {
  if (i === active) return "in";
  if (i === previous) return "out";
  return "next";
}

// The animated stack is aria-hidden; the sr-only sentence carries every phrase, and all
// phrases are in the server HTML, so crawlers and screen readers get the full claim.
export function RotatingPhrase({ phrases, enterIndex }: Props) {
  const [{ active, previous }, setSlot] = useState<{ active: number; previous: number | null }>({ active: 0, previous: null });
  const paused = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setSlot((slot) => ({ active: (slot.active + 1) % phrases.length, previous: slot.active }));
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  const spoken = phrases.map((p) => p.replace(/\.$/, ""));
  const sentence = `${spoken.slice(0, -1).join(", ")} and ${spoken.at(-1)}.`;

  return (
    <>
      <span className="sr-only">{sentence}</span>
      <span className="mask-word block w-full" aria-hidden="true">
        <span style={{ "--i": enterIndex } as CSSProperties} className="block">
          <span
            className="phrase-slot text-accent"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
          >
            {phrases.map((phrase, i) => (
              <span key={phrase} data-state={phraseState(i, active, previous)}>
                {phrase}
              </span>
            ))}
          </span>
        </span>
      </span>
    </>
  );
}
