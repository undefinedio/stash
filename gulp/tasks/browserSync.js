'use strict';

module.exports = function (gulp, paths, plugins, options) {
    return function () {
        return plugins.browserSync.init({
            //browsersync with a php server
            proxy: options.url,
            notify: options.notifications
        });
    };
};