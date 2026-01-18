import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    useCache: true,
  },
  // أضف قسم الـ redirects هنا
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // true تعني تحويل دائم (أفضل للـ SEO)
      },
    ];
  },
};

export default nextConfig;