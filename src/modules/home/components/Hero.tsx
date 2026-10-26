import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SocialLinks } from "@/components/SocialLinks";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "@/components/ui/action";
import { AlbumMarquee } from "./AlbumMarquee";
import { HeroShowcase } from "./HeroShowcase";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function StatusBadge({ status }: { status: Profile["status"] }) {
  return (
    <p className="fade-rise flex w-max max-w-full items-start gap-2.5 rounded-control border border-line bg-surface py-1.5 pr-3.5 pl-3 font-mono text-[12.5px] text-mute shadow-card" style={step(0)}>
      <span aria-hidden="true" className="mt-[0.5em] size-2 flex-none rounded-full bg-hue-green ring-4 ring-hue-green-soft" />
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
      <div className="grid min-h-[calc(100svh-var(--header-h))] grid-cols-[minmax(0,1fr)] content-center py-8 md:py-10 lg:content-stretch lg:py-0">
        <HeroShowcase intro={profile.intro} terms={profile.terms} badge={<StatusBadge status={profile.status} />}>
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
