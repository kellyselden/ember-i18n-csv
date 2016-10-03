import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import eol from 'eol';
import denodeify from 'denodeify';
import Promise from 'promise';
import parseJsonFromJsFile from './utils/parse-json-from-js-file';

const readFile = denodeify(fs.readFile);
const writeFile = denodeify(fs.writeFile);
const parse = denodeify(csvParse);

export default function(csvPath, localesPath, { ignoreJshint, merge, dotted } = {}) {
  return readFile(csvPath, 'utf8').then(csv => {
    return parse(csv);
  }).then(lines => {
    let i, columnIndex;
    let locales = lines.shift().slice(1);

    let objs = [];
    var missingTranslationsCounts = [];
    var totalTranslationsCounts = [];
    for (i in locales) {
      let obj = {};
      if (merge) {
        let filePath = path.resolve(localesPath, locales[i], 'translations.js');
        if (fs.existsSync(filePath)) {
          obj = parseJsonFromJsFile(filePath);
        }
      }
      objs.push(obj);
      missingTranslationsCounts[i] = 0;
      totalTranslationsCounts[i] = 0;
    }

    function recurse(keySections, obj, value, localeIndex) {
      let key = keySections[0];
      if (keySections.length > 1) {
        if (!obj[key]) {
          obj[key] = {};
        }
        recurse(keySections.slice(1), obj[key], value, localeIndex);
      } else {
        totalTranslationsCounts[localeIndex]++;
        if (value.length === 0) {
          missingTranslationsCounts[localeIndex]++;
          obj[_key] = null;
        } else {
          obj[_key] = value;
        }
      }
    }

    for (i in lines) {
      let line = lines[i];
      let key = line.shift();
      let keySections = key.split('.');
      for (columnIndex in line) {
        let obj = objs[columnIndex];
        let value = line[columnIndex];
        if (dotted) {
          totalTranslationsCounts[localeIndex]++;
          obj[key] = value;
        } else {
          recurse(keySections, obj, value, columnIndex);
        }
      }
    }

    let promises = [];
    for (columnIndex in locales) {
      let locale = locales[columnIndex];
      let localePath = path.join(localesPath, locale);
      if (!fs.existsSync(localePath)) {
        fs.mkdirSync(localePath);
      }
      let filePath = path.join(localePath,  'translations.js');
      let jsonString = JSON.stringify(objs[columnIndex], null, 2);
      let string = 'export default ' + jsonString + ';\n';
      if (ignoreJshint) {
        string = '/* jshint ignore:start */\n\n' + string + '\n/* jshint ignore:end */\n';
      }
      string = eol.auto(string);
      promises.push(writeFile(filePath, string));
    }
    return Promise.all(promises);
  });
}
