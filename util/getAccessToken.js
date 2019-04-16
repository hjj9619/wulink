let fs = require('fs');
let conf = require('../conf/conf');
let request = require("request");
let path = require('path');


exports = module.exports = {
    getLocalToken: function(){
        return new Promise(function( resolve, reject ){

            fs.readFile( path.join( __dirname, '../conf/access.txt' ), 'utf-8', function( err, data ){

                if( err ){
                    reject( err );
                }else{
                    resolve( data );
                }

            })

        });
    },
    getAccessToken: function( resolve, reject ){
        
        return new Promise(function( resolve, reject ){
            request.post(conf.accessUrl, 
                        {formData: { "appid":conf.appId, "appkey":conf.appKey }, 
                        json: true}, 
                        function(err, response, body){
                            if( err ){
                                console.log( err );
                            }else{
                            //  console.log(typeof body ); // Object
                            let token = body.data.access_token;
                            fs.writeFile( path.join( __dirname, '../conf/access.txt' ), token, function( err ){
                            if( err ) console.log( err );
                            })
                            }  
                        })
        })
    }
}



// 获取 Access_Token, 并将 Access_Token 字符串写入./access.txt 文件中
/*
let url = 'https://api.ifanscloud.com/v3/access/token';
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