import { expect } from 'chai';
import fs from 'fs-extra';
import { areFilesEqual, areDirsEqual } from 'fs-equal';
import emberI18nCsv from '../../lib/ember-i18n-csv';

describe('integration - ember-i18n-csv', function() {
  beforeEach(function() {
    fs.emptyDirSync('tmp');
    fs.ensureDirSync('tmp/locales');
  });

  describe('to-csv', function() {
    it('works', function() {
      return emberI18nCsv('to-csv', 'test/fixtures/locales', 'tmp/i18n.csv').then(() => {
        return areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(areSame => {
          expect(areSame).to.be.true;
        });
      });
    });
  });

  describe('to-js', function() {
    it('works', function() {
      return emberI18nCsv('to-js', 'tmp/locales', 'test/fixtures/i18n.csv').then(() => {
        return areDirsEqual('tmp/locales', 'test/fixtures/locales').then(areSame => {
          expect(areSame).to.be.true;
        });
      });
    });

    it('handles option --jshint-ignore', function() {
      return emberI18nCsv('to-js', 'tmp/locales', 'test/fixtures/i18n.csv', { ignoreJshint: true }).then(() => {
        return areDirsEqual('tmp/locales', 'test/fixtures/locales-jshint-ignore').then(areSame => {
          expect(areSame).to.be.true;
        });
      });
    });
  });

  it('handles invalid', function() {
    return emberI18nCsv().catch(() => {
      expect(true).to.be.true;
    });
  });
});
