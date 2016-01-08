#!/usr/bin/env node
/*eslint no-var: 0*/

var emberI18nCsv = require('../dist/ember-i18n-csv').default;

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
var ignoreJshint = argv['jshint-ignore'];

var options = {
  ignoreJshint: ignoreJshint
};

emberI18nCsv(direction, localesPath, csvPath, options);
