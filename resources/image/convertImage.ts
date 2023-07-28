import fs from 'fs';

// 👇️ if you use CommonJS require()
// const fs = require('fs')

function toBase64(filePath: fs.PathOrFileDescriptor) {
  const img = fs.readFileSync(filePath);

  return Buffer.from(img).toString('base64');
}

const base64String = toBase64('./house.png');
console.log(base64String);

const withPrefix = 'data:image/png;base64,' + base64String;
console.log(withPrefix);