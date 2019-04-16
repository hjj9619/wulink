let express = require("express");
let app = express();
let ejs = require('ejs');
let path = require("path");
let bodyParser = require('body-parser');


// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/plain' }))


app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'ejs' );


let getAccessToken = require('./util/getAccessToken').getAccessToken;
let getDeviceInfo = require('./libs/ctrl').getDeviceInfo;
let setDeviceInfo = require('./libs/ctrl').setDeviceInfo;
let connecteWifi = require('./libs/ctrl').connecteWifi;




app.listen(3000);


// getAccessToken();



// 空调首页
app.get('/air', function( req, res ){
  
  getDeviceInfo('Wukong', '808600016928', 'get', 'air_ctrl').then(function( body ){
    // console.log( body );
    let online;
    getDeviceInfo('Wukong', '808600016928', 'get', 'online').then(function( data ){
      online = data;
    })
    body.data.onlin = 0;
    res.render( 'index', body.data );
    
  }).catch(function( err ){
    if( err ) console.log( err );
  });
})



// 打开空调
app.post('/air/on', function( req, res){
  req.on('data', function( data ){
    
    // let obj = JSON.parse( data );
    // console.log( obj );

    //808600016928
    setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 0 );

    res.send("数据已成功接收！");
  })

})

// 关闭空调
app.post('/air/off', function( req, res){
  req.on('data', function( data ){
    
    // let obj = JSON.parse( data );
    // console.log( obj );

    //808600016928
    setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );

    res.send("数据已成功接收！");

  })

})


app.get('/air/wifi', function( req, res ){
  // console.log( req.body );

  let id = req.query.sn;
  res.render('wifi')

  // 给悟空连 WIFI
  return new Promise(function( resolve, reject ){
    app.post('/air/wifi', function( req, res){
      req.on('data', function( data ){
        
        let obj = JSON.parse( data );
        console.log( obj );

  
        //808600016928

          connecteWifi( "Wukong", id, "set", "ssid", obj.SSID, obj.PWD ).then(function( data ){
            resolve( data );
          })
  
      })
  
    })
  }).then(function( data ){


    console.log( data );
    if( data.errcode === 0 ){
      console.log( "WIFI连接成功！" );
      res.end("success");

      // 如果 WIIF 连接成功，就跳转回主页
      res.redirect('/air');

    }


  }).catch(function( err ){
    if( err ) console.log( err );
  })
})



// match_process

app.post('/air/red', function( req, res){
  req.on('data', function( data ){
    
    // let obj = JSON.parse( data );
    // console.log( obj );

    //808600016928
    setDeviceInfo( "Wukong", "808600016928", "set", "match_process", 0 ).then(function( data ){
      console.log( data );
    });

    res.send("数据已成功接收！");

  })

})