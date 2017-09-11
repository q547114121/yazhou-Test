/**
 * Created by Administrator on 2017/8/19.
 */
//获取上页传入的数据，分别是玩家信息、活着的玩家、或者的杀手
var personString=sessionStorage.getItem('personStr');
var aliveKillerStr=sessionStorage.getItem('aliveKiller');
var aliveManStr=sessionStorage.getItem('aliveMan');
var dayNum=Number(sessionStorage.getItem('dayNum'));
var person=JSON.parse(personString);
var aliveKiller=JSON.parse(aliveKillerStr);
var aliveMan=JSON.parse(aliveManStr);

console.log(person);
console.log(aliveKiller);
console.log(aliveMan);

//创建一个函数，返回中文的数字，玩家人数最大为18人,天数不可能超过十八
function chineseNum(num) {
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九",'十'];
    if(num<11){
        return chnNumChar[num];
    }else{
        return "十" +chnNumChar[num-10];
    }
}
//根据玩家信息初始化页面
$(function () {
    //定义变量i、j用来保存玩家人数
    var i=0,
        j=0;
    $.each(person,function (index,value) {
        if(value.name=='杀手'){
            i++;
        }else {
            j++;
        }
    });
    $('.main-text-2 span:first').text("杀手："+i+"人");
    $('.main-text-2 span:last').text("水民："+j+"人");
    //确定每一天的结果,创建节点并加入文档之内
    for(var k=1;k<=dayNum;k++){
        var $gameMessage=$("<div class='main-text-3' ><div class='text-container'><span class='main-text-first-header'>第"+chineseNum(k)+"天</span><span class='main-text-second-header'>0小时07分<span></div></div>");
        $("<p class='main-text-content'></p>").appendTo($gameMessage);
        $("<p class='main-text-content'></p>").appendTo($gameMessage);
        $gameMessage.appendTo('.main');
     //得到每一天的投票与杀人结果
        $.each(person,function (index,value) {
            if (value.state == 'kill-dead' && value.deadDay == k) {
               $('.main-text-3').eq(k-1).find('p:first').text("晚上：" + (index + 1) + "号被杀手杀死,真是身份是" + value.name);
            }
            if(value.state == 'vote-dead' && value.deadDay == k){
                $('.main-text-3').eq(k-1).find('p:last').text("白天：" + (index + 1)+ "号被玩家票死,真是身份是" + value.name);
            }
        });


    }
    //如果没有当天的信息，则不显示天数和游戏时间
    if(!$('.main-text-3:last').children('p:first').text()){
        $('.main-text-3:last').hide();
    }
    //根据数据判断杀手胜利还是水民胜利
    if(aliveKiller.length ==0){
        //水民胜利
        $('.main-header img').attr('src','photo/js4-person.png');
        $('.main-text-1').text("太棒了，你知道吗？在杀人游戏中只有20%的水民取得最终的胜利哦!");
    }else if(aliveKiller.length >=aliveMan.length){
        //杀手胜利
        $('.main-header img').attr('src','photo/js4-kill.png');
        $('.main-text-1').text("太棒了，你知道吗？在杀人游戏中有80%的杀手取得最终的胜利哦!");
    }
});

//为再来一局添加点击事件
$('#gameAgain').click(function () {
    location.href='task13-2.html';
});

