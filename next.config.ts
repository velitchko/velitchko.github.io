import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/github.io/' : '',
};

export default nextConfig;
