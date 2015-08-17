/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var yesno = require('../functions/yesno');
var run = require('../functions/run');
var divider = require('../functions/divider');
var q = require('q');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to run `gulp build`?').then(function () {
        divider('Running gulp build');

        run('gulp build').then(function () {
            divider('Ran gulp build');

            deferred.resolve();
        }, deferred.reject);
    }, deferred.resolve);

    return deferred.promise;
}