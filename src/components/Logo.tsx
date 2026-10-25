import Link from "next/link";
import { cx } from "@/utils/cx";

// Letters are stroked paths, not text, so the mark renders the same at 16px and 180px
// with no font loaded. icon.svg and apple-icon.tsx copy this geometry; keep them in sync.
export const MARK = {
  viewBox: "0 0 32 32",
  radius: 7,
  stroke: 2.8,
  bowl: { cx: 11.74, cy: 16, r: 4.37 },
  a: "M16.11 11.63V20.37",
  r: "M20.59 20.37V15.66a4.03 4.03 0 0 1 4.03 -4.03",
} as const;

export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
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

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="arayhan, home" className={cx("inline-flex items-center gap-2.5 rounded-md", className)}>
      <LogoMark />
      <span className="text-xl font-bold tracking-[-0.055em] text-ink">arayhan</span>
    </Link>
  );
}
