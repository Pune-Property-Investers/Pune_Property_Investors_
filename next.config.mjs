import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base path configuration:
// If NEXT_PUBLIC_BASE_PATH is explicitly set (even empty string ""), use that.
// If running in GitHub Actions for GitHub Pages deployment, default to repo path.
// For all other hosting platforms (Vercel, Netlify, custom domains, local preview), default to root "".
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : (process.env.GITHUB_ACTIONS === "true" ? "/Pune_property_investers" : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
    ],
  },
};

export default nextConfig;
