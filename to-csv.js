var fs = require('fs');
var path = require('path');
var stringify = require('csv-stringify');
require('6to5/register');

var localesPath = process.argv[2];
var csvPath = process.argv[3];

var locales = fs.readdirSync(localesPath, 'utf8');

var keys = [];
var rows = [];

function recurse(json, columnIndex, rowIndex, currentKey) {
  for (var key in json) {
    var value = json[key];
    var newKey = currentKey;
    if (newKey) {
      newKey += '.';
    }
    newKey += key;
    if (typeof value === 'object') {
      rowIndex = recurse(value, columnIndex, rowIndex, newKey);
    } else {
      var row;
      var index = keys.indexOf(newKey);
      if (index !== -1) {
        row = rows[index];
      } else {
        row = [];
        rows.splice(rowIndex, 0, row);
        keys.splice(rowIndex, 0, newKey);
      }
      for (var i in locales) {
        if (i == columnIndex) {
          row[i] = value;
        } else if (!row[i]) {
          row[i] = '';
        }
      }
      rowIndex++;
    }
  }
  return rowIndex;
}

for (var columnIndex in locales) {
  var locale = locales[columnIndex];
  var filePath = path.join(localesPath, locale, 'translations.js');
  if (!path.isAbsolute(filePath)) {
    filePath = './' + filePath;
  }
  var json = require(filePath);
  recurse(json, columnIndex, 0, '');
}

var lines = [];
lines.push(['key'].concat(locales.map(function(locale) { return locale.replace('.js', ''); })));
for (var i in keys) {
  lines.push([keys[i]].concat(rows[i]));
}

stringify(lines, function(err, csv) {
  fs.writeFileSync(csvPath, csv, 'utf8');
});
