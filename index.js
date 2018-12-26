const fs = require('fs').promises;
const path = require('path');
const exiftool = require('exiftool-vendored').exiftool;

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';
const ignoreFiles = ['.DS_Store'];

const main = async basePath => {
  const files = await fs.readdir(basePath);

  return Promise.all(
    files.map(async file => {
      const filePath = path.join(basePath, file);

      const stats = await fs.lstat(filePath);
      if (stats.isDirectory()) {
        await main(filePath);
      } else if (!ignoreFiles.includes(file)) {
        const exifTags = await exiftool.read(filePath);
        console.log(filePath, exifTags.CreateDate);
      }
    }),
  );
};

(async () => {
  await main(startPath);
  console.log('Done');
})();
