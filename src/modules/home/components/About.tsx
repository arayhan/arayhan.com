import { useId } from "react";
import { actionClass } from "@/components/ui/action";
import { Reveal } from "./motion/Reveal";
import { ScrollText } from "./motion/ScrollText";

type Props = { bio: string; email: string };

const display = "text-display-gradient text-center font-display leading-none font-black tracking-tight uppercase";

// Four tactile objects in the brand hues, drawn instead of stock 3D renders: a glossy sphere,
// a cube on its lip, a ring and a pill. Decorative only.
function Sphere({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 0.95 }} />
          <stop offset="35%" style={{ stopColor: "var(--hue-blue)" }} />
          <stop offset="100%" style={{ stopColor: "color-mix(in srgb, var(--hue-blue) 55%, #000)" }} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${id})`} />
    </svg>
  );
}

function Cube() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <path d="M50 8 88 29 50 50 12 29Z" style={{ fill: "var(--hue-amber)" }} />
      <path d="M12 33 47 53 47 94 12 74Z" style={{ fill: "color-mix(in srgb, var(--hue-amber) 72%, #000)" }} />
      <path d="M53 53 88 33 88 74 53 94Z" style={{ fill: "color-mix(in srgb, var(--hue-amber) 55%, #000)" }} />
    </svg>
  );
}

function Ring({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "color-mix(in srgb, var(--hue-violet) 60%, #fff)" }} />
          <stop offset="100%" style={{ stopColor: "color-mix(in srgb, var(--hue-violet) 60%, #000)" }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="34" fill="none" stroke={`url(#${id})`} strokeWidth="20" />
      <path d="M26 30a34 34 0 0 1 30-14" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function Pill() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <g transform="rotate(-35 50 50)">
        <rect x="12" y="34" width="76" height="34" rx="17" style={{ fill: "color-mix(in srgb, var(--hue-green) 60%, #000)" }} />
        <rect x="12" y="30" width="76" height="34" rx="17" style={{ fill: "var(--hue-green)" }} />
        <rect x="24" y="36" width="34" height="6" rx="3" fill="#fff" fillOpacity="0.45" />
      </g>
    </svg>
  );
}

/**
 * About: a big "About me", the owner's bio revealed character by character as it scrolls,
 * and "Email me", framed by four tactile objects sliding in from the corners.
 */
export function About({ bio, email }: Props) {
  const id = useId().replace(/:/g, "");
  const corners = [
    { node: <Sphere id={`${id}-sphere`} />, className: "top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]", x: -80, delay: 0.1 },
    { node: <Cube />, className: "bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]", x: -80, delay: 0.25 },
    { node: <Ring id={`${id}-ring`} />, className: "top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]", x: 80, delay: 0.15 },
    { node: <Pill />, className: "right-[3%] bottom-[8%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]", x: 80, delay: 0.3 },
  ];

  return (
    <section aria-labelledby="about-title" className="relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-hidden px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
      {corners.map((c, i) => (
        <Reveal key={i} x={c.x} y={0} delay={c.delay} duration={0.9} className={`pointer-events-none absolute aspect-square ${c.className}`}>
          <div aria-hidden="true" className="size-full">
            {c.node}
          </div>
        </Reveal>
      ))}

      <div className="relative flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <Reveal y={40}>
          <h2 id="about-title" className={display} style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
            About me
          </h2>
        </Reveal>
        <ScrollText text={bio} className="max-w-[560px] text-center leading-relaxed font-medium text-ink" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }} />
      </div>

      <Reveal y={20} className="relative">
        <a href={`mailto:${email}`} className={actionClass("primary", "lg")}>
          Email me
        </a>
      </Reveal>
    </section>
  );
}
