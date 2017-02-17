const fs = require('fs');
const path = require('path');

function resolve(currentPath, space) {

  fs.readdirSync(currentPath).forEach((file) => {

    let tempPath = path.join(currentPath, file);
    let stats = fs.statSync(tempPath);

    if (stats.isDirectory()) {
      space[file] = resolve(tempPath, {});
    } else if (stats.isFile()) {
      space[path.basename(file, '.js')] = require(path.join(__dirname, tempPath));
    }
  });

  return space;
};

module.exports = resolve('./controllers', {});
