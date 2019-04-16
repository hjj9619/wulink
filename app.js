let express = require("express");
let app = express();
let ejs = require('ejs');
let path = require("path");

let bodyParser = require('body-parser');


// 解析 application/json
app.use(bodyParser.json()); 
// 解析 XML
app.use(bodyParser.text({ type: 'text/xml' }))

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
  console.log( req );
  res.status = 200;
  res.send("hello")
  
})


// setDeviceInfo();
