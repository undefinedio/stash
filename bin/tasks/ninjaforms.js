/*jslint node: true */

'use strict';

var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to install ninja forms?').then(function () {
        divider('Installing ninja forms');

        run('composer require wpackagist-plugin/ninja-forms').then(function () {
            divider('Ninja forms installed');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
}