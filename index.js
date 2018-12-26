const fs = require('fs').promises;
const path = require('path');
const exiftool = require('exiftool-vendored').exiftool;

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';

exiftool
  .version()
  .then(version => console.log(`We're running ExifTool v${version}`));

const main = async basePath => {
  const files = await fs.readdir(basePath);

  files.forEach(async file => {
    const filePath = path.join(basePath, file);

    console.log(filePath);

    const stats = await fs.lstat(filePath);
    if (stats.isDirectory()) {
      main(filePath);
    }
  });
};

main(startPath);
