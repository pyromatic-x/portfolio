import type { NextConfig } from "next";

export default  {
  reactStrictMode: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: !!process.env.SENTRY_DSN,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "date-fns",
      "framer-motion",
      "sonner",
      "usehooks-ts",
      "zustand",
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  
};

