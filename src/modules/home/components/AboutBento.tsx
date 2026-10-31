import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, BriefcaseIcon } from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/Card";
import { Cover } from "@/components/ui/Cover";
import { hueAt } from "@/components/ui/hue";
import { SocialLinks } from "@/components/SocialLinks";
import type { Profile, Project } from "@/domain/portfolio";
import { cx } from "@/utils/cx";

const cell = "reveal min-h-[19rem] overflow-hidden transition-[translate,box-shadow] duration-300 ease-out-soft hover:-translate-y-0.5 hover:shadow-card-lift";
const title = "text-3xl font-bold tracking-[-0.03em]";

/**
 * Who is behind the work, after the shelf: the featured project, a profile card, a short bio and
 * the socials, as four soft cards. Shapes and fills are flat; the copy is the profile's own.
 */
export function AboutBento({ profile, featured }: { profile: Profile; featured: Project }) {
  return (
    <section aria-labelledby="about-title" className="mx-auto grid w-full max-w-page gap-6 px-4 pb-24 sm:px-8 lg:px-14">
      <h2 id="about-title" className="sr-only">
        About me
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className={cx(cell, "relative grid p-0")}>
          <div className="absolute inset-0">
            <Cover seed={featured.id} hue={hueAt(0)} icon={BriefcaseIcon} src={featured.cover} sizes="(min-width: 768px) 50vw, 100vw" className="size-full rounded-none" />
          </div>
          <div className="relative m-4 grid max-w-[18rem] gap-1 self-start rounded-card bg-feature p-5 text-on-feature">
            <h3 className={title}>Featured project</h3>
            <p className="text-feature-mute">{featured.name}</p>
          </div>
          <Link
            href="/work"
            aria-label="All works"
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-surface text-ink shadow-control transition-transform duration-200 ease-out-soft hover:scale-105"
          >
            <ArrowUpRightIcon size={18} aria-hidden="true" />
          </Link>
        </Card>

        <Card className={cx(cell, "grid content-start gap-5 p-7")}>
          {profile.portrait && (
            <div className="relative size-36 overflow-hidden rounded-full bg-hue-teal">
              {/* The cut-out's head sits right of centre: enlarged from the top, then nudged down and left. */}
              <div className="absolute inset-0 origin-top -translate-x-5 translate-y-4 scale-[1.45]">
                <Image src={profile.portrait.src} alt={profile.portrait.alt} fill sizes="216px" className="object-cover object-top" />
              </div>
            </div>
          )}
          <div className="grid gap-1">
            <h3 className={title}>{profile.name}</h3>
            <p className="text-lg text-mute">{profile.role}</p>
          </div>
          <p className="font-mono text-[12.5px] text-mute">
            <span aria-hidden="true">$ </span>
            {profile.status.prompt} <span className="text-accent-text">→</span> <b className="font-medium text-ink">{profile.status.role}</b> @ {profile.status.org}
          </p>
        </Card>

        <Card className={cx(cell, "relative grid content-start gap-4 p-7 pb-36")}>
          <h3 className={title}>About me</h3>
          <p className="max-w-[46ch] text-mute">{profile.bio}</p>
          <Link href="/about" className="group inline-flex w-max items-center gap-1.5 text-sm font-medium text-accent-text">
            More about me
            <ArrowRightIcon size={14} aria-hidden="true" className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
          </Link>
          <div aria-hidden="true" className="absolute right-8 bottom-0 flex items-end gap-3">
            <span className="h-24 w-36 rounded-t-full border-[22px] border-b-0 border-hue-teal" />
            <span className="size-14 rounded-full bg-hue-amber" />
            <span className="size-10 rounded-lg bg-hue-violet-soft" />
          </div>
        </Card>

        <Card className={cx(cell, "relative grid content-start gap-2 p-7")}>
          <h3 className={title}>Let’s connect</h3>
          <p className="text-mute">Find me on these platforms</p>
          <SocialLinks socials={profile.socials} size={24} tone="brand" className="relative z-10 mt-5 gap-3" />
          <span aria-hidden="true" className="absolute -right-20 -bottom-24 size-72 rounded-full bg-hue-rose-soft" />
          <span aria-hidden="true" className="absolute right-16 bottom-10 size-12 rounded-full bg-hue-rose" />
        </Card>
      </div>
    </section>
  );
}
