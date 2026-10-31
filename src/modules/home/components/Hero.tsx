import Image from "next/image";
import type { CSSProperties } from "react";
import type { Profile } from "@/domain/portfolio";
import { HoldZone } from "./ActiveTerm";
import { AlbumMarquee } from "./AlbumMarquee";
import { HeroIntro } from "./HeroIntro";
import { HeroShowcase, type Showcase } from "./HeroShowcase";

function StatusBadge({ status, avatar }: { status: Profile["status"]; avatar: Profile["avatar"] }) {
  return (
    <p className="fade-rise flex w-max max-w-full items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-1.5 text-left font-mono text-[12.5px] text-mute shadow-control" style={{ "--i": 0 } as CSSProperties}>
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

/**
 * The whole home page: the copy beside the portrait and the active term's featured item, and a
 * bento of that term's next items under both. Hovering a /term swaps the images (HeroShowcase).
 */
export function Hero({ profile, showcases }: { profile: Profile; showcases: Showcase[] }) {
  return (
    <HoldZone aria-labelledby="hero-title" className="mx-auto grid w-full max-w-page grid-cols-[minmax(0,1fr)] gap-3 px-4 pt-6 pb-20 sm:gap-4 sm:px-8 md:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:px-14">
      <HeroIntro intro={profile.intro} terms={profile.terms} email={profile.email} badge={<StatusBadge status={profile.status} avatar={profile.avatar} />} />
      <HeroShowcase showcases={showcases} portrait={profile.portrait} />
      {profile.album.length > 0 && (
        <div className="lg:col-span-2">
          <AlbumMarquee photos={profile.album} />
        </div>
      )}
    </HoldZone>
  );
}
