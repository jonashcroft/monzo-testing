import config from './_config.js';

const connected = () => {

    config.authDiv.classList.remove('active');
    config.authDiv.classList.add('inactive');
    config.connectedDiv.classList.remove('inactive');
    config.connectedDiv.classList.add('active');

    // console.log(`Access Token is set: ${ sessionStorage.getItem('accessToken') } `);
    console.log(`Our access token is: ${ sessionStorage.getItem('accessToken') }`);


    getUsersAccount();

    // const transactionsUrl = 'https://api.monzo.com/transactions',
    //       formData = new FormData();
    //       formData.append('account_id');

    // fetch( transactionsUrl, {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: formData
    // })
    // .then( (data) => data.json() )
    // .then( (transResponse) => {

    //     console.table( transResponse );;

    // }).catch( function( error ) {
    //     console.log(`Failed: ${error}`);
    // });

}

/*-------------
The user could have multiple accounts, so here we'll
get them to select their account (duh)
--------------*/
const getUsersAccount = () => {

    console.log('get users account');

    const accountsEnd = `${config.monzoUrl}/ping/whoami`;

    fetch( accountsEnd, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
    .then( (data) => data.json() )
    .then( (accountsResp) => {

        console.table(accountsResp);

    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });



}

export default connected;