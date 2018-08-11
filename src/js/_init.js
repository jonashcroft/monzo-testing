import config from './_config.js';
import { initConnect, getAuthCode } from './_auth.js';
import connected from './_connected.js';

const app = () => {

    let accessToken = sessionStorage.getItem('accessToken');

    if ( typeof accessToken !== 'undefined' && accessToken !== null ) {

        // console.log(`access token is set to: ${ sessionStorage.getItem('accessToken') } `);

        connected();

    }
    else {

        if ( getAuthCode('code') ) {

            // If an auth code exists in the URL, not entirely sure this needs to be here

        } else {

            console.log('we need to connect');

            initConnect();

        }

    }

};

export default app;