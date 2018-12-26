const fs = require('fs').promises;
const path = require('path');
const exiftool = require('exiftool-vendored').exiftool;

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';
const targetPath = '/Volumes/Intenso External USB 3.0 Media/Photos 3';
const ignoreFiles = ['.DS_Store'];

const formatDate = date => {
  const year = String(date.year).padStart(4, '0');
  const month = String(date.month).padStart(2, '0');
  const day = String(date.day).padStart(2, '0');

  return year + '/' + month + '-' + day;
};

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

        const date = exifTags.CreateDate || exifTags.FileModifyDate;

        const newDirectory = path.join(targetPath, formatDate(date));
        await fs.mkdir(newDirectory, { recursive: true });

        const newPath = path.join(newDirectory, file);

        console.log(filePath, newPath);
        await fs.rename(filePath, newPath);
      }
    }),
  );
};

(async () => {
  await main(startPath);
  console.log('Done');
  exiftool.end();
})();
