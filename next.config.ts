import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keep existing settings
  images: {
    domains: ['m.media-amazon.com'], // Add external domain for images
  },
};

export default nextConfig;
