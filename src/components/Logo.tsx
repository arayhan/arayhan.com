import Link from "next/link";
import { cx } from "@/utils/cx";

// Letters are stroked paths, not text, so the mark renders the same at 16px and 180px
// with no font loaded. icon.svg and apple-icon.tsx copy this geometry; keep them in sync.
export const MARK = {
  viewBox: "0 0 32 32",
  radius: 7,
  stroke: 2.8,
  bowl: { cx: 10.3, cy: 16, r: 3.9 },
  a: "M14.2 12.1V19.9",
  r: "M18.2 19.9V15.7a3.6 3.6 0 0 1 3.6 -3.6",
  caret: "M26 9.5V22.5",
} as const;

export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox={MARK.viewBox} aria-hidden="true" className={className}>
      <rect width="32" height="32" rx={MARK.radius} fill="var(--accent)" />
      <g fill="none" stroke="var(--on-accent)" strokeWidth={MARK.stroke} strokeLinecap="round">
        <circle cx={MARK.bowl.cx} cy={MARK.bowl.cy} r={MARK.bowl.r} />
        <path d={MARK.a} />
        <path d={MARK.r} />
        <path d={MARK.caret} className="caret" />
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
