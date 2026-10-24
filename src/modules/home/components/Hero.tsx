import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SocialLinks } from "@/components/SocialLinks";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "../home.actions";
import { AlbumMarquee } from "./AlbumMarquee";
import { HeroShowcase } from "./HeroShowcase";
import { Masthead } from "./Masthead";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function StatusBadge({ status }: { status: Profile["status"] }) {
  return (
    <p className="fade-rise flex w-max max-w-full items-center gap-2.5 rounded-lg border border-line bg-surface py-1.5 pr-3.5 pl-2.5 font-mono text-[12.5px] text-mute" style={step(0)}>
      <span aria-hidden="true" className="meter flex h-3 flex-none items-end gap-0.5 pl-1">
        <i />
        <i />
        <i />
      </span>
      <span className="min-w-0 truncate">
        {status.label} <b className="font-medium text-ink">{status.highlight}</b> {status.rest}
      </span>
    </p>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="hero-title" className="relative grid gap-12 overflow-x-clip pt-8 md:gap-14 md:pt-14">
      <HeroShowcase intro={profile.intro} terms={profile.terms} badge={<StatusBadge status={profile.status} />}>
        <p className="fade-rise max-w-[54ch] text-sub text-mute" style={step(2)}>
          {profile.bio}
        </p>
        <div className="fade-rise flex flex-wrap gap-2.5" style={step(3)}>
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

      <AlbumMarquee />

      <div className="mx-auto w-full max-w-page px-4 sm:px-8 lg:px-14">
        <Masthead text={profile.shortName} />
      </div>
    </section>
  );
}
