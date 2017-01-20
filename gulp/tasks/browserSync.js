'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const htmlInjector = require('bs-html-injector');
const webpackConfig = require('../../config/webpack.config');
const bundler = webpack(webpackConfig);

module.exports = function (gulp, paths, plugins, options) {
    return function () {
// setup html injector, only compare differences within outer most div (#page)
// otherwise, it will replace the webpack HMR scripts
        plugins.browserSync.use(htmlInjector, {restrictions: ['#content']});

        return plugins.browserSync.init({
            files: [{
                // js managed by webpack
                // optionally exclude other managed assets: images, fonts, etc
                match: [paths.SRC_PATH + '**/*.!(js)'],

                // manually sync everything else
                fn: synchronize,
            }],
            //browsersync with a php server
            proxy: {
                target: options.url,
                middleware: [

                    // converts browsersync into a webpack-dev-server
                    webpackDevMiddleware(bundler, {
                        publicPath: webpackConfig.output.publicPath,
                        noInfo: true,
                        hot: true,
                        watchOptions: {aggregateTimeout: 10},
                        stats: {colors: true}
                    }),

                    // hot update js &amp;&amp; css
                    webpackHotMiddleware(bundler),
                ],
            },
            notify: options.notifications
        });

    };
};

function synchronize(event, file) {
    // copy/remove file
    // if you keep assets in your src/sass folder, that might need flattened, depending on your build

    // activate html injector
    if (file.endsWith('php')) {
        htmlInjector();
    }
}