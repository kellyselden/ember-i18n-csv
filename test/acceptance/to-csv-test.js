var expect = require('chai').expect;
var test = require('../../lib/test');
var spawn = require('child_process').spawn;
var fs = require('fs-extra');

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
      'to-csv',
      'test/fixtures/locales',
      'tmp/i18n.csv'
    ]);

    var out = '';
    var err = '';
    ps.stdout.on('data', function(buffer) { out += buffer; });
    ps.stderr.on('data', function(buffer) { err += buffer; });

    ps.on('exit', function(code) {
      expect(code).to.equal(0);
      expect(out).to.equal('');
      expect(err).to.equal('');
      fs.readFile('tmp/i18n.csv', 'utf-8', function(err, actual) {
        expect(err).to.be.falsy;
        fs.readFile('test/fixtures/i18n.csv', 'utf-8', function(err, expected) {
          expect(err).to.be.falsy;
          expect(actual).to.equal(expected);
          done();
        });
      });
    });
  });
});
