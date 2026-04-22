const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');

// Ensure directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Sizes needed for PWA manifest
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Generate a simple gradient icon with "KD" text
async function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="${size * 0.05}" flood-opacity="0.25"/>
        </filter>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)" filter="url(#shadow)"/>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-weight="bold"
            font-size="${size * 0.4}" fill="white" text-anchor="middle" dominant-baseline="middle">KD</text>
    </svg>
  `;

  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);

  await sharp(Buffer.from(svg))
    .png()
    .toFile(filepath);

  console.log(`Generated: ${filename}`);
}

async function main() {
  console.log('Generating PWA icons...');
  await Promise.all(sizes.map(size => generateIcon(size)));
  console.log('Done!');
}

main().catch(console.error);
