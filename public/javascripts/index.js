
$('.onoffBtn').click(function () {
    let onoff = $('.main span').data("onoff");
    if (onoff === 1) {  // 关机状态，需要开机 
        // let currentTemp = parseInt($('.main-onoff').text()) - 16;
        let currentTemp = parseInt($('.main-onoff').data('temp'));
        let onoff = 0;
        $.post("/air/on", JSON.stringify({ setTemp: currentTemp, onoff: onoff }), function (data, status) {
            console.log(data);
            if (!data.errcode) {

                let currentMode = $('.main-mode span').data('mode');


                $('.main-onoff').text(currentTemp + 16 + " ℃");
                $('.main-onoff').data("onoff", onoff);
                // $('.main-onoff').data("temp", currentTemp);

                $('.main>div>div.row').removeClass("text-muted").addClass("text-primary");
                $('.onoffBtn #off').removeClass('disabled');
                $('.onoffBtn #on').addClass('disabled');

                switch (parseInt(currentMode)) {
                    case 0:
                        $('.mode-bar .auto').css("background-image", "url(../images/自动模式.png)")
                        break;
                    case 1:
                        $('.mode-bar .cold').css("background-image", "url(../images/制冷.png)")
                        break;
                    case 2:
                        $('.mode-bar .dehumidify').css("background-image", "url(../images/除湿.png)")
                        break;
                    case 3:
                        $('.mode-bar .blower').css("background-image", "url(../images/送风.png)")
                        break;
                    case 4:
                        $('.mode-bar .produceHeat').css("background-image", "url(../images/制热.png)")
                        break;
                }

            } else {
                console.log(data);
            }
        });

    } else { // 开机状态，需要关机

        let currentTemp = parseInt($('.main-onoff').text()) - 16;
        let onoff = 1;

        $.post("/air/off", JSON.stringify({ setTemp: currentTemp, onoff: onoff }), function (data, status) {
            console.log(data);

            if (!data.errcode) { // errorcode = 0, 代表请求成功
                $('.main-onoff').text("待机");
                $('.main-onoff').data("onoff", onoff);

                $('.main>div>div.row').removeClass("text-primary").addClass("text-muted");

                $('.onoffBtn #on').removeClass('disabled');
                $('.onoffBtn #off').addClass('disabled');


                $('.mode-bar .auto').css("background-image", "url(../images/自动模式-gray.png)")
                $('.mode-bar .cold').css("background-image", "url(../images/制冷-gray.png)")
                $('.mode-bar .dehumidify').css("background-image", "url(../images/除湿-gray.png)")
                $('.mode-bar .blower').css("background-image", "url(../images/送风-gray.png)")
                $('.mode-bar .produceHeat').css("background-image", "url(../images/制热-gray.png)")

            }
        });
    }
})

$("#on").click(function () {

    // let currentTemp = parseInt($('.main-onoff').text()) - 16;
    let currentTemp = parseInt($('.main-onoff').data('temp'));
    let onoff = 0;
    $.post("/air/on", JSON.stringify({ setTemp: currentTemp, onoff: onoff }), function (data, status) {
        console.log(data);
        if (!data.errcode) {

            let currentMode = $('.main-mode span').data('mode');


            $('.main-onoff').text(currentTemp + 16 + " ℃");
            $('.main-onoff').data("onoff", onoff);
            // $('.main-onoff').data("temp", currentTemp);

            $('.main>div>div.row').removeClass("text-muted").addClass("text-primary");
            $('.onoffBtn #off').removeClass('disabled');
            $('.onoffBtn #on').addClass('disabled');

            switch (parseInt(currentMode)) {
                case 0:
                    $('.mode-bar .auto').css("background-image", "url(../images/自动模式.png)")
                    break;
                case 1:
                    $('.mode-bar .cold').css("background-image", "url(../images/制冷.png)")
                    break;
                case 2:
                    $('.mode-bar .dehumidify').css("background-image", "url(../images/除湿.png)")
                    break;
                case 3:
                    $('.mode-bar .blower').css("background-image", "url(../images/送风.png)")
                    break;
                case 4:
                    $('.mode-bar .produceHeat').css("background-image", "url(../images/制热.png)")
                    break;
            }

        } else {
            console.log(data);
        }
    });
});
$("#off").click(function () {

    let currentTemp = parseInt($('.main-onoff').text()) - 16;
    let onoff = 1;

    $.post("/air/off", JSON.stringify({ setTemp: currentTemp, onoff: onoff }), function (data, status) {
        console.log(data);

        if (!data.errcode) { // errorcode = 0, 代表请求成功
            $('.main-onoff').text("待机");
            $('.main-onoff').data("onoff", onoff);

            $('.main>div>div.row').removeClass("text-primary").addClass("text-muted");

            $('.onoffBtn #on').removeClass('disabled');
            $('.onoffBtn #off').addClass('disabled');


            $('.mode-bar .auto').css("background-image", "url(../images/自动模式-gray.png)")
            $('.mode-bar .cold').css("background-image", "url(../images/制冷-gray.png)")
            $('.mode-bar .dehumidify').css("background-image", "url(../images/除湿-gray.png)")
            $('.mode-bar .blower').css("background-image", "url(../images/送风-gray.png)")
            $('.mode-bar .produceHeat').css("background-image", "url(../images/制热-gray.png)")

        }
    });

});

