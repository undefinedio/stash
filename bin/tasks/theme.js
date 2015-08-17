/*jslint node: true */

'use strict';

var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to activate the stash theme?').then(function () {
        divider('Activating theme');

        run('wp theme activate stash').then(function () {
            divider('Theme activated');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
}