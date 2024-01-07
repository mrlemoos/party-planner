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
  // TODO: add this back when we have a better way to handle logging and monitoring in production and/or build time.
  // compiler: {
  //   removeConsole: true,
  // },
  reactStrictMode: true,
}

module.exports = nextConfig
