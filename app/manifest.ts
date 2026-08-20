import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Snel Portal',
    short_name: 'Snel Portal',
    description: 'Snel Remodeling Services contact queue',
    start_url: '/srsp',
    display: 'standalone',
    background_color: '#1a2e44',
    theme_color: '#1a2e44',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  }
}
