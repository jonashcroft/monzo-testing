import config from './_config.js';
import connected from './_connected.js';

const initConnect = () => {

    let authorise = document.getElementById('authBtn');

    config.authDiv.classList.remove('inactive');
    config.authDiv.classList.add('active');
    config.connectedDiv.classList.remove('active');
    config.connectedDiv.classList.add('inactive');

    authorise.addEventListener('click', () => {

        initAuth();

    }, false);

};

const initAuth = () => {

    let authUrl = `https://auth.monzo.com/?client_id=${ config.clientId }&redirect_uri=${ config.redirectUrl }&response_type=code&state=${ Math.random().toString(23).substring(4) }`;

    window.location.replace(authUrl);

};

const getAuthCode = code => {

    let accessCode = new URLSearchParams(document.location.search).get('code');

    if ( accessCode ) {
        getAccessToken( accessCode );
    }

	return accessCode;

};

const getAccessToken = accessCode => {

    console.log('get access token function');

    const url = `${config.monzoUrl}/oauth2/token`;

    const formData = new FormData()
    formData.append('client_id', config.clientId);
    formData.append('client_secret', config.clientSecret);
    formData.append('code', accessCode);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', config.redirectUrl);

    fetch ( url, {
        method: 'POST',
        body: formData
    })
    // .then( data => data.text() )
    .then( (data) => data.json() )
    .then( (authResponse) => {
        console.log( authResponse );

        sessionStorage.setItem('accessToken', authResponse.access_token);
        sessionStorage.setItem('refreshToken', authResponse.refresh_token);

        window.history.replaceState(null, null, window.location.pathname);

        connected();

    }).catch( function ( error ) {
        console.log( 'failed: ', error )
    })

}

export { initConnect, initAuth, getAuthCode }
