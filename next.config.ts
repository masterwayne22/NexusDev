import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Next.js 16 Turbopack Configuration */
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
