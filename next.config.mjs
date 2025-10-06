/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ensures the app works in isolated Vercel environments
  output: 'standalone',
  images: { unoptimized: true },

  // Transpile Safe SDK packages for browser compatibility
  transpilePackages: [
    "@safe-global/protocol-kit",
    "@safe-global/api-kit",
    "@safe-global/safe-apps-sdk",
    "@safe-global/safe-apps-provider"
  ],

  // Skip ESLint build blocking
  eslint: {
    ignoreDuringBuilds: true
  },

  // Headers required for Safe App embedding + CORS
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
