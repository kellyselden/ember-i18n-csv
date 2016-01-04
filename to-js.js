var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');
var eol = require('eol');
var argv = require('yargs').argv;

var csvPath = argv._[0];
var localesPath = argv._[1];
var ignoreJshint = argv['jshint-ignore'];

var csv = fs.readFileSync(csvPath, 'utf8');

parse(csv, function(err, lines) {
  var i, columnIndex;
  var locales = lines.shift().slice(1);

  var objs = [];
  for (i in locales) {
    objs.push({});
  }

  function recurse(keySections, obj, value) {
    var key = keySections[0];
    if (keySections.length > 1) {
      if (!obj[key]) {
        obj[key] = {};
      }
      recurse(keySections.slice(1), obj[key], value);
    } else {
      obj[key] = value;
    }
  }

  for (i in lines) {
    var line = lines[i];
    var key = line.shift();
    var keySections = key.split('.');
    for (columnIndex in line) {
      var obj = objs[columnIndex];
      var value = line[columnIndex];
      recurse(keySections, obj, value);
    }
  }

  for (columnIndex in locales) {
    var locale = locales[columnIndex];
    var localePath = path.join(localesPath, locale);
    if (!fs.existsSync(localePath)) {
      fs.mkdirSync(localePath);
    }
    var filePath = path.join(localePath,  'translations.js');
    var jsonString = JSON.stringify(objs[columnIndex], null, 2);
    var string = 'export default ' + jsonString + ';\n';
    if (ignoreJshint) {
      string = '/* jshint ignore:start */\n\n' + string + '\n/* jshint ignore:end */\n';
    }
    string = eol.auto(string);
    fs.writeFileSync(filePath, string);
  }
});
