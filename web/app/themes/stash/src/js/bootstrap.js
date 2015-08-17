require('viewport-units-buggyfill').init();

// Allow for global use of $
if(jQuery && !$) {
    $ = jQuery;
}