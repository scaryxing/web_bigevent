// 每次调用$.get()或$.post()或$.ajax()函数，都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // console.log(option.url)
})