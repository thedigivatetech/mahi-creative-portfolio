const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const videosDir = path.join(__dirname, '..', 'public', 'portfolio', 'videos');
const postersDir = path.join(__dirname, '..', 'public', 'portfolio', 'video-posters');
fs.mkdirSync(postersDir, { recursive: true });

const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));

console.log('Videos to generate static posters for:', videoFiles);

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-poster') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { filename, dataUrl } = JSON.parse(body);
        const base64Data = dataUrl.replace(/^data:image\/(jpeg|png);base64,/, '');
        const posterName = filename.replace(/\.mp4$/i, '-poster.jpg');
        fs.writeFileSync(path.join(postersDir, posterName), Buffer.from(base64Data, 'base64'));
        console.log(`[SUCCESS] Saved poster: ${posterName}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        console.error('Error saving poster:', e);
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
      const stat = fs.statSync(filePath);
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 1024 * 1024 * 4, stat.size - 1);
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        });
        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes'
        });
        fs.createReadStream(filePath).pipe(res);
      }
      return;
    }
  }

  // Extractor page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html>
<head><title>Poster Generator</title></head>
<body style="background:#111; color:#eee;">
  <h2>Generating static poster images...</h2>
  <div id="log"></div>
  <script>
    const videos = ${JSON.stringify(videoFiles)};
    const log = document.getElementById('log');

    async function extractAll() {
      for (const v of videos) {
        log.innerText = 'Extracting: ' + v;
        await new Promise((resolve) => {
          const video = document.createElement('video');
          video.crossOrigin = 'anonymous';
          video.src = '/video/' + encodeURIComponent(v);
          video.muted = true;
          video.playsInline = true;
          video.preload = 'auto';

          let captured = false;
          const captureFrame = () => {
            if (captured) return;
            captured = true;
            try {
              const canvas = document.createElement('canvas');
              const w = video.videoWidth || 1280;
              const h = video.videoHeight || 720;
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, w, h);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
              fetch('/save-poster', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: v, dataUrl })
              }).then(() => {
                video.remove();
                resolve();
              }).catch(e => {
                console.error(e);
                resolve();
              });
            } catch (err) {
              console.error('Canvas error:', err);
              resolve();
            }
          };

          video.onloadeddata = () => {
            // seek 1 second into video for a great representative frame
            try {
              video.currentTime = Math.min(1.5, (video.duration || 3) / 2);
            } catch(e) {
              captureFrame();
            }
          };

          video.onseeked = () => {
            captureFrame();
          };

          video.onerror = (e) => {
            console.error('Error on video', v, e);
            resolve();
          };

          // Timeout fallback in case seek fails
          setTimeout(() => {
            if (!captured) captureFrame();
          }, 3500);

          video.load();
        });
      }
      log.innerText = 'Completed all posters!';
      setTimeout(() => window.close(), 1000);
    }
    extractAll();
  </script>
</body>
</html>`);
});

server.listen(9876, () => {
  console.log('Server started on http://localhost:9876. Launching Edge...');
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    'http://localhost:9876'
  ]);

  setTimeout(() => {
    edge.kill();
    server.close();
    console.log('Poster generation script completed.');
    process.exit(0);
  }, 22000);
});
