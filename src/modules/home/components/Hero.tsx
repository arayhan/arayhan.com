import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SocialLinks } from "@/components/SocialLinks";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "../home.actions";
import { AlbumMarquee } from "./AlbumMarquee";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroShowcase } from "./HeroShowcase";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function StatusBadge({ status }: { status: Profile["status"] }) {
  return (
    <p className="fade-rise flex w-max max-w-full items-start gap-2.5 rounded-lg border border-line bg-surface/80 py-1.5 pr-3.5 pl-2.5 font-mono text-[12.5px] text-mute backdrop-blur-sm" style={step(0)}>
      <span aria-hidden="true" className="meter flex h-[1.55em] flex-none items-center gap-0.5 pl-1">
        <i />
        <i />
        <i />
      </span>
      <span className="min-w-0">
        <span aria-hidden="true">$ </span>
        {status.prompt} <span className="text-accent">→</span> <b className="font-medium text-ink">{status.role}</b> @ {status.org}
      </span>
    </p>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate grid grid-cols-[minmax(0,1fr)] overflow-x-clip">
      <HeroBackdrop />
      <div className="grid grid-cols-[minmax(0,1fr)] pt-12 pb-20 md:pt-24 md:pb-32">
        <HeroShowcase intro={profile.intro} terms={profile.terms} portrait={profile.portrait} badge={<StatusBadge status={profile.status} />}>
          <p className="fade-rise max-w-[52ch] text-sub text-mute" style={step(2)}>
            {profile.bio}
          </p>
          <div className="fade-rise flex flex-wrap gap-2.5 pt-1" style={step(3)}>
            <a href={`mailto:${profile.email}`} className={actionClass("primary")}>
              Email me
            </a>
            <Link href="/work" className={actionClass("secondary")}>
              See my work
              <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
          <SocialLinks socials={profile.socials} className="fade-rise -ml-2" />
        </HeroShowcase>
      </div>

      {profile.album.length > 0 && <AlbumMarquee photos={profile.album} />}
    </section>
  );
}
