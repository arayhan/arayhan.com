import type { Icon } from "@phosphor-icons/react";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MediumLogoIcon,
  ThreadsLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Social, SocialKey } from "@/domain/portfolio";
import { cx } from "@/utils/cx";

const ICONS: Record<SocialKey, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  email: EnvelopeSimpleIcon,
  instagram: InstagramLogoIcon,
  medium: MediumLogoIcon,
  youtube: YoutubeLogoIcon,
  threads: ThreadsLogoIcon,
};

type Props = {
  socials: Social[];
  size?: number;
  className?: string;
  itemClassName?: string;
};

export function SocialLinks({ socials, size = 18, className, itemClassName }: Props) {
  return (
    <div className={cx("flex flex-wrap", className)}>
      {socials.map(({ key, label, url }) => {
        if (!url) return null;
        const Glyph = ICONS[key];
        const external = !url.startsWith("mailto:");
        return (
          <a
            key={key}
            href={url}
            aria-label={label}
            className={cx("inline-grid size-9 place-items-center rounded-control text-mute transition-colors duration-200 hover:bg-soft hover:text-ink", itemClassName)}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Glyph size={size} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
