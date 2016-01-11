import fs from 'fs';
import path from 'path';
import csvStringify from 'csv-stringify';
import eol from 'eol';
import denodeify from 'denodeify';
require('6to5/register');

const readdir = denodeify(fs.readdir);
const writeFile = denodeify(fs.writeFile);
const stringify = denodeify(csvStringify);

export default function(localesPath, csvPath) {
  return readdir(localesPath).then(locales => {
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
        // debugger;
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

    for (let columnIndex in locales) {
      let locale = locales[columnIndex];
      let filePath = path.resolve(localesPath, locale, 'translations.js');
      let json = require(filePath);
      recurse(json, columnIndex, 0, '');
    }

    let lines = [];
    lines.push(['key'].concat(locales.map(locale => locale.replace('.js', ''))));
    for (let i in keys) {
      lines.push([keys[i]].concat(rows[i]));
    }

    return stringify(lines);
  }).then(csv => {
    let normalized = eol.auto(csv);
    return writeFile(csvPath, normalized);
  });
}
