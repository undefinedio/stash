const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    argv = require('yargs').argv,
    dotenv = require('dotenv').load();

/* OPTIONS */
var options = {
    notifications: true,
    url: process.env.ENV_DEVELOPMENT
};

/* PATHS */
var paths = {};
paths.THEME_PATH = './web/app/themes/stash/';
paths.SRC_PATH = paths.THEME_PATH + 'src/';
paths.IMAGE_PATH = paths.SRC_PATH + 'images/';
paths.ICON_FONT_PATH = paths.SRC_PATH + 'icon-font/';
paths.DIST_PATH = paths.THEME_PATH + 'dist/';

/* PLUGINS */
plugins.neat = require('node-neat').includePaths;
plugins.bourbon = require('node-bourbon').includePaths;
plugins.Sassburgers = require.resolve('sass-burger');

plugins.pngquant = require('imagemin-pngquant');
plugins.browserSync = require('browser-sync').create();

plugins.interceptErrors = function (error) {
    var args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    plugins.notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

options.production = !!argv.production;

/* TASKS */
var sass = require('./gulp/tasks/sass.js')(gulp, paths, plugins, options, 'sass/main.scss', '/css');
var js = require('./gulp/tasks/js.js')(gulp, paths, plugins, options);
var fonts = require('./gulp/tasks/fonts.js')(gulp, paths, plugins);
var svgFont = require('./gulp/tasks/svgFont.js')(gulp, paths, plugins, options);
var imagemin = require('./gulp/tasks/imagemin.js')(gulp, paths, plugins, options);
var browserSync = require('./gulp/tasks/browserSync.js')(gulp, paths, plugins, options);

gulp.task('sass', sass);

gulp.task('js', js);
gulp.task('fonts', fonts);
gulp.task('imagemin', imagemin);
gulp.task('svg-font', svgFont);
gulp.task('browser-sync', browserSync);

gulp.task('watch', function () {
    plugins.watch(paths.SRC_PATH + '**/*.scss', function () {
        gulp.start('sass');
    });

    plugins.watch(paths.IMAGE_PATH + ['**/*.*'], function () {
        gulp.start('imagemin');
    });

    plugins.watch(paths.SRC_PATH + 'fonts/**', function () {
        gulp.start('fonts');
    });

    plugins.watch(paths.ICON_FONT_PATH + ['**/*.*'], function () {
        gulp.start('svg-font');
    });
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
gulp.task('build', ['sass', 'js', 'fonts', 'imagemin', 'svg-font']);
