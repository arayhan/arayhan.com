"use client";

import type { Icon } from "@phosphor-icons/react";
import { BriefcaseIcon, HandshakeIcon, ImagesIcon, MicrophoneStageIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavGroup, NavLink, Social } from "@/domain/portfolio";
import { cx } from "@/utils/cx";
import { SocialLinks } from "./SocialLinks";

type Props = {
  showcase: NavLink[];
  groups: NavGroup[];
  socials: Social[];
  email: string;
};

const SHOWCASE_ICONS: Record<string, Icon> = { "/work": BriefcaseIcon, "/services": HandshakeIcon, "/talks": MicrophoneStageIcon, "/album": ImagesIcon };

/**
 * The Menu: a click (tap, Enter or Ctrl/Cmd K) opens a full-screen overlay under the header
 * and locks the page scroll. Escape, a click on the toggle or a link closes it. The icon's three
 * bars meet in the middle, then the outer two cross into a centred X (styles in globals.css).
 */
export function SiteMenu({ showcase, groups, socials, email }: Props) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const setMenu = useCallback((next: boolean, viaKeyboard: boolean) => {
    openRef.current = next;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
    // Focus moves only for keyboard users, so a mouse click never paints a focus ring.
    if (next && viaKeyboard) requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());
    if (!next && viaKeyboard) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenu(!openRef.current, true);
      } else if (event.key === "Escape" && openRef.current) {
        setMenu(false, true);
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!openRef.current) return;
      const node = event.target as Node;
      if (panelRef.current?.contains(node) || buttonRef.current?.contains(node)) return;
      setMenu(false, false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [setMenu]);

  const close = () => setMenu(false, false);

  return (
    <>
      <span aria-hidden="true" className="mx-1.5 h-6 w-px bg-line" />
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        // detail is 0 for Enter/Space, so keyboard users get focus moved into the panel.
        onClick={(event) => setMenu(!openRef.current, event.detail === 0)}
        className="menu-toggle group inline-flex items-center gap-2.5 rounded-full py-1 pr-1 pl-2 text-sm font-medium"
      >
        Menu
        <span className="grid size-10 place-items-center rounded-full border border-line text-ink transition-[background-color,border-color,transform] duration-200 ease-out-soft group-hover:border-ink/30 group-hover:bg-soft group-active:scale-95 group-aria-expanded:border-ink/30 group-aria-expanded:bg-soft">
          <span aria-hidden="true" className="relative size-4">
            {["top", "mid", "bot"].map((slot) => (
              <span key={slot} className={`menu-slot menu-slot-${slot}`}>
                <i className="menu-line" />
              </span>
            ))}
          </span>
        </span>
      </button>

      <div
        ref={panelRef}
        id="site-menu"
        role="dialog"
        aria-label="Site menu"
        className={cx(
          "fixed inset-x-0 top-[var(--header-h)] bottom-0 z-50 grid grid-rows-[1fr_auto] overflow-y-auto bg-surface duration-400 ease-out-soft",
          // Visibility only transitions on close: opening, the panel must be focusable on its first frame.
          open ? "visible translate-y-0 opacity-100 transition-[opacity,transform]" : "invisible -translate-y-3 opacity-0 transition-[opacity,transform,visibility]",
        )}
      >
        <div className="grid content-start gap-10 px-4 pt-8 pb-6 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8 lg:px-14 lg:pt-14">
          <div className="grid content-start gap-2">
            {showcase.map(({ label, href }) => {
              const Glyph = SHOWCASE_ICONS[href];
              return (
                <Link key={href} href={href} onClick={close} className="group/link flex items-center gap-4 rounded-control py-1.5 font-display text-[clamp(2rem,1.2rem+2.6vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] transition-colors hover:text-accent-text focus-visible:text-accent-text">
                  {Glyph && (
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-soft text-ink transition-colors group-hover/link:bg-accent group-hover/link:text-on-accent">
                      <Glyph size={22} weight="fill" aria-hidden="true" />
                    </span>
                  )}
                  {label}
                </Link>
              );
            })}
          </div>
          {groups.map((group) => (
            <div key={group.label} className="grid content-start">
              <p className="mb-2 text-xs font-medium text-mute">{group.label}</p>
              {group.links.map(({ label, href }) => (
                <Link key={href} href={href} onClick={close} className="block py-1.5 text-lg font-medium transition-colors hover:text-accent-text">
                  {label}
                </Link>
              ))}
              {group.extra && (
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {group.extra.map(({ label, href }, i) => (
                    <span key={href}>
                      {i > 0 && ", "}
                      <Link href={href} onClick={close} className="transition-colors hover:text-accent-text">
                        {label}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-3 py-3 sm:px-7 lg:px-12">
          <SocialLinks socials={socials} size={18} />
          <span className="rounded-full bg-soft px-3.5 py-1.5 font-mono text-[12.5px] text-mute select-all">{email}</span>
        </div>
      </div>
    </>
  );
}
