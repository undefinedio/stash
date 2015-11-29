var $ = require('jquery');

class HasClass {
    constructor (selector) {
        this.$ = $(selector);
    }

    has (className, cb) {
        if(this.$.hasClass(className)) {
            cb();
        }
    }
}

module.exports = HasClass;