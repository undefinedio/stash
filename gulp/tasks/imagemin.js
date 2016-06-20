'use strict';

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        return gulp.src(paths.IMAGE_PATH + ['**/*.*'])
            .pipe(plugins.debug({title: 'files:'}))
            .pipe(plugins.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [plugins.pngquant()]
            }))
            .pipe(gulp.dest(paths.DIST_PATH + 'images'))
            .pipe(plugins.browserSync.reload({stream: true}))
    };
};