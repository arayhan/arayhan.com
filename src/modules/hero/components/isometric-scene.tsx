'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/libs/gsap';

/* True 2:1 isometric projection. One unit = 26px.
   Screen X = (x − y)·cos30°·u, screen Y = (x + y)·0.5·u − z·u. */
const U = 26;
const ISO_X = Math.cos(Math.PI / 6);

function pt(x: number, y: number, z: number): [number, number] {
  return [(x - y) * ISO_X * U, (x + y) * 0.5 * U - z * U];
}

function poly(points: [number, number, number][]): string {
  return points.map(([x, y, z]) => pt(x, y, z).join(',')).join(' ');
}

/* Prima-only palette. Cobalt is the ONE accent — used on exactly two solids. */
const INK = 'var(--on-surface)';
const HAIRLINE = 'var(--border)';
const TOP = 'var(--surface)';
const RIGHT = '#EFF4F9';
const LEFT = '#E3EAF2';
const COBALT = 'var(--primary)';
const COBALT_DARK = 'var(--primary-hover)';

interface BoxProps {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  top?: string;
  right?: string;
  left?: string;
  stroke?: string;
}

/** An isometric box: top face + the two viewer-facing sides. */
function Box({ x, y, z, w, d, h, top = TOP, right = RIGHT, left = LEFT, stroke = INK }: BoxProps) {
  const common = { stroke, strokeWidth: 1.5, strokeLinejoin: 'round' as const };
  return (
    <g>
      <polygon
        points={poly([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
        fill={left}
        {...common}
      />
      <polygon
        points={poly([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x + w, y, z + h],
        ])}
        fill={right}
        {...common}
      />
      <polygon
        points={poly([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h],
        ])}
        fill={top}
        {...common}
      />
    </g>
  );
}

/** Soft ground shadow under a floating object. */
function Shadow({ x, y, w, d }: { x: number; y: number; w: number; d: number }) {
  return (
    <polygon
      points={poly([
        [x, y, 0.02],
        [x + w, y, 0.02],
        [x + w, y + d, 0.02],
        [x, y + d, 0.02],
      ])}
      fill={INK}
      opacity={0.07}
    />
  );
}

/** Mono "code" lines drawn on the monitor's front-left face (y = const plane). */
function CodeLines() {
  const lines: { x0: number; x1: number; z: number; color: string }[] = [
    { x0: 2.58, x1: 3.6, z: 2.86, color: COBALT },
    { x0: 2.58, x1: 4.8, z: 2.64, color: HAIRLINE },
    { x0: 2.88, x1: 4.4, z: 2.42, color: HAIRLINE },
    { x0: 2.88, x1: 5.0, z: 2.2, color: HAIRLINE },
    { x0: 2.88, x1: 3.9, z: 1.98, color: COBALT },
    { x0: 2.58, x1: 4.5, z: 1.76, color: HAIRLINE },
    { x0: 2.58, x1: 3.3, z: 1.54, color: HAIRLINE },
  ];
  const Y = 2.38;
  return (
    <g data-screen-lines>
      {lines.map((l, i) => {
        const [x1, y1] = pt(l.x0, Y, l.z);
        const [x2, y2] = pt(l.x1, Y, l.z);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={l.color}
            strokeWidth={3}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

/**
 * The signature scene: an isometric workstation on an ice grid, three floating
 * cubes, exactly two cobalt solids. Layers carry data-depth for pointer and
 * scroll parallax; floats carry data-float for the idle loop.
 */
export function IsometricScene() {
  const rootRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Idle float: each floating cube drifts on its own phase.
        gsap.utils.toArray<SVGGElement>('[data-float]', root).forEach((el, i) => {
          gsap.to(el, {
            y: `-=${7 + i * 3}`,
            duration: 3.2 + i * 0.9,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.4,
          });
        });

        // Pointer parallax: layers shift toward the pointer by depth.
        const layers = gsap.utils.toArray<SVGGElement>('[data-depth]', root);
        const setters = layers.map((layer) => ({
          depth: Number(layer.dataset.depth),
          x: gsap.quickTo(layer, 'x', { duration: 0.6, ease: 'power2.out' }),
          y: gsap.quickTo(layer, 'y', { duration: 0.6, ease: 'power2.out' }),
        }));
        const onMove = (e: PointerEvent) => {
          const rect = root.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          setters.forEach((s) => {
            s.x(nx * 26 * s.depth);
            s.y(ny * 16 * s.depth);
          });
        };
        const section = root.closest('section') ?? root;
        section.addEventListener('pointermove', onMove as EventListener);

        // Scroll parallax: layers drift apart as the hero scrolls away.
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth);
          gsap.to(layer, {
            yPercent: -14 * depth,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        return () => {
          section.removeEventListener('pointermove', onMove as EventListener);
        };
      });
    },
    { scope: rootRef },
  );

  return (
    <svg
      ref={rootRef}
      viewBox="-230 -130 460 420"
      role="img"
      aria-label="Isometric illustration of a developer workstation"
      style={{ width: '100%', height: 'auto', maxWidth: 560, overflow: 'visible' }}
    >
      {/* ————— back layer: floor grid ————— */}
      <g data-depth="0.15">
        {Array.from({ length: 9 }, (_, i) => {
          const [x1, y1] = pt(i - 1, -1, 0);
          const [x2, y2] = pt(i - 1, 7, 0);
          const [x3, y3] = pt(-1, i - 1, 0);
          const [x4, y4] = pt(7, i - 1, 0);
          return (
            <g key={i} opacity={0.55}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={HAIRLINE} strokeWidth={1} />
              <line x1={x3} y1={y3} x2={x4} y2={y4} stroke={HAIRLINE} strokeWidth={1} />
            </g>
          );
        })}
      </g>

      {/* ————— mid layer: workstation ————— */}
      <g data-depth="0.4">
        <Shadow x={6.1} y={0.9} w={1.1} d={1.1} />
        <Shadow x={0.15} y={0.5} w={0.9} d={0.9} />
        {/* platform */}
        <Box x={1.4} y={1.4} z={0} w={5} d={3.6} h={0.85} />
        {/* keyboard */}
        <Box x={2.5} y={3.9} z={0.85} w={1.9} d={0.75} h={0.14} right={LEFT} />
        {/* mug — the first cobalt solid */}
        <Box x={5.0} y={4.05} z={0.85} w={0.5} d={0.5} h={0.55} top={COBALT} right={COBALT} left={COBALT_DARK} stroke={INK} />
        {/* monitor stand + screen */}
        <Box x={3.35} y={2.55} z={0.85} w={0.95} d={0.5} h={0.4} right={LEFT} />
        <Box x={2.4} y={2.2} z={1.25} w={2.85} d={0.18} h={1.85} />
        <CodeLines />
      </g>

      {/* ————— float layer: cubes ————— */}
      <g data-depth="0.8">
        <g data-float>
          {/* the second cobalt solid — nearest focal cube */}
          <Box x={6.2} y={1.0} z={1.9} w={0.9} d={0.9} h={0.9} top={COBALT} right={COBALT} left={COBALT_DARK} />
        </g>
        <g data-float>
          <Box x={0.2} y={0.55} z={2.9} w={0.8} d={0.8} h={0.8} />
        </g>
        <g data-float>
          <Box x={5.4} y={-0.7} z={3.5} w={0.55} d={0.55} h={0.55} top={RIGHT} />
        </g>
      </g>
    </svg>
  );
}
