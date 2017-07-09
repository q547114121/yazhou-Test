/**
 * Created by Administrator on 2017/6/23.
 */
//取出本地存储的JSON字符串，然后转变为数组
var arrString =localStorage.getItem("lastArr");
var arr=JSON.parse(arrString);

//为页面返回按钮添加返回事件
$('#Back-Icon').click(function () {
    window.location.href='js2-skip.html';
})

//为查看身份按钮添加事件
$('#deal').click(function () {
    $('#personRiddle').toggle();
    $('#personResult').toggle(0,function () {
        $(this).find('span').text('');
    });
});