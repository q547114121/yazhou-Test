/**
 * Created by Administrator on 2017/8/14.
 */
//获取上页传入的数据，分别是玩家信息、游戏天数、游戏进行的循环
var personString=sessionStorage.getItem('personStr');
var person=JSON.parse(personString);
var dayNum=Number(sessionStorage.getItem('dayNum'));
var visit=Number(sessionStorage.getItem('visit'));
console.log(person);
console.log('游戏天数:'+dayNum);
console.log("visit:"+visit);
//创建一个函数，返回中文的数字，玩家人数最大为18人,天数不可能超过十八
function chineseNum(num) {
    var chnNumChar = ["零","一","二","三","四","五","六","七","八","九",'十'];
    if(num<11){
        return chnNumChar[num];
    }else{
        return "十" +chnNumChar[num-10];
    }
}

//为返回按钮设置返回事件
$('#Back-Icon').click(function () {
    location.href='js3.html';
});

//初始话页面,观看任务进行到第几天
$(function () {
    for(var i=1;i<=dayNum;i++){
        var $dayNum=$("<div class='num-day' ><span>第"+chineseNum(i)+"天<img src='photo/js4.png' /></span></div>")
        var $gameMessage=$("<div class='game-message none'><i></i><p></p><p></p></div>");
        $gameMessage.appendTo($dayNum);
        //将初始化后的游戏天数添加到杀手杀人的前面
        $('#course').before($dayNum);
        $.each(person,function (index,value) {
                if (value.state == 'kill-dead' && value.deadDay == i) {
                    $('.game-message').eq(i-1).children('p:first').text("晚上：" + (index + 1) + "号被杀手杀死,真是身份是" + value.name);
                }
                if(value.state == 'vote-dead' && value.deadDay == i){
                    $('.game-message').eq(i-1).children('p:last').text("白天：" + (index + 1)+ "号被玩家票死,真是身份是" + value.name);
                }
            });
    }
    //遍历传来的信息，初始化页面被杀玩家以及票出玩家的信息
    $.each(person,function (index,value) {
        if(value.state== 'kill-dead' && value.deadDay == dayNum){
            $('.kill-result').text("晚上："+(index+1)+"号被杀手杀死,真实身份是"+value.name);
        }

    });
    // // 当天数较少，main固定高度，天数较多时呢高度不设置值
    if(dayNum<3){
        $('.main').css('height',"4.5rem");
    }
});
//为第一天按钮添加显示下拉框事件,如果段落p中有信息，则可以点开下拉框
$('body').on('click','.num-day',function (e) {
    if($(this).find('p').text()){
        $(this).children('.game-message').toggleClass('none');
    }

});
//定义有限状态机
    var fsm = new StateMachine({
        transitions: [
            { name: 'start', from: 'none',        to: 'kill'  },
            { name: 'day1',  from: 'kill',        to: 'lastWords'},
            { name: 'day2',  from: 'lastWords',   to: 'personSpeak'},
            { name: 'day3',  from: 'personSpeak', to: 'vote' },
            { name: 'night', from: 'vote',        to: 'kill'  }
        ],
        methods: {
            onEnterKill: function() {
                $('#killer div').css('background-color','#b0b0b0');
                $('#killer div i').css('border-right','0.08rem solid #b0b0b0');
            },

            onEnterLastWords: function() {
                $('#lastWords div').css('background-color','#b0b0b0');
                $('#lastWords div i').css('border-right','0.08rem solid #b0b0b0');
            },
            onEnterPersonSpeak: function() {
                $('#speaking div').css('background-color','#b0b0b0');
                $('#speaking div i').css('border-right','0.08rem solid #b0b0b0');
            },
            onEnterVote: function(lifecycle) {
                $('#vote div').css('background-color','#b0b0b0');
                $('#vote div i').css('border-right','0.08rem solid #b0b0b0');
            },

            onTransition: function(lifecycle) {

            }


        }
    });
    // alert(fsm.state);
    //根据visit数值，进入响应的状态机
    console.log(visit);
    if(visit%2){
        fsm.start();
    }else {
        $.each(person,function (index,value) {
            if(value.state == 'vote-dead' && value.deadDay == dayNum-1){
                $('.vote-result').text("白天：" + (index + 1)+ "号被票死,真实身份是" + value.name);
            }
        })
    }



//定义 四个按钮事件
$('#killer').click(function () {
    if(visit%2 + 1){
        fsm.start();
        location.href='js4-kill-vote.html';
    }else {
        alert('请按游戏顺序进行，不要重复杀人步奏');
    }
});

$('#lastWords').click(function () {
    switch (fsm.state){
        case "none":
            alert("请点击'杀手杀人'按钮开始游戏");
            break;
        case "kill":
            fsm[fsm.transitions()[0]]();
            alert('亡灵发表遗言');
            break;
        default:
            alert('请按游戏顺序进行，不要重复玩家发言步奏');
    }
});
$('#speaking').click(function () {
    switch (fsm.state){
        case "none":
            alert("请点击'杀手杀人'按钮开始游戏");
            break;
        case "kill":
            alert("亲，请别跳过‘亡灵发言’步奏");
            break;
        case "lastWords":
            fsm.day2();
            alert('玩家依次发言');
            break;
        default:
            alert('请按游戏顺序进行，不要重复玩家发言步奏');
    }
});
//点击投票按钮
$('#vote').click(function () {
    switch (fsm.state){
        case "none":
            alert("请点击'杀手杀人'按钮开始游戏");
            break;
        case "kill":
            alert("亲，请别跳过‘亡灵发言’步奏");
            break;
        case "lastWords":
            alert('亲，请别跳过‘玩家发言’步奏');
            break;
        case 'personSpeak':
            location.href='js4-kill-vote.html';

    }
});

//定义结束游戏按钮
$('#close-game').click(function () {
    if(confirm('游戏正在进行，确定推出游戏？')){
        location.href='task13-2.html';
    }
});

