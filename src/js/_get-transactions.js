import config from './_config.js';
import 'babel-polyfill';

const getTransactions = () => {

    let mapPoints = [];
    let transLocations = [];

    // let transactionIDs = [];
    const transEndpoint = `${config.monzoUrl}/transactions?account_id=${sessionStorage.getItem('accountId')}&limit=5`;

    fetch( transEndpoint, {
        'method': 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
    .then( (data) => data.json() )
    .then( (transResponse) => {

        // console.dir(transResponse);

        [...transResponse.transactions].forEach(element => {

            let transactionId = element['id'];

            let transDetails = getTransactionDetails( transactionId );

            mapPoints.push(transDetails);


            // console.log( transDetails );
            // transDetails

            transLocations = [

            ];
            // console.log( getTransactionDetails( transactionId ) );

        });

    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

    console.dir( mapPoints );

    // are.map(o=>{for(let p in o){console.log(o[p])}})

    // arr.map(o=>{console.log(o.created)})

    // mapPoints.forEach

    // [...mapPoints].forEach(element => {

    //     console.log(element);

    // });

    // for (const el of mapPoints) {

    //     console.dir(el);

    // }

};


const getTransactionDetails = transactionId => {

    let ggg = [];

    // async function
    async function fetchAsync () {

        const transactionDetail = `${config.monzoUrl}/transactions/${transactionId}?expand[]=merchant`;

        // await response of fetch call
        let response = await fetch(transactionDetail, {
            'method': 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        return data;
    }

    // trigger async function
    // log response or catch error of fetch promise
    fetchAsync()
        .then(data => {

            let transInfo = data.transaction;


                    // if (
                        // transInfo.merchant &&
                        // transInfo.merchant.online == false ) {

            ggg.push(
                transInfo.created,
                transInfo.category,
                // transInfo.merchant.name,
                // transInfo.merchant.address.latitude,
                // transInfo.merchant.address.longitude,
            );


                    // }
            // return transInfo;

            // console.dir(data);
            // console.dir(transInfo);



        })
        .catch(reason => {
            console.log(reason.message)
        });


        return ggg;
};


window.initMap = ( combinedTransactions ) => {

    let accessToken = sessionStorage.getItem('transactionDetails'),
        locations = [];

    if ( typeof accessToken !== 'undefined' && accessToken !== null ) {

        // console.dir( combinedTransactions );

        let products = [
            { name: 'Running shoes', price: 75 },
            { name: 'Golf shoes',    price: 85 },
            { name: 'Dress shoes',   price: 95 },
            { name: 'Walking shoes', price: 65 },
            { name: 'Sandals',       price: 55 }
        ];

        var test = { name: 'Off-white', price: 1000 };
        var two = { name: 'dvsf-white', price: 1000 };
        var three = { name: 'Offfdsfsdf-white', price: 1000 };
        var test = { name: 'Off-white', price: 1000 };

        // console.dir(test);

        // products.push(test);
        // products.push(two);
        // products.push(three);


        // console.dir(products);

    }
    else {
        console.log('nah fam');
    }


    // var locations = [
    //     ['Bondi Beach', -33.890542, 151.274856, 4],
    //     ['Coogee Beach', -33.923036, 151.259052, 5],
    //     ['Cronulla Beach', -34.028249, 151.157507, 3],
    //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //     ['Maroubra Beach', -33.950198, 151.259302, 1]
    //   ];

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