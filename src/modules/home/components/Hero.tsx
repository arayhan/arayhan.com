import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "@/components/ui/action";
import { AlbumMarquee } from "./AlbumMarquee";
import { HeroCollage, type CollageTile } from "./HeroCollage";
import { HeroIntro } from "./HeroIntro";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function StatusBadge({ status, avatar }: { status: Profile["status"]; avatar: Profile["avatar"] }) {
  return (
    <p className="fade-rise flex w-max max-w-full items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-1.5 text-left font-mono text-[12.5px] text-mute shadow-control" style={step(0)}>
      {avatar ? (
        <Image src={avatar.src} alt={avatar.alt} width={26} height={26} className="size-[26px] flex-none rounded-full bg-soft" />
      ) : null}
      <span className="min-w-0">
        <span aria-hidden="true">$ </span>
        {status.prompt} <span className="text-accent-text">→</span> <b className="font-medium text-ink">{status.role}</b> @ {status.org}
      </span>
    </p>
  );
}

/** Centered copy over a collage of works and products that runs out of the hero's bottom edge. */
export function Hero({ profile, tiles }: { profile: Profile; tiles: CollageTile[] }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate grid grid-cols-[minmax(0,1fr)] overflow-x-clip pt-16 md:pt-24">
      <HeroIntro intro={profile.intro} terms={profile.terms} badge={<StatusBadge status={profile.status} avatar={profile.avatar} />}>
        <div className="fade-rise flex flex-wrap justify-center gap-2.5 pt-1" style={step(3)}>
          <a href={`mailto:${profile.email}`} className={actionClass("primary")}>
            Email me
          </a>
          <a href="#shelf" className={actionClass("secondary")}>
            See my work
            <ArrowDownIcon size={16} aria-hidden="true" />
          </a>
        </div>
      </HeroIntro>
      <HeroCollage tiles={tiles} />

      {profile.album.length > 0 && <AlbumMarquee photos={profile.album} />}
    </section>
  );
}
