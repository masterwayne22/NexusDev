import type { NextConfig } from "next";
import path from "path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

const nextConfig: NextConfig = {
  /* Next.js 16 Turbopack Configuration */
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
