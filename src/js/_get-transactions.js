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


        });

    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};


const getTransactionDetails = transactionId => {

    let ggg = [];
    let allLocations = [];
    let location = [];
    let temp = [];

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

                    location = [
                        transInfo.merchant.name,
                        transInfo.merchant.id,
                        transInfo.merchant.address.latitude,
                        transInfo.merchant.address.longitude,
                    ];

                    temp.push(location);
                    allLocations.push(temp);

                    initMap(allLocations);

            }

        })
        .catch(reason => {
            console.log(reason.message)
        });

        // return ggg;
};


window.initMap = ( allLocations ) => {

    let accessToken = sessionStorage.getItem('transactionDetails');

    if ( typeof accessToken !== 'undefined' && accessToken !== null ) {

        // console.dir( allLocations );

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



    // var locations = [
    //     ['Bondi Beach', 52.4795885, -1.89937],
    //     ['Coogee Beach', -33.923036, 151.259052],
    //     ['Cronulla Beach', -34.028249, 151.157507],
    //     ['Manly Beach', -33.80010128657071, 151.28747820854187],
    //     ['Maroubra Beach', -33.950198, 151.259302]
    //   ];

    //   console.dir(locations);
    //   console.dir(allLocations);

    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 15,
    //     center: new google.maps.LatLng(52.4795885, -1.89937),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   });

    //   var infowindow = new google.maps.InfoWindow();

    //   var marker, i;

    //   for (i = 0; i < locations.length; i++) {
    //     marker = new google.maps.Marker({
    //       position: new google.maps.LatLng(locations[1], locations[2]),
    //     //   position: new google.maps.LatLng(allLocations[i][2], allLocations[i][3]),
    //       map: map
    //     });

    //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //       return function() {
    //         infowindow.setContent(locations[0]);
    //         infowindow.open(map, marker);
    //       }
    //     })(marker, i));
    //   }


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