'use strict';

var clc = require('cli-color');

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var cl = console.log;

module.exports = function () {
    cl(notice(''));
    cl(notice('   ██╗   ██╗███╗   ██╗██████╗ ███████╗███████╗██╗███╗   ██╗███████╗██████╗'));
    cl(notice('   ██║   ██║████╗  ██║██╔══██╗██╔════╝██╔════╝██║████╗  ██║██╔════╝██╔══██╗'));
    cl(notice('   ██║   ██║██╔██╗ ██║██║  ██║█████╗  █████╗  ██║██╔██╗ ██║█████╗  ██║  ██║'));
    cl(notice('   ██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══╝  ██║██║╚██╗██║██╔══╝  ██║  ██║'));
    cl(notice('   ╚██████╔╝██║ ╚████║██████╔╝███████╗██║     ██║██║ ╚████║███████╗██████╔╝'));
    cl(notice('    ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═════╝'));
    cl(notice(''));
    cl(error('"Made with anger and beer by....."'));
    cl(notice(''));
};