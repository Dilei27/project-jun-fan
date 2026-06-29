import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

const basePath = process.env.PAGES_BASE_URL || '';
const assetPrefix = process.env.PAGES_BASE_URL || '';

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix,
  experimental: {
    viewTransition: true,
  },
};

export default withMDX(nextConfig);
