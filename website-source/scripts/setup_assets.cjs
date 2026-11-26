const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\pc\\Documents\\Portfolio';
const destPublic = path.join(__dirname, '..', 'public');
const destGraphics = path.join(destPublic, 'portfolio', 'graphics');
const destVideos = path.join(destPublic, 'portfolio', 'videos');

fs.mkdirSync(destGraphics, { recursive: true });
fs.mkdirSync(destVideos, { recursive: true });

// Copy Graphics
const graphicsDir = path.join(srcDir, 'Graphics');
const gFolders = fs.readdirSync(graphicsDir);

console.log('Copying graphics...');
for (const folder of gFolders) {
  const srcFolderPath = path.join(graphicsDir, folder);
  if (!fs.statSync(srcFolderPath).isDirectory()) continue;
  
  // Create slug folder name
  let slug = folder.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const targetFolder = path.join(destGraphics, slug);
  fs.mkdirSync(targetFolder, { recursive: true });
  
  const files = fs.readdirSync(srcFolderPath);
  for (const file of files) {
    const srcFile = path.join(srcFolderPath, file);
    if (fs.statSync(srcFile).isFile()) {
      const destFile = path.join(targetFolder, file);
      fs.copyFileSync(srcFile, destFile);
    }
  }
  console.log(`Copied ${files.length} files to ${slug}`);
}

// Copy Videos
const videoDir = path.join(srcDir, 'Video');
const vFiles = fs.readdirSync(videoDir);

console.log('\nCopying videos...');
for (const file of vFiles) {
  const srcFile = path.join(videoDir, file);
  if (fs.statSync(srcFile).isFile()) {
    const destFile = path.join(destVideos, file);
    if (!fs.existsSync(destFile) || fs.statSync(destFile).size !== fs.statSync(srcFile).size) {
      console.log(`Copying video ${file}...`);
      fs.copyFileSync(srcFile, destFile);
    } else {
      console.log(`Video ${file} already copied.`);
    }
  }
}

console.log('\nAsset copy completed successfully!');
