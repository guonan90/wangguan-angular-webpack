/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = ['restRequest', function (restRequest) {


    //登录
    var login = function (data, u) {

        restRequest.post("submitLogin", data)
            .then(u)
    };
    //退出
    var logout = function (u) { 
        restRequest.get('logout', '')
            .then(u
            //     function (error) {
            //     alert(error.data)
            // }
        )
    }
    return {
        login: login,
        logout: logout
    }


}];