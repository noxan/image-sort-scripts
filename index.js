const fs = require('fs').promises;
const path = require('path');
const exiftool = require('exiftool-vendored').exiftool;

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';

exiftool
  .version()
  .then(version => console.log(`We're running ExifTool v${version}`));

const main = async basePath => {
  const directories = await fs.readdir(basePath);

  directories.forEach(async directory => {
    const directoryPath = path.join(basePath, directory);
    const stats = await fs.lstat(directoryPath);
    if (stats.isDirectory) {
      main(directoryPath);
    }
  });

  console.log(directories);
};

main(startPath);
