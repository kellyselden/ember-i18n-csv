import { expect } from 'chai';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import { areDirsEqual } from 'fs-equal';

describe('acceptance - to-js', function() {
  this.timeout(30000);

  beforeEach(function() {
    fs.emptyDirSync('tmp/locales');
  });

  it('works', function(done) {
    let ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js',
      'to-js',
      '--csv-path=test/fixtures/i18n.csv',
      '--locales-path=tmp/locales'
    ]);

    let out = '';
    let err = '';
    ps.stdout.on('data', buffer => out += buffer);
    ps.stderr.on('data', buffer => err += buffer);

    ps.on('exit', () => {
      expect(out).to.equal('');
      expect(err).to.equal('');
      areDirsEqual('tmp/locales', 'test/fixtures/locales').then(areSame => {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });

  it('handles option --jshint-ignore', function(done) {
    let ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js',
      'to-js',
      '--csv-path=test/fixtures/i18n.csv',
      '--locales-path=tmp/locales',
      '--jshint-ignore'
    ]);

    let out = '';
    let err = '';
    ps.stdout.on('data', buffer => out += buffer);
    ps.stderr.on('data', buffer => err += buffer);

    ps.on('exit', () => {
      expect(out).to.equal('');
      expect(err).to.equal('');
      areDirsEqual('tmp/locales', 'test/fixtures/locales-jshint-ignore').then(areSame => {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });

  it('handles option --merge', function(done) {
    fs.copySync('test/fixtures/locales-with-missing-keys', 'tmp/locales', { clobber: true });
    let ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js',
      'to-js',
      '--csv-path=test/fixtures/i18n-merge.csv',
      '--locales-path=tmp/locales',
      '--merge'
    ]);

    let out = '';
    let err = '';
    ps.stdout.on('data', buffer => out += buffer);
    ps.stderr.on('data', buffer => err += buffer);

    ps.on('exit', () => {
      expect(out).to.equal('');
      expect(err).to.equal('');
      areDirsEqual('tmp/locales', 'test/fixtures/locales-merge').then(areSame => {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });

  it('handles option --dotted', function(done) {
    let ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js',
      'to-js',
      '--csv-path=test/fixtures/i18n.csv',
      '--locales-path=tmp/locales',
      '--dotted'
    ]);

    let out = '';
    let err = '';
    ps.stdout.on('data', buffer => out += buffer);
    ps.stderr.on('data', buffer => err += buffer);

    ps.on('exit', () => {
      expect(out).to.equal('');
      expect(err).to.equal('');
      areDirsEqual('tmp/locales', 'test/fixtures/locales-dotted').then(areSame => {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });
});
