'use strict';

var banner = require('../functions/banner');

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        gulp.src(paths.SRC_PATH + 'sass/main.scss')
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                includePaths: ['styles'].concat(plugins.neat)
            }))
            .pipe(plugins.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(plugins.if(options.production, plugins.minifyCss({compatibility: 'ie8'})))
            .pipe(plugins.header(banner))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.THEME_PATH + '/dist/css'))
            .pipe(plugins.browserSync.reload({stream: true}))
            .pipe(plugins.if(
                options.notifications,
                plugins.notify({message: 'Sass task complete'}))
        );
    };
};