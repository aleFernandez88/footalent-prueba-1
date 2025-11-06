import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // 👈 asegura que Next use /src/app correctamente
  },
};

export default nextConfig;
