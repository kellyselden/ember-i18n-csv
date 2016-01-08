import toCsv from './to-csv';
import toJs from './to-js';

export default function(direction, localesPath, csvPath, options) {
  switch (direction) {
    case 'to-csv':
      return toCsv(localesPath, csvPath, options);
    case 'to-js':
      return toJs(csvPath, localesPath, options);
    default:
      return Promise.reject();
  }
}
