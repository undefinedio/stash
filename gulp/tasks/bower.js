'use strict';

var merge = require('merge-stream');

module.exports = function (gulp, paths, plugins, options) {
    var filterByExtension = function (extension) {
        return plugins.filter('**/*.' + extension);
    };

    return function () {
        var mainFiles = plugins.mainBowerFiles({
            paths: {bowerDirectory: paths.BOWER_PATH}
        });

        if (!mainFiles.length) {
            console.log('No bower files found');

            return false;
        }

        gulp.src(mainFiles)
            .pipe(plugins.plumber())
            .pipe(filterByExtension('js'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('dist/js/vendor.js'))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.THEME_PATH));

        gulp.src(mainFiles)
            .pipe(plugins.plumber())
            .pipe(filterByExtension('css'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('dist/css/vendor.css'))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(plugins.browserSync.reload({stream: true}))
            .pipe(gulp.dest(paths.THEME_PATH))
            .pipe(plugins.if(
                options.notifications,
                plugins.notify({message: 'Bower task complete'}))
        );
    };
};