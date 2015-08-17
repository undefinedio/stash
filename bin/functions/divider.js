'use strict';

var clc = require('cli-color');

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var cl = console.log;

module.exports = function (message) {
    cl(notice('----------------------------'));
    cl(warn(message));
    cl(notice('----------------------------'));
};