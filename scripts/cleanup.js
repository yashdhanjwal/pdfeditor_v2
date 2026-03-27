const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const CONVERTED_DIR = path.join(__dirname, '../converted');
const MAX_AGE = 60 * 60 * 1000; // 1 hour

function cleanupDirectory(directory) {
  if (!fs.existsSync(directory)) return;

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', directory, err);
      return;
    }

    const now = Date.now();
    files.forEach(file => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error stating file:', filePath, err);
          return;
        }

        if (now - stats.mtimeMs > MAX_AGE) {
          fs.unlink(filePath, err => {
            if (err) {
              console.error('Error deleting file:', filePath, err);
            } else {
              console.log('Deleted old file:', filePath);
            }
          });
        }
      });
    });
  });
}

console.log('Starting cleanup...');
cleanupDirectory(UPLOADS_DIR);
cleanupDirectory(CONVERTED_DIR);
