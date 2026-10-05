import type { NextConfig } from "next";

// GitHub Pages project sites live under /<repo>; the deploy workflow sets this. Empty for a user site or local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  // A package-lock.json in a parent folder would otherwise be picked as the workspace root.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
