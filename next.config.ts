import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'znprgctaduwiwunbbbnx.supabase.co'],  // Allow images from GitHub
  },
};

export default nextConfig;
