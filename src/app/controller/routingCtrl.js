// 路由设置
// angular.module('gatewayApp').controller('routeCtrl'

module.exports = [
    '$scope',
    '$rootElement',
    'routeService',
    'mappingService',
    'requestMethods',
    '$filter',
    'CHOOSE',
    'servers',
    'ngTip',
    // 'BPDefaultOptions',
    function ($scope,
        $rootElement,
        routeService,
        mappingService,
        requestMethods,
        $filter,
        CHOOSE,
        servers,
        ngTip
    ) {

        $scope.pages = 1;


        $scope.requestMethods = requestMethods;
        $scope.CHOOSE = CHOOSE;
        $scope.servers = servers;
        $scope.route = {};
        var viewPage = $($rootElement);
        var page = {
            size: 5,
            page: 1
        }; //分页

        function load(number) {
            page.page = number || 1;
            routeService.getList(page, function (response) {
                if (response.success) {
                    $scope.routes = response.data;
                    //设置分页插件
                    
                    if (response.metaData.totalPages != 0) {
                        viewPage.find('.pagination').bootstrapPaginator(BPDefaultOptions({
                            currentPage: response.metaData.number,
                            totalPages: response.metaData.totalPages,
                            onPageClicked: function (e, originalEvent, type, page) {
                                load(page);
                            }
                        }));
                    } else {
                        viewPage.find('.pagination').html('<span class="label label-warning">暂无数据！</span>');
                    }
                } else {
                    ngTip.tip(response.errorMessage,'danger')
                }
            });
        }

        load();

        /**
         * 增加弹框显示
         */
        $scope.addRoute = function () {
            // jq('.common_popUp').show()
            //后台获取所有msppings
            $scope.mappings = {}
            var temp = {
                size: -1,
                page: -1
            };
            mappingService.getList(temp, function (response) {
                if (response.success) {
                    $scope.mappings = $filter('groupByfilter')(response.data, 'serviceId', 'urlRoute');
                    $scope.route.serviceId = '';
                    viewPage.find('.common_popUp').show()
                    viewPage.find('.shade').show()
                } else {
                    ngTip.tip('请重试！','danger');
                }
            });

        }


        /**
         * 服务选择切换事件
         */
        $scope.serverChange = function (value) {

            switch (value) {
                case 0: //服务
                    $scope.route.requestMethod = "";
                    $scope.route.url = "";
                    $scope.disable = true
                    break;
                case 1: //url
                    $scope.disable = false
                    $scope.route.serviceId = "";
                    break
            }
        }
        /**
         * 提交保存
         */
        $scope.save = function () {
            // debugger
            var data = {};
            //需要校验
            if (!$scope.myForm.$valid) {
                ngTip.tip('校验不通过', 'danger');
                return;
            }

            data = $scope.route;
            if ($scope.selectValue == 1) {
                data.serviceId = "urlRoute";
            }
            routeService.saveRoute(data, function (response) {
                if (response.success) {
                    ngTip.tip('成功！','success');
                    viewPage.find('.common_popUp').hide()
                    viewPage.find('.shade').hide()
                    load();
                    reset()
                } else {
                    alert(response.errorMessage);
                }
            })            

        }


        /**
         * 删除
         */
        $scope.delete = function (id) {
            debugger
            var test = angular.copy($scope.route)
            routeService.deleteRoute(id, function (result) {
                if (result.success) {
                    ngTip.tip('成功','success')
                    $scope.selectAll = false
                    load()
                }
            })
        }
        /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.routes, function (item) {
                item.check = selectAll;
            });
        }

        /**
         * 批量删除
         */
        $scope.deleteBatch = function () {

            var chooseIds = [];
            angular.forEach($scope.routes, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行",'danger');
                return
            }

            var ids = chooseIds.join(',');
            $scope.delete(ids);
        }
        /**
         * 取消按钮
         */
        $scope.concel = function () {
            viewPage.find('.common_popUp').hide()
            viewPage.find('.shade').hide()
            reset()
        }

        /**
         * 修改路由信息
         */
        $scope.updateRoute = function (item) {
            
            if (item.serviceId == "urlRoute") {
                $scope.selectValue = 1
                $scope.disable = false;
            } else {
                $scope.selectValue = 0
                $scope.disable = true;
            }
            mappingService.getList({
                size: -1,
                page: -1
            }, function (response) {
                if (response.success) {
                    $scope.route = angular.copy(item);
                    $scope.mappings = $filter('groupByfilter')(response.data, 'serviceId', 'urlRoute');
                    viewPage.find('.common_popUp').show()
                    viewPage.find('.shade').show()
                } else {
                    ngTip.tip('请重试！','danger');
                }
            });
        }

        /**
         * 启用禁用
         */
        $scope.enable = function (id, flag) {
            var data = {};
            data.enabled = flag;
            routeService.enable(id, data, function (response) {
                if (response.success) {
                    load();
                } else {
                    ngTip.tip(response.errorMessage,'danger')
                }
            })
        };

        function reset() {
            $scope.route = {} // 页面model，防止影响数据
            $scope.selectAll = false; //全选或者不选
            $scope.selectValue = '' // 服务||URL选择的值
            $scope.disable = true; // 禁用服务id标签或者url
        }



        

    }

]
// });