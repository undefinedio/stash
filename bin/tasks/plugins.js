/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want activate all WP plugins?').then(function () {
        divider('Activating plugins');

        run('wp plugin activate --all &&  wp plugin deactivate --all &&  wp plugin activate --all').then(function () {
            divider('Plugins activated');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
};