import { expect } from 'chai';
import fs from 'fs-extra';
import { areFilesEqual, areDirsEqual } from 'fs-equal';
import emberI18nCsv from '../../lib/ember-i18n-csv';

describe('integration - ember-i18n-csv', function() {
  describe('to-csv', function() {
    beforeEach(function() {
      fs.emptyDirSync('tmp');
    });

    it('works', function() {
      return emberI18nCsv('to-csv', 'test/fixtures/locales', 'tmp/i18n.csv').then(() => {
        return areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(areSame => {
          expect(areSame).to.be.true;
        });
      });
    });

    it('handles option --only-missing', function() {
      return emberI18nCsv('to-csv', 'test/fixtures/locales-only-missing', 'tmp/i18n.csv', { onlyMissing: true }).then(() => {
        return areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n-only-missing.csv').then(areSame => {
          expect(areSame).to.be.true;
        });
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
          return areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(areSame => {
            expect(areSame).to.be.true;
          });
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
    describe('merge', function() {
      beforeEach(function() {
        fs.copySync('test/fixtures/locales-with-missing-keys', 'tmp/locales', { clobber: true });
      });

      afterEach(function() {
        fs.emptyDirSync('tmp');
      });

      it('handles option --merge', function() {
        return emberI18nCsv('to-js', 'tmp/locales', 'test/fixtures/i18n-merge.csv', { merge: true }).then(() => {
          return areDirsEqual('tmp/locales', 'test/fixtures/locales-merge').then(areSame => {
            expect(areSame).to.be.true;
          });
        });
      });
    });
    it('handles option --dotted', function() {
      return emberI18nCsv('to-js', 'tmp/locales', 'test/fixtures/i18n-dotted.csv', { dotted: true }).then(() => {
        return areDirsEqual('tmp/locales', 'test/fixtures/locales-dotted').then(areSame => {
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
