/**
 * Created by Administrator on 2017/8/19.
 */
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
    console.log('dayNum:'+dayNum);
    console.log('visit:'+visit);
    //为返回按钮设置相关返回页面
    $('#Back-Icon').click(function () {
        location.href='js3.html';
    });

    //遍历玩家数组，使页面初始化。
    $.each(person,function (index,value) {
        //设置玩家
        $parentNode=$("<div class='person-info'></div>");
        $("<div class='person-name'>"+value.name+"</div>").appendTo($parentNode);
        $("<div class='person-num'>"+(index+1)+"号</div>").appendTo($parentNode);
        $("<img src='photo/task7-5.png' class='person-kill' />").appendTo($parentNode);
        $parentNode.appendTo('#main');
    });
    // 因为内部每个玩家信息的小方块是浮动的，当玩家较少时，main固定高度，玩家较多时呢高度不设置值
    if($('.person-info').length <=9){
        $('.main').css('height',"4.5rem");
    }
    //定义有限状态机
    //定义有限状态机,里面有三个状态 ：none、kill 、vote
    var fsm = new StateMachine({
        transitions: [
            { name: 'start',     from: 'none',  to: 'kill'  },
            { name: 'personVote',from: 'kill',  to: 'vote'}
        ],
        methods: {
            onEnterKill: function() {
                $('#deal').html('确定');
                $('.main-header-text').text('杀手请睁眼，杀手请选择要杀的对象');
                $('#mainContent').text('点击下方玩家头像，对被杀的玩家进行标记');
                $.each(person,function (index,value) {
                    if(value.state =='kill-dead' ||value.state =='vote-dead'){
                        $('.person-info').eq(index).children('.person-name').css('background', '#83b09a');
                    }
                })
            },
            onEnterVote: function() {
                $('#deal').html('投死');
                $('.main-header-text').text('发言讨论结束，请大家投票');
                $('#mainContent').text('点击下方玩家头像，对投票的玩家进行标记');
                $.each(person,function (index,value) {
                    if(value.state =='kill-dead'){
                        $('.person-info').eq(index).children('.person-name').css('background', '#83b09a');
                    }
                })
            }
        }
    });
    if(visit %2){
        fsm.start();
        fsm[fsm.transitions()[0]]();
    }else {
        fsm.start();
    }
    $('.person-info').click(function () {
        //获得被点击事件元素的索引
        var index = $(this).index('.person-info');
        //获得被点击玩家的背景颜色，以便于判断其是否已经死亡
        var deadMan=$(this).children('.person-name').css('background-color');
        //在杀手杀人状态时，杀手不杀杀手，水民被杀背景颜色改变颜色
        if(fsm.state =='kill') {
            //获得玩家的身份
            var text = $(this).children('.person-name').text();
            if (text == '杀手') {
                alert('别闹，杀手不杀杀手。');
                window.location.reload();
                //在投票的状态下，当此人已死不能重复选择
            }else if(deadMan =='rgb(131, 176, 154)'){
                alert('此人已死，请选择别的玩家');
                window.location.reload();
            }else {
                    //  遍历数组保证一次只杀一人
                    $.each(person, function (i, value) {
                        if (value.state == 'kill-dead' && value.deadDay == dayNum) {
                            $('.person-info').eq(i).children('.person-name').css('background-color', '#ffcc66');
                            person[i].state = 'alive';
                            person[i].deadDay = null;
                        }
                    });
                    //保证杀人后玩家背景颜色改变
                    $(this).children('.person-name').css('background-color', 'red');
                    //被杀玩家的状态和被杀的日期 记录
                    person[index].state = 'kill-dead';
                    person[index].deadDay = dayNum;

            }
        }else if(fsm.state =='vote'){
                //在投票的状态下，当此人已死不能重复选择
                if(deadMan =='rgb(131, 176, 154)'){
                    alert('此人已死，请选择别的玩家');
                    window.location.reload();
                 }else {
                    //  遍历数组保证一次只杀一人
                    $.each(person, function (i, value) {
                        if (value.state == 'vote-dead' && value.deadDay == dayNum) {
                            $('.person-info').eq(i).children('.person-name').css('background-color', '#ffcc66');
                            person[i].state = 'alive';
                            person[i].deadDay = null;
                        }
                    });
                    //保证杀人后玩家背景颜色改变
                    $(this).children('.person-name').css('background-color', 'red');
                    //被杀玩家的状态和被杀的日期 记录
                    person[index].state = 'vote-dead';
                    person[index].deadDay = dayNum;
            }
            console.log(person);
        }
    });

    //为按钮添加点击事件,在里面设置sessionStorage相关值。
    $('#deal').click(function () {
        if(fsm.state =='kill'){
            visit+=1;
        }else if(fsm.state =='vote') {
            dayNum+=1;
            visit+=1;
        }
        //传递数据
        var personString=JSON.stringify(person);
        sessionStorage.setItem('personStr',personString);
        sessionStorage.setItem('dayNum',dayNum);
        sessionStorage.setItem('visit',visit);
        //定义两个数组，用来判断游戏是否结束
        var aliveKiller=[],
            aliveMan=[];
        var i=0,
            j=0;
        $.each(person,function (index,value) {
           if(value.name == '杀手' && value.state =='alive'){
               aliveKiller[i]=i+'：活着的杀手';
               i++;
           }
           if(value.name =='水民' && value.state == 'alive'){
               aliveMan[j]=j+'：活着的水民';
               j++;
           }
        });
        console.log(aliveKiller);
        console.log(aliveMan);
        //传递数据
        var aliveKillerStr=JSON.stringify(aliveKiller);
        var aliveManStr=JSON.stringify(aliveMan);
        sessionStorage.setItem('aliveKiller',aliveKillerStr);
        sessionStorage.setItem('aliveMan',aliveManStr);
        if(aliveKiller.length ==0 ||aliveKiller.length >= aliveMan.length){
            if(confirm('游戏已结束，是否查看游戏结果')){
                location.href='js4-result.html';
            }
        }else {
            location.href='js4-1.html';
        }

    });

});