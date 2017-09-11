/**
 * Created by Administrator on 2017/6/17.
 */
window.onload=function () {
    //定义jq变量
    var $silder =$('#slider-block');
    var $manNum = $('#manNum');
    var $subtraction =$('.subtraction');
    var $add = $('.add');
    var $back =$('.btn-1');
    var $install = $('#install');
    //定义正则，判断输入值是否在6-18之间
    var parttern =/^[6-9]|1[0-8]$/;
    //获得初始的输入框值，即初始人数6
    var personNum = Number($manNum.val());
    //在输入框输入玩家数量，通过条件判断是否在6-18之间，并用正则表达式判断是否合理
    $manNum.change(function () {
       if (Number($manNum.val()) <6){
           alert('人数小于6.');
           $manNum.val('6');
       }else if(Number($manNum.val()) >18){
           alert('人数大于18');
           $manNum.val('6');
       }else if(parttern.test($manNum.val()) ==false){
           alert('输入的玩家人数不符合规范');
           $manNum.val('6');
       }
       //滚动条的值同样改变，再次获得改变后的输入框值
       $silder.val($manNum.val());
       personNum = Number($manNum.val());
    });
    //input输入框按下enter键，页面不能刷新
    $manNum.keypress(function (event) {
        if(event.keyCode ==13){
            if (Number($manNum.val()) <6){
                alert('人数小于6.');
                $manNum.val('6');
            }else if(Number($manNum.val()) >18){
                alert('人数大于18');
                $manNum.val('6');
            }else if(parttern.test($manNum.val()) ==false){
                alert('输入的玩家人数不符合规范');
                $manNum.val('6');
            }
            $silder.val($manNum.val());
            return false;
        }
    });
    //滑动条改变时，输入框的value也改变
    $silder.change(function () {
        $manNum.val($silder.val());
        personNum = Number($silder.val());
    });
    //点击加号 ，滑动条增加，输入框值夜增加
    $add.click(function () {
        if(personNum ==18){
            alert('人数大于18');
            $silder.val('18');
        }
        $silder.val(Number($silder.val()) + 1);
        $manNum.val($silder.val());
        personNum = Number($manNum.val());
    });
    //点击减号，滑动条减小，输入框值减少
    $subtraction.click(function () {
        if (personNum ==6){
            alert('人数小于6.');
            $silder.val('6');
        }
        $silder.val(Number($silder.val()) -1);
        $manNum.val($silder.val());
        personNum = Number($manNum.val());
    });
    //实现数组乱序
    function shuffle(a) {
        var arr=a.concat();
        for(var i=arr.length,j;i--;){
            j=Math.floor(Math.random()*i);
            var temp = arr[j];
            arr[j] =arr[i];
            arr[i]= temp;
        }
        return arr;
    }



    var arr2=[],arr;
     //点击设置键，获得相应样式
    $install.on('click',function () {
        //先清空玩家框里的子节点
        $('.player').empty();
        arr=[];
        //通过得到输入框的值，来得到杀手水民的数组
        if(personNum>=6 && personNum<=8){
            arr.push('杀手');
            for(var i= 0;i<personNum-1;i++){
                arr.push('水民');
            }
        }else if(personNum >=9 &&personNum<=11){
            for(var j=0;j<2;j++){
                arr.push('杀手');
            }
            for(var i=0;i<personNum -2 ;i++){
                arr.push('水民');
            }
        }else if(personNum >=12 && personNum <=15){
            for(var j=0;j<3;j++){
                arr.push('杀手');
            }
            for(var i=0;i<personNum -3 ;i++){
                arr.push('水民');
            }
        }else {
            for(var j=0;j<4;j++){
                arr.push('杀手');
            }
            for(var i=0;i<personNum -4 ;i++){
                arr.push('水民');
            }
        }
         //得到乱序后的数组
        arr2=shuffle(arr);
        //便利遍历添加节点，并设置属性
        $.each(arr2, function (n, value) {
            if(value == '水民'){
                var span1 =$("<span class='player-man'><i></i>水  民1人</span>");
                $('.player').append(span1);
            }else if(value == '杀手'){
                var span2 =$("<span class='player-ghost'><i></i>杀  手1人</span>");
                $('.player').append(span2);
            }
        });

    });
    //界面返回
    $back.click(function() {
        location.href="task13-2.html";
    });
    //进入查看身份页面
    $('#deal').click(function () {
        if(arr2.length == personNum){
            //把已经确定的乱序数组封装成JSON字符串，然后保存到本地存储。
            var lastArr =JSON.stringify(arr2);
            localStorage.setItem('lastArr',lastArr);
            window.location.href = 'js3.html';
        }else {
             alert("请点击 ‘点击设置’按钮来设置玩家配比。")
        }
});



};