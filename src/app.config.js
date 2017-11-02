//引入后台请求的$http和缓存
module.exports.providerConfig = [
    '$httpProvider',
    function ($httpProvider) {
        console.log($httpProvider.defaults.headers)

        /**
         * 对get请求的参数做处理，在get请求时候传入的params为一个object，此方法讲object转换为参数形式，object的key作为参数名称，object的value作为value
         * 例如 ：
         *     params = {}
         *     params.name="bob"
         *     params.age=11
         *     转换后：  name=bob&age=11
         */
        var param = function (obj) {
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        
        /**
         * 处理文件上传的form表单
         */
        $httpProvider.defaults.transformRequest = function (obj) {
            return angular.isObject(obj) && String(obj) !== '[object File]' ? param(obj) : obj;
        };

        /**
         * 设置$http请求后台数据的时候携带cookie信息
         */
        $httpProvider.defaults.withCredentials = true;

        //  $httpProvider.defaults.Cookie = true
        //  $httpProvider.defaults.crossDomain = true

        /* $httpProvider.defaults.headers.post = {
         'Content-Type': 'application/x-www-form-urlencoded'
         };
         $httpProvider.defaults.headers.put = {
         'Content-Type': 'application/x-www-form-urlencoded'
         };*/

        /************处理ie下不刷新页面问题**********/
        // Initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // Enables Request.IsAjaxRequest() in ASP.NET MVC
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        //禁用IE对ajax的缓存
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        /************处理ie下不刷新页面问题**********/


        /**
         * 此处设置$httpProvider拦截器，统一处理异常信息以及$http请求的时都需要携带的header
         */
        $httpProvider.interceptors.push(function ($q,$rootScope, $injector) { //$injector可以拿到所有依赖

            return {

                //给请求统一加一些参数的地方
                'request': function (config) {
                    return config || $q.when(config);
                },

                //此处是请求不成功的情况，例如网络不同情况
                'requestError': function (rejection) {
                    return $q.reject(rejection);
                },

                //已经拿到返回值，但是success是false的情况，
                'response': function (response) {
                    //此处判断返回的信息是不是需要跳转login
                    if (response.data.success == false && response.data.errorCode == "ui-0001") {
                        //TODO ui-0001请登录 ui-0000没有权限
                        //此处拿到$state跳转
                        $injector.get('$state').go('login');
                        // alert(111111111111111) //0000是想表示登录超时调回登录页
                        // 清空用户本地token存储的信息，如果
                        localStorage.token = "";
                        // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                        $rootScope.$emit("userIntercepted", "notLogin", response);
                    }
                    return response || $q.when(response);
                },

                //服务请求返回非200的状态
                'responseError': function (rejection) {
                    if (-1 === rejection.status) {
                        alert('请重新登录！')
                        localStorage.token = "";
                        $injector.get('$state').go('login');
                        //alert("error远程服务器无响应", "失败");
                    } else if (404 === rejection.status) {
                        alert("error找不到资源失败");
                    } else {
                        alert("error发生错误，代码：" + rejection.status + "失败");
                    }
                    return $q.reject(rejection);
                }
            }
        })
    }
];
