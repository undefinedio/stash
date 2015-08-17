/*jslint node: true */

'use strict';

var cl = require('../functions/cl');
var run = require('../functions/run');
var q = require('q');
var prompt = require('prompt');
var yesno = require('../functions/yesno');

module.exports = function () {
    var deferred = q.defer();

    yesno('Do you want to set up a new git remote?').then(function () {
        prompt.start();

        prompt.get(['git-remote'], function (err, result) {
            if (err) {
                deferred.reject();
            }

            cl('notice', 'Set new git remote');

            if (result && result['git-remote']) {
                run('rm -rf .git')
                    .then(run.bind(undefined, 'git init'), deferred.reject)
                    .then(run.bind(undefined, 'git remote add origin ' + result['git-remote']), deferred.reject)
                    .then(run.bind(undefined, 'git add .'), deferred.reject)
                    .then(run.bind(undefined, 'git commit -m "Setup stash"'), deferred.reject)
                    .then(run.bind(undefined, 'git push -u origin master'), deferred.reject)
                    .then(run.bind(undefined, 'git checkout -b develop'), deferred.reject)
                    .then(run.bind(undefined, 'git push -u origin develop'), deferred.reject)
                    .then(function () {
                        cl('notice', 'Git was setup');

                        deferred.resolve();
                    }, deferred.reject);
            } else {
                deferred.resolve();
            }
        });
    }, deferred.resolve);


    return deferred.promise;
};