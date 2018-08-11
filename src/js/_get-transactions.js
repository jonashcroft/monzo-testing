import config from './_config.js';

const getTransactions = () => {

    console.log('list em all');

    const transEndpoint = `${config.monzoUrl}/transactions?account_id=${sessionStorage.getItem('accountId')}&limit=25`;

    console.log(transEndpoint);

    fetch( transEndpoint, {
        'method': 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
    .then( (data) => data.json() )
    .then( (transResponse) => {

        // console.table( transResponse );

        for ( let transaction in transResponse ){

            if ( transResponse.hasOwnProperty(transaction) ) {

                console.log( transaction );
                console.table( transResponse[transaction] );

            }

        }


    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};

export default getTransactions;