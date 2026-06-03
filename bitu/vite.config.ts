import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base: './' lets the build run from any sub-path (GitHub Pages, opened locally, etc.)
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['bitu.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Bitu — Bateria do Corpo',
        short_name: 'Bitu',
        description: 'Joguinho interativo: ajude o Bitu a carregar a bateria do corpo!',
        lang: 'pt-BR',
        theme_color: '#14B8A6',
        background_color: '#0f172a',
        display: 'fullscreen',
        orientation: 'landscape',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
})
