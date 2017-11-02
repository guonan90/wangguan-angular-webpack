// 地址采集
// module.exports = angular.module('gatewayApp').controller('mappingCtrl',
module.exports = [
    '$scope',
    '$rootElement',
    'mappingService',
    'requestMethods',
    'ngTip',
    function ($scope,
        $rootElement,
        mappingService,
        requestMethods,
        ngTip) {

        var viewPage = $($rootElement);
        $scope.pages = 1;
        $scope.requestMethods = requestMethods;
        var page = {
            size: 5,
            page: 1
        }; //分页

        function load(number) {
            page.page = number || 1;
            mappingService.getList(page, function (response) {
                $scope.mappings = response.data;
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
        $scope.addMapping = function () {
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()
        };

         /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.mappings, function (item) {
                item.check = selectAll;
            });
        }

        /**
         * 删除地址
         * @param id
         */
        $scope.deleteMapping = function (id) {
            mappingService.deleteMapping(id, function (response) {
                if (response.success) {
                    ngTip.tip('成功','success')
                    reset();
                    load();
                } else {
                    ngTip.tip(response.errorMessage,'danger')
                }
            })
        };
        /**
         * 删除地址信息
         * @param id
         */
        $scope.deleteBatchMapping = function () {
            // var ids = $('table tbody').getCheckedIds();
            // if (ids.length == 0) {
            //     alert("至少选择一行");
            //     return;
            // }
            // $scope.deleteMapping(ids);
            var chooseIds = [];
            angular.forEach($scope.mappings, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行",'danger');
                return
            }

            var ids = chooseIds.join(',');
            $scope.deleteMapping(ids);
        
        };


      

        /**
         * 修改地址信息
         * @param item
         */
        $scope.editItem = function (item) {
            $scope.mapping = angular.copy(item);
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()
        };

       
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

            data = $scope.mapping;

            mappingService.saveMapping(data, function (response) {
                if (response.success) {
                    ngTip.tip('成功！','success');
                   $scope.concel()
                    load();
                } else {
                    ngTip.tip(response.errorMessage,'danger');
                }

            })
        };
         /**
         * 取消按钮
         */
        $scope.concel = function () {
            viewPage.find('.common_popUp').hide()
            viewPage.find('.shade').hide()
            reset()
        }
        
        function reset() {
            $scope.mapping = {} // 页面model，防止影响数据
            $scope.selectAll = false; //全选或者不选
        }

    // });
    }]