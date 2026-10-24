import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import type { NavGroup, NavLink, Social } from "@/domain/portfolio";
import { Logo } from "./Logo";
import { QuickNav } from "./QuickNav";
import { SiteMenu } from "./SiteMenu";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  quickLinks: NavLink[];
  showcase: NavLink[];
  groups: NavGroup[];
  socials: Social[];
  email: string;
};

const iconBase = "size-9 place-items-center rounded-lg text-mute transition-colors duration-200 hover:text-ink";

export function SiteHeader({ quickLinks, showcase, groups, socials, email }: Props) {
  return (
    <header className="site-header sticky top-[env(safe-area-inset-top,0px)] z-40 bg-canvas/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-18 max-w-page items-center justify-between gap-4 px-4 sm:px-8 lg:px-14">
        <div className="flex min-w-0 items-center gap-10">
          <Logo />
          <QuickNav links={quickLinks} />
        </div>
        <div className="flex items-center gap-1">
          <a href={`mailto:${email}`} aria-label="Email me" className={`${iconBase} hidden lg:inline-grid`}>
            <EnvelopeSimpleIcon size={18} aria-hidden="true" />
          </a>
          <ThemeToggle className={`${iconBase} inline-grid`} />
          <SiteMenu showcase={showcase} groups={groups} socials={socials} email={email} />
        </div>
      </div>
    </header>
  );
}
