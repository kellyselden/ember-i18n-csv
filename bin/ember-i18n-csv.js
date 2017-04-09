#!/usr/bin/env node
'use strict';

const emberI18nCsv = require('../dist/ember-i18n-csv').default;

let argv = require('yargs')
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
    },
    'dotted': {
      type: 'boolean'
    }
  })
  .argv;

let direction = argv._[0];
let localesPath = argv['locales-path'];
let csvPath = argv['csv-path'];
let ignoreJshint = argv['jshint-ignore'];
let onlyMissing = argv['only-missing'];
let merge = argv['merge'];
let dotted = argv['dotted'];

let options = {
  ignoreJshint,
  onlyMissing,
  merge,
  dotted
};

emberI18nCsv(direction, localesPath, csvPath, options);
