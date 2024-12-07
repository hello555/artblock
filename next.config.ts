import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'znprgctaduwiwunbbbnx.supabase.co'],
  },
  webpack(config) {
    config.resolve.extensions.push('.mjs');
    return config;
  },
};

export default nextConfig;
