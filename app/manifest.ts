// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SnapNutrient',
    short_name: 'SnapNutrient',
    description: 'AI-Powered Nutrition Tracking and Social Platform',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/logo/SnapNutrient.png',
        sizes: '788x712',
        type: 'image/png',
        purpose: 'any'
      },
    ],
    display_override: ['standalone', 'fullscreen'],
    prefer_related_applications: false,
  }
}