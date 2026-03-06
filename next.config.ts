import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/seatax',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
