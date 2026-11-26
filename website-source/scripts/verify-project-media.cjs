// scripts/verify-project-media.cjs
// Simple verification script that parses projectsData.ts for asset paths and checks they exist on disk.
const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.resolve('C:/Users/pc/Documents/Mahi-Portfolio/website-source/src/data/projectsData.ts');
const PUBLIC_ROOT = path.resolve('C:/Users/pc/Documents/Mahi-Portfolio/website-source/public');

function readFileSync(file) {
  return fs.readFileSync(file, 'utf8');
}

function extractPaths(content) {
  // Match single-quoted or double-quoted strings starting with /portfolio/
  const regex = /"(\/portfolio\/[^"\n]+?)"|'(\/portfolio\/[^'\n]+?)'/g;
  const paths = new Set();
  let m;
  while ((m = regex.exec(content)) !== null) {
    paths.add(m[1] || m[2]);
  }
  return Array.from(paths);
}

function verifyPaths(paths) {
  const missing = [];
  for (const rel of paths) {
    const full = path.join(PUBLIC_ROOT, rel);
    if (!fs.existsSync(full)) {
      missing.push(rel);
    }
  }
  return missing;
}

function main() {
  const content = readFileSync(PROJECTS_FILE);
  const paths = extractPaths(content);
  const missing = verifyPaths(paths);
  if (missing.length === 0) {
    console.log('✅ All referenced media files exist.');
    process.exit(0);
  } else {
    console.log('❌ Missing files:');
    missing.forEach(p => console.log(' -', p));
    process.exit(1);
  }
}

main();
