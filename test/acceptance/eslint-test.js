var expect = require('chai').expect;
var CLIEngine = require('eslint').CLIEngine;

var cli = new CLIEngine();

var report = cli.executeOnFiles(["**/*.js"]);
report.results.forEach(function(result) {
  describe('eslint - ' + result.filePath, function() {
    // it('passes', function() {
    //   expect(result.messages.length).to.equal(0);
    //   expect(result.errorCount).to.equal(0);
    //   expect(result.warningCount).to.equal(0);
    // });
  });
});
