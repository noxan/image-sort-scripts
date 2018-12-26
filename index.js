const fs = require('fs');
const path = require('path');
const exiftool = require('exiftool-vendored').exiftool;

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';

exiftool
  .version()
  .then(version => console.log(`We're running ExifTool v${version}`));

const main = basePath => {
  const directories = fs.readdirSync(basePath);

  directories.forEach(directory => {
    const directoryPath = path.join(basePath, directory);
    const stats = fs.lstatSync(directoryPath);
    if (stats.isDirectory) {
      main(directoryPath);
    }
  });

  console.log(directories);
};

main(startPath);
