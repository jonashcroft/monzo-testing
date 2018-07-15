import config from './_config.js';

const connected = () => {

    config.authDiv.classList.remove('active');
    config.authDiv.classList.add('inactive');
    config.connectedDiv.classList.remove('inactive');
    config.connectedDiv.classList.add('active');

    console.log('well done');

    console.log(`Access Token is set: ${ sessionStorage.getItem('accessToken') } `);
    console.log(`Our access token is: ${ sessionStorage.getItem('accessToken') }`);

}

export default connected;