/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.clerk.com',
        protocol: 'https',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
