import { ImageResponse } from "next/og";
import { MARK } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS adds its own rounded mask, so the square is full-bleed here.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ff6a2b" }}>
        <svg width="180" height="180" viewBox={MARK.viewBox}>
          <g fill="none" stroke="#0e1a2b" strokeWidth={MARK.stroke} strokeLinecap="round">
            <circle cx={MARK.bowl.cx} cy={MARK.bowl.cy} r={MARK.bowl.r} />
            <path d={MARK.a} />
            <path d={MARK.r} />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
