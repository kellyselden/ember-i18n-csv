var expect = require('chai').expect;
var test = require('../../lib/test');
var spawn = require('child_process').spawn;
var fs = require('fs-extra');
var compareFiles = require('../helpers/compare-files');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      test();
      expect([1,2,3].indexOf(5)).to.equal(-1);
      expect([1,2,3].indexOf(0)).to.equal(-1);
    });
  });
});

describe('to-csv', function() {
  beforeEach(function() {
    fs.emptyDirSync('tmp');
  });

  it('works', function(done) {
    var ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js',
      'to-csv',
      '--locales-path=test/fixtures/locales',
      '--csv-path=tmp/i18n.csv'
    ]);

    var out = '';
    var err = '';
    ps.stdout.on('data', function(buffer) { out += buffer; });
    ps.stderr.on('data', function(buffer) { err += buffer; });

    ps.on('exit', function() {
      expect(out).to.equal('');
      expect(err).to.equal('');
      compareFiles('tmp/i18n.csv', 'test/fixtures/i18n.csv').then(function(areSame) {
        expect(areSame).to.be.true;
        done();
      }).catch(done);
    });
  });
});
