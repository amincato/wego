import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "s.figma.com" },
    ],
  },
};

export default nextConfig;
