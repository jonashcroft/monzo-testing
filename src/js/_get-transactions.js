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

            return transDetails;


        });

        return mapPoints;

    }).then( mapPoints => {

        console.dir( mapPoints );


        // mapPoints.push(transDetails);

        initMap(mapPoints);

        // console.dir( mapPoints );

    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};


const getTransactionDetails = transactionId => {

    let allLocations = [];
    let helloWorld = [];

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

            if (
                transInfo.merchant &&
                transInfo.merchant.online == false ) {

                    sessionStorage.setItem('transactionDetails', true);

                    helloWorld = [
                        transInfo.merchant.name,
                        transInfo.merchant.id,
                        transInfo.merchant.address.latitude,
                        transInfo.merchant.address.longitude,
                    ];

                    return helloWorld;

                    // console.dir(helloWorld);

                    // allLocations.push(location);

            }

        }).then( helloWorld => {

            console.dir(helloWorld);

        })
        .catch(reason => {
            console.log(reason.message)
        });

        return helloWorld;

};

// https://wrightshq.com/playground/placing-multiple-markers-on-a-google-map-using-api-3/

window.initMap = ( allLocations ) => {

    let accessToken = sessionStorage.getItem('transactionDetails');

    if ( typeof accessToken !== 'undefined' && accessToken !== null ) {

        // console.dir( allLocations );

    }
    else {
        console.log( 'nah fam' );
    }


    var locations = [
        ['Bondi Beach',  52.4748184, -1.8960125, 4],
        ['Coogee Beach', 52.4731932,-1.9012636, 5],
        ['Cronulla Beach', 52.4756251,-1.9424172, 3],
        ['Manly Beach', 52.4823753,-1.8779734, 2],
        ['Maroubra Beach', 52.4610174,-1.8970613, 1]
      ];

    //   console.dir(locations);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(52.4748184, -1.8960125),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i;
      var markers = [];

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }

    //   console.log(markers[0]);

      for (const value of allLocations) {

        // console.dir(value);

        let name = value[0];
        let id   = value[1];
        let lat  = value[2];
        let long = value[3];

        // console.group();
        // console.dir( name );
        // console.dir( id );
        // console.dir( lat );
        // console.dir( long );
        // console.groupEnd();


        // marker = new google.maps.Marker({
        //     position: new google.maps.LatLng( lat, long ),
        // //   position: new google.maps.LatLng(allLocations[i][2], allLocations[i][3]),
        //     map: map
        // });

        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //     return function() {
        //         infowindow.setContent(name);
        //         infowindow.open(map, marker);
        //     }
        // })(marker, i));

    }


};


export default getTransactions;