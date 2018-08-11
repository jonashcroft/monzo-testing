import config from '../_config.js';
import getTransactions from '../_get-transactions.js';

const connected = () => {

    config.authDiv.classList.remove('active');
    config.authDiv.classList.add('inactive');
    config.connectedDiv.classList.remove('inactive');
    config.connectedDiv.classList.add('active');

    // console.log(`Our access token is: ${ sessionStorage.getItem('accessToken') }`);

    // Uncomment when you need to verify connection with the API
    pingMonzo();

    if ( getMonzoAccount('monzoAccountID') ) {

        getTransactions();

    }
    else {

        console.log('no account id - do something here');

    }

};

/*-------------
Quick helper function to confirm with Monzo's server that we
(the current user) are authenticated with the API
--------------*/
const pingMonzo = () => {

    const pingEndpoint = `${config.monzoUrl}/ping/whoami`;

    fetch( pingEndpoint, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
    .then( (data) => data.json() )
    .then( (pingResponse) => {

        console.table(pingResponse);

    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};

/*-------------
Get the account ID of our preferred Monzo account,
this will only get (1) account and excludes prepaid
accounts. If Monzo let users have multiple accounts
in the future, this will need to change.

In fact - I haven't looked into Joint accounts so
this might not even work for those.
--------------*/
const getMonzoAccount = ( monzoAccountID ) => {

    const pingEndpoint = `${config.monzoUrl}/accounts?account_type=uk_retail`;

    fetch( pingEndpoint, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        },
    })
    .then( (data) => data.json() )
    .then( (accountsResp) => {

        // console.table( accountsResp.accounts );
        monzoAccountID = accountsResp.accounts[0].id;
        sessionStorage.setItem('accountId', monzoAccountID );

    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

    return monzoAccountID;

};

export default connected;