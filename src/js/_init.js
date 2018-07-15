import config from './_config.js';
import { getAuthCode } from './_auth.js';
import initConnect from './_initConnect.js';
import { connected } from './_connected.js';

const app = () => {

    if ( getAuthCode('code') ) {

        // connected();

        console.log('we have auth code!');

        // Do something here once we have auth and clean it up


    } else {

        console.log('we need to connect');

        initConnect();

    }

};

export default app;