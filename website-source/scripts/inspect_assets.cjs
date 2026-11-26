const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const portfolioDir = 'C:\\Users\\pc\\Documents\\Portfolio';
const graphicsDir = path.join(portfolioDir, 'Graphics');
const videoDir = path.join(portfolioDir, 'Video');

async function run() {
  console.log('=== GRAPHICS ASSETS ===');
  const gFolders = fs.readdirSync(graphicsDir);
  for (const folder of gFolders) {
    const fPath = path.join(graphicsDir, folder);
    if (!fs.statSync(fPath).isDirectory()) continue;
    const files = fs.readdirSync(fPath);
    console.log(`\nProject: ${folder} (${files.length} images)`);
    for (let i = 0; i < Math.min(files.length, 3); i++) {
      const file = files[i];
      const filePath = path.join(fPath, file);
      try {
        const meta = await sharp(filePath).metadata();
        console.log(`  ${file}: ${meta.width}x${meta.height} (${meta.format})`);
      } catch (e) {
        console.log(`  ${file}: error ${e.message}`);
      }
    }
  }

  console.log('\n=== VIDEO ASSETS ===');
  const vFiles = fs.readdirSync(videoDir);
  for (const v of vFiles) {
    const vPath = path.join(videoDir, v);
    const stat = fs.statSync(vPath);
    console.log(`  ${v}: ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
  }
}

run();
