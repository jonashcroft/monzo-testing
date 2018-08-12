import config from './_config.js';
import 'babel-polyfill';

const getTransactions = () => {

    let transactionIDs = [];
    const transEndpoint = `${config.monzoUrl}/transactions?account_id=${sessionStorage.getItem('accountId')}&limit=5`;

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

        // console.dir(transactionIDs);

        getTransactionDetails( transactionIDs );


    }).catch( function( error ) {

        console.error(`Failed: ${error}`);

    });

};


const getTransactionDetails = transactionIDs => {

    let transactionArr = [];

        for ( let ourTransaction of transactionIDs ) {

            let smallArr = [];

            // Async/Await requirements: Latest Chrome/FF browser or Babel: https://babeljs.io/docs/plugins/transform-async-to-generator/
            // Fetch requirements: Latest Chrome/FF browser or Github fetch polyfill: https://github.com/github/fetch

            // async function
            async function fetchAsync () {

                const transactionDetail = `${config.monzoUrl}/transactions/${ourTransaction}?expand[]=merchant`;

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
                    // console.dir(data);

                    let transInfo = data.transaction;

                    // if (
                        // transInfo.merchant &&
                        // transInfo.merchant.online == false ) {

                            let myTrans = {
                                'created': transInfo.created,
                                'name': transInfo.merchant.name,
                                'lat': transInfo.merchant.address.latitude,
                                'lng': transInfo.merchant.address.longitude,
                            };

                            // console.dir(myTrans);

                            smallArr.push(myTrans);

                            // return myTrans;

                    // }
                })
                .catch(reason => {
                    console.log(reason.message)
                });

            transactionArr.push(smallArr);

        }


        // const getNestedObject = (nestedObj, pathArr) => {
            // return pathArr.reduce((obj, key) =>
                // (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
        // }
        // pass in your object structure as array elements
        // const name = getNestedObject(user, ['personalInfo', 'name']);
        // to access nested array, just pass in array index as an element the path array.
        // const city = getNestedObject(user, ['personalInfo', 'addresses', 0, 'city']);
        // this will return the city from the first address item.


        // console.dir(transactionArr);

        // Object.keys(transactionArr).forEach(function(prop) {

        //     console.log( transactionArr[0].created );

        //     // `prop` is the property name
        //     // `data[prop]` is the property value
        //   });


        Object.keys(transactionArr).forEach(key => {
            console.log(key) // returns the keys in an object
            console.log(transactionArr[key])  // returns the appropriate value

            Object.keys( transactionArr[key] ).forEach(function(prop) {

                console.log(prop);

            });

         })


        for (const key in transactionArr) {
            if (transactionArr.hasOwnProperty(key)) {
                const element = transactionArr[key];

                // console.log(element[0]);

            }
        }

        // [...transactionArr].forEach( element => {

        //     console.dir(element);
        //     // console.log(element[0].name);

        // });


        // for ( let index in transactionArr ) {

        //     if (transactionArr.hasOwnProperty(index)) {

        //         console.log(index)
        //         console.dir(transactionArr);
        //         // artistList.push( transactionArr[name][['name']] );
        //     }

        // }


        // for (const [index, trans] of transactionArr) {

        //     console.dir(index[trans]);
        //     console.dir(trans);

        //     for (const subtrans of trans) {

        //         // console.dir(subtrans);

        //     }

        // }


    //   const request = async () => {

    //     const response = await fetch('https://api.com/values/1');
    //     const json = await response.json();
    //     console.log(json);
    // }

    // request();


    // console.dir(transactionIDs);


    // for ( let ourTransaction of transactionIDs ) {

    //     const transactionDetail = `${config.monzoUrl}/transactions/${ourTransaction}?expand[]=merchant`;

    //     // let myTrans = [];

    //     fetch( transactionDetail, {
    //         'method': 'GET',
    //         headers: {
    //             Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    //         }
    //     })
    //     .then( (data) => data.json() )
    //     .then( (transDetailResp) => {

    //         let transInfo = transDetailResp.transaction;

    //         if (
    //             transInfo.merchant &&
    //             transInfo.merchant.online == false ) {

    //                 let myTrans = {
    //                     'created': transInfo.created,
    //                     'name': transInfo.merchant.name,
    //                     'lat': transInfo.merchant.address.latitude,
    //                     'lng': transInfo.merchant.address.longitude,
    //                 };

    //                 // console.dir(myTrans);

    //                 transactionArr.push(myTrans);

    //                 // return myTrans;

    //         }

    //     }).catch( function( error ) {

    //         console.error(`Failed: ${error}`);

    //     });

    // }

    // console.dir(test);

    // transactionArr = transactionArr.map(x => x.date);

    // console.dir(transactionArr);

    // console.log(transactionArr.map(function(item){
    //     return item.date;
    // }));

    // transactionArr.forEach(function (arrayItem) {
    //     // var x = arrayItem.prop1 + 2;
    //     console.log(arrayItem);
    // });

    // Object.keys(transactionArr).forEach(function(prop) {
    //     // `prop` is the property name
    //     // `data[prop]` is the property value

    //     console.log(transactionArr[prop]);
    // });

    // transactionArr.forEach(function (arrayItem) {
    //     // var x = arrayItem.prop1 + 2;
    //     console.log(arrayItem);
    // });


    // const transactionDetail = `${config.monzoUrl}/transactions/${ourTransaction}?expand[]=merchant`;

    // fetch( transEndpoint, {
    //     'method': 'GET',
    //     headers: {
    //         Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    //     }
    // })
    // .then( (data) => data.json() )
    // .then( (transResponse) => {

    //     [...transResponse.transactions].forEach(element => {

    //         transactionIDs.push( element['id'] );

    //     });

    //     // console.dir(transactionIDs);

    //     getTransactionDetails( transactionIDs );


    // }).catch( function( error ) {

    //     console.error(`Failed: ${error}`);

    // });



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