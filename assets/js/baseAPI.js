// 每次调用$.get()或$.post()或$.ajax()函数，都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // console.log(option.url)
    // 统一为有权限的接口，设置 headers 请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete函数
    option.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            console.log(res.responseJSON.message)
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = 'login.html';
        }
    }
    // option.complete = function (res) {
    //     // console.log('执行了 complete 回调：')
    //     // console.log(res)
    //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         // 1. 强制清空 token
    //         localStorage.removeItem('token')
    //         // 2. 强制跳转到登录页面
    //         location.href = 'login.html'
    //     }
    // }
})