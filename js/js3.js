/**
 * Created by Administrator on 2017/6/23.
 */
//取出本地存储的JSON字符串，然后转变为数组
var arrString =localStorage.getItem("lastArr");
var arr=JSON.parse(arrString);
//定义一个数，num代表玩家号，i来取余数实现点击事件循环
var num=1;
var i=0;
//为页面返回按钮添加返回事件
$('#Back-Icon').click(function () {
    window.location.href='js2-skip.html';
});
//初始化页面
$(function () {
    $('#personNum').html(num);
    $('#deal').html('查看'+num+'号身份');

});

//为查看身份按钮添加事件
$('#deal').on('click',function () {
    if(num<arr.length+1){
        //通过取余数来显示隐藏图片
        if((i+1)%2){
            $('#personNum').html(num);
            $('#personResult').toggle();
            $('#personRiddle').toggle();
            $('#personName').html('角色:'+arr[num-1]);
            num++;
            if(num<arr.length+1){
            $('#deal').html('隐藏并传递给'+num+'号');
            }else {
                $('#deal').html('法官查看');
            }
            i++;
        }else {
            $('#personNum').html(num);
            $('#personResult').toggle();
            $('#personRiddle').toggle();
                $('#deal').html('查看'+num+'号身份');
            i++;
        }
    else{
            location.href="js4.html";
        }
    }


});