import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false 
    };

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;