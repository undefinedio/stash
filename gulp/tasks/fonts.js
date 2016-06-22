module.exports = function (gulp, paths, plugins) {
    return function () {
        gulp.src([paths.SRC_PATH + 'fonts/**'])
            .pipe(gulp.dest(paths.DIST_PATH + 'fonts'));
    }
};