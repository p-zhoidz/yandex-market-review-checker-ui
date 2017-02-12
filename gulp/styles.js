'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var svgSprite = require('gulp-svg-sprite');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return buildStyles();
});

var buildStyles = function() {
  var sassOptions = {
    outputStyle: 'expanded',
    precision: 10
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/scss/**/main.scss'),
    path.join('!' + conf.paths.src, '/scss/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/scss/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/scss/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
};
gulp.task('svg-reload', function() {
  return buildSvg()
    .pipe(browserSync.stream());
});

gulp.task('svg', function() {
  return buildSvg();
});

var buildSvg = function() {
  var svgConfiguration = {
    mode: {
      css: { // Activate the «css» mode
        render: {
          css: true // Activate CSS output (with default options)
        },
        dest: '',
        prefix: '.icon-',
        inline: true,
        dimensions: true
      }
    },
    spacing: { // Add padding
      padding: 10
    }
  };

  return gulp.src('**/*.svg', {cwd: conf.paths.src + '/assets/svg'})
    .pipe(svgSprite(svgConfiguration))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/styles/')));
};
