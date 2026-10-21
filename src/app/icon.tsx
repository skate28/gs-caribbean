import { ImageResponse } from "next/og";

import { site } from "@/content";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/** Red tile with the first word of the name over a Haitian blue base. No raster logo needed. */
export default function Icon() {
  const mark = site.name.trim().split(/\s+/)[0]?.slice(0, 3) ?? "";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e1262d",
          color: "#ffffff",
          borderRadius: 44,
          borderBottom: "22px solid #1239b5",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -6,
        }}
      >
        {mark}
      </div>
    ),
    size,
  );
}
