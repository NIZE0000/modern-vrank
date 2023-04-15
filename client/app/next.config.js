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
        destination: process.env.API_URL + '/:path*'
      },
    ]
  },
  async redirects() {
    return [{
      source: '/',
      destination: '/home',
      permanent: true
    },]
  }
}

module.exports = nextConfig
