const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(path.join(__dirname, '../src/data/projectsData.ts'), 'utf8');

// Match either single-quoted or double-quoted paths
const regex = /(?:'(\/portfolio\/[^']+|\/images\/[^']+)'|"(\/portfolio\/[^"]+|\/images\/[^"]+)")/g;

let match;
const missing = [];
let total = 0;

while ((match = regex.exec(file)) !== null) {
  total++;
  const mediaPath = match[1] || match[2];
  const diskPath = path.join(__dirname, '../public', mediaPath);
  if (!fs.existsSync(diskPath)) {
    missing.push(mediaPath);
  }
}

console.log(`Scanned ${total} media paths in projectsData.ts`);
if (missing.length === 0) {
  console.log('ALL MEDIA PATHS EXIST ON DISK (100% verified)');
} else {
  console.log('Missing paths:', missing);
}
