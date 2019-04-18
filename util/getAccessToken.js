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
                            let token = body.data.access_token;
                            fs.writeFile( path.join( __dirname, '../conf/access.txt' ), token, function( err ){
                                if( err ) console.log( err );
                            })
                        }  
                    })
    })
}

function getLocalToken(){
    return new Promise(function( resolve, reject ){

        fs.readFile( path.join( __dirname, '../conf/access.txt' ), 'utf-8', function( err, data ){
            
            if( err ){
                reject( err );
            }else{
                resolve( data );
            }
        })

    });
}


exports = module.exports = {
    getLocalToken: getLocalToken,
    getAccessToken: getAccessToken
}