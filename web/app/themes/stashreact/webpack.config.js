const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const neat = require('node-neat').includePaths;
const FailPlugin = require('webpack-fail-plugin');

var loaders = [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
    }
];

module.exports = [
    {
        entry: './src/js/server.js',
        output: {
            path: __dirname,
            filename: './dist/js/server.js'
        },
        module: {
            loaders: loaders
        },
        stats: {
            colors: true
        }
    },
    {
        entry: './src/js/includes.js',
        output: {
            path: __dirname,
            filename: './dist/js/includes.js',
            libraryTarget: 'var',
            library: 'includes'
        },
        module: {
            loaders: loaders
        },
        stats: {
            colors: true
        }
    },
    {
        entry: './src/js/client.js',
        output: {
            path: __dirname,
            filename: './dist/js/client.js'
        },
        module: {
            loaders: loaders
        },
        stats: {
            colors: true
        }
    },
    {
        entry: './src/sass/main.scss',
        output: {
            path: __dirname,
            filename: './dist/css/styles.js'
        },
        module: {
            loaders: [{
                test: /\.(sass|scss)$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader', use: [
                        'css-loader',
                        // {
                        //     loader: "resolve-url-loader"
                        // },
                        //
                        // {
                        //     loader: "postcss-loader",
                        //     options: {
                        //         plugins: (loader) => [
                        //             require('autoprefixer')({browsers: ['last 3 version']}),
                        //             require('cssnano')({
                        //                 preset: 'default',
                        //             }),
                        //             require('postcss-clean')
                        //         ]
                        //     }
                        // },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ['styles'].concat(neat)
                            }
                        },
                    ]
                })
            }]
        },
        stats: {
            colors: true
        },
        plugins: [
            // new webpack.optimize.OccurrenceOrderPlugin(),
            // new webpack.NoEmitOnErrorsPlugin(),
            // FailPlugin,
            new ExtractTextPlugin({ // define where to save the file
                filename: './dist/css/[name].css'
            }),
        ],
    }
];
