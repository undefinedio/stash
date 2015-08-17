/*jslint node: true */

'use strict';

var prompt = require('prompt');
var q = require('q');

module.exports = function (message) {
    var deferred = q.defer();

    prompt.start();
    
    prompt.get({
        name: 'yesno',
        message: message,
        validator: /y[es]*|n[o]?/,
        warning: 'Must respond yes or no',
        default: 'no'
    }, function (err, result) {
        if (err || !result) {
            deferred.reject();
        }
        
        if (result.yesno === 'y' || result.yesno === 'yes') {
            deferred.resolve();
        } else {
            deferred.reject();
        }
    });
    
    return deferred.promise;
};