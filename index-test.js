let express = require("express");
let app = express();
let path = require("path");
let bodyParser = require('body-parser');

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(express.static('public'))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/plain' }))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


let { getDeviceInfo, setDeviceInfo, connecteWifi } = require("./libs/ctrl");



const port = 3000;
app.listen(port, () => {
    console.log("http://localhost:" + port + "/air");
});

// app.get('/air', (req, res) => {
//     res.render('index-test', {
//         online: 1,
//         temp: 0,
//         mode: 1,
//         direct: 0,
//         wind: 0,
//         onoff: 1
//     });
// })


// 空调首页
app.get('/air', function (req, res) {


    getDeviceInfo('Wukong', '808600016928', 'get', 'air_ctrl').then(function (body) {
        getDeviceInfo('Wukong', '808600016928', 'get', 'online').then(function (onLineBody) {

            console.log(typeof onLineBody); // Object
            console.log(onLineBody.data.online); // 1

            online = onLineBody.data.online;
            body.data['online'] = online;
            console.log(body.data);
            res.render('index-test', body.data);
        }).catch(function (err) {
            if (err) console.log(err);
        });
    }).catch(function (err) {
        if (err) console.log(err);
    });

})





// 打开空调
app.post('/air/on', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data);
        console.log(obj);
        //808600016928
        // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 0 );
        setDeviceInfo('808600016928', obj).then(function (data) {
            res.send(data);
        })
    })
})

// 关闭空调
app.post('/air/off', function (req, res) {
    req.on('data', function (data) {

        let obj = JSON.parse(data);
        console.log(obj);

        //808600016928
        // "Wukong", "808600016928", "set", "air_ctrl", 1
        setDeviceInfo('808600016928', obj).then(function (data) {
            res.send(data);
        });


    })

})

// 配置 WIFI
app.get('/air/wifi', function (req, res) {
    // console.log( req.body );

    let id = req.query.sn;
    res.render('wifi')

    // 给悟空连 WIFI
    return new Promise(function (resolve, reject) {
        app.post('/air/wifi', function (req, res) {
            req.on('data', function (data) {

                let obj = JSON.parse(data);
                console.log(obj);


                //808600016928
                // obj.SSID, obj.PWD
                connecteWifi("Wukong", "808600016928", "set", "ssid", "XCKJ", "XCKJ8888").then(function (data) {
                    resolve(data);
                })

            })

        })
    }).then(function (data) {


        console.log(data);
        if (data.errcode === 0) {

            console.log("WIFI连接成功！");

            // 如果 WIIF 连接成功，就跳转回主页
            // res.redirect('/air');

        }


    }).catch(function (err) {
        if (err) console.log(err);
    })
})


///  降温
app.post('/air/temp/down', function (req, res) {
    getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function (data) {
        console.log("客户端提交的数据________");
        console.log(data);
        if (data.data.onoff == 0) {
            req.on('data', function (data) {

                let obj = JSON.parse(data);


                //808600016928
                // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
                setDeviceInfo('808600016928', obj).then(function (data) {
                    res.send(data);
                })


            })
        } else {
            res.send({ 'errcode': 1, 'errMsg': '设备处于关机状态，无法进行此操作！' })
        }
    })



})

/// 升温
app.post('/air/temp/up', function (req, res) {
    getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function (data) {
        console.log("客户端提交的数据________");
        console.log(data);
        if (data.data.onoff == 0) {
            req.on('data', function (data) {

                let obj = JSON.parse(data);


                //808600016928
                // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
                setDeviceInfo('808600016928', obj).then(function (data) {
                    res.send(data);
                })
            })
        } else {
            res.send({ 'errcode': 1, 'errMsg': '设备处于关机状态，无法进行此操作！' })
        }
    })
})

// 切换空调工作模式  0自动 1制冷 2除湿 3送风 4制热
app.post('/air/mode', function (req, res) {


    getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function (data) {

        if (data.data.onoff == 0) {

            req.on('data', function (data) {
                let obj = JSON.parse(data);
                console.log(obj);

                //808600016928
                // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
                setDeviceInfo('808600016928', obj).then(function (data) {
                    res.send(data);
                })
            })
        } else {
            req.on('data', function (data) {
                console.log("客户端提交的数据____切换模式____");
                console.log(JSON.parse(data));
            })
            res.send({ 'errcode': 1, 'errMsg': '设备处于关机状态，无法进行此操作！' })
        }
    })

})
// 风向
app.post('/air/direct', function (req, res) {
    getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function (data) {
        if (data.data.onoff == 0) {

            req.on('data', function (data) {
                let obj = JSON.parse(data);
                console.log(obj);

                //808600016928
                // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
                setDeviceInfo('808600016928', obj).then(function (data) {
                    res.send(data);
                })
            })
        } else {
            req.on('data', function (data) {
                console.log("客户端提交的数据____切换风向____");
                console.log(JSON.parse(data));
            })
            res.send({ 'errcode': 1, 'errMsg': '设备处于关机状态，无法进行此操作！' })
        }
    })
})
// 风速
app.post('/air/wind', function (req, res) {
    getDeviceInfo("Wukong", "808600016928", "get", "air_ctrl").then(function (data) {
        if (data.data.onoff == 0) {

            req.on('data', function (data) {
                let obj = JSON.parse(data);
                console.log(obj);

                //808600016928
                // setDeviceInfo( "Wukong", "808600016928", "set", "air_ctrl", 1 );
                setDeviceInfo('808600016928', obj).then(function (data) {
                    res.send(data);
                })
            })
        } else {
            req.on('data', function (data) {
                console.log("客户端提交的数据___切换风速_____");
                console.log(JSON.parse(data));
            })
            res.send({ 'errcode': 1, 'errMsg': '设备处于关机状态，无法进行此操作！' })
        }
    })
})





app.post('/air/addtimer', function (req, res) {


    req.on('data', function (data) {
        let obj = JSON.parse(data);
        console.log(obj);

        setDeviceInfo('808600016928', obj).then(function (data) {
            res.send(data);
        })
    })
})




//////////////////////////////////////////////////////////////////////
/////////////////////   【以下代码需要大量优化】 /////////////////////////
//////////////////////////////////////////////////////////////////////
app.get('/air/red_fail', function (req, res) {
    res.render('red_fail');
})

// match_process
let matchProccess = require('./router/matchProccess');
app.use('/air/red', matchProccess);

