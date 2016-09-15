var HasClass = require('./helpers/hasClass');
import Homepage from './pages/homepage';
import Navigation from './helpers/navigation';

var body = new HasClass('body');

class App {
    constructor() {
        this.injector = {app: this};
        new Navigation;
    }

    start() {
        body.has('home', () => {
            // This code will run only on the homepage
            this.home = new Homepage(this.injector);
        });
    }
}

module.exports = new App();