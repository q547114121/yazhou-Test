/**
 * Created by Administrator on 2017/8/5.
 */
$(function () {
   //提取本地存储中的玩家信息，使用的是localStorage
    var arrString1 =localStorage.getItem("lastArr");
    var arr=JSON.parse(arrString1);
    //为返回按钮设定点击事件；
    $('#Back-Icon').click(function () {
        location.href='js3.html';
    });
    //创建变量来保存玩家的死活状态，以及数量，以及天数
    var person=[];
    var dayNum=1;
    var visit=0;
    //遍历玩家数组，使js4第一个页面初始化。
    $.each(arr,function (index,value) {
        //设置玩家
        $parentNode=$("<div class='person-info'></div>");
        $("<div class='person-name'>"+value+"</div>").appendTo($parentNode);
        $("<div class='person-num'>"+(index+1)+"号</div>").appendTo($parentNode);
        $("<img src='photo/task7-5.png' class='person-kill' />").appendTo($parentNode);
        $parentNode.appendTo('#main');
        //利用创建的变量来保存玩家的相关信息，需要遍历才放在$.each中
        person[index]={};
        person[index].num=index+1;
        person[index].name=value;
        person[index].state='alive';
        person[index].deadDay=null;
    });
    //为按钮赋值——开始游戏
    $('#deal').html('开始游戏');

    //为按钮添加点击事件,在里面设置sessionStorage相关值。
    $('#deal').click(function () {
        var personString=JSON.stringify(person);
        sessionStorage.setItem('personStr',personString);
        sessionStorage.setItem('dayNum',dayNum);
        sessionStorage.setItem('visit',visit);
        location.href='js4-1.html';
    });

});