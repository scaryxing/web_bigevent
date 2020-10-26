$(function () {
    // 点击去“注册”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击去“登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()自定义规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //检测两次密码输入是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }


    })
    //监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=username]').val() };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message + '请登录');
            //去往登录页面
            $('#link_login').click();

        })
    })
    // 监听登录表单的提交事件
    $('#form-login').submit(function (e) {
        e.preventDefault();
        // console.log($(this).serialize())
        var data = { username: $('#form-login [name=username]').val(), password: $('#form-login [name=username]').val() };
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token);
                location.href = 'index.html';
            }
        })
    })
})