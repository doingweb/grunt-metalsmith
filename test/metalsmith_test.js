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

    var diff = new ndd.Dir_Diff(
      [
        path.resolve('test/expected/no_plugins'),
        path.resolve('tmp/no_plugins')
      ],
      'content'
    );

    diff.compare(function (err, result) {
      test.equal(result.deviation, 0, 'should just copy the files over.');
      test.done();
    });
  },
  metadata: function(test) {
    test.expect(1);

    var diff = new ndd.Dir_Diff(
      [
        path.resolve('test/expected/metadata'),
        path.resolve('tmp/metadata')
      ],
      'content'
    );

    diff.compare(function (err, result) {
      test.equal(result.deviation, 0, 'should pass metadata option along to plugins.');
      test.done();
    });
  },
  multiple_plugins: function(test) {
    test.expect(1);

    var diff = new ndd.Dir_Diff(
      [
        path.resolve('test/expected/multiple_plugins'),
        path.resolve('tmp/multiple_plugins')
      ],
      'content'
    );

    diff.compare(function (err, result) {
      test.equal(result.deviation, 0, 'should be able to use multiple plugins.');
      test.done();
    });
  },
  normalize_plugins: function(test) {
    test.expect(1);

    var diff = new ndd.Dir_Diff(
      [
        path.resolve('test/expected/normalize_plugins'),
        path.resolve('tmp/normalize_plugins')
      ],
      'content'
    );

    diff.compare(function (err, result) {
      test.equal(result.deviation, 0, 'should accept plugins defined as an object.');
      test.done();
    });
  }
};
