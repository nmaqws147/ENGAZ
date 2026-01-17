import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    useCache: true,
    // 👇 زود اللي جاي ده

  },
};

export default nextConfig;