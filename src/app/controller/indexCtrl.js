/**
 * Created by qujingguo on 2017/6/21.
 * Modified by zhaozx on 2017/8/25.
 */
//angular.module('gatewayApp').controller('indexCtrl',
module.exports = ['$scope',
    'serviceInfo',
    '$location',
    '$state',
    function ($scope,
              serviceInfo,
              $location,
              $state) {



       load();
        function load() {
            serviceInfo.checkStatus(function (result) {
                if (result.success) {
                    //$location.href("/routing");
                    //$state.go("index.start");
                    if (showStartServer(result.data)) {
                        alert('网关核心服务未启动，请先启动！！');
                        $state.go("index.serverInfo");
                    }
                }
            })
        }

        function showStartServer(data) {
            var result = false;
            ////判断数据长度
            //if (data.length >= 0) {
            //    angular.forEach(data, function (item) {
            //
            //    });
            //}

            if (data.PROCESSMODULE == 0 || data.DIGITALBOX == 0) {
                result = true;
            }
            return result;
        }
    }];
//});