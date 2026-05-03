import type { NextConfig } from "next";
import path from "path";
import { withCloudflare } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* Next.js 16 Turbopack Configuration */
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withCloudflare(nextConfig);
