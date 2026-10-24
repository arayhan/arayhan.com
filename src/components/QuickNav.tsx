"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/domain/portfolio";

export function QuickNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
      {links.map(({ label, href }) => {
        const current = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={current ? "page" : undefined}
            className="relative py-1.5 text-sm font-medium text-mute transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out-soft hover:text-ink hover:after:scale-x-100 aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100"
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
