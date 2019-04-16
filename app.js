let express = require("express");
let app = express();
let getAccessToken = require('./util/getAccessToken').getAccessToken;
let getDeviceInfo = require('./libs/ctrl').getDeviceInfo;
let setDeviceInfo = require('./libs/ctrl').setDeviceInfo;




app.listen(3000);


// getAccessToken();


// getDeviceInfo('EleMeter', '101080001561', 'get', 'online');

setDeviceInfo();

