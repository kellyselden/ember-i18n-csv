var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');
var EOL = require('os').EOL;
var argv = require('yargs').argv;

var csvPath = argv._[0];
var localesPath = argv._[1];
var ignoreJshint = argv['jshint-ignore'];

var csv = fs.readFileSync(csvPath, 'utf8');

parse(csv, function(err, lines) {
  var locales = lines.shift().slice(1);

  var objs = [];
  for (var i in locales) {
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

  for (var i in lines) {
    var line = lines[i];
    var key = line.shift();
    var keySections = key.split('.');
    for (var columnIndex in line) {
      var obj = objs[columnIndex];
      var value = line[columnIndex];
      recurse(keySections, obj, value);
    }
  }

  for (var columnIndex in locales) {
    var locale = locales[columnIndex];
    var filePath = path.join(localesPath, locale,  'translations.js');
    var jsonString = JSON.stringify(objs[columnIndex], null, 2);
    var string = 'export default ' + jsonString + ';' + EOL;
    if (ignoreJshint) {
      string = '/* jshint ignore:start */' + EOL + EOL + string + EOL + '/* jshint ignore:end */' + EOL;
    }
    fs.writeFileSync(filePath, string);
  }
});
