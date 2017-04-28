import fs from 'fs-extra';
import path from 'path';
import csvParse from 'csv-parse';
import eol from 'eol';
import denodeify from 'denodeify';
import Promise from 'promise';
import parseJsonFromJsFile from './utils/parse-json-from-js-file';

const {
  readFile,
  writeFile
} = fs;

const parse = denodeify(csvParse);

export default function(csvPath, localesPath, { ignoreJshint, merge, dotted } = {}) {
  return readFile(csvPath, 'utf8').then(csv => {
    return parse(csv);
  }).then(lines => {
    let i, columnIndex;
    let locales = lines.shift().slice(1);

    let objs = [];
    for (i in locales) {
      let obj = {};
      if (merge) {
        let filePath = path.resolve(localesPath, locales[i], 'translations.js');
        if (fs.existsSync(filePath)) {
          obj = parseJsonFromJsFile(filePath);
        }
      }
      objs.push(obj);
    }

    function recurse(keySections, obj, value) {
      let key = keySections[0];
      if (keySections.length > 1) {
        if (!obj[key]) {
          obj[key] = {};
        }
        recurse(keySections.slice(1), obj[key], value);
      } else {
        obj[key] = value;
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
          obj[key] = value;
        } else {
          recurse(keySections, obj, value);
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
