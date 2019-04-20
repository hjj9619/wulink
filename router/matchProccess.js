let express = require("express");
let router = express.Router();

// match_process
router.post('/', function (req, res) {
  req.on('data', function (data) {
    let obj = JSON.parse(data);
    console.log(obj);
    setDeviceInfo("808600016928", obj).then(function (data) {
      // res.send( data );

      if (data.errcode == 0) {

        let timer = setInterval(function () {

          getDeviceInfo('Wukong', '808600016928', 'get', 'match_action').then(function (body) {
            console.log("红外匹配中！");
            console.log(body);
            if (body.data.match_action == 1) {
              console.log("红外匹配成功!");
              res.redirect(301, '/air');
              clearInterval(timer);
            } else {
              setTimeout(function () {
                clearInterval(timer);
                res.redirect(301, '/air/red_fail');
                console.log(" 红外匹配失败！ ");
                // res.send( body );
                console.log(body);
              }, 1000 * 30)

            }
          })
        }, 3000)
      } else {
        console.log("匹配红外失败！");
        res.redirect(301, '/air/red_fail');
        // res.send( data );
      }

    });


  })
})


module.exports = exports = router;