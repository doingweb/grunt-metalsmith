'use strict';

var grunt = require('grunt');
var ndd = require('node-dir-diff');
var path = require('path');

exports.metalsmith = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  no_plugins: function(test) {
    test.expect(1);

    var diff = new ndd.Dir_Diff([
      path.resolve('test/expected/no_plugins'),
      path.resolve('tmp/no_plugins')
    ]);

    diff.compare(function (err, result) {
      test.equal(result.deviation, 0, 'should just copy the files over.');
      test.done();
    });
  }
};
