import Image from "next/image";
import { actionClass } from "@/components/ui/action";
import type { Profile } from "@/domain/portfolio";
import { Magnet } from "./motion/Magnet";
import { Reveal } from "./motion/Reveal";

function StatusBadge({ status, avatar }: { status: Profile["status"]; avatar: Profile["avatar"] }) {
  return (
    <p className="flex w-max max-w-full items-center gap-2.5 rounded-control border border-line bg-surface py-1.5 pr-3.5 pl-1.5 font-mono text-[12.5px] text-mute shadow-card">
      {avatar ? (
        <span className="relative flex-none">
          <Image src={avatar.src} alt={avatar.alt} width={26} height={26} className="size-[26px] rounded-full bg-soft" />
          <span aria-hidden="true" className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-surface bg-hue-green" />
        </span>
      ) : (
        <span aria-hidden="true" className="ml-1.5 size-2 flex-none rounded-full bg-hue-green ring-4 ring-hue-green-soft" />
      )}
      <span className="min-w-0">
        <span aria-hidden="true">$ </span>
        {status.prompt} <span className="text-accent">→</span> <b className="font-medium text-ink">{status.role}</b> @ {status.org}
      </span>
    </p>
  );
}

/**
 * A creator-style hero, kept enterprise: the name in giant Kanit across the full width, the
 * owner's cut-out standing centred on the bottom edge, sized by height because the photo is
 * tall (it leans toward a nearby mouse), the
 * one-line pitch bottom left and "Email me" bottom right. Fills the first screen.
 */
export function Hero({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-x-clip">
      <div className="mx-auto w-full max-w-page px-4 pt-6 sm:px-8 md:pt-8 lg:px-14">
        <Reveal y={-20}>
          <StatusBadge status={profile.status} avatar={profile.avatar} />
        </Reveal>
      </div>

      <Reveal delay={0.15} y={40} className="mt-6 overflow-hidden sm:mt-4 md:mt-2">
        <h1 id="hero-title" className="text-display-gradient text-center font-display text-[12.6vw] leading-none font-black tracking-[-0.03em] whitespace-nowrap uppercase">
          Hi, {profile.intro.name}
        </h1>
      </Reveal>

      <div className="flex-1" />

      <div className="relative z-20 mx-auto flex w-full max-w-page items-end justify-between gap-6 px-4 pb-7 sm:px-8 sm:pb-8 md:pb-10 lg:px-14">
        <Reveal delay={0.35} y={20}>
          <p className="max-w-[160px] leading-snug font-light tracking-wide text-ink uppercase sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
            {profile.intro.lead}
          </p>
        </Reveal>
        <Reveal delay={0.5} y={20}>
          <a href={`mailto:${profile.email}`} className={actionClass("primary", "lg")}>
            Email me
          </a>
        </Reveal>
      </div>

      {profile.portrait && (
        <Reveal delay={0.6} y={30} className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:translate-y-0">
          <Magnet padding={150} strength={3}>
            <Image src={profile.portrait.src} alt={profile.portrait.alt} width={profile.portrait.width} height={profile.portrait.height} priority sizes="(min-width: 640px) 420px, 280px" className="portrait-fade h-[52svh] w-auto max-w-none sm:h-[62svh] lg:h-[min(68svh,40rem)]" />
          </Magnet>
        </Reveal>
      )}
    </section>
  );
}
