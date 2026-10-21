import { ImageResponse } from "next/og";

import { site } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function OpengraphImage() {
  const tagline = site.tagline.trim();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #151517 0%, #151517 55%, #a8141b 100%)",
          color: "#fff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", height: 16, width: 180, flexDirection: "column" }}>
          <div style={{ flex: 1, background: "#1239b5" }} />
          <div style={{ flex: 1, background: "#e1262d" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -5, lineHeight: 0.95 }}>{site.name}</div>
          {tagline ? <div style={{ marginTop: 28, fontSize: 40, color: "#f6b81c" }}>{tagline}</div> : null}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "rgba(255,255,255,0.75)" }}>
          {[site.address.full, site.phone.display].filter(Boolean).join("  ·  ")}
        </div>
      </div>
    ),
    size,
  );
}
