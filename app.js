let request = require("request");
let express = require("express");
let app = express();
let fs = require("fs");
let getLocalToken = require('./util/getAccessToken').getLocalToken;
let getAccessToken = require('./util/getAccessToken').getAccessToken;
app.listen(3000);


getAccessToken();

setTimeout(function(){
  getLocalToken().then(function(data){
    console.log( data );
  })
}, 2000);