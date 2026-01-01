import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com', // Replace with your image domain
        port: '',        
      },
    ],
  }
};

export default nextConfig;
