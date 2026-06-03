import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// O app será servido em www.by-mav.com/bitu, então o base padrão é '/bitu/'.
// Dá para sobrescrever no build com VITE_BASE (ex.: VITE_BASE=/ ou /outro/).
// Usar um base absoluto também limita o escopo do Service Worker a /bitu/,
// evitando que o PWA controle o resto do domínio.
const base = process.env.VITE_BASE || '/bitu/'

export default defineConfig({
  base,
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
