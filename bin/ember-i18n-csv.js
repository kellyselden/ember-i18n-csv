#!/usr/bin/env node
/* eslint no-var: 0 */

var emberI18nCsv = require('../dist/ember-i18n-csv').default;

var argv = require('yargs')
  .demand(1)
  .options({
    'jshint-ignore': {
      type: 'boolean'
    },
    'only-missing': {
      type: 'boolean'
    },
    'merge': {
      type: 'boolean'
    }
  })
  .argv;

var direction = argv._[0];
var localesPath = argv['locales-path'];
var csvPath = argv['csv-path'];
var ignoreJshint = argv['jshint-ignore'];
var onlyMissing = argv['only-missing'];
var merge = argv['merge'];

var options = {
  ignoreJshint: ignoreJshint,
  onlyMissing: onlyMissing,
  merge: merge
};

emberI18nCsv(direction, localesPath, csvPath, options);
