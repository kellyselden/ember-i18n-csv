import { expect } from 'chai';
import { spawn } from 'child_process';

describe('acceptance - invalid', function() {
  this.timeout(30000);

  it('handles invalid', function(done) {
    let ps = spawn(process.execPath, [
      'bin/ember-i18n-csv.js'
    ]);

    let out = '';
    let err = '';
    ps.stdout.on('data', buffer => out += buffer);
    ps.stderr.on('data', buffer => err += buffer);

    ps.on('exit', () => {
      expect(out).to.equal('');
      expect(err).to.contain('Not enough non-option arguments: got 0, need at least 1');
      done();
    });
  });
});
