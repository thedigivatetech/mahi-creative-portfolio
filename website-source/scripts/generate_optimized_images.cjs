const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const graphicsDir = path.join(__dirname, '..', 'public', 'portfolio', 'graphics');
const thumbsDir = path.join(__dirname, '..', 'public', 'portfolio', 'thumbnails');
fs.mkdirSync(thumbsDir, { recursive: true });

async function processAll() {
  const folders = fs.readdirSync(graphicsDir);
  for (const folder of folders) {
    const fPath = path.join(graphicsDir, folder);
    if (!fs.statSync(fPath).isDirectory()) continue;
    const files = fs.readdirSync(fPath);
    const targetFolder = path.join(thumbsDir, folder);
    fs.mkdirSync(targetFolder, { recursive: true });

    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const srcFile = path.join(fPath, file);
        const baseName = path.parse(file).name;
        const destThumb = path.join(targetFolder, `${baseName}-thumb.webp`);
        
        if (!fs.existsSync(destThumb)) {
          await sharp(srcFile)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(destThumb);
        }
      }
    }
    console.log(`Generated thumbnails for: ${folder}`);
  }
  console.log('All thumbnails generated successfully!');
}

processAll();
