/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
    formats: ["image/webp"],
  },
  async redirects() {
    return [{ source: "/", destination: "/en-US", permanent: true }];
  },
};

export default nextConfig;
