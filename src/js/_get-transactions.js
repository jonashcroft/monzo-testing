import config from './_config.js';

// AIzaSyD3Ob3Gc1urpUj51GTACeQnZJnk65fGiSU

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

        [...transResponse.transactions].forEach(element => {

            transactionIDs.push( element['id'] );

        });

        getTransactionDetails( transactionIDs );


    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};


const getTransactionDetails = (transactionIDs) => {

    // console.dir( transactionIDs );

    transactionIDs.forEach(function(el) {

        console.log(el);

    });

};

export default getTransactions;