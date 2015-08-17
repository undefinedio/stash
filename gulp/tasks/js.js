'use strict';

var banner = require('../functions/banner');

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        var b = plugins.browserify({
            entries: paths.SRC_PATH + 'js/main.js',
            debug: true
        });

        b = b.transform(plugins.babelify);

        if (options.production) {
            b.transform(plugins.uglifyify);
        }

        b.bundle()
            .on('error', function (err) {
                console.log(err.toString());
                this.emit('end');
            })
            .pipe(plugins.source('main.js'))
            .pipe(plugins.buffer())
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.header(banner))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.THEME_PATH + 'dist/js/'))
            .pipe(plugins.browserSync.reload({stream: true}))
            .pipe(plugins.if(
                options.notifications,
                plugins.notify({message: 'Javascript task complete'}))
        );
    };
};