const exiftool = require('exiftool-vendored').exiftool;

exiftool
  .version()
  .then(version => console.log(`We're running ExifTool v${version}`));
