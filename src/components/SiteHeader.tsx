import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import type { NavGroup, NavLink, Social } from "@/domain/portfolio";
import { actionClass } from "./ui/action";
import { Logo } from "./Logo";
import { QuickNav } from "./QuickNav";
import { SiteMenu } from "./SiteMenu";

type Props = {
  quickLinks: NavLink[];
  showcase: NavLink[];
  groups: NavGroup[];
  socials: Social[];
  email: string;
};

const iconBase = "size-9 place-items-center rounded-control text-mute transition-colors duration-200 hover:bg-soft hover:text-ink";

export function SiteHeader({ quickLinks, showcase, groups, socials, email }: Props) {
  return (
    <header className="site-header sticky top-[env(safe-area-inset-top,0px)] z-40 bg-canvas/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-18 max-w-page items-center justify-between gap-4 px-4 sm:px-8 lg:px-14">
        <div className="flex min-w-0 items-center gap-10">
          <Logo />
          <QuickNav links={quickLinks} />
        </div>
        <div className="flex items-center gap-1">
          {/* The address itself from xl; between lg and xl the nav is too tight, so an icon stands in. */}
          <span className="mr-1.5 hidden xl:block">
            <a href={`mailto:${email}`} className={actionClass("secondary", "sm")}>
              {email}
            </a>
          </span>
          <a href={`mailto:${email}`} aria-label="Email me" className={`${iconBase} hidden lg:inline-grid xl:hidden`}>
            <EnvelopeSimpleIcon size={18} aria-hidden="true" />
          </a>
          <SiteMenu showcase={showcase} groups={groups} socials={socials} email={email} />
        </div>
      </div>
    </header>
  );
}
