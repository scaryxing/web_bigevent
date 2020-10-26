$(function () {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })
    console.log($('.layui - form').serialize())
    console.log($('.input1').val())
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = { oldPwd: $('.input1').val(), newPwd: $('.input2').val() };
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),//$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(data)
                    return layui.layer.msg('更新密码失败');
                }
                layui.layer.msg('更新密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
    // $('.layui-form').on('submit', function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/updatepwd',
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 console.log(res.status)
    //                 return layui.layer.msg('更新密码失败！')
    //             }
    //             layui.layer.msg('更新密码成功！')
    //             // 重置表单
    //             $('.layui-form')[0].reset()
    //         }
    //     })
    // })
})