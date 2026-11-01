// Regenerates image assets in public/: profile photo, Open Graph image and icons.
// Run with `npm run assets` after changing assets-src/profile.jpg or your name/title.
import sharp from 'sharp'

const ACCENT = '#2E7D5B'
const NAME = 'Ido Weissman'
const TITLE = 'Full Stack Developer'
const TAGLINE = 'TypeScript · React · Node.js · Firebase · GCP / AWS'

// Portrait crop around the face (coordinates in the 1536x2048 source photo),
// in two sizes for the hero's srcset.
const portrait = sharp('assets-src/profile.jpg').extract({ left: 540, top: 600, width: 640, height: 800 })
await portrait.clone().resize(480, 600).webp({ quality: 78 }).toFile('public/profile.webp')
await portrait.clone().resize(288, 360).webp({ quality: 75 }).toFile('public/profile-sm.webp')

const avatar = await sharp('assets-src/profile.jpg')
  .extract({ left: 600, top: 640, width: 520, height: 520 })
  .resize(360, 360)
  .composite([{ input: Buffer.from('<svg><circle cx="180" cy="180" r="180"/></svg>'), blend: 'dest-in' }])
  .png()
  .toBuffer()

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FAFAF9"/>
  <rect width="16" height="630" fill="${ACCENT}"/>
  <circle cx="1240" cy="-40" r="320" fill="${ACCENT}" opacity="0.08"/>
  <text x="96" y="250" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#1C1917">${NAME}</text>
  <text x="96" y="330" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="44" font-weight="600" fill="${ACCENT}">${TITLE}</text>
  <text x="96" y="400" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" fill="#57534E">${TAGLINE}</text>
  <circle cx="960" cy="315" r="186" fill="${ACCENT}"/>
</svg>`

await sharp(Buffer.from(og))
  .composite([{ input: avatar, left: 780, top: 135 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png')

const icon = await sharp('public/favicon.svg', { density: 300 })
await icon.clone().resize(180, 180).png().toFile('public/apple-touch-icon.png')

console.log('Assets generated in public/')
