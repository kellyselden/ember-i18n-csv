import { expect } from 'chai';
import fs from 'fs-extra';
import { areDirsEqual } from 'fs-equal';
import { expectFilesToBeEqual } from '../helpers/expect-files';
import emberI18nCsv from '../../lib/ember-i18n-csv';

describe('integration - ember-i18n-csv', function() {
  describe('to-csv', function() {
    beforeEach(function() {
      fs.emptyDirSync('tmp');
    });

    it('works', function() {
      return emberI18nCsv('to-csv', 'test/fixtures/locales', 'tmp/i18n.csv').then(() => {
        return expectFilesToBeEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv');
      });
    });

    describe('empty folders', function() {
      beforeEach(function() {
        fs.emptyDirSync('test/fixtures/locales/unknown');
      });

      afterEach(function() {
        fs.rmdirSync('test/fixtures/locales/unknown');
      });

      it('ignores empty folders', function() {
        return emberI18nCsv('to-csv', 'test/fixtures/locales', 'tmp/i18n.csv').then(() => {
          return expectFilesToBeEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv');
        });
      });
    });

    describe('missing keys', function() {
      it('handles missing keys', function() {
        return emberI18nCsv('to-csv', 'test/fixtures/locales-with-missing-keys', 'tmp/i18n.csv').then(() => {
          return expectFilesToBeEqual('tmp/i18n.csv', 'test/fixtures/missing-keys.csv');
        });
      });
    });
  });

  describe('to-js', function() {
    beforeEach(function() {
      fs.emptyDirSync('tmp/locales');
    });

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

    describe('missing keys', function() {
      it('handles missing keys', function() {
        return emberI18nCsv('to-js', 'tmp/locales', 'test/fixtures/missing-keys.csv').then(() => {
          return areDirsEqual('tmp/locales', 'test/fixtures/locales-with-missing-keys').then(areSame => {
            expect(areSame).to.be.true;
          });
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
