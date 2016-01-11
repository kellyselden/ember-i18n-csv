import { expect } from 'chai';
import fs from 'fs-extra';
import { areDirsEqual } from 'fs-equal';
import toJs from '../../lib/to-js';

describe('integration - to-js', function() {
  beforeEach(function() {
    fs.emptyDirSync('tmp/locales');
  });

  it('works', function() {
    return toJs('test/fixtures/i18n.csv', 'tmp/locales').then(() => {
      return areDirsEqual('tmp/locales', 'test/fixtures/locales').then(areSame => {
        expect(areSame).to.be.true;
      });
    });
  });

  it('handles option --jshint-ignore', function() {
    return toJs('test/fixtures/i18n.csv', 'tmp/locales', { ignoreJshint: true }).then(() => {
      return areDirsEqual('tmp/locales', 'test/fixtures/locales-jshint-ignore').then(areSame => {
        expect(areSame).to.be.true;
      });
    });
  });
});
