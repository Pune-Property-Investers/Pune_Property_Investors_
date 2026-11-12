import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base path configuration:
// 1. If NEXT_PUBLIC_BASE_PATH is explicitly set, use that.
// 2. If running in GitHub Actions, dynamically detect the repository name from GITHUB_REPOSITORY (e.g. "/Pune_Property_Investors_").
// 3. For local dev / custom domains, default to "".
const repoFromEnv = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
  : "/Pune_Property_Investors_";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : (process.env.GITHUB_ACTIONS === "true" ? repoFromEnv : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: true,
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.44",
    "192.168.1.44:3000",
    "*.local",
    "*.loca.lt",
  ],
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  turbopack: {
    root: __dirname,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "scontent.fpnq12-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "punepropertyinvestor.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
};

export default nextConfig;
