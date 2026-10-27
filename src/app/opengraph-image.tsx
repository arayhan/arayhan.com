import { ImageResponse } from "next/og";
import { MARK } from "@/components/Logo";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

// Generated at build from the same MARK geometry as the logo, so the share card cannot drift
// from the brand or go missing. Twitter/X falls back to og:image for summary_large_image.
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a1220";
const TEXT = "#eef1f6";
const MUTE = "#97a3b6";
const ACCENT = "#ff7a3d";
const ON_ACCENT = "#0a1220";

/**
 * Pulls only the glyphs the card uses, as TTF, from Google Fonts at build time. If the network is
 * unavailable the card still renders in next/og's built-in font rather than failing the build.
 */
async function loadGeist(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const tagline = `${profile.role}. I make complicated products feel simple, from a pre-seed startup to a national health platform.`;
  const [bold, regular] = await Promise.all([loadGeist(700, `arayhan${profile.shortName}.`), loadGeist(400, `${tagline}${site.host}`)]);
  const fonts = [
    ...(bold ? [{ name: "Geist", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(regular ? [{ name: "Geist", data: regular, weight: 400 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: INK, color: TEXT, fontFamily: "Geist" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox={MARK.viewBox}>
            <rect width="32" height="32" rx={MARK.radius} fill={ACCENT} />
            <g fill="none" stroke={ON_ACCENT} strokeWidth={MARK.stroke} strokeLinecap="round">
              <circle cx={MARK.bowl.cx} cy={MARK.bowl.cy} r={MARK.bowl.r} />
              <path d={MARK.a} />
              <path d={MARK.r} />
            </g>
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -2 }}>arayhan</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -9, lineHeight: 0.9 }}>
            {profile.shortName}
            <span style={{ color: ACCENT }}>.</span>
          </div>
          <div style={{ fontSize: 36, color: MUTE, maxWidth: 940, lineHeight: 1.3 }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", fontSize: 28, color: ACCENT }}>{site.host}</div>
      </div>
    ),
    { ...size, fonts },
  );
}
