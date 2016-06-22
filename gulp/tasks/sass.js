'use strict';

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        return gulp.src(paths.SRC_PATH + 'sass/main.scss')
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                includePaths: ['styles'].concat(plugins.neat)
            }))
            .on('error', plugins.interceptErrors)
            .pipe(plugins.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(plugins.if(options.production, plugins.cleanCss({compatibility: 'ie8'})))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.DIST_PATH + '/css'))
            .pipe(plugins.browserSync.stream({match: '**/*.css'}))
            .pipe(plugins.if(
                options.notifications,
                plugins.notify({message: 'Sass task complete'}))
            )
    }
};