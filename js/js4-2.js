/**
 * Created by Administrator on 2017/8/15.
 */
/**
 * Created by Administrator on 2017/8/5.
 */
$(function () {
    //获取上页传入的数据，分别是玩家信息、游戏天数、游戏进行的循环
    var personString=sessionStorage.getItem('personStr');
    var person=JSON.parse(personString);
    var dayNum=Number(sessionStorage.getItem('dayNum'));
    var visit=Number(sessionStorage.getItem('visit'));

    console.log(person);
    console.log(dayNum);
    console.log(visit);
    //为返回按钮设置相关返回页面
    $('#Back-Icon').click(function () {
        location.href='js3.html';
    });

    //遍历玩家数组，使js4第一个页面初始化。
    $.each(person,function (index,value) {
        //设置玩家
        $parentNode=$("<div class='person-info'></div>");
        $("<div class='person-name'>"+value.name+"</div>").appendTo($parentNode);
        $("<div class='person-num'>"+(index+1)+"号</div>").appendTo($parentNode);
        $("<img src='photo/task7-5.png' class='person-kill' />").appendTo($parentNode);
        $parentNode.appendTo('#main');
    });
    //开始游戏，并初始化界面
    if(visit%2){
        $('#deal').html('投死');
        $('.main-header-text').text('发言讨论结束，请大家投票');
        $('#mainContent').text('点击下方玩家头像，对投票的玩家进行标记');
        visit+=1;
    }else {
        $('#deal').html('确定');
        $('.main-header-text').text('杀手请睁眼，杀手请选择要杀的对象');
        $('#mainContent').text('点击下方玩家头像，对被杀的玩家进行标记');
        visit+=1;
    }
    $('.person-info').click(function () {
        var text= $(this).children('.person-name').text();
        if(text =='杀手'){
            alert('别闹，杀手不杀杀手。');
            window.location.reload();
        }else {
            $('.person-name').css('background','#ffcc66');
            $(this).children('.person-name').css('background','red');
            //获得被杀人的索引
            var index=$(this).index('.person-info');
            //被杀玩家的状态和被杀的日期 记录
            person[index].state='kill-dead';
            person[index].deadDay=dayNum;
        }


    });

    //为按钮添加点击事件,在里面设置sessionStorage相关值。
    $('#deal').click(function () {
        var personString=JSON.stringify(person);
        sessionStorage.setItem('personStr',personString);
        sessionStorage.setItem('dayNum',dayNum);
        sessionStorage.setItem('visit',visit);
        location.href='js4-1.html';
    });

});