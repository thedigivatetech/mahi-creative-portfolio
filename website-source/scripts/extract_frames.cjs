const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const videosDir = path.join(__dirname, '..', 'public', 'portfolio', 'videos');
const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));

console.log('Videos to generate posters for:', videoFiles);

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-frame') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { filename, dataUrl } = JSON.parse(body);
        const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
        const posterName = filename.replace(/\.mp4$/i, '-poster.jpg');
        fs.writeFileSync(path.join(videosDir, posterName), Buffer.from(base64Data, 'base64'));
        console.log(`Saved poster for: ${posterName}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(500);
        res.end(e.message);
      }
    });
    return;
  }

  if (req.url.startsWith('/video/')) {
    const vName = decodeURIComponent(req.url.replace('/video/', ''));
    const filePath = path.join(videosDir, vName);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'video/mp4' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // Serve extractor HTML
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html>
<body>
  <h1>Extracting frames...</h1>
  <div id="status">Starting</div>
  <script>
    const videos = ${JSON.stringify(videoFiles)};
    async function processVideos() {
      for (const v of videos) {
        document.getElementById('status').innerText = 'Processing ' + v;
        await new Promise((resolve) => {
          const vid = document.createElement('video');
          vid.crossOrigin = 'anonymous';
          vid.src = '/video/' + encodeURIComponent(v);
          vid.muted = true;
          vid.playsInline = true;
          vid.currentTime = 1.0;
          vid.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = vid.videoWidth || 1080;
            canvas.height = vid.videoHeight || 1920;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            fetch('/save-frame', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename: v, dataUrl })
            }).then(() => resolve());
          };
          vid.onerror = (e) => {
            console.error('Error loading', v, e);
            resolve();
          };
          vid.load();
        });
      }
      document.getElementById('status').innerText = 'Done!';
      setTimeout(() => window.close(), 1000);
    }
    processVideos();
  </script>
</body>
</html>`);
});

server.listen(8999, () => {
  console.log('Frame extractor server running at http://localhost:8999');
  const browser = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    'http://localhost:8999'
  ]);

  setTimeout(() => {
    browser.kill();
    server.close();
    console.log('Frame extraction complete.');
    process.exit(0);
  }, 12000);
});
