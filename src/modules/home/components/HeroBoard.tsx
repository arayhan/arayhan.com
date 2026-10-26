"use client";

import { MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { BrandGlyph, brandLabel } from "@/components/ui/brands";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import type { HeroBoard as BoardData } from "@/domain/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/utils/cx";

const SPREAD_PX = 14;

type FloaterProps = {
  /** How far it leans with the pointer, in px at the viewport edge; nearer cards move more. */
  depth: number;
  /** Direction it moves when the board spreads apart (unit-ish vector). */
  out: [number, number];
  /** Stagger index for the entrance. */
  i: number;
  className: string;
  children: ReactNode;
};

// Three layers so the motions never fight: pointer lean + spread (outer, GSAP), entrance
// (middle, the CSS fade-rise), idle drift (inner, GSAP).
function Floater({ depth, out, i, className, children }: FloaterProps) {
  return (
    <div data-float="" data-depth={depth} data-out={out.join(",")} className={cx("absolute", className)}>
      <div className="fade-rise" style={{ "--i": 3 + i } as CSSProperties}>
        <div data-drift="">{children}</div>
      </div>
    </div>
  );
}

/** Seven years as seven ring segments, all filled: a picture of the number, not a progress bar. */
function YearRing({ years }: { years: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const gap = 3;
  const seg = c / years - gap;
  return (
    <svg viewBox="0 0 56 56" className="size-14 -rotate-90" aria-hidden="true">
      <circle cx="28" cy="28" r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
      <circle cx="28" cy="28" r={r} fill="none" stroke="var(--hue-blue)" strokeWidth="5" strokeDasharray={`${seg} ${gap}`} />
    </svg>
  );
}

/**
 * The tactile card board around the proof card: small cards that drift on their own loops,
 * lean toward the pointer at different depths and spread apart while the pointer is over the
 * column. Decorative (aria-hidden); every figure repeats one from the content. Still under
 * reduced motion, paused offscreen.
 */
export function HeroBoard({ board }: { board: BoardData }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const stage = root?.parentElement;
      if (!root || !stage || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const floats = gsap.utils.toArray<HTMLElement>("[data-float]", root);
      gsap.set(floats, { transformPerspective: 800 });

      const drifts = floats.map((el, i) =>
        gsap.to(el.querySelector("[data-drift]"), {
          y: gsap.utils.random(-10, -6),
          rotation: i % 2 ? 1.5 : -1.5,
          duration: gsap.utils.random(4.5, 7),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        }),
      );

      const movers = floats.map((el) => {
        const [ox, oy] = (el.dataset.out ?? "0,0").split(",").map(Number);
        const opts = { duration: 0.9, ease: "power3" };
        return {
          depth: Number(el.dataset.depth),
          ox,
          oy,
          x: gsap.quickTo(el, "x", opts),
          y: gsap.quickTo(el, "y", opts),
          rx: gsap.quickTo(el, "rotationX", opts),
          ry: gsap.quickTo(el, "rotationY", opts),
        };
      });

      const pointer = { x: 0, y: 0 };
      let spread = 0;
      const update = () => {
        for (const m of movers) {
          m.x(pointer.x * m.depth + spread * m.ox);
          m.y(pointer.y * m.depth + spread * m.oy);
          m.rx(-pointer.y * 8);
          m.ry(pointer.x * 8);
        }
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pointer.x = e.clientX / innerWidth - 0.5;
        pointer.y = e.clientY / innerHeight - 0.5;
        update();
      };
      const onEnter = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        spread = SPREAD_PX;
        update();
        gsap.to(floats, { scale: 1.03, duration: 0.5, ease: "power3.out" });
      };
      const onLeave = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        spread = 0;
        update();
        gsap.to(floats, { scale: 1, duration: 0.5, ease: "power3.out" });
      };

      const seen = new IntersectionObserver(([entry]) => {
        for (const t of drifts) {
          if (entry.isIntersecting) t.resume();
          else t.pause();
        }
      });
      seen.observe(stage);

      window.addEventListener("pointermove", onMove, { passive: true });
      stage.addEventListener("pointerenter", onEnter);
      stage.addEventListener("pointerleave", onLeave);
      return () => {
        seen.disconnect();
        window.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerenter", onEnter);
        stage.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope },
  );

  const { terminal, stack, community, years } = board;

  return (
    <div ref={scope} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <Floater depth={10} out={[-1, -0.6]} i={0} className="top-[5%] -left-[10%]">
        <Card className="w-56 overflow-hidden">
          <div className="flex gap-1.5 border-b border-line bg-soft px-3 py-2">
            <i className="size-2 rounded-full bg-line" />
            <i className="size-2 rounded-full bg-line" />
            <i className="size-2 rounded-full bg-line" />
          </div>
          <p className="grid gap-1 px-3.5 py-3 font-mono text-[11.5px] leading-snug">
            <span className="text-mute">
              ~/arayhan <span className="text-accent">$</span> <span className="text-ink">{terminal.command}</span>
            </span>
            <span className="text-hue-green-text">✓ {terminal.result}</span>
          </p>
        </Card>
      </Floater>

      <Floater depth={16} out={[1, -0.8]} i={1} className="top-[9%] -right-[6%]">
        <Card className="flex items-center gap-3 rounded-control py-2 pr-3.5 pl-2">
          <span className="flex -space-x-1.5">
            {stack.map((b) => (
              <span key={b} title={brandLabel(b)} className="grid size-8 place-items-center rounded-full border border-line bg-surface text-ink">
                <BrandGlyph brand={b} size={15} />
              </span>
            ))}
          </span>
          <span className="text-xs font-semibold">Stack</span>
        </Card>
      </Floater>

      <Floater depth={13} out={[-1, 0.7]} i={2} className="bottom-[12%] -left-[14%]">
        <Card className="flex items-center gap-3 rounded-control p-2.5 pr-4">
          <IconBadge icon={MicrophoneStageIcon} hue="violet" size="sm" />
          <span className="grid leading-tight">
            <span className="text-sm font-semibold">{community.value}</span>
            <span className="text-[11px] text-mute">{community.label}</span>
          </span>
        </Card>
      </Floater>

      <Floater depth={18} out={[0.8, 1]} i={3} className="right-[-2%] bottom-[6%]">
        <Card dotted className="flex items-center gap-3 p-3 pr-4">
          <span className="relative grid place-items-center">
            <YearRing years={years.value} />
            <span className="absolute text-sm font-semibold tabular-nums">{years.value}</span>
          </span>
          <span className="grid leading-tight">
            <span className="text-sm font-semibold">{years.value} years</span>
            <span className="text-[11px] text-mute">{years.caption}</span>
          </span>
        </Card>
      </Floater>
    </div>
  );
}
