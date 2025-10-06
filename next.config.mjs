/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@safe-global/protocol-kit",
    "@safe-global/api-kit",
    "@safe-global/safe-apps-sdk",
    "@safe-global/safe-apps-provider"
  ],
  eslint: {
    ignoreDuringBuilds: true
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "ALLOWALL" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }
      ]
    }
  ]
}

module.exports = nextConfig
