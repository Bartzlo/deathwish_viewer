'use strict';

const
  gulp = require('gulp'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  uglifyjs = require('gulp-uglify'),
  browserify = require('gulp-browserify'),
  rimraf = require('rimraf'),
  babel = require('gulp-babel'),
  rigger = require('gulp-rigger');

gulp.task('serve', ['build-style', 'build-html', 'build-js', 'build-img', 'copy-data'], function() {
    browserSync.init({
        server: {baseDir: "build/"},
        open: false,
        reloadOnRestart: true
    });

    gulp.watch('src/html/**/*.html', ['build-html']);
    gulp.watch('src/**/*.scss', ['build-style']);
    gulp.watch('src/**/*.js', ['build-js']);
    gulp.watch('src/img/**/*.*', ['build-img']);
    gulp.watch('src/data/**/*.*', ['copy-data']);
    //gulp.watch('src/**/*.*').on('change', browserSync.reload);
});

gulp.task('build-html', () => {
  return gulp.src('src/html/*.html')
  .pipe(rigger())
  .pipe(gulp.dest('build/'))
  .pipe(browserSync.stream());
});

gulp.task('build-style', () => {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init()) // !!!exclude from the release!!!
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write()) // !!!exclude from the release!!!
    .pipe(gulp.dest('build/styles/'))
    .pipe(browserSync.stream());
});

gulp.task('build-js', () => {
  return gulp.src('src/scripts/*.js')
  .pipe(sourcemaps.init()) // !!!exclude from the release!!!
  .pipe(browserify({debug : true})) // !!!exclude from the release (debug : false)!!!
  .pipe(babel())
  .pipe(uglifyjs())
  .pipe(sourcemaps.write()) // !!!exclude from the release!!!
  .pipe(gulp.dest('build/scripts/'))
  .pipe(browserSync.stream());
});

gulp.task('build-img', () => {
  return gulp.src('src/img/**/*.*')
  .pipe(gulp.dest('build/img/'))
  .pipe(browserSync.stream());
});

gulp.task('copy-data', () => {
  return gulp.src('src/data/**/*.*')
  .pipe(gulp.dest('build/data/'))
  .pipe(browserSync.stream());
});

gulp.task('clean', function (cb) {
    rimraf('build', cb);
});

gulp.task('default', ['serve']);
