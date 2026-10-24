"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Final values are server-rendered and motion only replays them, so crawlers,
// AI readers and no-JS clients always see the real numbers.
export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counters = Array.from(el.querySelectorAll<HTMLElement>("[data-count]"));
        const finals = counters.map((node) => node.textContent);

        counters.forEach((node) => {
          const end = Number(node.dataset.count);
          const prefix = node.dataset.prefix ?? "";
          const suffix = node.dataset.suffix ?? "";
          ScrollTrigger.create({
            trigger: node,
            start: "top 85%",
            once: true,
            onEnter: () => {
              const state = { value: 0 };
              gsap.to(state, {
                value: end,
                duration: 1.1,
                ease: "power3.out",
                onUpdate: () => {
                  node.textContent = `${prefix}${Math.round(state.value).toLocaleString("en-US")}${suffix}`;
                },
              });
            },
          });
        });

        el.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar) => {
          const ratio = Number(bar.dataset.bar);
          ScrollTrigger.create({
            trigger: bar,
            start: "top 90%",
            once: true,
            onEnter: () => gsap.fromTo(bar, { scaleX: 1 }, { scaleX: ratio, duration: 1.2, ease: "power3.out" }),
          });
        });

        return () => counters.forEach((node, i) => (node.textContent = finals[i]));
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
