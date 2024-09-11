/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["github.com", "cdn.pixabay.com"],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
