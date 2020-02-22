import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import Profile from './models/Profile'; 
import {BROWSER} from './models/Constants';

function initApp () {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
};

function bootStrapApp (env) {
    console.log("environment ", env);
    if (env === BROWSER) {
        initApp();
    } else {
        document.addEventListener("deviceready", () => {
            initApp();
        }, false);
    }
}

Profile.setEnvironment(bootStrapApp);