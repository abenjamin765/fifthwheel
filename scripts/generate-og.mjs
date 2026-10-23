// 1200×630 Open Graph card: lockup + the live headline on brand ground.
// Georgia is the crawler fallback, not a change to the site fonts.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const lockup = await sharp(
  "public/fifth-wheel-lockup-italic-horizontal-on-dark.svg",
)
  .resize({ height: 56 })
  .png()
  .toBuffer();

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#161009"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#glow)"/>
  <defs>
    <radialGradient id="glow" cx="18%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#382916" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#161009" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <text x="96" y="286" fill="#F3E9D8" font-family="Georgia, 'Times New Roman', serif" font-size="72">One table.</text>
  <text x="96" y="376" fill="#DCB670" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="72">Five people.</text>
  <text x="96" y="468" fill="#C4B49A" font-family="Helvetica, Arial, sans-serif" font-size="22">A supper club for five strangers · Atlanta</text>
</svg>`;

const card = await sharp(Buffer.from(svg))
  .composite([{ input: lockup, left: 96, top: 92 }])
  .png()
  .toBuffer();

await writeFile("public/og.png", card);
console.log("wrote public/og.png", card.length);
