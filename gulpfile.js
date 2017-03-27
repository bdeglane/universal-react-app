const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webserver = require('gulp-webserver');
const path = require('path');

// simple webserver
gulp.task('server', function () {
  gulp.src('./src/static/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: 'http://localhost:8080/',
      port: 8080,
      fallback: 'index.html'
    }));
});