"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef, type CSSProperties } from "react";
import { actionClass } from "@/components/ui/action";
import type { Project } from "@/domain/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "./motion/loop";

const STACK_PX = 28;
const SHRINK = 0.03;
const pad = (n: number) => String(n).padStart(2, "0");
const display = "text-display-gradient text-center font-display leading-none font-black tracking-tight uppercase";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { metric } = project;
  return (
    <article className="grid gap-6 rounded-[40px] border-2 border-ink/70 bg-canvas p-4 sm:rounded-[50px] sm:p-6 md:gap-8 md:rounded-[60px] md:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4 px-2 sm:px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <span aria-hidden="true" className="font-display leading-none font-black tabular-nums" style={{ fontSize: "clamp(2.5rem, 7vw, 110px)" }}>
            {pad(index + 1)}
          </span>
          <div className="grid gap-1">
            <span className="text-xs font-medium tracking-[0.2em] text-mute uppercase">{project.tag}</span>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">{project.name}</h3>
            <p className="text-sm text-mute">{project.client}</p>
          </div>
        </div>
        <Link href="/work" className={`${actionClass("secondary")} uppercase tracking-[0.14em]`}>
          See work
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col justify-end gap-2 rounded-[32px] bg-surface p-6 sm:rounded-[40px] sm:p-8">
          {metric ? (
            <>
              <p className="font-display leading-none font-bold tracking-tight tabular-nums" style={{ fontSize: "clamp(3rem, 8vw, 120px)" }}>
                {metric.prefix}
                {metric.value}
                {metric.suffix}
              </p>
              <p className="text-base text-ink">{metric.label}</p>
              {metric.detail && <p className="font-mono text-sm text-mute">{metric.detail}</p>}
            </>
          ) : (
            <p className="text-mute">Impact being measured</p>
          )}
        </div>
        <div className="grid content-between gap-6 rounded-[32px] bg-soft p-6 sm:rounded-[40px] sm:p-8">
          <div className="grid gap-4">
            <p className="font-medium">
              {project.role} <span className="text-mute">· {project.years}</span>
            </p>
            <ul className="grid gap-2 text-mute">
              {project.lines.map((line) => (
                <li key={line} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-control border border-line bg-surface px-2.5 py-1 text-xs text-mute">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/**
 * Projects: a dark band pulled up over Services with rounded top corners, then the top
 * projects as sticky cards that stack. Each card sticks a little lower than the last and
 * shrinks slightly as the later ones slide over it. Still under reduced motion.
 */
export function Projects({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const list = root.current?.querySelector("[data-stack]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root.current);
      cards.forEach((card, i) => {
        const target = 1 - (cards.length - 1 - i) * SHRINK;
        if (target === 1) return;
        gsap.to(card, { scale: target, ease: "none", scrollTrigger: { trigger: card.parentElement, start: "top top", endTrigger: list, end: "bottom bottom", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="projects-title" className="relative z-10 -mt-10 rounded-t-[40px] bg-canvas px-5 pt-20 pb-24 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <h2 id="projects-title" className={`${display} mb-12 sm:mb-16`} style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
        Projects
      </h2>
      <div data-stack="" className="mx-auto max-w-6xl">
        {projects.map((p, i) => (
          <div key={p.id} className="h-[85vh]">
            <div data-card="" className="sticky top-[calc(6rem+var(--stack))] origin-top md:top-[calc(8rem+var(--stack))]" style={{ "--stack": `${i * STACK_PX}px` } as CSSProperties}>
              <ProjectCard project={p} index={i} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/work" className="group inline-flex items-center gap-2 font-medium text-accent">
          See all work
          <ArrowRightIcon size={16} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
