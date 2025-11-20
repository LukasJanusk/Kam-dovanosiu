import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // REMOVE LATER
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.daisyui.com',
        pathname: '/images/stock/**',
      },
    ],
  },
};

export default nextConfig;
