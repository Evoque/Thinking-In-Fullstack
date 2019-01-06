

import App from './App';
import Router from './modules/Router';
import Track from './modules/Track';

App.use([Router, Track]);

new App({
    router: {
        mode: 'history'
    },
    tracn: {
        //..
    },
    onReady(app: App) { 

    }
})