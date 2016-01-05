#!/usr/bin/env node

var emberI18nCsv = require('../lib/ember-i18n-csv');

var argv = require('yargs')
  .options({
    'jshint-ignore': {
      type: 'boolean'
    }
  })
  .argv;

var direction = argv._[0];
var localesPath = argv['locales-path'];
var csvPath = argv['csv-path'];
var jshintIgnore = argv['jshint-ignore'];

var options = {
  jshintIgnore: jshintIgnore
};

emberI18nCsv(direction, localesPath, csvPath, options);
