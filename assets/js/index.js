$(function () {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储中的token
            localStorage.removeItem('token')
            location.href = 'login.html';
            layer.close(index);
        });
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //调用renderAvator渲染用户头像
            renderAvator(res.data);
        },
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // }
        //无论成功失败都会调用complete函数
        // complete: function (res) {
        //     // console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
        //         //强制清空token
        //         localStorage.removeItem('token');
        //         //跳转到登录页面
        //         location.href = 'login.html';
        //     }
        // }
    })
}
//渲染用户头像
function renderAvator(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;' + name);
    if (user.user_pic !== null) {
        //获取图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();




}