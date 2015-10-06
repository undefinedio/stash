var bootstrap = require('./bootstrap.js');
var HasClass = require('./helpers/hasClass');

var body = new HasClass('body');

body.has('home', () => {
    // This code will run only on the homepage
});