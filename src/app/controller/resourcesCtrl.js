// 资源管理
//angular.module('gatewayApp').controller('developerCtrl',
module.exports = [
    '$scope',
    '$rootElement',
    'resourcesService',
    'routeService',
    'mappingService',
    'ngTip',
    function ($scope,
        $rootElement,
        resourcesService,
        routeService,
        mappingService,
        ngTip) {
        var viewPage = $($rootElement);
        var page = {
            size: 5,
            page: 1
        }; //分页

        //$http.get('/v1/route.json?page=0&size=0').then(function successCallback(response) {
        function load(number) {
            page.page = number || 1;
            resourcesService.getList(page, function (response) {
                $scope.resourcess = response.data;
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

            resourcesService.getTreeLit(function (response) {
                if (response.success) {
                    $scope.nodes = response.data;
                    $scope.copyNodes = angular.copy(response.data)
                }
            });
        }


        load();


        /**
         * 添加资源
         */
        $scope.addResources = function () {
            //***************************************** */
            reset()
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()

        };

        /**
         * 查看权限信息
         * @param item
         */
        $scope.details = function (id) {
            resourcesService.getDetils({
                'id': id
            }, function (response) {
                $scope.detailsDatas = response.data;
                // viewPage.find('.detail').modal('show');
                viewPage.find('.shade').show()
                viewPage.find('.common_popUp_resources').show()

            });
        };

        /**
         * 左侧点击事件以及check事件
         */
        $scope.parentChecked = function (parentCheck, node) {
            $scope.rightDivdatas = [];
            angular.forEach($scope.nodes, function (item) {
                if (item.pid == node.id) {
                    if (parentCheck !== '') {
                        item.check = parentCheck;
                    }
                    $scope.rightDivdatas.push(item);
                }
            });
            debugger
        }

        /**
         * 取消事件
         */
        $scope.concel = function () {
            viewPage.find('.common_popUp').hide()
            viewPage.find('.common_popUp_resources').hide()
            viewPage.find('.shade').hide()
            reset()
        }

        /**
         * 保存授权信息
         *
         */
        $scope.save = function () {
            //表单校验
            if (!$scope.resourceForm.$valid) {
                ngTip.tip('校验不通过', 'danger');
                return;
            }

            var data = {};
            //data.data = {};
            data.resources = $scope.resources;

            //将数据放在data的list中
            data.list = handleNodes();
            if (data.list.length == 0) {
                ngTip.tip('请选择地址', 'danger');
                return;
            }
            resourcesService.saveResources(data, function (response) {
                if (response.success) {
                    ngTip.tip('成功！', 'success');
                    $scope.concel()
                    load();
                } else {
                    alert(response.errorMessage);
                }
            });
        };

        function handleNodes() {
            var out = []
            angular.forEach($scope.nodes, function (item) {
                if (item.check) {
                    out.push(item)
                }
            })
            return out;
        }

        /**
         * 删除资源
         * @param id
         */
        $scope.deleteResources = function (id) {
            resourcesService.deleteResources(id, function (response) {
                if (response.success) {
                    ngTip.tip('删除成功！！！', 'success');
                    load();
                } else {
                    alert(response.errorMessage)
                }
            })
        };
        /**
         * 批量删除资源信息
         * @param id
         */
        $scope.deleteBatchResources = function () {
            var chooseIds = [];
            angular.forEach($scope.resourcess, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行", "danger");
                return
            }

            var ids = chooseIds.join(',');
            $scope.deleteResources(ids);
        };

        /**
         * 编辑资源信息
         * @param item
         */
        $scope.editItem = function (item) {
            $scope.resources = angular.copy(item);
            resourcesService.getDetils({
                'id': item.id
            }, function (response) {
                var oldData = response.data;

                //选中页面值
                setCheckTree(oldData);

                viewPage.find('.common_popUp').show()
                viewPage.find('.shade').show()


            });
        };

        /**
         * 根据查询出来的数据 选中树形菜单
         * @param data
         */
        function setCheckTree(data) {
            var pids = []
            var flag = false;

            angular.forEach($scope.nodes, function (item) {
                for (var j = 0; j < data.length; j++)
                    if (data[j].mapping_id == item.id) {
                        item.check = true;
                        if (pids.indexOf(item.pid) == -1) {
                            pids.push(item.pid)
                        }
                    }

            })
            angular.forEach($scope.nodes, function (item) {
                for (var i = 0; i < pids.length; i++)
                    if (pids[i] == item.id) {
                        item.check = true;
                        if (!flag) {
                            $scope.parentChecked('', item)
                            flag = true
                        }
                    }

            })
        }



        /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.resourcess, function (item) {
                item.check = selectAll;
            });
        }

        function reset() {
            // $scope.developer = {} // 页面model，防止影响数据
            // $scope.selectAll = false; //全选或者不选
            // $scope.disabled = false

            $scope.nodes = $scope.copyNodes;
            $scope.rightDivdatas = [];
            $scope.resources = {}
            $scope.parentCheck = false
        }

    }
]
//});