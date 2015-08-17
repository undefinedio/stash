/*jslint node: true */

'use strict';

var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to set the permalink structure to /%postname%/?').then(function () {
        divider('Setting permalink to /%postname%/');

        run('wp rewrite structure \'/%postname%/\' --hard').then(function () {
            divider('Permlink structure set to /%postname%/');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
}