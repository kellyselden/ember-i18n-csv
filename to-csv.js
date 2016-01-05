var argv = require('yargs').argv;
var toCsv = require('./lib/to-csv');

var localesPath = argv._[0];
var csvPath = argv._[1];

toCsv(localesPath, csvPath);
