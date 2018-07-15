import config from './_config.js';
import { initConnect, getAuthCode } from './_auth.js';
import connected from './_connected.js';

const app = () => {

    sessionStorage.setItem('test', 'test');

    console.log( `Session: ${ sessionStorage.getItem('test') } ` );

    let sideBar = sessionStorage.getItem('accessToken');

    if ( typeof sideBar !== 'undefined' && sideBar !== null ) {

        // console.log(`access token is set to: ${ sessionStorage.getItem('accessToken') } `);

        connected();

    }
    else {

        if ( getAuthCode('code') ) {


        } else {

            console.log('we need to connect');

            initConnect();

        }

    }

    // if ( sessionStorage.getItem('accessToken') === 'null' ) {


        // config.authDiv.classList.remove('active');
        // config.authDiv.classList.add('inactive');
        // config.connectedDiv.classList.remove('inactive');
        // config.connectedDiv.classList.add('active');

    // }
    // if ( getAuthCode('code') ) {
    // else ( getAuthCode('code') ) {
        // console.log('we have auth code!');

        // if ( sessionStorage.getItem('accessToken') === 'null' ) {

        //     window.history.replaceState(null, null, window.location.pathname);

        // }

    // }

    // if ( sessionStorage.getItem('accessToken') === 'null' ) {



        // Do something here once we have auth and clean it up


    // } else {

        // console.log('we need to connect');

        // initConnect();

    // }

};

export default app;