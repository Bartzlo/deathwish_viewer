'use strict'

const gulp = require('gulp')
const wait = require('gulp-wait')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const rimraf = require('rimraf')
const rigger = require('gulp-rigger')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

let webpackConfig = {
  entry: [
    './src/scripts/main.js'
  ],

  output: {
    filename: 'main.js'
  },

  plugins: [
    // new UglifyJsPlugin(), // !!!exclude from the production!!!
    new webpack.ProvidePlugin({
      Handlebars: 'handlebars/dist/handlebars.js'
    })
  ],

  devtool: 'eval-source-map'
}

gulp.task('serve', ['build-style', 'build-html', 'build-js', 'build-img', 'copy-data', 'build-fonts'], function () {
  browserSync.init({
    server: {baseDir: 'build/'},
    open: false,
    reloadOnRestart: true
  })

  gulp.watch('src/html/**/*.html', ['build-html'])
  gulp.watch('src/**/*.scss', ['build-style'])
  gulp.watch('src/**/*.js', ['build-js'])
  gulp.watch('src/img/**/*.*', ['build-img'])
  gulp.watch('src/fonts/**/*.*', ['build-fonts'])
  gulp.watch('src/data/**/*.*', ['copy-data'])
  // gulp.watch('src/**/*.*').on('change', browserSync.reload);
})

gulp.task('build-html', () => {
  return gulp.src('src/html/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
})

gulp.task('build-style', () => {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init()) // !!!exclude from the production!!!
    .pipe(wait(300))
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write()) // !!!exclude from the production!!!
    .pipe(gulp.dest('build/styles/'))
    .pipe(wait(100))
    .pipe(browserSync.stream())
})

gulp.task('build-js', () => {
  return gulp.src('src/scripts/*.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/scripts/'))
    .pipe(browserSync.stream())
})

gulp.task('build-img', () => {
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.stream())
})

gulp.task('build-fonts', () => {
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browserSync.stream())
})

gulp.task('copy-data', () => {
  return gulp.src('src/data/**/*.*')
    .pipe(gulp.dest('build/data/'))
    .pipe(browserSync.stream())
})

gulp.task('clean', function (cb) {
  rimraf('build', cb)
})

gulp.task('default', ['serve'])
