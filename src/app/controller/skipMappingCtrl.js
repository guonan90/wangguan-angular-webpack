// 透传地址
// angular.module('gatewayApp').controller('skipMappingCtrl', function ($scope,
module.exports = [
    '$scope',
    '$rootElement',
    'skipMappingService',
    'requestMethods',
    'routeService',
    'ngTip',
    function ($scope,
        $rootElement,
        skipMappingService,
        requestMethods,
        routeService,
        ngTip) {

        var viewPage = $($rootElement);
        $scope.pages = 1;
        var page = {
            size: 5,
            page: 1
        }; //分页
        $scope.requestMethods = requestMethods;
        $scope.skipMapping = {};
        $scope.selectRoute = {};
        $scope.routes = {};

        function load(number) {
            page.page = number || 1;
            skipMappingService.getList(page, function (response) {
                $scope.skipMappings = response.data;

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
            });
        }

        load();

        /**
         * 添加地址
         */
        $scope.addSkipMapping = function () {

            //routes
            routeService.getList(page, function (response) {
                $scope.routes = response.data;
                $scope.skipMapping = {};
                viewPage.find('.common_popUp').show()
                viewPage.find('.shade').show()
            });

        };


        /**
         * 删除地址
         * @param id
         */
        $scope.deleteSkipMapping = function (id) {
            skipMappingService.deleteSkipMappings(id, function (response) {
                if (response.success) {
                    ngTip.tip('成功','success')
                    load();
                    reset()
                } else {
                    ngTip.tip(response.errorMessage,'danger')
                }
            })
        };
        /**
         * 删除地址信息
         * @param id
         */
        $scope.deleteBatchSkipMapping = function () {
            var chooseIds = [];
            angular.forEach($scope.skipMappings, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行",'danger');
                return
            }

            var ids = chooseIds.join(',');
            $scope.deleteSkipMapping(ids);
        };


        /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.skipMappings, function (item) {
                item.check = selectAll;
            });
        }
        
        /**
         * 修改地址信息
         * @param item
         */
        $scope.editItem = function (item) {
            $scope.skipMapping = angular.copy(item);
            routeService.getList(page, function (response) {
                $scope.routes = response.data;
                angular.forEach(response.data, function (item) {
                    if ($scope.skipMapping.routeId == item.id) {
                        $scope.skipMapping.route = item;
                    }
                });

                viewPage.find('.common_popUp').show()
                viewPage.find('.shade').show()
            });
        };

        /**
         * 取消按钮
         */
        $scope.concel = function () {
            viewPage.find('.common_popUp').hide()
            viewPage.find('.shade').hide()
            reset()
        }


        /**
         * 更新数据
         */
        $scope.save = function () {

            //表单校验
            var data = {};

            if (!$scope.myForm.$valid) {
                ngTip.tip('校验不通过', 'danger');
                return;
            }

            data = $scope.skipMapping;
            data.routePath = $scope.skipMapping.route.path;
            data.routeId = $scope.skipMapping.route.id;

            skipMappingService.saveSkipMapping(data, function (response) {
                if (response.success) {
                    ngTip.tip('成功！','success');
                    $scope.concel()
                    load();
                } else {
                    ngTip.tip(response.errorMessage,'danger');
                }

            })
        };

        function reset() {
            $scope.skipMapping = {} // 页面model，防止影响数据
            $scope.selectAll = false; //全选或者不选

        }
        // });
    }
]