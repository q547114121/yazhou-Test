/**
 * Created by Administrator on 2017/9/12.
 */
$(function () {
    $('p').css('visibility','hidden');
    //获取浏览器窗口高度，以便于背景图片铺设
    $('.banner').css('height',$(document).height()) ;
   //通过表单序列话操作，来给POST请求传值
    $('form').on('submit',function (e) {
        //阻止表单在提交后刷新页面
        e.preventDefault();
        //发出ajax请求
            $.ajax({
                type: 'POST',
                url: '/carrots-admin-ajax/a/login',
                data:$('form').serialize(),
                dataType:'json',
                success:function(response,status,xhr){
                    console.log(response);
                    console.log(status);
                    console.log(xhr);
                    //判断用户名和密码是否出错
                    if(response.code !=0){
                        if($('#InputName').val() !='admin' && $('#InputName').val() !=""){
                            $('p').css('visibility','visible').text('用户名不存在');
                        }else if($('#InputName').val() =='admin' && $('#password').val() !=123456 &&$('#password').val() !=""){
                             $('p').css('visibility','visible').text('密码错误');
                        }else if ($('#InputName').val() =="") {
                             $('p').css('visibility','visible').text('请输入用户名');
                        }else if ($('#InputName').val() =="admin"&& $('#password').val() =="") {
                             $('p').css('visibility','visible').text('密码不能为空');
                        }
                    }else{
                    //请求成功后跳转页面
                        location.href="js5-result.html";
                    }
                },
                error:function(jqXHR,statusText,thrownError){
                    alert('请求出错');
                    console.log(jqXHR);
                    console.log(statusText);
                    console.log(thrownError);
                }
            });
    });
});
