'use strict';

const webpack = require('webpack-stream');

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        return gulp.src(paths.SRC_PATH + 'js/main.js')
            .pipe(webpack(require('../../config/webpack.config')))
            .pipe(gulp.dest(paths.DIST_PATH + 'js'))
    };
};