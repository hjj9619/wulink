let express = require("express");
let app = express();
let ejs = require('ejs');
let path = require("path");

let bodyParser = require('body-parser');


// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/plain' }))




app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'ejs' );


let getAccessToken = require('./util/getAccessToken').getAccessToken;
let getDeviceInfo = require('./libs/ctrl').getDeviceInfo;
let setDeviceInfo = require('./libs/ctrl').setDeviceInfo;




app.listen(3000);


// getAccessToken();

app.get('/air', function( req, res ){
  
  getDeviceInfo('Wukong', '808600016928', 'get', 'air_ctrl').then(function( body ){
    // console.log( body );
    res.render( 'index', body.data );
    
  }).catch(function( err ){
    if( err ) console.log( err );
  });


})

app.post('/air', function( req, res){
  console.log( req.body );
  res.status = 200;
  res.send("hello")

})


// setDeviceInfo();
