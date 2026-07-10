// Generates solid-color PNG icons for PWA — no external dependencies.
// Uses Node.js built-in zlib for DEFLATE compression.
// Colors: maroon background (#8B1A1A) matching the temple card theme.

import { deflateSync } from 'zlib'
import { writeFileSync, mkdirSync } from 'fs'

// ── CRC32 (required by PNG spec) ────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
    t[i] = c
  }
  return t
})()

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (const b of buf) crc = CRC_TABLE[(crc ^ b) & 0xFF] ^ (crc >>> 8)
  return ((crc ^ 0xFFFFFFFF) >>> 0)
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.allocUnsafe(4)
  lenBuf.writeUInt32BE(data.length)
  const crcBuf = Buffer.allocUnsafe(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])))
  return Buffer.concat([lenBuf, typeBytes, data, crcBuf])
}

// ── Build a solid-color RGB PNG ─────────────────────────────────────────────
function makePNG(w, h, r, g, b) {
  const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdr = Buffer.allocUnsafe(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8]  = 8  // bit depth
  ihdr[9]  = 2  // RGB
  ihdr[10] = 0  // compression
  ihdr[11] = 0  // filter
  ihdr[12] = 0  // interlace

  // Raw scanlines: filter byte (0x00) + w×3 bytes of RGB per row
  const raw = Buffer.allocUnsafe(h * (1 + w * 3))
  for (let y = 0; y < h; y++) {
    const base = y * (1 + w * 3)
    raw[base] = 0  // filter None
    for (let x = 0; x < w; x++) {
      raw[base + 1 + x * 3]     = r
      raw[base + 1 + x * 3 + 1] = g
      raw[base + 1 + x * 3 + 2] = b
    }
  }

  return Buffer.concat([
    PNG_SIG,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ── Write icons ─────────────────────────────────────────────────────────────
mkdirSync('public/icons', { recursive: true })

// Maroon #8B1A1A — matches temple card theme colour
const [R, G, B] = [0x8B, 0x1A, 0x1A]

const sizes = [
  { file: 'icon-192.png',         w: 192, h: 192 },
  { file: 'icon-512.png',         w: 512, h: 512 },
  { file: 'apple-touch-icon.png', w: 180, h: 180 },
]

for (const { file, w, h } of sizes) {
  writeFileSync(`public/icons/${file}`, makePNG(w, h, R, G, B))
  console.log(`✓ public/icons/${file}  (${w}×${h})`)
}

console.log('\nPWA icons ready.')