//调整温度 降温
$('.ctrlTemp .down').click(function () {

    let currentTemp = parseInt($('.main-onoff').text()) - 16;
    if (currentTemp == 0) {
        alert('不能再降温了!');  // 16摄氏度
    } else {

        let currentMode = parseInt($('.main-mode span').data("mode"));  // 0 - 4 
        let currentDirect = parseInt($('.direct span').data("direct"));
        let currentWind = parseInt($('.wind span').data("wind"));
        let setTemp = currentTemp - 1;


        let obj = {
            "mode": currentMode,
            "temp": setTemp,
            "direct": currentDirect,
            "wind": currentWind
        };


        // 降温 1 摄氏度
        $.post('/air/temp/down', JSON.stringify(obj), function (data) {
            console.log(data.errcode);
            if (data.errcode == 1) { // errorcode = 1,代表设备处于关机状态
                console.log(data);
            } else {
                console.log(data);
                $('.main-onoff').text(setTemp + 16 + " ℃");
            }
        })
    }


})
// 升温
$('.ctrlTemp .up').click(function () {
    let currentTemp = parseInt($('.main-onoff').text()) - 16;
    if (currentTemp == 14) {
        alert('不能再升温了!'); // 30摄氏度
    } else {

        let currentMode = parseInt($('.main-mode span').data("mode"));  // 0 - 4 
        let currentDirect = parseInt($('.direct span').data("direct"));
        let currentWind = parseInt($('.wind span').data("wind"));
        let setTemp = currentTemp + 1;



        let obj = {
            "mode": currentMode,
            "temp": setTemp,
            "direct": currentDirect,
            "wind": currentWind
        };

        // 升温 1 摄氏度
        $.post('/air/temp/up', JSON.stringify(obj), function (data) {
            console.log(data.errcode)
            if (data.errcode == 1) { // errorcode = 1,代表设备处于关机状态

                console.log(data);

            } else {
                console.log(data);
                $('.main-onoff').text(setTemp + 16 + " ℃");
            }
        })
    }
})

// 切换空调运行模式 // 自动 制冷 除湿 送风 制热
$('.ctrlOthers .modeBtn').click(function () {

    let onoff = $('.main-onoff').data("onoff");
    let online = $('.airStatus .online').data("online");

    if (online == 1) {
        if (Number(onoff) === 0) {  // 开机状态
            let currentTemp = parseInt($('.main-onoff').text()) - 16;
            let currentMode = parseInt($('.main-mode span').data("mode"));  // 0 - 4
            let currentDirect = parseInt($('.direct span').data("direct"));
            let currentWind = parseInt($('.wind span').data("wind"));

            let setMode = currentMode;
            if (setMode < 4) {
                setMode++;
            } else {
                setMode = 0;
            }


            let obj = {
                "mode": setMode,
                "temp": currentTemp,
                "direct": currentDirect,
                "wind": currentWind
            };

            $.post('/air/mode', JSON.stringify(obj), function (data) {
                console.log(data.errcode)
                if (data.errcode == 1) { // errorcode = 1,代表设备处于关机状态

                    console.log(data);

                } else {
                    console.log(data);
                    let modeName;
                    $('.mode-bar .auto').css("background-image", "url(../images/自动模式-gray.png)");
                    $('.mode-bar .cold').css("background-image", "url(../images/制冷-gray.png)");
                    $('.mode-bar .dehumidify').css("background-image", "url(../images/除湿-gray.png)");
                    $('.mode-bar .blower').css("background-image", "url(../images/送风-gray.png)");
                    $('.mode-bar .produceHeat').css("background-image", "url(../images/制热-gray.png)");

                    //auto 自动
                    //cold 制冷
                    //dehumidify 除湿
                    //blower 送风
                    //produceHeat 制热

                    switch (parseInt(setMode)) {
                        case 0:
                            modeName = "自动";
                            $('.mode-bar .auto').css("background-image", "url(../images/自动模式.png)")
                            break;
                        case 1:
                            modeName = "制冷";
                            $('.mode-bar .cold').css("background-image", "url(../images/制冷.png)")
                            break;
                        case 2:
                            modeName = "除湿";
                            $('.mode-bar .dehumidify').css("background-image", "url(../images/除湿.png)")
                            break;
                        case 3:
                            modeName = "送风";
                            $('.mode-bar .blower').css("background-image", "url(../images/送风.png)")
                            break;
                        case 4:
                            modeName = "制热";
                            $('.mode-bar .produceHeat').css("background-image", "url(../images/制热.png)")
                            break;
                    }


                    $('.main-mode span').text(modeName);
                    $('.main-mode span').data('mode', setMode);
                }

            })

        } else { // 空调未开机
            alert("空调没有开机！");
        }

    } else {
        alert("空调离线！");
    }









})

