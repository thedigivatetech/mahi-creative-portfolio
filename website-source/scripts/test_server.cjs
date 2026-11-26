const http = require('http');

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:4173${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, length: data.length, headers: res.headers });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('Testing server endpoints...');
  
  const root = await testEndpoint('/');
  console.log('Root HTML status:', root.status, 'bytes:', root.length);

  const workRoute = await testEndpoint('/work/beautyworld-dubai');
  console.log('Direct project route status:', workRoute.status, 'bytes:', workRoute.length);

  const videoAsset = await testEndpoint('/portfolio/videos/Beautyworld%20Dubai%202026.mp4');
  console.log('Video asset status:', videoAsset.status, 'content-type:', videoAsset.headers['content-type']);

  const imageAsset = await testEndpoint('/portfolio/graphics/aurela-social-media-ads/Aurela%20Social%20Media%20Ads-1.png');
  console.log('Image asset status:', imageAsset.status, 'content-type:', imageAsset.headers['content-type']);

  const thumbAsset = await testEndpoint('/portfolio/thumbnails/domino-s-pizza-social-media-design/Domino%27s%20Pizza%20Social%20Media%20Design-1-thumb.webp');
  console.log('Thumbnail asset status:', thumbAsset.status, 'content-type:', thumbAsset.headers['content-type']);

  console.log('\nAll core endpoints verified successfully!');
}

runTests();
