import config from './_config.js';
import { initConnect, getAuthCode } from './auth/_auth.js';
import connected from './auth/_connected.js';
// import GoogleMapsApi from ''

const app = () => {

    let accessToken = sessionStorage.getItem('accessToken');

    if ( typeof accessToken !== 'undefined' && accessToken !== null ) {

        connected();

    }
    else {

        if ( getAuthCode('code') ) {

            // If an auth code exists in the URL, not entirely sure this needs to be here
            console.log('if getauthcode - code');

        } else {

            console.log('we need to connect');

            initConnect();

        }

    }

};

export default app;