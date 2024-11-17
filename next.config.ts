// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true, // Keep existing settings
//   images: {
//     domains: ['m.media-amazon.com'], // Add external domain for images
//   },
// };

// export default nextConfig;


//  The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead. fix below
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keep existing settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
