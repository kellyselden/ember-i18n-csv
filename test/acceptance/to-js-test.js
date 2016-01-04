var expect = require('chai').expect;
var spawn = require('child_process').spawn;
var fs = require('fs-extra');
var compareDirs = require('../helpers/compare-dirs');

describe('to-js', function() {
  beforeEach(function() {
    fs.emptyDirSync('tmp/locales');
  });

  it('works', function(done) {
    var ps = spawn(process.execPath, [
      'to-js',
      'test/fixtures/i18n.csv',
      'tmp/locales'
    ]);

    var out = '';
    var err = '';
    ps.stdout.on('data', function(buffer) { out += buffer; });
    ps.stderr.on('data', function(buffer) { err += buffer; });

    ps.on('exit', function() {
      expect(out).to.equal('');
      expect(err).to.equal('');
      compareDirs('tmp/locales', 'test/fixtures/locales').then(function(areSame) {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });

  it('handles option --jshint-ignore', function(done) {
    var ps = spawn(process.execPath, [
      'to-js',
      'test/fixtures/i18n.csv',
      'tmp/locales',
      '--jshint-ignore'
    ]);

    var out = '';
    var err = '';
    ps.stdout.on('data', function(buffer) { out += buffer; });
    ps.stderr.on('data', function(buffer) { err += buffer; });

    ps.on('exit', function() {
      expect(out).to.equal('');
      expect(err).to.equal('');
      compareDirs('tmp/locales', 'test/fixtures/locales').then(function(areSame) {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });
});
