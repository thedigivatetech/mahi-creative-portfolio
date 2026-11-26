const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const postersDir = path.join(__dirname, '..', 'public', 'portfolio', 'video-posters');
const thumbsDir = path.join(postersDir, 'thumbs');
fs.mkdirSync(thumbsDir, { recursive: true });

async function optimize() {
  const files = fs.readdirSync(postersDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  for (const f of files) {
    const src = path.join(postersDir, f);
    const base = path.parse(f).name;
    const dest = path.join(thumbsDir, `${base}.webp`);
    await sharp(src)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);
    const size = fs.statSync(dest).size;
    console.log(`Optimized ${f} -> ${base}.webp (${(size/1024).toFixed(1)} KB)`);
  }
}

optimize();
