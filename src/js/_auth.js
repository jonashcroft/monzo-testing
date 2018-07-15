import config from './_config.js';

const initAuth = () => {

    let authUrl = `https://auth.monzo.com/?client_id=${ config.clientId }&redirect_uri=${ redirectUrl }&response_type=code&state=${ Math.random().toString(23).substring(4) }`;

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

    const url = 'https://api.monzo.com/oauth2/token';

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
    .then( data => data.text() )
    .then( (text) => {
        console.log( 'success, response: ', text )
    }).catch( function ( error ) {
        console.log( 'failed: ', error )
    })

}

export { initAuth, getAuthCode }
