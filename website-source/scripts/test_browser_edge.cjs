const { spawn } = require('child_process');
const http = require('http');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testHeadlessEdge() {
  console.log('Launching Microsoft Edge headless to test rendered DOM...');
  const proc = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--dump-dom',
    'http://localhost:4173/'
  ]);

  let html = '';
  let err = '';

  proc.stdout.on('data', d => html += d);
  proc.stderr.on('data', d => err += d);

  proc.on('close', code => {
    console.log('Edge exited with code:', code);
    
    // Check for essential elements rendered by React
    const checks = [
      { name: 'Gallery Section', regex: /id="work"/ },
      { name: 'Selected Works & Case Studies heading', regex: /Selected Works (&amp;|&) Case Studies/ },
      { name: 'Category: All Work', regex: /All Work/ },
      { name: 'Category: Video & Reels', regex: /Video (&amp;|&) Reels/ },
      { name: 'Category: Graphic Design', regex: /Graphic Design/ },
      { name: 'Category: Advertising Campaigns', regex: /Advertising Campaigns/ },
      { name: 'Category: Creative Strategy', regex: /Creative Strategy/ },
      { name: 'Beautyworld Dubai Project Card', regex: /Beautyworld Dubai/ },
      { name: 'Blue Sapphire Project Card', regex: /Blue Sapphire/ },
      { name: 'Domino\'s Pizza Project Card', regex: /Domino's Pizza/ },
      { name: 'Runner Properties Project Card', regex: /Runner Properties/ },
      { name: 'Petronas Bangladesh Project Card', regex: /Petronas Bangladesh/ },
      { name: 'Aurela Project Card', regex: /Aurela/ },
      { name: 'May Day Project Card', regex: /May Day/ },
    ];

    let allPassed = true;
    for (const c of checks) {
      const passed = c.regex.test(html);
      console.log(`[${passed ? 'PASS' : 'FAIL'}] ${c.name}`);
      if (!passed) allPassed = false;
    }

    if (allPassed) {
      console.log('\nAll 14 React client-rendered verification checks passed!');
      process.exit(0);
    } else {
      console.error('\nSome checks failed. Rendered HTML length:', html.length);
      process.exit(1);
    }
  });
}

testHeadlessEdge();
