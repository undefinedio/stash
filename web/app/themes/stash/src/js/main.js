import "babel-polyfill";
import buggyfill from 'viewport-units-buggyfill';
buggyfill.init();
var $ = global.jQuery = require('jquery');


var app = require('./app.js');

$(document).ready(function ($) {
    app.start();
});