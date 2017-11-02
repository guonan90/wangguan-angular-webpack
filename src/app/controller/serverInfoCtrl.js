// 启动设置
/**
 * Created by qujingguo on 2017/6/21.
 * Modified by zhaozx on 2017/8/25.
 */
// angular.module('gatewayApp').controller('startCtrl', function ($scope,
module.exports = [
    '$scope',
    '$rootElement',
    'serviceInfo',
    '$interval',
    'ngTip',
    function (
        $scope,
        $rootElement,
        serviceInfo,
        $interval,
        ngTip) {


        var viewPage = $($rootElement);
        $scope.showPort2 = false;
        $scope.showPort3 = false;
        $scope.showLoading = false;
        $scope.disabled = false;


        $scope.myCharts1 = echarts.init(document.getElementById('pic1'));
        $scope.myCharts2 = echarts.init(document.getElementById('pic2'));

        $scope.load = function () {
            console.log('$interval runing');
            serviceInfo.getRegistServer(function (result) {
                if (result.success) {
                    //$scope.jars = result.data;
                    $scope.result = result.data;
                    console.log(result)
                    setCharts($scope.result)
                    showOrHideLoading()
                } else {
                    alert(result.errorMessage)
                }

            })
        }

        /**
     * 判断loading和停止按钮是否显示
     */
    function showOrHideLoading() {
        
        var startEntities = JSON.parse($scope.result.startInfo);
        if (JSON.stringify(startEntities) == "{}") {
            $scope.disabled = true;
            //$("#stop").removeClass("disabled");
        } else {
            $scope.disable = false;
            if ($scope.result.GATEWAY < startEntities.GATEWAY){

                $scope.GATEWAY = true;
            }else {
                $scope.GATEWAY = false;
            }
            if ($scope.result.DIGITALBOX < startEntities.DIGITALBOX){

                $scope.DIGITALBOX = true;
            }else{
                $scope.DIGITALBOX = false;

            }
            if ($scope.result.PROCESSMODULE < startEntities.PROCESSMODULE){

                $scope.PROCESSMODULE = true;
            }else{
                $scope.PROCESSMODULE = false;

            }


        }
    }


        /**
         * 定时器
         */
        var timer = $interval($scope.load, 1000);

        /**
         * 页面销毁、页面跳转、路由发生变化、dom变化。销毁定时器
         */
        $scope.$on("$destroy", function () {
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
                timer = undefined;
            }
        });


        function setCharts() {
            $scope.myCharts1.setOption(JSON.parse($scope.result.disk)); //$scope.result.disk
            $scope.myCharts2.setOption(JSON.parse($scope.result.mem));
        }




        /**
         * 启动
         */
        $scope.showStart = function (name) {
            $scope.gateway = {};
            switch (name) {
                case 'gateway':
                    $scope.showgateway = true;
                    $scope.showgatewayCrypto = false;
                    $scope.showgatewayCore = false;
                    break;
                case 'gatewayCrypto':
                    $scope.showgateway = false;
                    $scope.showgatewayCrypto = true;
                    $scope.showgatewayCore = false;
                    break;
                case 'gatewayCore':
                    $scope.showgateway = false;
                    $scope.showgatewayCrypto = false;
                    $scope.showgatewayCore = true;
                    break;
                default:
                    $scope.showgateway = true;
                    $scope.showgatewayCrypto = true;
                    $scope.showgatewayCore = true;

            }
            viewPage.find('.shade').show()
            viewPage.find('.common_popUp').show()
        };

        /**
         * 动态展示端口
         */
        $scope.showInput = function (num) {
            if (num == 2) {
                $scope.showPort2 = true;
                $scope.showPort3 = false;
            } else if (num == 3) {
                $scope.showPort2 = true;
                $scope.showPort3 = true;

            } else if (num == 1) {
                $scope.showPort2 = false;
                $scope.showPort3 = false;

            }
        }


        /**
         * 启动服务
         */
        $scope.startServer = function () {
            debugger
            $scope.GATEWAY = true;
            $scope.DIGITALBOX = true;
            $scope.PROCESSMODULE = true;
            ////表单校验
            if (!$scope.myForm.$valid) {
                return;
            }

            $scope.disable = true;
            var data = [];
           
              
            if ($scope.gateway.gatewayCore != '' && $scope.gateway.gatewayCore !=undefined) {
                 var core = {}
                core.serverName = "PROCESSMODULE";
                core.num = $scope.gateway.gatewayCore;
                core.ports = "";
                data.push(core);
            }

            if ($scope.gateway.gatewayCrypto != ''&& $scope.gateway.gatewayCrypto!=undefined) {
               var crypto = {}
                
                crypto.serverName = "DIGITALBOX";
                crypto.num = $scope.gateway.gatewayCrypto;
                crypto.ports = "";
                data.push(crypto);
            }

            if ($scope.gateway.gateway != '' && $scope.gateway.gateway!=undefined) {
               var gateway = {};
                gateway.serverName = "GATEWAY";
                gateway.num = $scope.gateway.gateway;
                gateway.ports = $("#port1").val() + "," + $("#port2").val() + "," + $("#port3").val();
                data.push(gateway);
            }


            //$scope.showLoading = true;
            serviceInfo.start(data, function (result) {
                if (result.success) {
                    ngTip.tip('成功','success')
                    $scope.disable = true;
                    viewPage.find('.shade').hide()
                    viewPage.find('.common_popUp').hide()
                } else {
                    alert(result.errorMessage);
                    $scope.disable = false;

                }
            })

        };

        
    $scope.stopServer = function () {
        serviceInfo.stopServers(function (result) {
            if (result.success) {
                
                ngTip.tip('成功','success');
                $scope.disable = true;
            } else {
                ngTip.tip(result.errorMessage,'danger')
            }
        })

    };

        /**
         * 取消
         */
        $scope.concel = function () {
            viewPage.find('.shade').hide()
            viewPage.find('.common_popUp').hide()
            reset()
        }

        function reset() {
            $scope.showPort2 = false;
            $scope.showPort3 = false;
            $scope.showLoading = false;
            $scope.gateway = {}
        }
    }
]