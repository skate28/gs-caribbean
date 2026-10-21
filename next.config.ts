import type { NextConfig } from "next";

import { allowIndexing } from "./src/lib/indexing";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  async headers() {
    if (allowIndexing()) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
