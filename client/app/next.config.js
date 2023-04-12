/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
      },

    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://167.71.204.89:8080/api/v1/:path*'
      }
    ]
  }
}

module.exports = nextConfig
