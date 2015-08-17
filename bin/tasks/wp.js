/*jslint node: true */

'use strict';

var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');
var prompt = require('prompt');
var crypto = require('crypto');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to install wordpress ( database )?').then(function () {
        divider('Install wordpress via WPCLI');

        prompt.get({
            properties: {
                'DEV_URL': {
                    message: 'Enter the dev url ( without http:// )',
                    default: 'dev.stash.io'
                },
                'SITE_TITLE': {
                    message: 'Enter the title of the website',
                    default: 'Stash'
                },
                'ADMIN_USERNAME': {
                    message: 'Enter admin username',
                    default: 'dominator'
                },
                'ADMIN_PW': {
                    message: 'Enter admin password',
                    default: crypto.randomBytes(8).toString('hex')
                },
                'ADMIN_EMAIL': {
                    message: 'Enter admin email',
                    default: 'wp@unde.fined.io'
                }
            }
        }, function (err, result) {
            if (err) {
                deferred.reject();
            } else {
                run('wp core install ' +
                    '--url=' + result.DEV_URL +
                    ' --title=\'' + result.SITE_TITLE + '\'' +
                    ' --admin_user=\'' + result.ADMIN_USERNAME + '\'' +
                    ' --admin_password=' + result.ADMIN_PW +
                    ' --admin_email=' + result.ADMIN_EMAIL
                ).then(function () {
                        divider('Installed wordpress via WPCLI');

                        deferred.resolve();
                    }, deferred.reject);
            }
        });
    }, deferred.resolve);

    return deferred.promise;
}