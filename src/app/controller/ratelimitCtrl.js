// 策略管理
// angular.module('gatewayApp').controller('ratelimitCtrl', function ($scope,
module.exports = [
    '$scope',
    '$rootElement',
    'routeService',
    'mappingService',
    'developerService',
    'retelimitService',
    'policyType',
    'ngTip',
    function ($scope,
        $rootElement,
        routeService,
        mappingService,
        developerService,
        retelimitService,
        policyType,
        ngTip) {
        var viewPage = $($rootElement);

        /**
         * 页面
         * @type {{size: number, page: number}}
         */
        var page = {
            size: 5,
            page: 1
        }; //分页

        /**
         * 策略类型
         */
        $scope.policyType = policyType;

         /**
         * 全选或者不全选
         */
        $scope.selected = function (selectAll) {
            angular.forEach($scope.policyList, function (item) {
                item.check = selectAll;
            });
        }

        /**
         * 加载路由信息
         */
        routeService.getList(page, function (response) {
            if (response.success) {
                $scope.routes = response.data;
            }
        });

        /**
         * 加载用户信息
         */
        developerService.getList(page, function (response) {
            if (response.success) {
                $scope.developers = response.data;
            }
        });

        /**
         * 加载mapping地址
         * @param serviceId
         */
        $scope.loadMapping = function (route) {
            var temp = {
                size: 100,
                page: 1
            };
            temp.serviceId = route.serviceId;
            mappingService.getList(temp, function (response) {
                if (response.success) {
                    $scope.mappings = response.data;
                }
            });
        };
        
        /**
         * 通过限速类型显示具体选项配置
         */
        $scope.showOption = function (type) {
            $("#appChoice").hide();
            $("#serviceChoice").hide();
            $("#userChoice").hide();
            $("#originChoice").hide();
            if ('ORIGIN' == type) {
                $("#originChoice").show();
            } else if ('URL' == type) {
                $("#appChoice").show();
                $("#serviceChoice").show();
            } else if ('USER' == type) {
                $("#userChoice").show();
            } else if ('MULTI' == type) {
                $("#appChoice").show();
                $("#serviceChoice").show();
                $("#userChoice").show();
                $("#originChoice").show();
            }
        }
        

        /**
         * 添加策略
         */
        $scope.addPolicy = function () {
            // viewPage.find('.edit_modal form')[0].reset();
            // viewPage.find('.edit_modal').modal('show');
            // $scope.policy.id=null;
            $scope.policy = {};
            $scope.policy.type = "";
            $scope.showOption($scope.policy.type);
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()
        };
    

        /**
         * 更新策略
         * @param policy
         */
        $scope.updatePolicy = function (policy) {
            $scope.policy = angular.copy(policy);
            // viewPage.find('.edit_modal').modal('show');
            $scope.showOption(policy.type);
            viewPage.find('.common_popUp').show()
            viewPage.find('.shade').show()
        };

        /**
         * 删除策略
         * @param id
         */
        $scope.deletePolicy = function (id) {
            retelimitService.deletePolicy(id, function (response) {
                if (response.success) {
                    // alert('');
                    ngTip.tip('成功','success');
                    load();
                    $scope.selectAll = false
                } else {
                    ngTip.tip(response.errorMessage,'danger');
                }
            });
        };

        /**
         * 批量删除
         */
        $scope.deleteBatchPolicy = function () {
            // var ids = $('table tbody').getCheckedIds();
            // if (ids.length == 0) {
            //     alert("至少选择一行");
            //     return;
            // }
            // retelimitService.deletePolicy(ids, function (response) {
            //     if (response.success) {
            //         load();
            //         // $('input[type=checkbox].selectAll').prop('checked', false);
            //         $scope.selectAll = false
            //     } else {
            //         alert(response.errorMessage);
            //     }
            // });
            
            var chooseIds = [];
            angular.forEach($scope.policyList, function (item) {
                if (item.check) {
                    chooseIds.push(item.id);
                }
            })
            if (chooseIds.length <= 0) {
                ngTip.tip("至少选择一行",'danger');
               
                return
            }

            var ids = chooseIds.join(',');
            $scope.deletePolicy(ids);
        };

        /**
         * 保存策略
         */
        $scope.save = function () {
            //表单校验
            // if (!$('#_editForm').validate()) {
            //     return;
            // }
            var data = {};

            if (!$scope.myForm.$valid) {
                ngTip.tip('校验不通过', 'danger');
                return;
            }

            data = $scope.policy;
            if ('ORIGIN' == data.type) {
                data.routeId = '';
                data.mappingId = '';
                data.accessKey = '';
            } else if ('URL' == data.type) {
                if ($scope.policy.route == null) {
                    return;
                }
                if ($scope.policy.mapping == null) {
                    return;
                }
                data.accessKey = '';
                data.remoteAddress = '';
                data.routeId = $scope.policy.route.id;
                data.mappingId = $scope.policy.mapping.id;
            } else if ('USER' == data.type) {
                if ($scope.policy.developer == null) {
                    return;
                }
                data.routeId = '';
                data.mappingId = '';
                data.remoteAddress = '';
                data.accessKey = $scope.policy.developer.accessKey;
            } else if ('MULTI' == data.type) {
                if ($scope.policy.route == null) {
                    data.routeId = '';
                    data.mappingId = '';
                } else if ($scope.policy.mapping == null) {
                    data.routeId = '';
                    data.mappingId = '';
                } else {
                    data.routeId = $scope.policy.route.id;
                    data.mappingId = $scope.policy.mapping.id;
                }
                if ($scope.policy.developer == null) {
                    data.remoteAddress = '';
                } else {
                    data.accessKey = $scope.policy.developer.accessKey;
                }
            }
            if ($scope.policy.id == null) {
                retelimitService.addPolicy(data, function (response) {
                    if (response.success) {
                        ngTip.tip('成功！','success');
                        $scope.concel()
                        load();
                    } else {
                        ngTip.tip(response.errorMessage,'danger');
                    }
                });
            } else {
                retelimitService.updatePolicy(data, function (response) {
                    if (response.success) {
                        ngTip.tip('成功！','success');
                        $scope.concel()
                        load();
                    } else {
                        ngTip.tip(response.errorMessage,'danger');
                    }
                });
            }
        }

        /**
         * 加载数据
         */
        function load(number) {
            
           
            page.page = number || 1;
            retelimitService.getPolicyList(page, function (response) {
                ngTip.tip('刷新成功','success');
                $scope.policyList = response.data;
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
        // });

        /**
         * 取消按钮
         */
        $scope.concel = function () {
            viewPage.find('.common_popUp').hide()
            viewPage.find('.shade').hide()
            reset()
        }

        function reset() {
            $scope.policy = {};
            $scope.selectAll = false; //全选或者不选
        }
    }
]