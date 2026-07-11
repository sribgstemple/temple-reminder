import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icons/icon-48.png',
        'icons/icon-72.png',
        'icons/icon-96.png',
        'icons/icon-128.png',
        'icons/icon-192.png',
        'icons/icon-256.png',
        'icons/icon-512.png',
        'icons/icon-512-maskable.png',
        'icons/apple-touch-icon.png',
        'om-icon.svg',
      ],
      manifest: {
        name: 'SBG Temple Reminder',
        short_name: 'SBG Reminder',
        description:
          'Generate personalized devotee renewal reminder cards for Sri Balagurunadheeswara Swamy Temple.',
        theme_color: '#8B1A1A',
        background_color: '#FFFDF8',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/temple-reminder/',
        scope: '/temple-reminder/',
        icons: [
          { src: 'icons/icon-48.png',           sizes: '48x48',     type: 'image/png' },
          { src: 'icons/icon-72.png',           sizes: '72x72',     type: 'image/png' },
          { src: 'icons/icon-96.png',           sizes: '96x96',     type: 'image/png' },
          { src: 'icons/icon-128.png',          sizes: '128x128',   type: 'image/png' },
          { src: 'icons/icon-192.png',          sizes: '192x192',   type: 'image/png' },
          { src: 'icons/icon-256.png',          sizes: '256x256',   type: 'image/png' },
          { src: 'icons/icon-512.png',          sizes: '512x512',   type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512',   type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Pre-cache all built assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}'],
        // Runtime caching — Google Fonts survives offline after first load
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  base: '/temple-reminder/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
