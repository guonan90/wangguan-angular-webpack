module.exports = function (ngModule) {
    ngModule.constant('resourceTypes', [{
            key: 'ALL'
        },
        {
            key: 'SERVICE'
        },
        {
            key: 'APP'
        }
    ]);
    ngModule.constant('requestMethods', [{
            key: 'GET'
        },
        {
            key: 'POST'
        },
        {
            key: 'DELETE'
        },
        {
            key: 'PUT'
        }
    ]);
    ngModule.constant('developerTypes', [{
            key: 'service_developer',
            name: '服务开发者'
        },
        {
            key: 'app_developer',
            name: '应用开发者'
        }
    ]);
    ngModule.constant('authorityTypes', [{
            key: 'ENCYPT_REQUEST',
            name: '加密请求'
        },
        {
            key: 'ENCYPT_RESPONSE',
            name: '加密返回'
        },
        {
            key: 'ENCYPT_ALL',
            name: '请求返回都加密'
        },
        {
            key: 'ENCYPT_NULL',
            name: '请求返回都不加密'
        }
    ]);
    ngModule.constant('policyType', [{
            key: 'ORIGIN',
            name: '源地址'
        },
        {
            key: 'USER',
            name: '用户'
        },
        {
            key: 'URL',
            name: '服务地址'
        },
        {
            key: 'MULTI',
            name: '混合方式'
        }
    ]);
    ngModule.constant('CHOOSE', [{
            key: true,
            name: '是'
        },
        {
            key: false,
            name: '否'
        }
    ]);
    ngModule.constant('servers', [{
            key: 0,
            name: '服务'
        },
        {
            key: 1,
            name: 'URL'
        }
    ]);
    ngModule.constant('ENV',
        require('./app.env')
    ); // 创建app

    var config = require('./app.config');
    ngModule.config(config.providerConfig)

    ngModule.filter('groupByfilter', function () {
        return function (collection, keyname, excloudename) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1 && key != excloudename) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        }
    });

    //通用提示
    ngModule.directive('ngTip', ngTipDirective)
    ngModule.provider('ngTip', ngTipProvider);
    ngTipDirective.$inject = ['ngTip'];

    function ngTipDirective(ngTip) {
        return {
            restrict: 'EA',
            template: '<div class="alert alert-{{ngTip.type || \'info\'}} ngTip" ng-show="ngTip.msg">' +
                '<button type="button" class="close"  ng-click="hideAlert()">' +
                '<span class="glyphicon glyphicon-remove"></span></button>{{ngTip.msg}}</div>',

            link: function (scope, element, attrs) {
                scope.ngTip = ngTip;
                scope.hideAlert = function () {
                    ngTip.msg = null;
                    ngTip.type = null;
                };
            }
        };
    }

    function ngTipProvider() {
        var self = this;

        self.timeout = 3000;
        self.setDefaultTimeout = function (defaultTimeout) {
            self.timeout = defaultTimeout;
        };

        self.$get = ['$timeout', function ($timeout) {
            var cancelTimeout = null;

            return {
                msg: null,
                type: null,
                tip: tip,
                clear: clear
            };

            /**
             * set msg
             * default last 3s
             * @param msg
             * @param type
             */
            function tip(msg, type) {
                var that = this;
                this.msg = msg;
                this.type = type;

                if (cancelTimeout) {
                    $timeout.cancel(cancelTimeout);
                }
                cancelTimeout = $timeout(function () {
                    that.clear();
                }, self.timeout);
            }

            /**
             * clear msg
             */
            function clear() {
                this.msg = null;
                this.type = null;
            }
        }];

    }

    /**
     * 表达校验
     */
    //   ngModule.myForm('angularFormCheck', function(){
    //     if($(.lysz_data_a) = ""){
    //         alert(此处为必填项)
    //     }
    //   }

}