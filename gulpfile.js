'use strict';

/* OPTIONS */
var options = {
    notifications: true,
    url: "dev.stash.io/"
};

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    argv = require('yargs').argv;

/* PATHS */
var paths = {};
paths.THEME_PATH = './web/app/themes/stash/';
paths.SRC_PATH = paths.THEME_PATH + 'src/';
paths.IMAGE_PATH = paths.SRC_PATH + 'images/';
paths.ICON_FONT_PATH = paths.SRC_PATH + 'icon-font/';
paths.DIST_PATH = paths.THEME_PATH + 'dist/';
paths.BOWER_PATH = paths.THEME_PATH + 'bower/';

/* PLUGINS */
plugins.mainBowerFiles = require('main-bower-files');
plugins.neat = require('node-neat').includePaths;
plugins.browserify = require('browserify');
plugins.source = require('vinyl-source-stream');
plugins.buffer = require('vinyl-buffer');
plugins.pngquant = require('imagemin-pngquant');
plugins.babelify = require('babelify');
plugins.uglifyify = require('uglifyify');
plugins.browserSync = require('browser-sync');

options.production = !!argv.production;
/* TASKS */
var bower = require('./gulp/tasks/bower.js')(gulp, paths, plugins, options);
var sass = require('./gulp/tasks/sass.js')(gulp, paths, plugins, options);
var js = require('./gulp/tasks/js.js')(gulp, paths, plugins, options);
var imagemin = require('./gulp/tasks/imagemin.js')(gulp, paths, plugins, options);
var svgFont = require('./gulp/tasks/svgFont.js')(gulp, paths, plugins, options);

gulp.task('bower', bower);
gulp.task('sass', sass);
gulp.task('js', js);
gulp.task('imagemin', imagemin);
gulp.task('svgFont', svgFont);

// browser-sync task for starting the server.
gulp.task('browser-sync', function () {
    plugins.browserSync.init({
        //browsersync with a php server
        proxy: options.url,
        notify: false
    });
});

gulp.task('watch', function () {
    plugins.watch(paths.SRC_PATH + '**/*.scss', function () {
        gulp.start('sass');
    });

    plugins.watch(paths.SRC_PATH + '**/*.js', function () {
        gulp.start('js');
    });

    plugins.watch(paths.BOWER_PATH + '**/*.*', function () {
        gulp.start('bower');
    });

    plugins.watch(paths.IMAGE_PATH + ['**/*.*'], function () {
        gulp.start('imagemin');
    });

    plugins.watch(paths.ICON_FONT_PATH + ['**/*.*'], function () {
        gulp.start('svgFont');
    });
});

gulp.task('default', function () {
    gulp.start('build');
    gulp.start('browser-sync');
    gulp.start('watch');
});

gulp.task('build', function () {
    gulp.start('sass');
    gulp.start('bower');
    gulp.start('js');
    gulp.start('imagemin');
});