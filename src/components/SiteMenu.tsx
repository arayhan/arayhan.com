"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavGroup, NavLink, Social } from "@/domain/portfolio";
import { site } from "@/content/site";
import { cx } from "@/utils/cx";
import { SocialLinks } from "./SocialLinks";

type Props = {
  showcase: NavLink[];
  groups: NavGroup[];
  socials: Social[];
  email: string;
};

const TYPE_MS = 22;

/**
 * The "address bar" menu: pointing at a link types its path after the site's host with the
 * same blinking cursor as the logo. Ctrl/Cmd K toggles it, Escape closes it.
 */
export function SiteMenu({ showcase, groups, socials, email }: Props) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("/");
  const openRef = useRef(false);
  const target = useRef("/");
  const timer = useRef<number | undefined>(undefined);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const setMenu = useCallback((next: boolean, viaKeyboard: boolean) => {
    openRef.current = next;
    setOpen(next);
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
      window.clearInterval(timer.current);
    };
  }, [setMenu]);

  function typePath(href: string) {
    if (href === target.current) return;
    target.current = href;
    window.clearInterval(timer.current);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPath(href);
      return;
    }
    let length = 1;
    setPath("/");
    timer.current = window.setInterval(() => {
      length += 1;
      setPath(href.slice(0, length));
      if (length >= href.length) window.clearInterval(timer.current);
    }, TYPE_MS);
  }

  const linkProps = (href: string) => ({
    href,
    onPointerEnter: () => typePath(href),
    onFocus: () => typePath(href),
    onClick: () => setMenu(false, false),
  });

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setMenu(!openRef.current, false)}
        className="group ml-1.5 inline-flex h-9 items-center gap-2.5 border-l border-line pr-1 pl-3.5 text-sm font-medium"
      >
        Menu
        <span aria-hidden="true" className="relative h-2.5 w-[18px]">
          <i className="absolute inset-x-0 top-0 h-[1.5px] rounded-sm bg-current transition-transform duration-300 ease-out-soft group-aria-expanded:translate-y-[4.25px] group-aria-expanded:rotate-45" />
          <i className="absolute inset-x-0 top-[8.5px] h-[1.5px] rounded-sm bg-current transition-transform duration-300 ease-out-soft group-aria-expanded:-translate-y-[4.25px] group-aria-expanded:-rotate-45" />
        </span>
      </button>

      <div
        ref={panelRef}
        id="site-menu"
        role="dialog"
        aria-label="Site menu"
        className={cx(
          "absolute top-[calc(100%-6px)] right-3 z-50 max-h-[calc(100dvh-5.5rem)] w-[min(660px,calc(100%-24px))] overflow-y-auto rounded-xl border border-line bg-surface shadow-[0_24px_48px_-28px_rgb(15_23_42/0.35)] transition-[opacity,transform,visibility] duration-300 ease-out-soft sm:right-8 lg:right-14",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0",
        )}
      >
        <p aria-hidden="true" className="flex items-center border-b border-line px-[18px] py-3.5 font-mono text-[13px]">
          <span className="text-mute">{site.host}</span>
          <span className="whitespace-pre text-accent">{path}</span>
          <span className="caret ml-px inline-block h-[15px] w-[7px] bg-accent" />
        </p>

        <div className="grid gap-[18px] p-5 sm:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="mb-1 text-xs font-medium text-mute">Showcase</p>
            {showcase.map(({ label, href }) => (
              <Link key={href} {...linkProps(href)} className="block py-0.5 text-xl font-semibold tracking-tight transition-colors hover:text-accent focus-visible:text-accent">
                {label}
              </Link>
            ))}
          </div>
          {[groups.slice(0, 2), groups.slice(2)].map((column, ci) => (
            <div key={ci} className="grid content-start gap-4">
              {column.map((group) => (
                <div key={group.label}>
                  <p className="mb-1 text-xs font-medium text-mute">{group.label}</p>
                  {group.links.map(({ label, href }) => (
                    <Link key={href} {...linkProps(href)} className="block py-0.5 text-[15px] transition-colors hover:text-accent">
                      {label}
                    </Link>
                  ))}
                  {group.extra && (
                    <p className="mt-0.5 text-[13px] leading-relaxed text-mute">
                      {group.extra.map(({ label, href }, i) => (
                        <span key={href}>
                          {i > 0 && ", "}
                          <Link {...linkProps(href)} className="transition-colors hover:text-accent">
                            {label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line py-2.5 pr-3.5 pl-2.5">
          <SocialLinks socials={socials} size={16} itemClassName="size-8" />
          <span className="font-mono text-[12.5px] text-mute select-all">{email}</span>
        </div>
      </div>
    </>
  );
}
