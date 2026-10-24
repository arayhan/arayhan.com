import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  primaryAction: string;
  primaryActionClass: string;
};

const iconButton =
  "inline-grid size-10 place-items-center rounded-full text-mute transition-colors duration-200 hover:bg-line/60 hover:text-ink";

export function SiteHeader({ name, email, github, linkedin, primaryAction, primaryActionClass }: Props) {
  return (
    <header className="site-header sticky top-[env(safe-area-inset-top,0px)] z-40 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-3 px-4 sm:px-8 lg:px-14">
        <Logo name={name} />
        <nav aria-label="Contact" className="flex items-center gap-1 sm:gap-2">
          <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconButton}>
            <GithubLogoIcon size={20} aria-hidden="true" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconButton}>
            <LinkedinLogoIcon size={20} aria-hidden="true" />
          </a>
          <ThemeToggle className={iconButton} />
          <a href={`mailto:${email}`} className={`ml-1 ${primaryActionClass}`}>
            {primaryAction}
          </a>
        </nav>
      </div>
    </header>
  );
}
