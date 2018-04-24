import HasClass from './helpers/hasClass';
import Homepage from './pages/homepage';
import Navigation from './helpers/navigation';

const body = new HasClass('body');

class App {
    constructor() {
        this.injector = { app: this };

        this.navigation = new Navigation();
        console.log('jowww krokmeister hiero wassu wihth your ass ?');
    }

    start() {
        body.has('home', () => {
            // This code will run only on the homepage
            this.home = new Homepage(this.injector);
        });
    }
}

module.exports = new App();