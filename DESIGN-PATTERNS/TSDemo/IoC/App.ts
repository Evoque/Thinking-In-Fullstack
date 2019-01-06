
import iModule from './interface/iModule';

class App { 

    static modules : iModule[] = [];
    constructor(public options: { onReady(app: App): void; }) {  
        this.init();
    }

    init() { 
        window.addEventListener('DOMContentLoaded', () => {
            this.initModules();
            this.options.onReady(this);
        });
    }

    static use(module: iModule | iModule[]) { 
        Array.isArray(module) ? module.map(item => App.use(item)) : App.modules.push(module);
    }

    initModules() { 
        App.modules.map(module => module.init && typeof module.init == 'function' && module.init(this));
    }

}


export default App;