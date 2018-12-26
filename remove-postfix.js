const fs = require('fs').promises;
const path = require('path');

const startPath = '/Volumes/Intenso External USB 3.0 Media/Photos';
const ignoreFiles = ['.DS_Store', '.sync.ffs_db', 'sync.ffs_lock'];

const matchRegex = /^(.*)-[0-9]\.(.*)$/;

const main = async basePath => {
  const files = await fs.readdir(basePath);

  return Promise.all(
    files.map(async file => {
      const filePath = path.join(basePath, file);

      const stats = await fs.lstat(filePath);
      if (stats.isDirectory()) {
        await main(filePath);
      } else if (!ignoreFiles.includes(file)) {
        const match = file.match(matchRegex);
        if (match) {
          const newFile = [match[1], match[2]].join('.');
          const newPath = path.join(basePath, newFile);

          let newStats;
          try {
            newStats = await fs.stat(newPath);
          } catch (err) {}
          if (
            newStats &&
            stats.size === newStats.size &&
            stats.mtimeMs === newStats.mtimeMs
          ) {
            console.error('DIFF', filePath, '->', newPath);
          } else {
            console.log(filePath, '->', newPath);
            await fs.rename(filePath, newPath);
          }
        }
      }
    }),
  );
};

(async () => {
  await main(startPath);
})();
