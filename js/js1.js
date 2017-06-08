/**
 * Created by Administrator on 2017/6/1.
 */
window.onload=function () {
    //获取九宫格
    var square = document.getElementsByClassName("square");
    //获取开始闪按钮
    var btnOn = document.getElementById("btn1");
    //获取结束闪按钮
    var btnOff = document.getElementById("btn2");
    //间歇时间
    var interval =null;

    //设置随机颜色
    var getRandomColor = function(){
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
    };


        function changeBgcolor() {
            //获取九宫格中的3个格子，而且3个格子不重复
            var arr = [];
            while(arr.length < 3){
                var bFlag = true;
                var number = Math.floor(Math.random()*9+0);
                if(arr.length == 0){
                    arr.push(number);
                }
                for(var i=0; i<arr.length; i++){
                    if(number == arr[i]){
                        bFlag = false;
                    }
                }
                if(bFlag){
                    arr.push(number);
                }
            }
            //初始化所有格子的颜色
            for(var i =0; i< square.length ; i++) {
                square[i].style.backgroundColor='#EEB422';
            }
            //取得随机颜色，并将颜色赋值给选好的3个格子
            for(var i=0; i<3 ; i++){
                var a =arr[i];
                square[a].style.backgroundColor=getRandomColor();
            }
            //开始闪按钮不能点击
            btnOn.disabled=true;
            btnOn.style.cursor="wait";
        }

    //设置循环函数
    function circulate() {
        clearInterval(interval);
        interval = setInterval(changeBgcolor,1000);
    }

    //清除循环
    function resetBgcolor() {

        clearInterval(interval);
        for(var i=0; i<9 ; i++){
            square[i].style.backgroundColor='#EEB422';
        }
        //开始闪按钮能点击
        btnOn.disabled=false;
        btnOn.style.cursor="pointer";
    }
    btnOn.onclick=circulate;
    btnOff.onclick=resetBgcolor;
};


