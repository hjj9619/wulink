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
  let nonce = "ASaSJLLJIOqeoiaq"
  let SIGN = md5(conf.appId + data + nonce + now);
  let formData = {
    "appid": conf.appId,
    "nonce": nonce,
    "timestamp": now,
    "sign": SIGN,
    "devtype": "Wukong",
    "cmdtype": "get",
    "cmd": "device_info"
  }

  // let str = JSON.stringify( formData );
  let url = conf.deviceUrl + "808600016928?" + `appid=${ conf.appId }&nonce=ASaSJLLJIOqeoiaq&timestamp=${ now }&sign=${ SIGN }&devtype=Wukong&cmdtype=get&cmd=device_info` ;
  let url2 = conf.deviceUrl + "808600016928";
  request.get(url2, {formData:formData, json: true}, function( err, response, body ){
    if( !err ){
      // console.log( response );
      console.log( body );
    }else{
      console.log( err );
    }
  })


}).catch(function( err ){
  if( err ) console.log( err );
})

/**
 * 
 * 80238201?appid=APPID&nonce=NONCE&timestamp=TIMESTAMP&sign=SIGN&devtype=DEVTYPE&cmdtype=GET&cmd=online
 * 
 */