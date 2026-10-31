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

// Flat brand colours for the `brand` tone (no gradients, Instagram included); email takes the accent.
const BRAND: Record<SocialKey, string> = {
  github: "#181717",
  linkedin: "#0a66c2",
  email: "var(--accent)",
  instagram: "#e1306c",
  medium: "#000000",
  youtube: "#ff0000",
  threads: "#000000",
};

type Props = {
  socials: Social[];
  size?: number;
  /** `quiet`: muted glyphs on a hover tint. `brand`: white glyphs on round brand-colour buttons. */
  tone?: "quiet" | "brand";
  className?: string;
  itemClassName?: string;
};

export function SocialLinks({ socials, size = 18, tone = "quiet", className, itemClassName }: Props) {
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
            aria-label={key === "email" ? "Email me" : label}
            className={cx(
              "inline-grid place-items-center",
              tone === "brand"
                ? "size-14 rounded-full text-white shadow-control transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 active:scale-[0.96]"
                : "size-9 rounded-control text-mute transition-colors duration-200 hover:bg-soft hover:text-ink",
              itemClassName,
            )}
            style={tone === "brand" ? { background: BRAND[key] } : undefined}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Glyph size={size} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
