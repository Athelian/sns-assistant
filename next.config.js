const { env } = require('./server/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  async redirects() {
    return [
      {
        source: '/reg',
        has: [
          {
            type: 'cookie',
            key: 'authorized',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/dashboard',
      },
      {
        source: '/dashboard',
        has: [
          {
            type: 'cookie',
            key: 'authorized',
            value: 'false',
          },
        ],
        permanent: false,
        destination: '/reg',
      },
    ]
  },
}

module.exports = nextConfig
