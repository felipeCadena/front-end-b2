/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,

  images: {
    unoptimized: true,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

export default nextConfig;
