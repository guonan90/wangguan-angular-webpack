// 页面路由的信息，定义哪个路径要跳转的页面，所有页面的跳转。

module.exports = function (ngModule) {

    ngModule.run(['$rootScope',
        '$window',
        '$location',
        '$log',
        '$templateCache',
        '$cacheFactory',
        '$state',
        '$interval',
        function ($rootScope,
            $window,
            $location,
            $log,
            $templateCache,
            $cacheFactory,
            $state,
            $interval) {
                
            // 跳转到登录界面，这里我记录了一个from，这样可以在登录后自动跳转到未登录之前的那个界面
            $rootScope.$on('httpInterceptor', function (errorType) {
               
                $state.go("login", {
                    from: $state.current.name,
                    w: errorType
                });
            });

            //路由监听事件 
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    console.log(event);
                    console.log(toState);
                    console.log(toParams);
                    console.log(fromState);
                    console.log(fromParams);
                    if (toState.name == 'login') return; // 如果是进入登录界面则允许
                    // 如果用户不存在
                    
                    if (!localStorage.token ) {
                        event.preventDefault(); // 取消默认跳转行为
                        $state.go("login", {
                            from: fromState.name,
                            w: 'notLogin'
                        }); //跳转到登录界面
                    }
                    
                })

            // $stateChangeError 当模板解析过程中发生错误时触发 
            $rootScope.$on('$stateChangeError',
                function (event,
                    toState,
                    toParams,
                    fromState,
                    fromParams,
                    error) {

                })
            // stateChangeSuccess 当模板解析完成后触发 
            $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

            function stateChangeSuccess(
                $rootScope,
                $location,
                $interval) {
                $templateCache.removeAll();
                $window.scrollTo(0, 0);
                var loginCache = $cacheFactory.get('login');
                //  if (!localStorage.getItem('login')) {
                //缓存不存在，就直接跳转登录页面
                // if (!loginCache) {
                //     $state.go("login")
                // }
                //是退出路由，删除缓存
                
                if ($location.path == 'login') {
                    loginCache.removeAll();
                }

            }


        }
    ]).config(['$urlRouterProvider', '$locationProvider', '$stateProvider', function ($urlRouterProvider, $locationProvider, $stateProvider) {

        $locationProvider.hashPrefix('');

        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                template: require('./app/views/login.html'),
                controller: 'loginCtrl'
            })
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        template: require('./app/views/index.html'),
                        controller: 'indexCtrl'
                    },
                    'top@index': {
                        template: require('./app/views/top.html'),
                        controller: 'topCtrl'
                    },
                    'left@index': {
                        template: require('./app/views/left.html')
                    },
                    'content@index': {
                        template: "<div class='main-content'></div>"
                    }
                }
            })
            .state('index.routing', {
                url: '/routing',
                views: {
                    'content@index': {
                        template: require('./app/views/routing.html'),
                        controller: 'routeCtrl'
                    }
                }
            })

            .state('index.developer', {
                url: '/developer',
                views: {
                    'content@index': {
                        template: require('./app/views/developer.html'),
                        controller: 'developerCtrl'
                    }
                }
            })

            .state('index.mapping', {
                url: '/mapping',
                views: {
                    'content@index': {
                        template: require('./app/views/mapping.html'),
                        controller: 'mappingCtrl'
                    }
                }
            })

            .state('index.skipMapping', {
                url: '/skipMapping',
                views: {
                    'content@index': {
                        template: require('./app/views/skipMapping.html'),
                        controller: 'skipMappingCtrl'
                    }
                }
            })

            .state('index.resources', {
                url: '/resources',
                views: {
                    'content@index': {
                        template: require('./app/views/resources.html'),
                        controller: 'resourcesCtrl'
                    }
                }
            })

            .state('index.authentication', {
                url: '/authentication',
                views: {
                    'content@index': {
                        template: require('./app/views/authentication.html'),
                        controller: 'authenticationCtrl'
                    }
                }
            })

            .state('index.ratelimit', {
                url: '/ratelimit',
                views: {
                    'content@index': {
                        template: require('./app/views/ratelimit.html'),
                        controller: 'ratelimitCtrl'
                    }
                }
            })

            .state('index.serverInfo', {
                url: '/serverInfo',
                views: {
                    'content@index': {
                        template: require('./app/views/serverInfo.html'),
                        controller: 'serverInfoCtrl'
                    }
                }
            })

    }])
};

// externals: {
//     jquery: 'jQuery.noConflict()' //或者jquery:'jQuery'
// },