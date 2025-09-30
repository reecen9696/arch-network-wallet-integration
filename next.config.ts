import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Configure image optimization
    formats: ["image/webp", "image/avif"],
    // Allow external domains if needed
    domains: [],
    // Disable image optimization for static images in production if having issues
    unoptimized: false,
  },
  // Add output file tracing root to resolve the multiple lockfiles warning
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
