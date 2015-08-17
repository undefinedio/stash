/*jslint node: true */

'use strict';

var clc = require('cli-color');

/* Setup shorthand functions */
var colors = {
    error: clc.red.bold,
    warn: clc.yellow,
    notice: clc.xterm(202).bgXterm(236)
};

module.exports = function (type, message) {
    console.log(colors[type](message));
};