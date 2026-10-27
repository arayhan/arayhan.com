import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "@/components/ui/action";
import { AlbumMarquee } from "./AlbumMarquee";
import { HeroBackdrop } from "./backdrops/HeroBackdrop";
import { HeroShowcase } from "./HeroShowcase";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function StatusBadge({ status, avatar }: { status: Profile["status"]; avatar: Profile["avatar"] }) {
  return (
    <p className="fade-rise flex w-max max-w-full items-center gap-2.5 rounded-control border border-line bg-surface py-1.5 pr-3.5 pl-1.5 font-mono text-[12.5px] text-mute shadow-card" style={step(0)}>
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

export function Hero({ profile, counts }: { profile: Profile; counts: number[] }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate grid grid-cols-[minmax(0,1fr)] overflow-x-clip">
      <HeroBackdrop />
      <div className="grid grid-cols-[minmax(0,1fr)] pt-14 pb-16 md:pt-20 md:pb-20 lg:py-20">
        <HeroShowcase intro={profile.intro} terms={profile.terms} counts={counts} badge={<StatusBadge status={profile.status} avatar={profile.avatar} />}>
          <div className="fade-rise flex flex-wrap gap-2.5 pt-1" style={step(3)}>
            <a href={`mailto:${profile.email}`} className={actionClass("primary")}>
              Email me
            </a>
            <a href="#shelf" className={actionClass("secondary")}>
              See my work
              <ArrowDownIcon size={16} aria-hidden="true" />
            </a>
          </div>
        </HeroShowcase>
      </div>

      {profile.album.length > 0 && <AlbumMarquee photos={profile.album} />}
    </section>
  );
}
