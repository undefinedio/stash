/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to run `npm install`?').then(function () {
        divider('Running npm install');

        run('npm install').then(function () {
            divider('Ran npm install');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
}