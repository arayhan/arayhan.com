import Link from "next/link";
import { cx } from "@/utils/cx";

// Letters are stroked paths, not text, so the mark renders the same at 16px and 64px
// with no font loaded. icon.svg and apple-icon.tsx copy this geometry; keep them in sync.
export const MARK = {
  viewBox: "0 0 32 32",
  radius: 7,
  stroke: 3.2,
  a: "M16.1 11.4V20.6",
  bowl: { cx: 11.5, cy: 16, r: 4.6 },
  r: "M20.8 20.6V15.6a4.2 4.2 0 0 1 4.2 -4.2",
} as const;

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox={MARK.viewBox} aria-hidden="true" className={className}>
      <rect width="32" height="32" rx={MARK.radius} fill="var(--accent)" />
      <g fill="none" stroke="var(--on-accent)" strokeWidth={MARK.stroke} strokeLinecap="round">
        <circle cx={MARK.bowl.cx} cy={MARK.bowl.cy} r={MARK.bowl.r} />
        <path d={MARK.a} />
        <path d={MARK.r} />
      </g>
    </svg>
  );
}

type LogoProps = { name: string; className?: string };

export function Logo({ name, className }: LogoProps) {
  return (
    <Link href="/" aria-label={`${name}, home`} className={cx("inline-flex items-center gap-3 rounded-full", className)}>
      <LogoMark size={32} className="transition-transform duration-300 ease-out-soft hover:-rotate-6" />
      <span className="hidden text-sm font-semibold tracking-tight text-ink sm:inline">{name}</span>
    </Link>
  );
}
