'use strict';

var _ = require('lodash');

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        gulp.src(paths.ICON_FONT_PATH + '*.svg')
            .pipe(plugins.debug({title: 'files:'}))
            .pipe(plugins.iconfont({
                fontName: 'iconFont', // required
                appendCodepoints: true // recommended option
            }))
            .on('codepoints', function (codepoints, options) {
                gulp.src(paths.ICON_FONT_PATH + '_iconFont.scss')
                    .pipe(plugins.consolidate('lodash', {
                        glyphs: codepoints,
                        fontName: 'iconFont',
                        fontPath: '../fonts/icon-font/',
                        className: 'icon-font'
                    }))
                    .pipe(gulp.dest(paths.SRC_PATH + 'sass/base/'));
            })
            .pipe(gulp.dest(paths.DIST_PATH + 'fonts/icon-font/'))
            .pipe(plugins.browserSync.reload({stream: true}))
            .pipe(plugins.if(
                options.notifications,
                plugins.notify({message: 'SVG font task complete'})
            ));
    };
};