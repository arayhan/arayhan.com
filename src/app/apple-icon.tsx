import { ImageResponse } from "next/og";
import { MARK } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS adds its own rounded mask, so the square is full-bleed here.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1d4ed8" }}>
        <svg width="180" height="180" viewBox={MARK.viewBox}>
          <g fill="none" stroke="#ffffff" strokeWidth={MARK.stroke} strokeLinecap="round">
            <circle cx={MARK.bowl.cx} cy={MARK.bowl.cy} r={MARK.bowl.r} />
            <path d={MARK.a} />
            <path d={MARK.r} />
            <path d={MARK.caret} />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
