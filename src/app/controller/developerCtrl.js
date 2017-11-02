// 开发者管理
//angular.module('gatewayApp').controller('developerCtrl',
module.exports = ['$scope',
    '$rootElement',
    'developerService',
    'developerTypes',
    'ngTip',
    function ($scope,
        $rootElement,
        developerService,
        developerTypes,
        ngTip) {
        var viewPage = $($rootElement);
        $scope.developer = {};
        $scope.pages = 1;
        $scope.developerTypes = developerTypes;
        var page = {
            size: 5,
            page: 1
        }; //分页

        //$http.get('/v1/route.json?page=0&size=0').then(function successCallback(response) {
        function load(number) {
            page.page = number || 1;
            developerService.getList(page, function (response) {
                $scope.developers = response.data;
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
         * 添加开发者
         */
        $scope.addDeveloper = function () {
            $scope.developer = {};
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()
        };

        $scope.getDeveloperName = function (developerType) {
            var name = "";
            for (var o in $scope.developerTypes) {
                if ($scope.developerTypes[o].key == developerType) {
                    name = $scope.developerTypes[o].name;
                    break;
                }
            }
            return name;

        }

        /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.developers, function (item) {
                item.check = selectAll;
            });
        }

        /**
         * 删除开发者
         * @param id
         */
        $scope.deleteDeveloper = function (id) {
            developerService.deleteDevelopers(id, function (response) {
                if (response.success) {
                    ngTip.tip('成功','success')
                    $scope.selectAll = false
                    load();
                } else {
                    ngTip.tip(response.errorMessage,'danger')
                }
            })
        };
        /**
         * 批量删除开发者信息
         * @param id
         */
        $scope.deleteBatchDeveloper = function () {
            debugger
            var chooseIds = [];
            angular.forEach($scope.developers, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行",'danger');
                return
            }

            var ids = chooseIds.join(',');
            $scope.deleteDeveloper(ids);
        };

        /**
         * 修改开发者信息
         * @param item
         */
        $scope.editItem = function (item) {
            $scope.developer = angular.copy(item);
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()
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
         * 开发者类型转性
         */
        $scope.developetypeChange = function (type) {
            switch (type) {
                case "service_developer": //
                    $scope.disable = false
                    break;
                case "app_developer": //
                    $scope.disable = true
                    break
            }
        }


        /**
         * 更新开发者数据
         */
        $scope.updateDeveloper = function () {
            dev = $scope.developerTypes;
            var data = {};

            if (!$scope.myForm.$valid) {
                ngTip.tip('校验不通过', 'danger');
                return;
            }
            
            data = $scope.developer;

            developerService.updateDevelopers(data, function (response) {
                if (response.success) {
                    ngTip.tip('成功！','success');
                    $scope.concel()
                    load();
                } else {
                    ngTip,tip(response.errorMessage,'danger');
                }

            })
        };

        function reset() {
            $scope.developer = {} // 页面model，防止影响数据
            $scope.selectAll = false; //全选或者不选
            $scope.disabled = false
        }

    }
]
//});