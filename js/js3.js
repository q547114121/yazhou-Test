/**
 * Created by Administrator on 2017/6/23.
 */
//取出url中的分配玩家的值,存入数组
var str =decodeURI(location.search);
if(str.indexOf('?') !== -1) {
    var arr = str.substr(1).split(',');
}
//为页面返回按钮添加返回事件
$('#Back-Icon').click(function () {
    window.location.href='js2-skip.html';
})

//为查看身份按钮添加事件
$('#deal').click(function () {
    
});