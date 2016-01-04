var fs = require('fs');

module.exports = function(file1, file2) {
  return new Promise(function(resolve) {
    fs.readFile(file1, 'utf-8', function(err, file1) {
      fs.readFile(file2, 'utf-8', function(err, file2) {
        resolve(file1 === file2);
      });
    });
  });
};
