const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public', 'portfolio');
const graphicsDir = path.join(publicDir, 'graphics');
const videosDir = path.join(publicDir, 'videos');

async function listAll() {
  const report = { graphics: {}, videos: [] };

  const gFolders = fs.readdirSync(graphicsDir);
  for (const f of gFolders) {
    const fPath = path.join(graphicsDir, f);
    const files = fs.readdirSync(fPath);
    report.graphics[f] = [];
    for (const file of files) {
      const p = path.join(fPath, file);
      try {
        const meta = await sharp(p).metadata();
        report.graphics[f].push({
          file,
          url: `/portfolio/graphics/${f}/${file}`,
          width: meta.width,
          height: meta.height,
          aspect: (meta.width / meta.height).toFixed(2),
        });
      } catch (err) {
        report.graphics[f].push({ file, url: `/portfolio/graphics/${f}/${file}`, error: err.message });
      }
    }
  }

  const vFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
  for (const v of vFiles) {
    report.videos.push({
      file: v,
      url: `/portfolio/videos/${v}`,
    });
  }

  fs.writeFileSync(path.join(__dirname, 'assets-report.json'), JSON.stringify(report, null, 2));
  console.log('Report generated with', Object.keys(report.graphics).length, 'graphic folders and', report.videos.length, 'videos.');
}

listAll();
