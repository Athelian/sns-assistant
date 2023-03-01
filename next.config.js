const { env } = require('./server/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
}

module.exports = nextConfig
