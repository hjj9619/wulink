let express = require("express");
let app = express();
let getAccessToken = require('./util/getAccessToken').getAccessToken;
let getDeviceInfo = require('./libs/ctrl').getDeviceInfo;




app.listen(3000);


// getAccessToken();


getDeviceInfo('Wuneng', '101080001561', 'get', 'online');

