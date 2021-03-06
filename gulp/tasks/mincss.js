/**
 * Created by abaddon on 27.01.2015.
 */
var gulp = require('gulp'),
    mincss = require('gulp-cssnano'),
    size = require('gulp-filesize'),
    error = require('../errors.js'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../config').cssmin;

gulp.task('mincss', ['prefix'], function () {
    return gulp.src(config.src)
        .pipe(mincss())
        .on('error', error.standartError)
        .pipe(gulp.dest(config.dest))
        .pipe(size());
});