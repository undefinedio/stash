var body = {
    has: function (className, cb) {
        if($body.hasClass(className)) {
            cb();
        }
    }
};

var $body = $('body');

module.exports = body;