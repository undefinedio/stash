'use strict';

var uglify = require('gulp-uglify');

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        var bundleStream = plugins.browserify({
            entries: paths.SRC_PATH + 'js/main.js',
            debug: true
        }).transform(plugins.babelify, {presets: ["es2015"]}).bundle();

        return bundleStream
            .on('error', plugins.interceptErrors)
            .pipe(plugins.source('main.js'))
            .pipe(plugins.buffer())
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.if(options.production, uglify()))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.THEME_PATH + 'dist/js/'))
            .pipe(plugins.browserSync.reload({stream: true}))
    };
};