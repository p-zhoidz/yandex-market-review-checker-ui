'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var replace = require('gulp-replace-task');
var args = require('yargs').argv;
var fs = require('fs');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
   */
  server.middleware = proxyMiddleware('/api/postcodes', {target: 'https://dev.nightclub.yoti.com', changeOrigin: true});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

/* Set environment config variables. */
gulp.task('config', function () {
  var env = args.env || 'local';

  var filename = env + '.json';
  var settings = JSON.parse(fs.readFileSync('config/' + filename, 'utf8'));

  var replacer = replace({
    patterns: [{
      match: 'apiUrl',
      replacement: settings.apiUrl
    }]
  });

  return gulp.src([
    path.join(conf.paths.src, '/app/index.constants.js')
  ]).pipe(replacer)
    .pipe(gulp.dest(conf.paths.tmp + '/serve/app'))

});

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch', 'config'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});
