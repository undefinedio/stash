import 'babel-polyfill';
import buggyfill from 'viewport-units-buggyfill';
import app from './app.js';

const $ = global.jQuery = require('jquery');
buggyfill.init();

$(document).ready(() => {
    app.start();
});

/**
 * important to leave this here!!
 * */
module.hot.accept(function (err) {
    if (err) {
        console.log(err);
    }
});