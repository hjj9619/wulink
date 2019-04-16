let express = require("express");
let app = express();
let ejs = require('ejs');


app.set( 'view engine', ejs );


let getAccessToken = require('./util/getAccessToken').getAccessToken;
let getDeviceInfo = require('./libs/ctrl').getDeviceInfo;
let setDeviceInfo = require('./libs/ctrl').setDeviceInfo;




app.listen(3000);


// getAccessToken();

app.get('/air', function( req, res, next ){
  
  getDeviceInfo('Wukong', '808600016928', 'get', 'air_ctrl').then(function( body ){
    console.log( body );

    res.render( 'index', body.data );
  }, function( err ){
    if( err ) console.log( err );
  }).catch(function( err ){
    if( err ) console.log( err );
  });

})


// setDeviceInfo();
