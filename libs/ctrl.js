let request = require('request');
let md5 = require('md5');
let conf = require('../conf/conf');
let getLocalToken = require('../util/getAccess').getLocalToken;

//devType Wukong
//id  SN
//cmdType set
//cmd ssid
//ssid SSID
//pwd PWD


function connecteWifi(devType, id, cmdType, cmd, ssid, pwd) {
  return new Promise(function (resolve, reject) {
    getLocalToken().then(function (data) {  // data => Access_Token


      let now = new Date().getTime();
      let nonce = "ASaSJLLJIOqeoiaq"
      let SIGN = md5(conf.appId + data + nonce + now);


      let formData = {

        "appid": conf.appId,
        "nonce": nonce,
        "timestamp": now,
        "sign": SIGN,
        "devtype": devType,
        "cmdtype": cmdType,
        "cmd": cmd,
        "ssid": ssid,
        "pwd": pwd

      }

      let url2 = conf.deviceUrl + id;
      let str = JSON.stringify(formData);

      // let url = conf.deviceUrl + id + `?appid=${ conf.appId }&nonce=ASaSJLLJIOqeoiaq&timestamp=${ now }&sign=${ SIGN }&devtype=${ devType }&cmdtype=${ cmdType }&cmd=${ cmd }` ;

      request.post(url2, { formData: formData, json: true }, function (err, response, body) {
        if (!err) {
          // console.log( response );
          // console.log( body );
          resolve(body);
        } else {
          // console.log( err );
          reject(err);
        }
      })
    })


  }).catch(function (err) {
    if (err) console.log(err);
  })
}


function setDeviceInfo(id, obj) { //devType, id, cmdType, cmd, onoff
  return new Promise(function (resolve, reject) {
    getLocalToken().then(function (data) {
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
        "cmdtype": "set",
        "cmd": "air_ctrl",
        "onoff": 0,
        "mode": 0,
        "temp": 0,
        "wind": 0,
        "direct": 0,
        "key": 2
      }

      for (let key in obj) {
        formData[key] = obj[key];
      }

      let url2 = conf.deviceUrl + id;
      let str = JSON.stringify(formData);

      // let url = conf.deviceUrl + id + `?appid=${ conf.appId }&nonce=ASaSJLLJIOqeoiaq&timestamp=${ now }&sign=${ SIGN }&devtype=${ devType }&cmdtype=${ cmdType }&cmd=${ cmd }` ;

      request.post(url2, { formData: formData, json: true }, function (err, response, body) {
        if (!err) {
          // console.log( response );
          resolve(body);
        } else {
          reject(err);
        }
      })


    })
  }).catch(function (err) {
    if (err) console.log(err);
  })
}


function getDeviceInfo(devType, id, cmdType, cmd) {

  return new Promise(function (resolve, reject) {

    getLocalToken().then(function (data) {
      // console.log( data );

      let now = new Date().getTime();
      let nonce = "ASaSJLLJIOqeoiaq"
      let SIGN = md5(conf.appId + data + nonce + now);


      let url = conf.deviceUrl + id + `?appid=${conf.appId}&nonce=ASaSJLLJIOqeoiaq&timestamp=${now}&sign=${SIGN}&devtype=${devType}&cmdtype=${cmdType}&cmd=${cmd}`;

      request.get(url, { json: true }, function (err, response, body) {
        if (!err) {
          // console.log( body );
          resolve(body);
        } else {
          // console.log( err );
          reject(err);
        }
      })


    }).catch(function (err) {
      if (err) console.log(err);
    })


  })


}


exports = module.exports = {
  getDeviceInfo,
  setDeviceInfo,
  connecteWifi
}