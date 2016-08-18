'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');

gulp.task('make-css', function() {

  var scssStream = gulp.src('./src/**/*.scss')
    .pipe(sass())
    .pipe(concat('scss-files.scss'));

  var cssStream = gulp.src('./src/**/*.css')
    .pipe(concat('css-files.css'));

  var mergedStream = merge(scssStream, cssStream)
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/assets'));

  return mergedStream;
});
