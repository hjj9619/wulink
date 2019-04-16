let request = require("request");
let express = require("express");
let app = express();
let fs = require("fs");
app.listen(3000);

let appKey = "7FVaHrZvTNrFyMG1uoyF7QsKyRKa0746";
let appId = "78f4dfd35418565e20c67997b96ed793";



// 获取 Access_Token, 并将 Access_Token 字符串写入./access.txt 文件中
let url = 'https://api.ifanscloud.com/v3/access/token';
/*
request.post(url, {formData: { "appid":appId, "appkey":appKey }, json: true}, function(err, response, body){
    if( err ){
        console.log( err );
    }else{
      //  console.log(typeof body ); // Object
      let token = body.data.access_token;
      fs.writeFile('./access.txt', token, function( err ){
	if( err ) console.log( err );
      })
    }  
})
*/

