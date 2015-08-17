/*jslint node: true */

'use strict';

var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to install polylang?').then(function () {
        divider('Installing polylang');

        run('composer require wpackagist-plugin/polylang').then(function () {
            divider('Polylang installed');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
};