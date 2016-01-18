import { expect } from 'chai';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import { areFilesEqual } from 'fs-equal';

describe('acceptance - to-csv', function() {
  this.timeout(30000);

  beforeEach(function() {
    fs.emptyDirSync('tmp');
  });

  it('works', function(done) {
    let ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js',
      'to-csv',
      '--locales-path=test/fixtures/locales',
      '--csv-path=tmp/i18n.csv'
    ]);

    let out = '';
    let err = '';
    ps.stdout.on('data', buffer => out += buffer);
    ps.stderr.on('data', buffer => err += buffer);

    ps.on('exit', () => {
      expect(out).to.equal('');
      expect(err).to.equal('');
      areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(areSame => {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });

  describe('empty folders', function() {
    beforeEach(function() {
      fs.emptyDirSync('test/fixtures/locales/unknown');
    });

    afterEach(function() {
      fs.rmdirSync('test/fixtures/locales/unknown');
    });

    it('ignores empty folders', function(done) {
      let ps = spawn(process.execPath, [
        'bin/ember-i18n-csv.js',
        'to-csv',
        '--locales-path=test/fixtures/locales',
        '--csv-path=tmp/i18n.csv'
      ]);

      let out = '';
      let err = '';
      ps.stdout.on('data', buffer => out += buffer);
      ps.stderr.on('data', buffer => err += buffer);

      ps.on('exit', () => {
        expect(out).to.equal('');
        expect(err).to.equal('');
        areFilesEqual('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(areSame => {
          expect(areSame).to.be.true;
          done();
        }).catch(done);
      });
    });
  });
});
