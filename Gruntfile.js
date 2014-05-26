/*
 * grunt-metalsmith
 * https://github.com/doingweb/grunt-metalsmith
 *
 * Copyright (c) 2014 Chris Antes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    metalsmith: {
      no_plugins: {
        src: 'test/fixtures/no_plugins',
        dest: 'tmp/no_plugins'
      },
      metadata: {
        options: {
          metadata: {
            title: 'Testing Metadata',
            description: 'The metadata option should be passed along to plugins.'
          },
          plugins: [
            {
              'metalsmith-templates': {
                engine: 'handlebars',
                directory: 'test/fixtures/metadata/templates'
              }
            }
          ]
        },
        src: 'test/fixtures/metadata/src',
        dest: 'tmp/metadata'
      },
      multiple_plugins: {
        options: {
          plugins: [
            {
              'metalsmith-markdown': {}
            },
            {
              'metalsmith-templates': {
                engine: 'handlebars',
                directory: 'test/fixtures/multiple_plugins/templates'
              }
            }
          ]
        },
        src: 'test/fixtures/multiple_plugins/src',
        dest: 'tmp/multiple_plugins'
      },
      normalize_plugins: {
        options: {
          plugins: { // Note compact object format, instead of array.
            'metalsmith-markdown': {},
            'metalsmith-templates': {
              engine: 'handlebars',
              directory: 'test/fixtures/normalize_plugins/templates'
            }
          }
        },
        src: 'test/fixtures/normalize_plugins/src',
        dest: 'tmp/normalize_plugins'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'metalsmith', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
