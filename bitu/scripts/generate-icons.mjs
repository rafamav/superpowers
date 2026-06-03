// Generates the PNG app icons (PWA + Apple touch) from public/bitu.svg.
// Run with: npm run icons
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(resolve(root, 'public/bitu.svg'))
const out = (name) => resolve(root, 'public', name)

const png = (name, size) =>
  sharp(src, { density: 512 })
    .resize(size, size, { fit: 'contain', background: { r: 20, g: 184, b: 166, alpha: 1 } })
    .png()
    .toFile(out(name))

await Promise.all([
  png('pwa-192.png', 192),
  png('pwa-512.png', 512),
  png('pwa-maskable-512.png', 512),
  png('apple-touch-icon.png', 180),
])

console.log('✓ ícones gerados em public/')
