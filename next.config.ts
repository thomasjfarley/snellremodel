import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/services/remodeling',
        destination: '/services/remodel',
        permanent: true,
      },
      {
        source: '/services/painting',
        destination: '/services/restore/paint',
        permanent: true,
      },
      {
        source: '/services/drywall',
        destination: '/services/restore/drywall',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
