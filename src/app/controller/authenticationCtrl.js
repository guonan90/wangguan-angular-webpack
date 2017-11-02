// 授权服务

module.exports = [
    '$scope',
    '$rootElement',
    'developerService',
    'authenticationService',
    'resourcesService',
    'authorityTypes',
    'CHOOSE',
    'ngTip',
    function ($scope,
        $rootElement,
        developerService,
        authenticationService,
        resourcesService,
        authorityTypes,
        CHOOSE,
        ngTip) {
        var viewPage = $($rootElement);
        var page = {
            size: 100,
            page: 1
        }; //分页
        $scope.CHOOSE = CHOOSE;
        $scope.developers = {};
        $scope.authority = {};
        $scope.authorityTypes = authorityTypes;
        $scope.request_types = '';
        $scope.showTable = false;

        function load() {
            developerService.getList({
                size: 5,
                page: 1,
                type: 'app_developer'
            }, function (response) {
                $scope.developers = response.data;
            })
        }

        load();
        /**
         * 点击开发者信息加载权限信息
         * @param item
         */
        $scope.developerNameClick = function (item) {
            $scope.items = angular.copy(item);
            $scope.selectApp = item.remark;
            page.accessKey = item.accessKey;
            authenticationService.getList(page, function (response) {

                if (response.data.length != 0) {
                    $scope.authoritys = response.data;
                    viewPage.find('.pagination').html('');
                } else {
                    $scope.authoritys = {};
                    viewPage.find('.pagination').html('<span class="label label-warning">暂无数据！</span>');
                    ngTip.tip('暂无数据！ ', 'danger');
                }
            });
        };

        /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.authoritys, function (item) {
                item.check = selectAll;
            });
        }

        /**
         * 批量删除
         */
        $scope.deleteBatchAuthority = function () {
            var chooseIds = [];
            angular.forEach($scope.authoritys, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行", 'danger');
                return
            }

            var ids = chooseIds.join(',');
            $scope.deleteAuthority(ids);
        }

        /**
         * 删除权限信息
         * @param id
         */
        $scope.deleteAuthority = function (id) {
            authenticationService.deleteAuthoirtys(id, function (response) {
                if (response.success) {
                    ngTip.tip('删除成功', 'success')
                    $scope.developerNameClick($scope.items);
                    $scope.selectAll = false
                } else {
                    ngTip.tip(response.errorMessage, 'danger')
                }
            })
        };

        /**
         * 查看权限信息
         * @param item
         */
        $scope.authorityDetails = function (id) {
            authenticationService.getDetils({
                'id': id
            }, function (response) {
                if (response.success) {
                    $scope.resourcesinfos = response.data;
                    $scope.showTable = true
                    $scope.showTitle = false;
                    viewPage.find('.common_popUp').show()
                    viewPage.find('.shade').show()
                } else {
                    ngTip.tip(response.errorMessage, 'danger')
                }

            });
        };

        /**
         * 编辑权限信息
         * @param item
         */
        $scope.editItem = function (item) {

            $scope.authority = angular.copy(item);
            //加载资源数据
            resourcesService.getList(page, function (response) {
                $scope.resources = response.data;
                $scope.authority.resourceId = item.resource_id;
                $scope.authority.authority = item.authority == '1' ? true : false;
            });

            authenticationService.getDetils({
                'id': item.id
            }, function (response) {
                if (response.success) {
                    $scope.resourcesinfos = response.data;
                    $scope.showTable = true;
                    viewPage.find('.common_popUp').show()
                    viewPage.find('.shade').show()
                } else {
                    ngTip.tip(response.errorMessage, 'danger')
                }
            });
        };

        /**
         * 增加授权信息
         */
        $scope.addAuthority = function () {
            reset();
            //加载资源数据
            resourcesService.getList(page, function (response) {
                $scope.resources = response.data;
                viewPage.find('.common_popUp').show()
                viewPage.find('.shade').show()
            });
        };

        /**
         * 动态加载表格
         */
        $scope.loadTable = function (resourceId) {
            $scope.resourcesinfos = {}
            $scope.showTable = false;
            resourcesService.getDetils({
                'id': resourceId
            }, function (response) {
                if (response.success) {
                    $scope.resourcesinfos = response.data
                    $scope.showTable = true;
                } else {
                    ngTip.tip(response.errorMessage, 'danger')
                }
            });
        }

        /**
         * 批量授权
         */
        $scope.changeAuthorityType = function (authorityType) {

            angular.forEach($scope.resourcesinfos, function (item) {
                item.authority_type = authorityType
            })

        }
        /**
         * 保存数据
         */
        $scope.save = function () {

            //表单校验
            if (!$scope.authorityForm.$valid) {
                ngTip.tip('校验不通过', 'danger');
                return;
            }
            debugger
            //此处应该由后台返回的数据直接转换成要的属性
            angular.forEach($scope.resourcesinfos, function (item) {
                item.authorityType = item.authority_type;
                item.mappingId = item.mapping_id;
                item.resourceId = $scope.authority.resourceId;
            });


            var data = {};
            //权限表数据
            data.authority = $scope.authority;
            data.authority.accessKey = $scope.items.accessKey;
            //授权类型信息
            data.permission = $scope.resourcesinfos;
            authenticationService.saveAuthoirty(data, function (response) {
                if (response.success) {
                    ngTip.tip('成功！', 'success');
                    $scope.developerNameClick($scope.items);
                    $scope.concel()
                } else {
                    ngTip.tip(response.errorCode + response.errorMessage, 'danger');
                }

            });
        };



        /**
         * 取消form
         */
        $scope.concel = function () {
            viewPage.find('.common_popUp').hide()
            viewPage.find('.shade').hide()
            reset()
        }

        function reset() {
            $scope.authority.resourceId = '';
            $scope.authority = {}
            $scope.resourcesinfos = {}
            $scope.showTable = false;
            $scope.showTitle = true;
            $scope.authorityType = ""
        }


    }
]
//});