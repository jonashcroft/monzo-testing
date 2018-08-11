import config from './_config.js';

const getTransactions = () => {

    let transactionIDs = [];

    const transEndpoint = `${config.monzoUrl}/transactions?account_id=${sessionStorage.getItem('accountId')}&limit=25`;

    fetch( transEndpoint, {
        'method': 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
    .then( (data) => data.json() )
    .then( (transResponse) => {

        // console.table(transResponse.transactions);

        [...transResponse.transactions].forEach(element => {
            // console.log(element['id']);

            transactionIDs.push(element['id']);
        });

        console.table(transactionIDs);


    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};

export default getTransactions;