const fs = require('fs').promises;
const path = require('path');
const exiftool = require('exiftool-vendored').exiftool;

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';

const main = async basePath => {
  const files = await fs.readdir(basePath);

  files.forEach(async file => {
    const filePath = path.join(basePath, file);

    const stats = await fs.lstat(filePath);
    if (stats.isDirectory()) {
      main(filePath);
    } else {
      const exifTags = await exiftool.read(filePath);
      console.log(filePath, exifTags);
    }
  });
};

main(startPath);
