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
      clean: true,
      metadata : {},
      plugins : {}
    });

    this.files.forEach(function(f) {
      var metalsmith = new Metalsmith(process.cwd());
      metalsmith.source(f.src[0]); // Only one source (the source directory) makes sense.
      metalsmith.destination(f.dest);
      metalsmith.metadata(options.metadata);
      metalsmith.clean(options.clean);

      var plugins = normalizePlugins(options.plugins);
      plugins.forEach(function (plugin) {
        for (var name in plugin) {
          var opts = plugin[name];
          var fn;

          try {
            fn = require(name);
          } catch (e) {
            done(e);
            return;
          }

          metalsmith.use(fn(opts));
        }
      });

      metalsmith.build(function(err) {
        if (err) {
          done(err);
          return;
        }

        grunt.log.writeln('Built files in ' + metalsmith.source() + ' to ' + metalsmith.destination());
        done();
      });
    });
  });

  function normalizePlugins (plugins) {
    if (plugins instanceof Array) {
      return plugins;
    }
    var ret = [];

    for (var key in plugins) {
      var plugin = {};
      plugin[key] = plugins[key];
      ret.push(plugin);
    }

    return ret;
  }
};
