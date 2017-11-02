/**
 * Created by qujingguo on 2017/6/21.
 * Modified by zhaozx on 2017/8/25.
 */
//angular.module('gatewayApp').controller('topCtrl',
module.exports = [
    '$scope',
    '$state',
    'loginService',
    function (
        $scope,
        $state,
         loginService ) {

        /**
         * 个人资料
         */
        $scope.self = function () {
            layer.open({
                type: 2,
                title: false,
                shadeClose: true,
                shade: true,
                maxmin: true, //开启最大化最小化按钮
                area: ['800px', '600px'],
                content: 'app/views/self.html'
            });
        };

        /**
         * 设置
         */
        $scope.setting = function () {
            layer.open({
                type: 2,
                title: false,
                shadeClose: true,
                shade: true,
                maxmin: true, //开启最大化最小化按钮
                area: ['800px', '600px'],
                content: 'app/views/setting.html'
            });
        };


        //退出
        $scope.logout = function () {
            loginService.logout(function (result) {
                if(result.success){
                    debugger
                    //清空数据
                    localStorage.token = "";
                    $state.go('login')
                }
              

            })
        }

    }
];
//});