/**
 * Created by Administrator on 2017/6/7.
 */
window.onload=function () {
    //取得input的value值
    var input =document.getElementById("input");
    var num = parseInt(input.value);
    var person =document.getElementById("person-num");
    var wolf =document.getElementById("wolf-num");
    input.addEventListener("change",setNum,false);
    function setNum(event) {
        //取得该input元素
        var target = event.target;
        //设置正则表达式 测试是否玩家个数处于4-18
        var pattern =/^([4-9]|(1[0-8]))$/;
        if(!pattern.test(target.value)){
            window.confirm("请输入正确的玩家数量。");
            target.value="";
        }
        //根据玩家数目，取得狼人和水民的数目
        var value =parseInt(target.value);
        switch (true){
                    case value >= 6 && value<=8:
                        wolf.innerHTML =1;
                        person.innerHTML= tartarget - 1;
                        break;
                    case value>=9 &&value<=11:
                        wolf.innerHTML = 2 ;
                        person.innerHTML = value-2;
                        break;
                    case value>=12 && value<=15:
                        wolf.innerHTML = 3;
                        person.innerHTML =value -3;
                        break;
                    case value>=16 && value<=18:
                        wolf.innerHTML =4;
                        person.innerHTML= value-4;
                }
        //设置一个数组存玩家数量，分配玩家数量
        var arr = [] ;
        //获得狼人的数量
        var wolfNum = Number(wolf.innerHTML);
        //获得水民的数量
        var personNum =Number(person.innerHTML);
        //把所有狼人传入数组
        for(var i=0 ;i<wolfNum;i++){
            arr.push("狼人");
        }
        //把所有水民传入数组
        for (var j=0;j<personNum;j++){
            arr.push("水民");
        }
        //设置洗牌函数，把数组打乱
        function shuffle(array) {
            var length=array.length;
            var shuffled= Array(length);
            for(var index=0,rand;index <length ;index++){
                rand=parseInt(Math.random()*(index+1));
                shuffled[index]=shuffled[rand];
                shuffled[rand]=array[index]
            }
            return shuffled;
        }
        //调用洗牌函数
        shuffle(arr);
    }






};