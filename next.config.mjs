/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
    formats: ["image/webp"],
  },
};

export default nextConfig;
