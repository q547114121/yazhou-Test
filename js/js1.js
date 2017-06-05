/**
 * Created by Administrator on 2017/6/1.
 */
var EventUtil = {
    addHandler :function (element, type ,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type,handler);
        } else{
            element["on" + type] =handler;
        }
    },
    removeHandler:function (element ,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type,handler);
        } else{
            element["on" + type] =null;
        }
    }
};
    var square = document.getElementsByClassName("square");
    var btnOn = document.getElementById("btn1");
    var btnOff = document.getElementById("btn2");
    var interval =null;
    function changeBgcolor() {
        var arr = [];
        while(arr.length < 3){
            var bFlag = true;
            var number = Math.floor(Math.random()*9+0);
            if(arr.length == 0){
                arr.push(number);
            }
            for(var i=0;i<arr.length;i++){
                if(number == arr[i]){
                    bFlag = false;
                }
            }
            if(bFlag){
                arr.push(number);
            }
        }
        for(var i =0; i<9; i++) {
            square[i].style.backgroundColor = '#EEB422';
        }
        for(var i=0; i<3 ; i++){
            var a =arr[i];
            var getRandomColor = function(){
                return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
            };
            square[a].style.backgroundColor=getRandomColor();
        }
    }
    function circulate() {
        interval = setInterval(changeBgcolor,1000);
    }
    function resetBgcolor() {
        clearInterval(interval);
        for(var i=0; i<9 ; i++){
            square[i].style.backgroundColor='#EEB422';
        }
    }
    EventUtil.addHandler(btnOn,"load",changeBgcolor());
    EventUtil.addHandler(btnOff,"load",resetBgcolor());


