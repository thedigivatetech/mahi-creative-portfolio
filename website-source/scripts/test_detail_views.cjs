const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function checkUrl(url, expectedPatterns) {
  return new Promise((resolve) => {
    const proc = spawn(edgePath, [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--dump-dom',
      url
    ]);
    let html = '';
    proc.stdout.on('data', d => html += d);
    proc.on('close', () => {
      let passed = true;
      console.log(`\nTesting URL: ${url}`);
      for (const { name, regex } of expectedPatterns) {
        const ok = regex.test(html);
        console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${name}`);
        if (!ok) passed = false;
      }
      resolve(passed);
    });
  });
}

async function run() {
  const modalOk = await checkUrl('http://localhost:4173/?project=beautyworld-dubai', [
    { name: 'Modal Dialog role', regex: /role="dialog"/ },
    { name: 'Modal Project Title', regex: /Beautyworld Dubai/ },
    { name: 'The Brief section', regex: /The Brief/ },
    { name: 'Strategic Objective section', regex: /Strategic Objective/ },
    { name: 'Creative Concept section', regex: /Creative Concept/ },
    { name: 'My Contribution section', regex: /My Contribution/ },
    { name: 'Verified Performance Results', regex: /Verified Performance Results/ },
    { name: 'Related Projects section', regex: /Related Projects/ },
    { name: 'Video Player with controls', regex: /Video player: Beautyworld Dubai/ },
  ]);

  const pageOk = await checkUrl('http://localhost:4173/work/dominos-pizza-social-media', [
    { name: 'Page Case Study Heading', regex: /Domino's Pizza/ },
    { name: 'The Brief section', regex: /The Brief/ },
    { name: 'Deliverable View counter', regex: /Asset 1 of 21/ },
    { name: 'Verified Performance Results', regex: /Verified Performance Results/ },
    { name: 'Related Case Studies', regex: /Related Case Studies/ },
  ]);

  if (modalOk && pageOk) {
    console.log('\nBoth Project Modal and Dedicated Project Page tests passed flawlessly!');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
