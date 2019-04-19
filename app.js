let express = require("express");
let app = express();
let ejs = require('ejs');
let path = require("path");
let bodyParser = require('body-parser');
let md5 = require('md5');
let request = require('request');

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(express.static('public'))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/plain' }))


app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'ejs' );


let getAccessToken = require('./util/getAccess').getAccessToken;
let getLocalToken = require('./util/getAccess').getLocalToken;
let getDeviceInfo = require('./libs/ctrl').getDeviceInfo;
let setDeviceInfo = require('./libs/ctrl').setDeviceInfo;
let connecteWifi = require('./libs/ctrl').connecteWifi;
let conf = require("./conf/conf");




app.listen(3000);
// getAccessToken();



// 空调首页
app.get('/air', function( req, res ){
  

  getDeviceInfo('Wukong', '808600016928', 'get', 'air_ctrl').then(function( body ){
    getDeviceInfo('Wukong', '808600016928', 'get', 'online').then(function( onLineBody ){
      
      console.log(typeof onLineBody ); // Object  
      console.log( onLineBody.data.online ); // 1
      
      online = onLineBody.data.online;
      body.data['online'] = online;
      console.log( body.data );
      res.render('index', body.data);
    }).catch(function( err ){
      if( err ) console.log( err );
    });
  }).catch(function( err ){
    if( err ) console.log( err );
  });
  
})



// 打开空调
app.post('/air/on', function( req, res){
  req.on('data', function( data ){
    let obj = JSON.parse( data );
    console.log( obj );
    //808600016928
    // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 0 );
    setDeviceInfo( '808600016928', obj ).then(function( data ){
      res.send( data );
    })
  })
})

// 关闭空调
app.post('/air/off', function( req, res){
  req.on('data', function( data ){
   
    let obj = JSON.parse( data );
    console.log( obj );
    
    //808600016928
    // "Wukong", "808600016928", "set", "air_ctrl", 1 
    setDeviceInfo('808600016928', obj ).then(function( data ){
      res.send( data );
    });


  })

})

// 配置 WIFI
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
        // obj.SSID, obj.PWD
          connecteWifi( "Wukong", "808600016928", "set", "ssid", "XCKJ", "XCKJ8888" ).then(function( data ){
            resolve( data );
          })
  
      })
  
    })
  }).then(function( data ){


    console.log( data );
    if( data.errcode === 0 ){

      console.log( "WIFI连接成功！" );

      // 如果 WIIF 连接成功，就跳转回主页
      // res.redirect('/air');

    }


  }).catch(function( err ){
    if( err ) console.log( err );
  })
})


///  降温
app.post('/air/temp/down', function( req, res ){
  getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function( data ){
    console.log( "客户端提交的数据________" );
    console.log( data );
    if( data.data.onoff == 0 ){
      req.on('data', function( data ){

        let obj = JSON.parse( data );
    
    
        //808600016928
        // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
        setDeviceInfo('808600016928', obj ).then(function( data ){
          res.send( data );
        })
    
    
      })
    }else{
      res.send({'errcode':1, 'errMsg': '设备处于关机状态，无法进行此操作！'})
    }
  })

  

})


/// 升温
app.post('/air/temp/up', function( req, res ){
  getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function( data ){
    console.log( "客户端提交的数据________" );
    console.log( data );
    if( data.data.onoff == 0 ){
      req.on('data', function( data ){

        let obj = JSON.parse( data );
        
    
        //808600016928
        // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
        setDeviceInfo('808600016928', obj).then(function( data ){
          res.send( data );
        })
      })
    }else{
      res.send({'errcode':1, 'errMsg': '设备处于关机状态，无法进行此操作！'})
    }
  })
})


// 切换空调工作模式  0自动 1制冷 2除湿 3送风 4制热 
app.post('/air/mode', function( req, res ){
  

  getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function( data ){

    if( data.data.onoff == 0 ){

      req.on('data', function( data ){
        let obj = JSON.parse( data );
        console.log(  obj );
    
        //808600016928
        // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
        setDeviceInfo('808600016928', obj ).then(function( data ){
          res.send( data );
        })
      })
    }else{
      req.on('data', function( data ){
        console.log( "客户端提交的数据____切换模式____" );
        console.log( JSON.parse( data ) );
      })
      res.send({'errcode':1, 'errMsg': '设备处于关机状态，无法进行此操作！'})
    }
  })

})
// 风向
app.post('/air/direct', function(req, res){
  getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function( data ){
    if( data.data.onoff == 0 ){

      req.on('data', function( data ){
        let obj = JSON.parse( data );
        console.log(  obj );
    
        //808600016928
        // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
        setDeviceInfo('808600016928', obj ).then(function( data ){
          res.send( data );
        })
      })
    }else{
      req.on('data', function( data ){
        console.log( "客户端提交的数据____切换风向____" );
        console.log( JSON.parse( data ) );
      })
      res.send({'errcode':1, 'errMsg': '设备处于关机状态，无法进行此操作！'})
    }
  })
})
// 风速
app.post('/air/wind', function(req, res){
  getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function( data ){
    if( data.data.onoff == 0 ){

      req.on('data', function( data ){
        let obj = JSON.parse( data );
        console.log(  obj );
    
        //808600016928
        // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
        setDeviceInfo('808600016928', obj ).then(function( data ){
          res.send( data );
        })
      })
    }else{
      req.on('data', function( data ){
        console.log( "客户端提交的数据___切换风速_____" );
        console.log( JSON.parse( data ) );
      })
      res.send({'errcode':1, 'errMsg': '设备处于关机状态，无法进行此操作！'})
    }
  })
})





app.post('/air/addtimer', function( req, res ){


  req.on('data', function( data ){
    let obj = JSON.parse( data );
    console.log(  obj );

    setDeviceInfo('808600016928', obj ).then(function( data ){
      res.send( data );
    })
  })



})





//////////////////////////////////////////////////////////////////////
/////////////////////   【以下代码需要大量优化】 /////////////////////////
//////////////////////////////////////////////////////////////////////

// match_process
app.post('/air/red', function( req, res){
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
      "cmdtype": "set",
      "cmd": "match_process",
      "onoff": "0",
      "mode": 1,
      "temp": 10,
      "wind": 0,
      "direct": 1,
      "key": 2
    }

    let url2 = conf.deviceUrl + "808600016928";
    let str = JSON.stringify( formData );

    // let url = conf.deviceUrl + id + `?appid=${ conf.appId }&nonce=ASaSJLLJIOqeoiaq&timestamp=${ now }&sign=${ SIGN }&devtype=${ devType }&cmdtype=${ cmdType }&cmd=${ cmd }` ;
    
    request.post(url2, {formData: formData, json: true}, function( err, response, body ){
      if( !err ){
        // console.log( response );
        console.log("设置红外的返回结果——————————")
        console.log( body );
        console.log("ERROR：————————")
        console.log( err );
      }
    })
  
  
  }).then(function(  ){
    getDeviceInfo('Wukong', '808600016928', 'get', 'match_action').then(function( body ){
      console.log( body );
      if( body.data.match_action == 1 ){
        console.log( "红外匹配成功!" );
        res.redirect('/air');
      }else{
        console.log(" 红外匹配失败！ ");
        console.log( body );
      }
    })
  })
  res.send("匹配红外中……")
})
