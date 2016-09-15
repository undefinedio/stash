import $ from 'jquery';

class Navigation {
    constructor() {
        this.$button = $('.js-hamburger');
        this.$body = $('body');
        this.init();
    }

    init() {
        this.$button.on('click', () => {
            this.$button.toggleClass('is-active');
            this.$body.toggleClass('nav-open');
        });
    }
}

module.exports = Navigation;