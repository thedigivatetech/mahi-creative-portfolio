// verify-project-media.ts
// This script checks that all file paths referenced in projectsData.ts actually exist on disk.
import { promises as fs } from 'fs';
import path from 'path';
import { portfolioProjects } from '../src/data/projectsData.ts';

async function fileExists(p: string) {
  try {
    await fs.access(path.join('C:/Users/pc/Documents/Mahi-Portfolio/website-source/public', p));
    return true;
  } catch {
    return false;
  }
}

async function verify() {
  const missing: string[] = [];
  for (const p of portfolioProjects) {
    const checks: [string, string?][] = [
      ['thumbnail', p.thumbnail],
      ['poster', p.poster],
      ['fallbackThumbnail', p.fallbackThumbnail],
      ['mediaUrl', p.mediaUrl],
    ];
    for (const [label, relPath] of checks) {
      if (relPath) {
        const exists = await fileExists(relPath);
        if (!exists) missing.push(`${p.id} – ${label}: ${relPath}`);
      }
    }
    if (p.gallery) {
      for (const g of p.gallery) {
        const exists = await fileExists(g);
        if (!exists) missing.push(`${p.id} – gallery: ${g}`);
      }
    }
  }
  if (missing.length === 0) {
    console.log('✅ All referenced media files exist.');
  } else {
    console.log('❌ Missing files:');
    for (const m of missing) console.log(' -', m);
    process.exit(1);
  }
}

verify();
