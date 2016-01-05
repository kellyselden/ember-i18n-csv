var toCsv = require('./to-csv');
var toJs = require('./to-js');

module.exports = function(direction, localesPath, csvPath, options) {
  switch (direction) {
  case 'to-csv':
    toCsv(localesPath, csvPath, options);
    break;
  case 'to-js':
    toJs(csvPath, localesPath, options);
    break;
  }
};
