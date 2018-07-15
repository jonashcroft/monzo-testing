import config from './_config.js';
import { initAuth } from './_auth.js';

const initConnect = () => {

    let element = document.getElementById('auth');

    element.addEventListener('click', () => {

        initAuth();

    }, false);

};

export default initConnect;