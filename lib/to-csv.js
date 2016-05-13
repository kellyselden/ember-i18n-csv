import fs from 'fs';
import path from 'path';
import csvStringify from 'csv-stringify';
import eol from 'eol';
import denodeify from 'denodeify';
import map from 'lodash/map';
require('babel-register');

const readdir = denodeify(fs.readdir);
const stat = denodeify(fs.stat);
const writeFile = denodeify(fs.writeFile);
const stringify = denodeify(csvStringify);

export default function(localesPath, csvPath, { onlyMissing } = {}) {
  return readdir(localesPath).then(locales => {
    let prmoises = locales.map(locale => {
      let filePath = path.resolve(localesPath, locale, 'translations.js');
      return stat(filePath).then(() => {
        return {
          locale,
          filePath
        };
      }).catch(() => false);
    });
    return Promise.all(prmoises).then(results => {
      results = results.filter(result => result);
      return {
        locales: map(results, 'locale'),
        filePaths: map(results, 'filePath')
      };
    });
  }).then(({ locales, filePaths }) => {
    let keys = [];
    let rows = [];

    function recurse(json, columnIndex, rowIndex, currentKey) {
      for (let key in json) {
        let value = json[key];
        let newKey = currentKey;
        if (newKey) {
          newKey += '.';
        }
        newKey += key;

        if (typeof value === 'object') {
          rowIndex = recurse(value, columnIndex, rowIndex, newKey);
        } else {
          let row;
          let index = keys.indexOf(newKey);
          if (index !== -1) {
            row = rows[index];
          } else {
            row = [];
            rows.splice(rowIndex, 0, row);
            keys.splice(rowIndex, 0, newKey);
          }
          for (let i in locales) {
            if (i === columnIndex) {
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

    for (let columnIndex in filePaths) {
      let filePath = filePaths[columnIndex];
      let json = require(filePath).default;
      recurse(json, columnIndex, 0, '');
    }

    let lines = [];
    lines.push(['key'].concat(locales.map(locale => locale.replace('.js', ''))));
    for (let i in keys) {
      if (!onlyMissing || rows[i].indexOf('') > -1) {
        lines.push([keys[i]].concat(rows[i]));
      }
    }

    return stringify(lines);
  }).then(csv => {
    let normalized = eol.auto(csv);
    return writeFile(csvPath, normalized);
  });
}
