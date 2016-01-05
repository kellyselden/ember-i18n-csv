var argv = require('yargs').argv;
var toJs = require('./lib/to-js');

var csvPath = argv._[0];
var localesPath = argv._[1];
var ignoreJshint = argv['jshint-ignore'];

toJs(csvPath, localesPath, ignoreJshint);
