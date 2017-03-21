'use strict'

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');

/* Build project  */

gulp.task('lib', function () {
  return gulp.src([
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'lib/ui-bootstrap-custom-tpls-2.5.0.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/lib'));
});

gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber())
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function () {
  return gulp.src([
    'src/css/*.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'lib/ui-bootstrap-custom-2.5.0-csp.css'
  ])
  .pipe(plumber())
  .pipe(concatCss('main.min.css', {
    rebaseUrls: false
  }))
  .pipe(cssmin())
  .pipe(plumber())
  .pipe(gulp.dest('build/css'));
});

gulp.task('templates', function () {
  return gulp.src('src/templates/**/*.html')
    .pipe(gulp.dest('build/templates'));
});

gulp.task('index', function (){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('htaccess', function (){
  return gulp.src('src/.htaccess')
    .pipe(gulp.dest('build/'));
});

gulp.task('api', function (){
  return gulp.src(['./api/**/*.*', './api/.htaccess'])
    .pipe(gulp.dest('./build/api'));
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('watch', function () {
  watch('./src/js/**/*.js', function () {
    gulp.start('js');
  });

  watch('./src/css/*.css', function () {
    gulp.start('css');
  });

  watch('./src/templates/**/*.html', function () {
    gulp.start('templates');
  });

  watch('./src/index.html', function () {
    gulp.start('index');
  });

  watch('./src/.htaccess', function () {
    gulp.start('htaccess');
  });

  watch('./api', function () {
    gulp.start('api');
  });
});

/* default task */

gulp.task('default', function (callback) {
	runSequence('clean', ['lib', 'js', 'css', 'templates', 'htaccess', 'api'], ['index'], ['watch'], callback);
});