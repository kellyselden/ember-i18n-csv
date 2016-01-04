var dirCompare = require('dir-compare');

var options = {
  compareContent: true
};

module.exports = function(path1, path2) {
  return new Promise(function(resolve) {
    var result = dirCompare.compareSync(path1, path2, options);
    resolve(result.same);
  });
};
