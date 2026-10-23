import { ImageResponse } from "next/og";

// TODO(content): placeholder social card - replace the copy below with the real pitch.
//
// Generated at build time rather than served from a public/og.png. That is
// deliberate: a metadata reference to a binary that nobody remembered to add is
// invisible until someone shares the link and gets a blank card. Generating it
// means the card cannot go missing, and editing it is a code change with a diff.
//
// Next picks this file up by convention from the app directory - the metadata in
// layout.tsx must NOT also declare an images entry, or it will win over this.
// Edge runtime is REQUIRED, not a preference: next/og renders through satori +
// resvg wasm, and dropping this makes the Node runtime fail to prerender the
// route outright ("Error occurred prerendering page /opengraph-image"). The
// tradeoff is that the card is generated per request rather than at build.
export const runtime = "edge";
export const alt = "Rayhan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={ {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0b0c",
          color: "#ffffff",
          fontFamily: "sans-serif",
        } }
      >
        <div
          style={ {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 22,
            background: "#2dbe47",
            fontSize: 52,
            fontWeight: 700,
          } }
        >
          {"R"}
        </div>
        <div style={ { marginTop: 40, fontSize: 72, fontWeight: 700 }}>{"Rayhan"}</div>
        <div style={ { marginTop: 16, fontSize: 32, color: "#a1a1aa" }}>
          {"TODO(content): one-sentence pitch"}
        </div>
      </div>
    ),
    size
  );
}