// 切换空调风向 // 自动 风向1 风向2 风向3 风向4
$('.ctrlOthers .directBtn').click(function () {
    let currentTemp = parseInt($('.main-onoff').text()) - 16;
    let currentMode = parseInt($('.main-mode span').data("mode"));  // 0 - 4 
    let currentDirect = parseInt($('.direct span').data("direct")); // 0 - 4
    let currentWind = parseInt($('.wind span').data("wind")); // 0 - 3

    let setDirect = currentDirect;
    if (setDirect < 4) {
        setDirect++;
    } else {
        setDirect = 0;
    }


    let obj = {
        "mode": currentMode,
        "temp": currentTemp,
        "direct": setDirect,
        "wind": currentWind
    };


    $.post('/air/direct', JSON.stringify(obj), function (data) {
        console.log(data.errcode)
        if (data.errcode == 1) { // errorcode = 1,代表设备处于关机状态

            console.log(data);

        } else {
            console.log(data);
            let directName;

            switch (parseInt(setDirect)) {
                case 0:
                    directName = "自动";
                    break;
                case 1:
                    directName = "风向1";
                    break;
                case 2:
                    directName = "风向2";
                    break;
                case 3:
                    directName = "风向3";
                    break;
                case 4:
                    directName = "风向4";
                    break;
            }


            $('.direct span').text(directName);
            $('.direct span').data('direct', setDirect);
        }

    })


})


// 切换空调风速 // 自动 风速1 风速2 风速3
$('.ctrlOthers .windBtn').click(function () {
    let currentTemp = parseInt($('.main-onoff').text()) - 16;
    let currentMode = parseInt($('.main-mode span').data("mode"));  // 0 - 4 
    let currentDirect = parseInt($('.direct span').data("direct"));
    let currentWind = parseInt($('.wind span').data("wind"));

    let setWind = currentWind;
    if (setWind < 3) {
        setWind++;
    } else {
        setWind = 0;
    }


    let obj = {
        "mode": currentMode,
        "temp": currentTemp,
        "direct": currentDirect,
        "wind": setWind
    };


    $.post('/air/wind', JSON.stringify(obj), function (data) {
        console.log(data.errcode)
        if (data.errcode == 1) { // errorcode = 1,代表设备处于关机状态

            console.log(data);

        } else {
            console.log(data);
            let windName;

            switch (parseInt(setWind)) {
                case 0:
                    windName = "自动";
                    break;
                case 1:
                    windName = "低风";
                    break;
                case 2:
                    windName = "中风";
                    break;
                case 3:
                    windName = "高风";
                    break;

            }


            $('.wind span').text(windName);
            $('.wind span').data('wind', setWind);
        }

    })


})




// 呼出菜单



$('.menu-btn').click(function () {
    let menuBar = $('.menu-bar').css('display');
    if (menuBar == "none") {
        $('.menu-bar').show()

    } else {
        $('.menu-bar').hide()

    }

})

//匹配红外遥控器

$(".menu-bar .match-pro").click(function () {
    $('.match-proccess').show();
    $.post("/air/red", JSON.stringify({ "cmd": "match_process" }), function (data, status) {
        console.log(data);
        $(".match-proccess").hide();
        $('.menu-bar').hide();
        console.log(status + "AJAX");
    });
});