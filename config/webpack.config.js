'use strict';
const path = require('path');

const paths = {};
paths.THEME_PATH = path.resolve(__dirname, '../web/app/themes/stash/') + '/';
paths.SRC_PATH = paths.THEME_PATH + 'src/';
paths.IMAGE_PATH = paths.SRC_PATH + 'images/';
paths.ICON_FONT_PATH = paths.SRC_PATH + 'icon-font/';
paths.DIST_PATH = paths.THEME_PATH + 'dist/';
paths.BUILD_PATH = paths.THEME_PATH + 'build/';
paths.BOWER_PATH = paths.THEME_PATH + 'bower/';

const argv = require('yargs').argv;
const webpack = require('webpack');

const PROD = !!argv.production;

const HOST = 'localhost';
const PORT = 3000;
const themePathURl = `//${HOST}:${PORT}/web/app/themes/stash/`;

module.exports = {
    debug: true,
    devtool: PROD ? 'source-map' : 'cheap-module-source-map',
    noInfo: false,
    entry: PROD ? [paths.SRC_PATH + 'js/main.js'] :
        [
            'webpack-hot-middleware/client?http://${HOST}:${PORT}&reload=true', // reloads the page if hot module reloading fails.
            paths.SRC_PATH + 'js/main.js',
        ],
    target: 'web',
    output: {
        path: paths.DIST_PATH + 'js/',
        publicPath: themePathURl,
        filename: 'main.js',
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    devServer: {
        contentBase: themePathURl,
        colors: true,
        quiet: false,
        noInfo: false,
        publicPath: '/dist/',
        historyApiFallback: true,
        hot: true,
        host: HOST,
        port: PORT
    },
    plugins: PROD ?
        [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
        ] :
        [
            new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
            new webpack.optimize.OccurenceOrderPlugin(), // recommended by webpack-dev-middleware
            new webpack.HotModuleReplacementPlugin(), // the magic
            new webpack.NoErrorsPlugin(), // prevents a chunk from being created with breaking (syntax, etc) errors

            // // unnecessary, but nice.
            // // Webpack normally doesn't output files during the dev build, this will output your assets to your build path
            // // If you visit the local wp URL instead of the proxy, your assets will be there
            // new WriteFilePluginn()
        ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    paths.SRC_PATH,
                    path.resolve(__dirname, '../node_modules')
                ],
                loaders: ['babel'],
                plugins: ['transform-runtime'],
            }
        ]
    }
};