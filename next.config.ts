import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained Node.js server in .next/standalone.
  // Required for the multi-stage Dockerfile used in Coolify deployments.
  output: "standalone",
};

export default nextConfig;
