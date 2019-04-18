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
                        // let token = body.data.access_token;
                        let obj = body.data;
                        obj.data['timestamp'] = new Date().getTime();
                        fs.writeFile( path.join( __dirname, '../conf/access.json' ), obj, function( err ){
                            if( err ) console.log( err );
                        })
                        }  
                    })
    })
}

function getLocalToken(){
    return new Promise(function( resolve, reject ){

        fs.readFile( path.join( __dirname, '../conf/access.json' ), 'utf-8', function( err, data ){
            let obj;
            if( !data ){
                getAccessToken().then(function(){
                    getLocalToken();
                });
            }else{
                obj = JSON.parse(data);
            }

            if( err ){
                reject( err );
            }else{


                // 将现在的时间 与 之前存的 Access 时间 进行对比，如果 Access 存储已经超过 7000s，就重新获取 Access_Token，否则直接返回之前获取到的 token
                let now = new Date().getTime();
                if( now - obj.timestamp > 7000 ){
                    getAccessToken();
                }else{
                    resolve( obj.access_token )
                }
                
                resolve( obj );

            }

        })

    });
}


exports = module.exports = {
    getLocalToken: getLocalToken,
    getAccessToken: getAccessToken
}