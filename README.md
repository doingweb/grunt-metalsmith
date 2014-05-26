# grunt-metalsmith

Run Metalsmith as a Grunt task.

This does many of the same things as the [Metalsmith CLI](https://github.com/segmentio/metalsmith/blob/master/bin/metalsmith), and in fact parts are borrowed directly from it.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-metalsmith --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-metalsmith');
```

## The "metalsmith" task

### Overview
In your project's Gruntfile, add a section named `metalsmith` to the data object passed into `grunt.initConfig()`.

The `options` for a build target accepts the same options as would be provided in the `metalsmith.json` file when using the Metalsmith CLI, except `source` and `destination`, which are specified in the same way as any other Grunt task.

When specifying source and destination, use the folder paths (no wildcards). If multiple sources are specified, only the first will be used.

Here is an example using [Metalsmith's static site example](https://github.com/segmentio/metalsmith/tree/master/examples/static-site):

```js
grunt.initConfig({
  metalsmith: {
    staticSiteExample: {
      options: {
        metadata: {
          title: 'My Blog',
          description: 'My second, super-cool blog.'
        },
        plugins: {
          'metalsmith-markdown': {},
          'metalsmith-permalinks': {
            pattern: ':title'
          },
          'metalsmith-templates': {
            engine: 'handlebars'
          }
        }
      },
      src: 'src',
      dest: 'build'
    }
  }
});
```

### Options

#### metadata
Type: `Object`
Default value: `{}`

Sets the default global metadata.

#### plugins
Type: `Array` `Object`
Default value: `[]`

An array or object describing the plugins that Metalsmith should use.

#### clean
Type: `Boolean`
Default value: `true`

Whether or not Metalsmith should clean the destination directory before building.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
MIT
