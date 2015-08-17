/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');
var prompt = require('prompt');
var fs = require('fs');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want generate a new .env file?').then(function () {
        divider('Set .env file');

        prompt.start();

        prompt.get({
            properties: {
                'DB_NAME': {
                    message: 'Enter Database name',
                    default: 'stash_wp'
                },
                'DB_USER': {
                    message: 'Enter Database user',
                    default: 'root'
                },
                'DB_PASSWORD': {
                    message: 'Enter Database password',
                    default: 'root'
                },
                'DB_HOST': {
                    message: 'Enter Database host',
                    default: 'localhost'
                },
                'WP_ENV': {
                    message: 'Enter env',
                    default: 'development'
                },
                'WP_HOME': {
                    message: 'Enter wordpress home url',
                    default: 'http://dev.stash.io'
                },
                'WP_SITEURL': {
                    message: 'Enter wordpress site url',
                    default: 'http://dev.stash.io/wp'
                }
            }
        }, function (err, result) {
            if (err || !result) {
                deferred.reject();

                return false;
            }

            run('rm -f .env').then(
                function () {
                    fs.readFile('.env.example', 'utf8', function (err, data) {
                        if (err) {
                            deferred.reject();

                            return false;
                        }

                        data = data.replace(/DB_NAME=wp_example/g, 'DB_NAME=' + result.DB_NAME);
                        data = data.replace(/DB_USER=root/g, 'DB_USER=' + result.DB_USER);
                        data = data.replace(/DB_PASSWORD=root/g, 'DB_PASSWORD=' + result.DB_PASSWORD);
                        data = data.replace(/DB_HOST=localhost/g, 'DB_HOST=' + result.DB_HOST);
                        data = data.replace(/WP_ENV=development/g, 'DB_HOST=' + result.WP_ENV);
                        data = data.replace(/WP_HOME=http:\/\/example\.com/g, 'WP_HOME=' + result.WP_HOME);
                        data = data.replace(/WP_SITEURL=http:\/\/example\.com\/wp/g, 'WP_SITEURL=' + result.WP_SITEURL);

                        fs.writeFile('.env', data, 'utf8', function (err) {
                            if (err) {
                                deferred.reject();
                            } else {
                                divider('.env file setup done');

                                deferred.resolve();
                            }
                        });
                    });
                }, deferred.reject);
        });
    }, deferred.resolve);

    return deferred.promise;
}