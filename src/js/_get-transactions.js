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

        [...transResponse.transactions].forEach(element => {

            transactionIDs.push( element['id'] );

        });

        getTransactionDetails( transactionIDs );


    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};


const getTransactionDetails = (transactionIDs) => {

    let combinedTransactions = [];
    let combineTrans = {};

    transactionIDs.forEach(function(ourTransaction) {

        // console.log(ourTransaction);

        let transactionDetail = `${config.monzoUrl}/transactions/${ourTransaction}?expand[]=merchant`;

        fetch( transactionDetail, {
            'method': 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        .then( (data) => data.json() )
        .then( (transactionResponse) => {

            if (
                transactionResponse.transaction.merchant &&
                transactionResponse.transaction.merchant.online == false ) {

                    let merchantInfo = transactionResponse.transaction.merchant;


                    let transactionInfo = [
                        'category', merchantInfo.category,
                        'created', merchantInfo.created,
                        'name', merchantInfo.name,
                        'logo', merchantInfo.logo
                    ];

                    combinedTransactions.push(transactionInfo);


                // console.dir( merchantInfo.address );

                // console.log( merchantInfo.category );                // console.dir( transactionResponse.transaction );
                // console.log( merchantInfo.created );
                // console.log( merchantInfo.name );
                // console.log( merchantInfo.logo );

                // console.log

                // combinedTransactions.push( transactionResponse.transaction.merchant );

                // Object.assign( combineTrans, transactionResponse.transaction.merchant );

                sessionStorage.setItem('transactionDetails', 'set');

            }

        }).catch( function( error ) {

            console.error(`Failed: ${error}`);


        });


    });

    // console.dir(combinedTransactions);

    // console.log( combineTrans );

    initMap(combinedTransactions);

};


window.initMap = ( combinedTransactions ) => {

    let accessToken = sessionStorage.getItem('transactionDetails');
    //     locations = [];

    if ( typeof accessToken !== 'undefined' && accessToken !== null ) {

        // console.dir(combineTrans);
        console.dir(combinedTransactions);

    }
    else {
        console.log('nah fam');
    }


    var locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
      ];

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }

};


export default getTransactions;