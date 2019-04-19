let fs = require('fs');
let conf = require('../conf/conf');
let request = require("request");
let path = require('path');

function getAccessToken(){
    return new Promise(function( resolve, reject ){
        request.post(conf.accessUrl, {formData: { "appid":conf.appId, "appkey":conf.appKey }, json: true}, 
                    function(err, response, body){
                        if( err ){
                            console.log( err );
                        }else{
                            //  console.log(typeof body ); // Object
                            // 返回值 body
                            // {
                            //     "errcode": 0,
                            //     "errmsg": "Success",
                            //     "data": {
                            //         "access_token": "f716c2edaee44bd19f5bb350a99b8d2c",
                            //         "expire": 7200
                            //     }
                            // }
                            
                            let now = new Date().getTime();
                            console.log( "获取 Access_Token 时的返回值！");
                            console.log( body );
                            body.data['timestamp'] = now;
                            console.log( body.data );
                            
                            fs.writeFile( path.join( __dirname, '../conf/access.json' ), JSON.stringify( body.data ), function( err ){
                                if( err ) console.log( err );
                            })
                        }  
                    })
    })
}

function getLocalToken(){
    return new Promise(function( resolve, reject ){

        fs.readFile( path.join( __dirname, '../conf/access.json' ), 'utf-8', function( err, data ){
            
            if( err ){
                reject( err );
            }else{
                console.log( typeof data );
                console.log( data );
                let now = new Date().getTime();
                let old = JSON.parse( data ).timestamp;
                let token = JSON.parse( data ).access_token;
                
                if( now - old > 6800 ){
                    getAccessToken().then(function(){
                        getLocalToken();
                    });
                }else{
                    resolve( token );
                }

            }
        })

    });
}





exports = module.exports = {
    getLocalToken: getLocalToken,
    getAccessToken: getAccessToken
}