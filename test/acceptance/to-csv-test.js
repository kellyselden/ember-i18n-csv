var expect = require('chai').expect;
var test = require('../../lib/test');
var spawn = require('child_process').spawn;
// var path = require('path');
var fs = require('fs');

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
  it('should return -1 when the value is not present', function(done) {
    this.timeout(5000);
    // process.chdir(__dirname);

    fs.mkdir('tmp', function(err) {
      expect(err).to.be.falsy;

      var ps = spawn(process.execPath, [
        // path.resolve(__dirname, '../bin/cmd.js'),
        'to-csv',
        'test/fixtures/locales',
        'tmp/i18n.csv'
      ]);

      var out = '';
      err = '';
      ps.stdout.on('data', function(buffer) { out += buffer; });
      ps.stderr.on('data', function(buffer) { err += buffer; });

      ps.on('exit', function(code) {
        // console.log(out);
        expect(err).to.be.falsy;
        expect(code).to.equal(1);
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
});
