import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Persistent Turbopack cache across `next dev` runs — re-uses compiled
  // modules instead of re-compiling on every start. Default in Next 16.1+,
  // set explicitly here for safety.
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // Unoptimized images in dev — skips the on-the-fly resize step which is
  // the single biggest perf hit on routes with many <Image fill /> tags.
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "s.figma.com" },
    ],
  },
};

export default nextConfig;
