/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to run `bower install`?').then(function () {
        divider('Running bower install');

        run('bower install').then(function () {
            divider('Ran bower install');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
}