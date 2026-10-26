import type { Service } from "@/domain/portfolio";
import { Reveal } from "./motion/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Services: an inverse band (light on the dark default, dark on light) with rounded top
 * corners. A giant number, the service name and one line per row, staggering in.
 */
export function Services({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="services-title" className="rounded-t-[40px] bg-ink px-5 py-20 text-canvas sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 id="services-title" className="mb-16 text-center font-display leading-none font-black tracking-tight uppercase sm:mb-20 md:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
        Services
      </h2>
      <ol className="mx-auto max-w-5xl">
        {services.map((s, i) => (
          <Reveal as="li" key={s.name} delay={i * 0.1} className="flex items-center gap-6 border-b border-canvas/15 py-8 last:border-b-0 sm:gap-10 sm:py-10 md:py-12">
            <span aria-hidden="true" className="w-[1.2em] flex-none font-display leading-none font-black tabular-nums" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
              {pad(i + 1)}
            </span>
            <div className="grid gap-2">
              <h3 className="font-medium uppercase" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                {s.name}
              </h3>
              <p className="max-w-2xl leading-relaxed font-light opacity-60" style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                {s.line}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
