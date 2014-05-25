/*
 * grunt-metalsmith
 * https://github.com/doingweb/grunt-metalsmith
 *
 * Copyright (c) 2014 Chris Antes
 * Licensed under the MIT license.
 */

'use strict';

var Metalsmith = require('metalsmith');

module.exports = function(grunt) {

  grunt.registerMultiTask('metalsmith', 'Run Metalsmith as a Grunt task.', function() {
    var done = this.async();

    var options = this.options({
      plugins: {
      },
      clean: true
    });

    this.files.forEach(function(f) {
      var metalsmith = new Metalsmith(process.cwd());
      metalsmith.source(f.src[0]); // Only one source (the source directory) makes sense.
      metalsmith.destination(f.dest);
      metalsmith.clean(options.clean);
      metalsmith.build(function(err) {
        if (err) {
          done(err);
        }

        grunt.log.writeln('Built files in ' + metalsmith.source() + ' to ' + metalsmith.destination());
        done();
      });
    });
  });
};
