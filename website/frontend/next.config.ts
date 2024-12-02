import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  webpack: (config, { isServer }) => {
    // Only run this on the server
    if (isServer) {
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
export default nextConfig;
