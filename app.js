let express = require("express");
let app = express();
let getLocalToken = require('./util/getAccessToken').getLocalToken;
let getAccessToken = require('./util/getAccessToken').getAccessToken;
let conf = require('./conf/conf');
let request = require('request');
let md5 = require('md5');


app.listen(3000);


// getAccessToken();


getLocalToken().then(function(data){
  // console.log( data );
  let now = new Date().getTime();
  let SIGN = md5(conf.appId + data + "asdfghjkllkjhgfdsa", now)
  let formData = {
    appid: conf.appId,
    nonce: "asdfghjkllkjhgfdsa",
    timestamp: now,
    sign: SIGN,
    devtype: "Wukong",
    cmdtype: "get",
    cmd: 'online'

  }
  let url = conf.deviceUrl + "808600016928";
  request.get(url, { formData: formData }, function( err, response, body ){
    console.log( body );
  })


}).catch(function( err ){
  if( err ) console.log( err );
})

/**
 * 
 * 80238201?appid=APPID&nonce=NONCE&timestamp=TIMESTAMP&sign=SIGN&devtype=DEVTYPE&cmdtype=GET&cmd=online
 * 
 */