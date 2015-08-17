/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var q = require('q');
var sys = require('sys');
var exec = require('child_process').exec;

module.exports = function (command) {
    cl('notice', 'running: ' + command);

    var deferred = q.defer();

    exec(command, function (err, stdout) {
        sys.puts(stdout);

        if (err) {
            cl('error', 'CLI error :' + err);

            deferred.reject();
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};
