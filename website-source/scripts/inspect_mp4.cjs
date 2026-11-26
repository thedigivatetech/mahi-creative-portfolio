const fs = require('fs');
const path = require('path');

const videoDir = 'C:\\Users\\pc\\Documents\\Portfolio\\Video';

function checkStrings(filename) {
  const buf = Buffer.alloc(1024 * 512); // read 512KB from start and end
  const fd = fs.openSync(path.join(videoDir, filename), 'r');
  fs.readSync(fd, buf, 0, buf.length, 0);
  
  const stat = fs.fstatSync(fd);
  const endBuf = Buffer.alloc(1024 * 512);
  const endOffset = Math.max(0, stat.size - endBuf.length);
  fs.readSync(fd, endBuf, 0, endBuf.length, endOffset);
  fs.closeSync(fd);

  const fullStr = buf.toString('latin1') + ' ' + endBuf.toString('latin1');
  const printableMatches = fullStr.match(/[A-Za-z0-9 _-]{5,50}/g) || [];
  
  // Filter interesting keywords
  const keywords = printableMatches.filter(s => 
    /perfume|armaf|dubai|zainab|beauty|fashion|client|brand|title|artist|album|author|created|encoder|quicktime|handbrake|premiere|davinci|capcut/i.test(s)
  );
  console.log(`\n=== Keywords in ${filename} ===`);
  console.log([...new Set(keywords)].slice(0, 20));
}

checkStrings('3.mp4');
checkStrings('Birthday Video.mp4');
checkStrings('Miss Zainab is Back.mp4');
