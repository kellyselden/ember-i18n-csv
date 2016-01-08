import { expect } from 'chai';
import fs from 'fs-extra';
import { areFilesEqual } from 'fs-equal';
import toCsv from '../../lib/to-csv';

describe('integration - to-csv', function() {
  beforeEach(function() {
    fs.emptyDirSync('tmp');
  });

  it('works', function() {
    return toCsv('test/fixtures/locales', 'tmp/i18n.csv').then(() => {
      return areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(areSame => {
        expect(areSame).to.be.true;
      });
    });
  });
});
