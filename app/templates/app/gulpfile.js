"use strict";

var gulp      = require('gulp'),
    webpack   = require('webpack'),
    gutil     = require('gulp-util'),
    eslint    = require('gulp-eslint'),
    run       = require('run-sequence'),
    exec      = require('child_process').exec,
    path      = require('path'),
    del       = require('del');


var prodBuildTask   = 'build',
    startDevTask    = 'start:dev',
    startProdTask   = 'start:prod',
    isDevBuild      = process.argv.indexOf(startDevTask) !== -1,
    startTask       = isDevBuild ? startDevTask : prodBuildTask;

var config          = require('./build/config')(isDevBuild),
    webpackConfig   = config.webpack.config,
    webpackCallback = config.webpack.cb;



/* Run tasks */

gulp.task('default', [startTask]);

gulp.task(prodBuildTask, function(cb) {
  run(['clean', 'lint'], ['bundle', 'copy'], cb);
});

gulp.task(startDevTask, function(cb) {
  run(['clean', 'lint'], ['bundle', 'copy'], ['server', 'watch'], cb);
});

gulp.task(startProdTask, function(cb) {
  run(['clean', 'lint'], ['bundle', 'copy'], ['server', 'watch'], cb);
});



/* Build bundles */

var bundle     = webpack(webpackConfig),
    isWatching = false;

gulp.task('bundle', function(cb) {

  if (isDevBuild) {
    bundle.watch(200, function(err, stats) {
      webpackCallback('dev-build', err, stats);
      if (!isWatching) {
        cb();
        isWatching = true;
      }
    });
  } else {
    bundle.run(function(err, stats) {
      webpackCallback('build', err, stats);
      cb();
    });
  }

});



/* Start express servers */

var startServer = function(path) {
  var server = exec('node ' + path);
  server.stdout.on('data', function(data) {
    gutil.log(data.trim());
  });
  server.stderr.on('data', function(data) {
    gutil.log(gutil.colors.red(data.trim()));
    gutil.beep();
  });
};

gulp.task('server', function() {

  config.server.paths.forEach(function(path) {
    startServer(path);
  });

});



/* Copy files to `public` */

var copyItems = config.copy.from.map(function(item) {
  return config.copy.base + item;
});

gulp.task('copy', function(cb) {

  gulp.src(copyItems, { base: config.copy.base })
      .pipe(gulp.dest(config.copy.to))
      .on('end', cb);

});



/* Watch statics */

gulp.task('watch', function() {

  gulp.watch(copyItems, ['copy']);

});



/* Lint scripts */

gulp.task('lint', function() {

  // Broken
  // https://github.com/adametry/gulp-eslint/issues/36

  var items = [
    '!node_modules',
    '!node_modules/**',
    config.lint.src + '/**/*.{js,jsx}'
  ];

  gulp.src(items)
      .pipe(eslint())
      .pipe(eslint.format());

});



/* Clean up before build */

gulp.task('clean', function(cb) {

  var items = config.clean.map(function(dir) {
    return dir + '/**/*';
  });

  del(items, cb);

});
